import { useState, useEffect } from 'react';
import { useAccount, useChainId, useReadContract, useWriteContract, useReadContracts, useSwitchChain } from 'wagmi';
import { parseEther } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS, getContractAddresses, getNetworkConfig, NETWORKS as ALL_NETWORKS } from './contracts';

// Fixed voting price in ETH (0.20 USDC equivalent)
const VOTE_PRICE_ETH = parseEther('0.0001'); // 0.0001 ETH = ~0.20 USDC (adjust based on current ETH price)

// Supported networks (imported from contracts.js)
export const NETWORKS = {
  hardhat: ALL_NETWORKS.hardhat,
  sepolia: ALL_NETWORKS.sepolia
};

// Custom hook for wallet connection state
export const useWallet = () => {
  const { address, isConnected, isConnecting, isDisconnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(false);

  // Set current network based on chainId
  useEffect(() => {
    if (!chainId) {
      setCurrentNetwork(null);
      setIsSupportedNetwork(false);
      return;
    }

    // Find the network in our supported networks
    const network = Object.values(NETWORKS).find(net => net.id === chainId);
    
    if (network) {
      setCurrentNetwork(network);
      setIsSupportedNetwork(true);
    } else {
      // If not in our supported networks, try to get the network info from wagmi
      setCurrentNetwork({
        id: chainId,
        name: `Chain ${chainId}`,
        unsupported: true
      });
      setIsSupportedNetwork(false);
    }
  }, [chainId]);
  useEffect(() => {
    if (chainId) {
      const network = Object.values(NETWORKS).find(net => net.id === chainId);
      setCurrentNetwork(network || null);
      setIsSupportedNetwork(!!network);
    } else {
      setCurrentNetwork(null);
      setIsSupportedNetwork(false);
    }
  }, [chainId]);

  // Switch to a specific network
  const switchNetwork = async (networkId) => {
    try {
      await switchChain({ chainId: networkId });
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  };

  // Get contract addresses for current network
  const getContractAddress = (contractName) => {
    const addresses = getContractAddresses(chainId);
    return addresses ? addresses[contractName] : null;
  };

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnected,
    chainId,
    currentNetwork,
    isSupportedNetwork,
    switchNetwork,
    getContractAddress,
    NETWORKS,
  };
};

// Hook for checking if user is on Hardhat network
export const useHardhatNetwork = () => {
  const chainId = useChainId();
  return chainId === hardhat.id;
};

// Hook for reading token balance
export const useTokenBalance = (address) => {
  return useReadContract({
    address: CONTRACT_ADDRESSES.BALLOT_TOKEN,
    abi: CONTRACT_ABIS.BALLOT_TOKEN,
    functionName: 'balanceOf',
    args: [address],
  });
};

// Hook for reading voting power
export const useVotingPower = (address) => {
  return useReadContract({
    address: CONTRACT_ADDRESSES.VOTING,
    abi: CONTRACT_ABIS.VOTING,
    functionName: 'getVotes',
    args: [address],
  });
};

// Hook for reading proposals
export const useProposals = () => {
  return useReadContract({
    address: CONTRACT_ADDRESSES.VOTING,
    abi: CONTRACT_ABIS.VOTING,
    functionName: 'getAllProposals',
  });
};

// Hook for reading a specific proposal
export const useProposal = (proposalId) => {
  return useReadContract({
    address: CONTRACT_ADDRESSES.VOTING,
    abi: CONTRACT_ABIS.VOTING,
    functionName: 'proposals',
    args: [proposalId],
  });
};

// Hook for reading multiple proposals
export const useMultipleProposals = (proposalIds) => {
  const contracts = proposalIds.map((id) => ({
    address: CONTRACT_ADDRESSES.VOTING,
    abi: CONTRACT_ABIS.VOTING,
    functionName: 'proposals',
    args: [id],
  }));

  return useReadContracts({
    contracts,
    query: {
      enabled: proposalIds.length > 0,
    },
  });
};

// Hook for reading proposal states
export const useProposalStates = (proposalIds) => {
  const contracts = proposalIds.map((id) => ({
    address: CONTRACT_ADDRESSES.VOTING,
    abi: CONTRACT_ABIS.VOTING,
    functionName: 'state',
    args: [id],
  }));

  return useReadContracts({
    contracts,
    query: {
      enabled: proposalIds.length > 0,
    },
  });
};

// Hook for creating a proposal
export const useCreateProposal = () => {
  return useWriteContract({
    address: CONTRACT_ADDRESSES.VOTING,
    abi: CONTRACT_ABIS.VOTING,
    functionName: 'propose',
  });
};

// Hook for voting on a proposal with enhanced UX
export const useVote = () => {
  const { address } = useAccount();
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  
  const { data: tokenBalance } = useTokenBalance(address);
  const { writeAsync: castVoteAsync } = useWriteContract({
    address: CONTRACT_ADDRESSES.ballot,
    abi: CONTRACT_ABIS.ballot,
    functionName: 'vote',
  });

  const vote = async (proposalId, support) => {
    try {
      const result = await castVoteAsync({
        args: [proposalId, support],
        value: VOTE_PRICE_ETH, // Send the fixed voting price with the transaction
      });
      return { success: true, txHash: result.hash, cost: VOTE_PRICE_ETH };
    } catch (error) {
      console.error('Voting error:', error);
      setError(error.message.includes('rejected') 
        ? 'Transaction was rejected' 
        : 'Error processing your vote. Please try again.'
      );
      return { success: false, error: error.message };
    } finally {
      setIsVoting(false);
    }
  };

  return { vote, isVoting, error };
};
