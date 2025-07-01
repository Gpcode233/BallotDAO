import { useAccount, useChainId } from 'wagmi';
import { avalanche } from 'wagmi/chains';

// Custom hook for wallet connection state (Wagmi v2 compatible)
export const useWallet = () => {
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const chainId = useChainId();

  const isCorrectNetwork = chainId === avalanche.id;

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chainId,
    isCorrectNetwork,
    // switchToAvalanche: ... (implement with connector if needed)
  };
};

// Hook for checking if user is on Avalanche network
export const useAvalancheNetwork = () => {
  const chainId = useChainId();
  return chainId === avalanche.id;
};
