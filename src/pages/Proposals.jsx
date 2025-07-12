import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { useVote } from '../web3/hooks';
import { getContractAddresses } from '../web3/contracts';
import { useToast } from '../contexts/ToastContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import RequireWallet from '../components/RequireWallet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faVoteYea, faCheckCircle, faEthereum } from '@fortawesome/free-solid-svg-icons';
import { parseEther, formatEther } from 'ethers';
import VoteModal from '../components/VoteModal';

function Proposals() {
  const { address } = useAccount();
  const { vote, isVoting } = useVote();
  const { addToast } = useToast();
  const [votedProposals, setVotedProposals] = useState({});
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  
  // Fetch proposals from the smart contract
  const { data: proposalCount, error: countError } = useReadContract({
    address: getContractAddresses().BALLOT_DAO,
    abi: [{
      "inputs": [],
      "name": "proposalCount",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    }],
    functionName: 'proposalCount',
  });
  
  // Fetch each proposal's details
  const proposalQueries = [];
  const proposalCountNum = proposalCount ? parseInt(proposalCount.toString()) : 0;
  
  for (let i = 1; i <= proposalCountNum; i++) {
    const { data: proposal, error } = useReadContract({
      address: getContractAddresses().BALLOT_DAO,
      abi: [{
        "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "name": "proposals",
        "outputs": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "string", "name": "title", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "uint256", "name": "yesVotes", "type": "uint256"},
          {"internalType": "uint256", "name": "noVotes", "type": "uint256"},
          {"internalType": "uint256", "name": "endTime", "type": "uint256"},
          {"internalType": "bool", "name": "executed", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      functionName: 'proposals',
      args: [i],
    });
    
    proposalQueries.push({ data: proposal, error });
  }
  
  // Process proposals when data is loaded
  useEffect(() => {
    if (proposalCountNum > 0 && proposalQueries.length === proposalCountNum) {
      const loadedProposals = [];
      let hasError = false;
      
      for (let i = 0; i < proposalQueries.length; i++) {
        const { data: proposal, error } = proposalQueries[i];
        
        if (error) {
          console.error(`Error loading proposal ${i + 1}:`, error);
          hasError = true;
          continue;
        }
        
        if (proposal) {
          const totalVotes = proposal.yesVotes + proposal.noVotes;
          const yesPercentage = totalVotes > 0 ? Math.round((proposal.yesVotes / totalVotes) * 100) : 0;
          const noPercentage = totalVotes > 0 ? 100 - yesPercentage : 0;
          
          loadedProposals.push({
            id: proposal.id.toString(),
            title: proposal.title,
            description: proposal.description,
            yesVotes: proposal.yesVotes,
            noVotes: proposal.noVotes,
            endTime: proposal.endTime,
            executed: proposal.executed,
            yesPercentage,
            noPercentage,
            totalVotes: totalVotes.toString(),
          });
        }
      }
      
      if (!hasError || loadedProposals.length > 0) {
        setProposals(loadedProposals);
      }
      
      setLoading(false);
    }
  }, [proposalCount, proposalQueries.length]);
  
  if (countError) {
    console.error('Error loading proposal count:', countError);
    addToast('Failed to load proposals. Please try again later.', 'error');
  }

  // Load voted proposals from localStorage on component mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('votedProposals');
    if (savedVotes) {
      setVotedProposals(JSON.parse(savedVotes));
    }
  }, []);

  const handleVote = async (proposalId, voteOption) => {
    if (!address) {
      addToast('Please connect your wallet to vote', 'error');
      return { success: false, error: 'Wallet not connected' };
    }

    if (votedProposals[proposalId]) {
      addToast('You have already voted on this proposal', 'error');
      return { success: false, error: 'Already voted' };
    }

    try {
      addToast('Processing your vote...', 'loading');
      
      const result = await vote(proposalId, voteOption);
      
      if (result.success) {
        // Update voted proposals in state and localStorage
        const newVotedProposals = {
          ...votedProposals,
          [proposalId]: true
        };
        setVotedProposals(newVotedProposals);
        localStorage.setItem('votedProposals', JSON.stringify(newVotedProposals));
        
        // Update the selected proposal to reflect the vote
        setSelectedProposal(prev => ({
          ...prev,
          [`${voteOption}Votes`]: (prev[`${voteOption}Votes`] || 0) + 1,
          [`${voteOption}Percentage`]: Math.round((((prev[`${voteOption}Votes`] || 0) + 1) / 
            ((prev.yesVotes || 0) + (prev.noVotes || 0) + 1)) * 100)
        }));
        
        addToast('Vote recorded successfully!', 'success');
        return { success: true };
      } else {
        addToast(result.error || 'Failed to process your vote', 'error');
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Voting error:', err);
      addToast('Failed to process your vote. Please try again.', 'error');
      return { success: false, error: err.message };
    }
  };

  const handleOpenModal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalVote = async (proposalId, voteOption) => {
    const result = await handleVote(proposalId, voteOption);
    if (result.success) {
      // Close modal after successful vote
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    }
    return result;
  };

  // Fixed voting price in ETH (0.20 USDC equivalent, assuming 1 ETH = 2000 USDC for this example)
  const VOTE_PRICE_ETH = parseEther('0.0001');
  
  // Get the voting price from the useVote hook
  const { votingPrice } = useVote();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-indigo-600 mb-4" />
        <p className="text-lg text-gray-600">Loading proposals...</p>
      </div>
    );
  }
  
  if (proposals.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No proposals found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          There are no active proposals at the moment. Check back later or create a new proposal.
        </p>
      </div>
    );
  }

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Proposals');

  // Filter and search logic
  const filteredProposals = allProposals.filter((proposal) => {
    // Filter by status
    const statusMatch =
      filter === 'All Proposals' ||
      (filter === 'Active' && proposal.status === 'Open') ||
      (filter === 'Closed' && proposal.status === 'Closed') ||
      (filter === 'Passed' && proposal.yesPercentage > proposal.noPercentage && proposal.status === 'Closed') ||
      (filter === 'Rejected' && proposal.noPercentage >= proposal.yesPercentage && proposal.status === 'Closed');

    // Search by title, description, or proposer
    const searchMatch =
      proposal.title.toLowerCase().includes(search.toLowerCase()) ||
      proposal.description.toLowerCase().includes(search.toLowerCase()) ||
      proposal.proposer.toLowerCase().includes(search.toLowerCase());

    return statusMatch && searchMatch;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <RequireWallet>
      {selectedProposal && (
        <VoteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          proposal={selectedProposal}
          onVote={handleModalVote}
          isVoting={isVoting}
          hasVoted={votedProposals[selectedProposal?.id]}
          votingPrice={votingPrice || VOTE_PRICE_ETH}
        />
      )}
      <div className="min-h-screen bg-main text-main">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-[var(--brand-indigo)]/10 flex items-center justify-center mr-4">
                <i className="fas fa-clipboard-list" style={{ color: 'var(--brand-indigo)', fontSize: 28 }} />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: 'var(--brand-indigo)' }}>Active Proposals</h1>
                <p className="text-muted">Participate in governance decisions</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="search-container relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-search text-muted" />
                </span>
                <input
                  type="text"
                  placeholder="Search proposals..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="search-input w-full sm:w-64 bg-card border border-main rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-[var(--brand-indigo)] text-main"
                />
              </div>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="bg-card border border-main rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-[var(--brand-indigo)] text-main"
              >
                <option>All Proposals</option>
                <option>Active</option>
                <option>Closed</option>
                <option>Passed</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {/* Proposals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProposals.length === 0 ? (
              <div className="col-span-full text-center text-muted py-12">
                No proposals found.
              </div>
            ) : (
              filteredProposals.map((proposal) => (
                <div key={proposal.id} className="proposal-card bg-card rounded-lg overflow-hidden p-6 border border-main">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted">{proposal.endDate}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--brand-indigo)' }}>{proposal.title}</h3>
                  <p className="text-muted text-sm mb-4">{proposal.description}</p>
                  <div className="flex items-center text-sm text-muted mb-4">
                    <i className="fas fa-user-circle mr-1" />
                    <span className="truncate">{proposal.proposer}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted mb-1">
                      <span>Yes: {proposal.yesPercentage}%</span>
                      <span>No: {proposal.noPercentage}%</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2.5 flex">
                      <div
                        className="bg-[var(--brand-green)] h-2.5 rounded-l-full"
                        style={{ width: `${proposal.yesPercentage}%` }}
                      />
                      <div
                        className="bg-[var(--brand-indigo)] h-2.5 rounded-r-full"
                        style={{ width: `${proposal.noPercentage}%`, opacity: 0.3 }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenModal(proposal)}
                    disabled={votedProposals[proposal.id] || proposal.status !== 'Open'}
                    className={`px-4 py-2 rounded-md flex items-center justify-center ${
                      votedProposals[proposal.id]
                        ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                        : proposal.status === 'Open'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                    } transition-colors duration-200`}
                  >
                    {votedProposals[proposal.id] ? (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                        Voted
                      </>
                    ) : proposal.status === 'Open' ? (
                      <>
                        <FontAwesomeIcon icon={faVoteYea} className="mr-2" />
                        Vote Now
                      </>
                    ) : (
                      'View Details'
                    )}
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex flex-col items-center justify-center border-t border-main pt-6">
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <p className="text-sm text-muted">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">24</span> proposals
                </p>
              </div>
            </div>
            <Stack spacing={2}>
              <Pagination count={8} variant="outlined" shape="rounded" color="primary" />
            </Stack>
          </div>
        </main>
      </div>
    </RequireWallet>
  );
}

export default Proposals;