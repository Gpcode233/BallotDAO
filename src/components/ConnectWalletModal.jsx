import React from 'react';
import { useNavigate } from 'react-router-dom';
import trustImg from '../assets/trust.jpg';
import bitgetImg from '../assets/bitget.jpg';
import safepalImg from '../assets/safepal.png';
//import phantomImg from '../assets/phantom.png';
import metaMask from '../assets/metamask2.png';

const ConnectWalletModal = ({ isOpen, onClose, setIsWalletConnected }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  // Connect handler for other wallets (placeholder)
  const handleConnect = (wallet) => {
    console.log(`Connecting to ${wallet}...`);
    onClose();
  };

  // Connect MetaMask and switch to Avalanche
  async function connectMetaMask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await switchToAvalanche();
        setIsWalletConnected(true);
        onClose();
        navigate('/dashboard');
      } catch (err) {
        console.error("User rejected connection", err);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  }

  // Switch to Avalanche C-Chain
  async function switchToAvalanche() {
    const params = {
      chainId: '0xA86A', // 43114 in hex
      chainName: 'Avalanche Mainnet C-Chain',
      nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://snowtrace.io/'],
    };
    try {
      await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [params] });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Panel */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-[fadeInScale_0.3s_ease]">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          aria-label="Close"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose how you want to connect. If you don't have a wallet yet, you can
            select a provider and create one.
          </p>
        </div>
        {/* Wallet Options */}
        <div className="grid grid-cols-2 gap-4">
          {/* MetaMask */}
          <button
            onClick={connectMetaMask}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-300"
          >
            <img src={metaMask} alt="MetaMask" className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              MetaMask
            </span>
          </button>
          {/* Trust Wallet */}
          <button
            onClick={() => handleConnect('Trust Wallet')}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-300"
          >
            <img src={trustImg} alt="Trust Wallet" className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Trust Wallet
            </span>
          </button>
          {/* Bitget Wallet */}
          <button
            onClick={() => handleConnect('BitGet')}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-300"
          >
            <img src={bitgetImg} alt="BitGet" className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              BitGet
            </span>
          </button>
          {/* SafePal Wallet */}
          <button
            onClick={() => handleConnect('SafePal')}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-300"
          >
            <img src={safepalImg} alt="SafePal" className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              SafePal
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;