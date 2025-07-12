import React, { useState, useEffect, useMemo } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import voteBoxImage from '../assets/3d-blue-vote-box-ballot-600nw-2402267639-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCodeBranch, faUserPlus, faVoteYea } from '@fortawesome/free-solid-svg-icons';
import { useWallet, useProposals, useMultipleProposals, useProposalStates, useVote, useTokenBalance } from '../web3/hooks';
import ContractStatus from '../components/ContractStatus';

function Home() {
  const { address, isConnected } = useWallet();
  const { openConnectModal } = useConnectModal();
  const { data: proposalCount } = useProposals();
  const { data: tokenBalance } = useTokenBalance(address);
  const { write: castVote, isLoading: isVoting } = useVote();

  // Create array of proposal IDs to fetch (last 3 proposals)
  const proposalIds = useMemo(() => {
    if (!proposalCount || proposalCount === 0) return [];
    const startId = Math.max(1, proposalCount - 2);
    const endId = proposalCount;
    return Array.from({ length: endId - startId + 1 }, (_, i) => startId + i);
  }, [proposalCount]);

  // Fetch proposals and their states
  const { data: proposalsData, isLoading: proposalsLoading } = useMultipleProposals(proposalIds);
  const { data: statesData, isLoading: statesLoading } = useProposalStates(proposalIds);

  // Process proposals data
  const activeProposals = useMemo(() => {
    if (!proposalsData || !statesData || proposalsLoading || statesLoading) return [];

    return proposalsData
      .map((proposal, index) => {
        if (!proposal.result) return null;
        
        const [proposer, title, description, forVotes, againstVotes, startTime, endTime, executed, canceled] = proposal.result;
        const state = statesData[index]?.result || 0;

        // Only return active proposals (state 1 = Active)
        if (state !== 1) return null;

        return {
          id: proposalIds[index],
          title: title || `Proposal ${proposalIds[index]}`,
          description: description || `Description for proposal ${proposalIds[index]}`,
          proposer,
          forVotes: forVotes.toString(),
          againstVotes: againstVotes.toString(),
          startTime: startTime.toNumber() * 1000,
          endTime: endTime.toNumber() * 1000,
          executed,
          canceled,
          state
        };
      })
      .filter(Boolean); // Remove null values
  }, [proposalsData, statesData, proposalsLoading, statesLoading, proposalIds]);

  const handleVote = (proposalId, support) => {
    if (castVote) {
      castVote({
        args: [proposalId, support],
      });
    }
  };

  const formatBalance = (balance) => {
    if (!balance) return '0';
    return (Number(balance) / 1e18).toFixed(2);
  };

  const formatVotes = (votes) => {
    if (!votes) return '0';
    return (Number(votes) / 1e18).toFixed(2);
  };

  const getTimeLeft = (endTime) => {
    const now = Date.now();
    const timeLeft = Math.max(0, endTime - now);
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));
    
    if (daysLeft > 1) return `${daysLeft} days`;
    if (daysLeft === 1) return '1 day';
    if (hoursLeft > 1) return `${hoursLeft} hours`;
    if (hoursLeft === 1) return '1 hour';
    return 'Less than 1 hour';
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-main text-main">
      {/* Hero Section */}
      <div className="relative bg-main overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-main sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-main sm:text-5xl md:text-6xl">
                  <span className="block">Decentralized Voting</span>
                  <span className="block" style={{ color: 'var(--brand-indigo)' }}>Made Easy</span>
                </h1>
                <p className="mt-3 text-base text-muted sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  BallotDAO brings secure, transparent and tamper-proof voting to
                  the blockchain. Participate in governance or create your own polls
                  with our easy-to-use platform.
                </p>
                {isConnected && (
                  <div className="mt-4 text-sm text-muted">
                    Your Voting Power: {formatBalance(tokenBalance)} BALLOT
                  </div>
                )}
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md">
                    <button
                      onClick={openConnectModal}
                      className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-[var(--brand-indigo)] hover:bg-indigo-600 hover:scale-105 transform transition-all duration-300 md:py-4 md:text-lg md:px-12 shadow"
                    >
                      {isConnected ? 'Start Voting' : 'Connect Wallet'}
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-main text-base font-medium rounded-md text-main bg-transparent hover:bg-accent hover:border-[var(--brand-indigo)] transform transition-all duration-300 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden lg:block">
          <div className="h-full w-full flex items-center justify-center p-12">
            {/* 3D Voting Illustration */}
            <div className="relative w-full h-full max-w-md">
              <div className="relative">
                <img
                  src={voteBoxImage}
                  alt="3D Voting Illustration"
                  className="w-full h-auto animate-bounce-slow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Status Section */}
      {isConnected && (
        <div className="py-6 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContractStatus />
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-12 bg-features duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base" style={{ color: 'var(--brand-indigo)' }}>
              FEATURES
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-main sm:text-4xl">
              Why Choose BallotDAO?
            </p>
            <p className="mt-4 max-w-2xl text-xl text-muted mx-auto">
              Our platform offers unique advantages for secure and transparent
              voting.
            </p>
          </div>
          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative bg-card p-6 rounded-lg transition-all duration-300 hover:bg-accent">
                <div className="absolute -top-6 left-6" style={{ background: 'var(--brand-indigo)', borderRadius: '9999px', padding: '0.75rem' }}>
                  <i className="fas fa-lock text-white text-xl" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-main">
                    Secure Voting
                  </h3>
                  <p className="mt-2 text-base text-muted">
                    Every vote is encrypted and recorded on the blockchain, ensuring
                    complete security and anonymity.
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="relative bg-card p-6 rounded-lg transition-all duration-300 hover:bg-accent">
                <div className="absolute -top-6 left-6" style={{ background: 'var(--brand-green)', borderRadius: '9999px', padding: '0.75rem' }}>
                  <i className="fas fa-eye text-white text-xl" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-main">
                    Transparent Results
                  </h3>
                  <p className="mt-2 text-base text-muted">
                    Real-time results that anyone can verify on the blockchain,
                    eliminating any possibility of tampering.
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="relative bg-card p-6 rounded-lg transition-all duration-300 hover:bg-accent">
                <div className="absolute -top-6 left-6" style={{ background: 'var(--brand-indigo)', borderRadius: '9999px', padding: '0.75rem' }}>
                  <i className="fas fa-bolt text-white text-xl" />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-main">
                    Fast &amp; Easy
                  </h3>
                  <p className="mt-2 text-base text-muted">
                    Simple interface that makes voting accessible to everyone, with
                    transactions completed in seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Proposals Section */}


      {/* CTA Section */}
      <div className="bg-[var(--brand-indigo)]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-main sm:text-4xl">
            <span className="block">Ready to participate?</span>
            <span className="block">
              Connect your wallet and start voting today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={openConnectModal}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow hover:scale-105"
              >
                {isConnected ? 'Connected' : 'Connect Wallet'}
              </button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-main bg-accent hover:bg-accent-hover transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;