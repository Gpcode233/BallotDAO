import { useEffect, useState } from 'react';
import { useWallet } from '../web3/hooks';
import { NETWORKS } from '../web3/contracts';

const NetworkSwitcher = () => {
  const { chainId, switchNetwork, isConnected, isSupportedNetwork } = useWallet();
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Set initial network
  useEffect(() => {
    if (chainId) {
      const network = Object.values(NETWORKS).find(net => net.id === chainId);
      setSelectedNetwork(network?.name || 'Unsupported Network');
    } else {
      setSelectedNetwork('Select Network');
    }
  }, [chainId]);

  const handleNetworkChange = async (network) => {
    try {
      await switchChain({ chainId: network.id });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  if (!isConnected) return null;

  return (
    <div className="relative inline-block text-left ml-2">
      <div>
        <button
          type="button"
          className={`inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium ${isSupportedNetwork ? 'bg-gray-800 text-white' : 'bg-red-600 text-white'} hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500`}
          id="network-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedNetwork}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="network-menu"
        >
          <div className="py-1" role="none">
            {Object.values(NETWORKS).map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkChange(network)}
                className={`${network.id === chainId ? 'bg-gray-100 dark:bg-gray-700' : ''} text-gray-700 dark:text-gray-200 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
                role="menuitem"
              >
                <div className="flex items-center">
                  <span className="ml-3">{network.name}</span>
                  {network.id === chainId && (
                    <svg
                      className="ml-auto h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher;
