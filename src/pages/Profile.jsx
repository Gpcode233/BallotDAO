import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ isWalletConnected }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!isWalletConnected) {
      navigate('/');
      return;
    }

    // Get the connected wallet address
    const getAddress = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      }
    };

    getAddress();
  }, [isWalletConnected, navigate]);

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
            </div>
          </div>

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