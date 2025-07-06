import { useAccount, useChainId } from 'wagmi';

// Umi Devnet network config (official details)
export const umi = {
  id: 42069,
  name: 'Umi Devnet',
  network: 'umi-devnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH', // Umi Devnet uses ETH as the symbol
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://devnet.uminetwork.com'] },
    public: { http: ['https://devnet.uminetwork.com'] },
  },
  blockExplorers: {
    default: { name: 'Umi Explorer', url: 'https://devnet.explorer.moved.network' },
  },
  testnet: true,
};

// Custom hook for wallet connection state (Umi compatible)
export const useWallet = () => {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const chainId = useChainId();

  const isCorrectNetwork = chainId === umi.id;

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chainId,
    isCorrectNetwork,
    // switchToUmi: ... (implement with connector if needed)
  };
};

// Hook for checking if user is on Umi network
export const useUmiNetwork = () => {
  const chainId = useChainId();
  return chainId === umi.id;
};
