import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Proposals() {
  const allProposals = [
    {
      id: 1,
      title: "DAO Treasury Allocation Proposal",
      description: "Proposal to allocate 40% of DAO treasury to development, 30% to marketing, and 30% to community rewards.",
      endDate: "Ends in 2 days",
      status: "Open",
      proposer: "0x1a2b...3c4d",
      yesPercentage: 65,
      noPercentage: 35,
      buttonText: "View Details",
      buttonClass: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white", // Grey button
      iconClass: "fas fa-eye"
    },
    {
      id: 2,
      title: "Protocol Upgrade v2.0",
      description: "Vote on the proposed upgrade to the protocol which will include new features and improved gas efficiency for users.",
      endDate: "Ends in 5 days",
      status: "Open",
      proposer: "vitalik.eth",
      yesPercentage: 42,
      noPercentage: 58,
      buttonText: "View Details",
      buttonClass: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white", // Grey button
      iconClass: "fas fa-eye"
    },
    {
      id: 3,
      title: "New Core Team Member",
      description: "Vote to approve @cryptodev as a new core team member responsible for smart contract development.",
      endDate: "Ends in 1 day",
      status: "Open",
      proposer: "0x5e6f...7g8h",
      yesPercentage: 78,
      noPercentage: 22,
      buttonText: "View Details",
      buttonClass: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white", // Grey button
      iconClass: "fas fa-eye"
    },
    {
      id: 4,
      title: "Tokenomics Update",
      description: "Proposal to adjust token emission rates and distribution model for better long-term sustainability.",
      endDate: "Starts in 3 days",
      status: "Pending",
      proposer: "tokenmaster.eth",
      yesPercentage: 0,
      noPercentage: 0,
      buttonText: "Coming Soon",
      buttonClass: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white", // Grey button
      iconClass: "fas fa-clock"
    },
    {
      id: 5,
      title: "Partnership with DeFi Protocol",
      description: "Proposal to form a strategic partnership with the leading DeFi protocol to increase company's liquidity.",
      endDate: "Ended 5 days ago",
      status: "Closed",
      proposer: "0x9i8j...7k6l",
      yesPercentage: 82,
      noPercentage: 18,
      buttonText: "View Results",
      buttonClass: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white", // Grey button
      iconClass: "fas fa-poll"
    },
    {
      id: 6,
      title: "UI/UX Redesign Initiative",
      description: "Proposal to allocate funds for a complete redesign of the dApp interface and user experience.",
      endDate: "Ended 2 weeks ago",
      status: "Closed",
      proposer: "designer.eth",
      yesPercentage: 35,
      noPercentage: 65,
      buttonText: "View Results",
      buttonClass: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white", // Grey button
      iconClass: "fas fa-poll"
    }
  ];

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

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'Closed':
        return 'bg-green-500'; // Even if closed, show final result as green for 'yes'
      case 'Pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };


  return (
    <div className="min-h-screen bg-[#1a202c] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mr-4">
              <i className="fas fa-clipboard-list text-indigo-500 text-2xl floating-icon animate-grow-slow" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Proposals</h1>
              <p className="text-gray-500 dark:text-gray-400">Participate in governance decisions</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="search-container relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="fas fa-search text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search proposals..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input w-full sm:w-64 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:text-white"
              />
            </div>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:text-white"
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
            <div className="col-span-full text-center text-gray-400 py-12">
              No proposals found.
            </div>
          ) : (
            filteredProposals.map((proposal) => (
              <div key={proposal.id} className="proposal-card bg-white dark:bg-gray-700 rounded-lg overflow-hidden p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{proposal.endDate}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{proposal.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{proposal.description}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <i className="fas fa-user-circle mr-1" />
                  <span className="truncate">{proposal.proposer}</span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <div className="flex items-center">
                      <i className={`fas fa-thumbs-up ${proposal.yesPercentage > 0 ? 'text-green-500' : 'text-gray-400'} mr-1`} />
                      <span>{proposal.yesPercentage}% Yes</span>
                    </div>
                    <div className="flex items-center">
                      <i className={`fas fa-thumbs-down ${proposal.noPercentage > 0 ? 'text-red-500' : 'text-gray-400'} mr-1`} />
                      <span>{proposal.noPercentage}% No</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                    <div
                      className={`${getProgressBarColor(proposal.status)} h-2 rounded-full`}
                      style={{ width: `${proposal.yesPercentage}%` }}
                    />
                  </div>
                </div>
                <button className={`w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center transition duration-150 ease-in-out ${proposal.buttonClass}`}>
                  <i className={`${proposal.iconClass} mr-2`} /> {proposal.buttonText}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">24</span> proposals
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                  <span className="sr-only">Previous</span>
                  <i className="fas fa-chevron-left" />
                </a>
                <a href="#" aria-current="page" className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                  2
                </a>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  ...
                </span>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                  8
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
                  <span className="sr-only">Next</span>
                  <i className="fas fa-chevron-right" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Proposals;