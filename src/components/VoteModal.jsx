import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTimes, faSpinner, faCoins, faClock } from '@fortawesome/free-solid-svg-icons';
import { formatEther, parseEther } from 'ethers';
import { useAccount } from 'wagmi';

// Helper function to format time remaining
const formatTimeRemaining = (endTime) => {
  if (!endTime) return 'N/A';
  
  try {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    // Handle different types of endTime (number, string, or BigNumber)
    let end;
    if (typeof endTime === 'number') {
      end = endTime;
    } else if (typeof endTime === 'string') {
      end = parseInt(endTime, 10);
    } else if (endTime && typeof endTime.toNumber === 'function') {
      end = endTime.toNumber();
    } else {
      return 'Invalid end time';
    }
    
    const diff = end - now;
    
    if (diff <= 0) return 'Voting ended';
    
    const days = Math.floor(diff / (60 * 60 * 24));
    const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((diff % (60 * 60)) / 60);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} left`;
  } catch (error) {
    console.error('Error calculating time remaining:', error);
    return 'Error';
  }
};

// Helper function to format ETH value with 6 decimal places
const formatEthValue = (weiValue) => {
  if (!weiValue) return '0.000000';
  try {
    const ethValue = formatEther(weiValue);
    const [whole, decimal] = ethValue.split('.');
    return `${whole}.${(decimal || '').padEnd(6, '0').substring(0, 6)}`;
  } catch (e) {
    console.error('Error formatting ETH value:', e);
    return '0.000000';
  }
};

const VoteModal = ({ isOpen, onClose, proposal, onVote, isVoting, hasVoted, votingPrice }) => {
  const { address } = useAccount();
  const [formattedPrice, setFormattedPrice] = useState('0.000000');
  
  // Format the voting price when it changes
  useEffect(() => {
    if (votingPrice) {
      try {
        // If votingPrice is a string, parse it to a BigNumber first
        const priceValue = typeof votingPrice === 'string' 
          ? parseEther(votingPrice) 
          : votingPrice;
        setFormattedPrice(formatEthValue(priceValue));
      } catch (error) {
        console.error('Error formatting voting price:', error);
        setFormattedPrice('0.000000');
      }
    }
  }, [votingPrice]);
  const [selectedVote, setSelectedVote] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!isOpen || !proposal?.endTime) return;
    
    // Update time left immediately
    setTimeLeft(formatTimeRemaining(proposal.endTime));
    
    // Update time left every minute
    const timer = setInterval(() => {
      setTimeLeft(formatTimeRemaining(proposal.endTime));
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [isOpen, proposal?.endTime]);

  if (!isOpen) return null;

  const handleVote = (vote) => {
    setSelectedVote(vote);
    onVote(proposal.id, vote === 'yes');
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {proposal.title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white"
              disabled={isVoting}
            >
              <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
            </button>
          </div>

          {/* Proposal Details */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {proposal.description}
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Proposed by</span>
                <span className="text-sm text-gray-900 dark:text-white">{proposal.proposer}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Remaining</span>
                <div className="flex items-center text-sm text-gray-900 dark:text-white">
                  <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-1 text-indigo-600 dark:text-indigo-400" />
                  <span>{timeLeft || 'Calculating...'}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Voting Cost</span>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCoins} className="w-3 h-3 mr-1 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {formattedPrice} ETH
                  </span>
                  <span className="ml-2 text-xs text-gray-500">(~${(parseFloat(formattedPrice) * 2000).toFixed(2)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Results */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Results</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-600 dark:text-green-400">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                    Yes ({proposal.yesPercentage}%)
                  </span>
                  <span>{proposal.yesVotes || '--'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${proposal.yesPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-600 dark:text-red-400">
                    <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                    No ({proposal.noPercentage}%)
                  </span>
                  <span>{proposal.noVotes || '--'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ width: `${proposal.noPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Voting Controls */}
          <div className="mt-8">
            {hasVoted ? (
              <div className="text-center py-4 text-green-600 dark:text-green-400 font-medium">
                You've already voted on this proposal
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleVote('yes')}
                  disabled={isVoting}
                  className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${isVoting && selectedVote !== 'yes' ? 'opacity-50' : ''}`}
                >
                  {isVoting && selectedVote === 'yes' ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                      Voting...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                      Vote Yes
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleVote('no')}
                  disabled={isVoting}
                  className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${isVoting && selectedVote !== 'no' ? 'opacity-50' : ''}`}
                >
                  {isVoting && selectedVote === 'no' ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                      Voting...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
                      Vote No
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
