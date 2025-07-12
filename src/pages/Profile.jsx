import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet, NETWORKS } from '../web3/hooks';

const Profile = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance, isSupportedNetwork, currentNetwork, switchChain } = useWallet();
  
  const supportedNetworks = Object.values(NETWORKS).map(network => network.name).join(' or ');

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center">
              <i className="fas fa-user text-2xl text-white"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                {address}
              </p>
              {balance && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </p>
              )}
            </div>
          </div>

          {/* Network Status */}
          {!isSupportedNetwork && (
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <i className="fas fa-exclamation-triangle text-yellow-400 text-xl"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    {currentNetwork ? 'Unsupported Network' : 'No Network Connected'}
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-100">
                    <p>
                      {currentNetwork 
                        ? `You're connected to ${currentNetwork.name || 'an unsupported network'}. `
                        : 'Please connect to a supported network. '}
                      Please switch to {supportedNetworks} to use BallotDAO.
                    </p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {Object.values(NETWORKS).map(network => (
                      <button
                        key={network.id}
                        onClick={() => switchChain({ chainId: network.id })}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs font-medium transition mr-2"
                      >
                        Switch to {network.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Voting Statistics
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Votes Cast</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">Proposals Created</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No recent activity to display
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;