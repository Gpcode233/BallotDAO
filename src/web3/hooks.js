import { useState, useEffect } from 'react';
import { useAccount, useChainId, useReadContract, useWriteContract, useReadContracts } from 'wagmi';
import { parseEther } from 'ethers';
import { CONTRACT_ABIS, getContractAddresses, getNetworkConfig } from './contracts';

// Fixed voting price in ETH (0.20 USDC equivalent)
const VOTE_PRICE_ETH = parseEther('0.0001'); // 0.0001 ETH = ~0.20 USDC (adjust based on current ETH price)

// Custom hook for wallet connection state
export const useWallet = () => {
  const { address, isConnected, isConnecting, isDisconnected, chainId } = useAccount();
  const [currentNetwork, setCurrentNetwork] = useState(null);
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true); // All networks are supported now

  // Set current network based on chainId
  useEffect(() => {
    if (!chainId) {
      setCurrentNetwork(null);
      return;
    }

    // For any chain, create a basic network configuration
    const network = getNetworkConfig(chainId);
    setCurrentNetwork(network);
    setIsSupportedNetwork(true);
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
  const { address, chainId } = useAccount();
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  
  const { data: tokenBalance } = useTokenBalance(address);
  
  // Get contract addresses for the current network
  const contractAddresses = getContractAddresses();
  
  const { writeContractAsync } = useWriteContract();

  const vote = async (proposalId, support) => {
    if (!address) {
      return { success: false, error: 'Wallet not connected' };
    }
    
    if (!contractAddresses.BALLOT_DAO) {
      return { success: false, error: 'Contract address not found for this network' };
    }
    
    setIsVoting(true);
    setError(null);
    
    try {
      const tx = await writeContractAsync({
        address: contractAddresses.BALLOT_DAO,
        abi: CONTRACT_ABIS.BALLOT_DAO,
        functionName: 'vote',
        args: [parseInt(proposalId), support],
        value: VOTE_PRICE_ETH, // Send the fixed voting price with the transaction
      });
      
      return { 
        success: true, 
        txHash: tx.hash, 
        cost: VOTE_PRICE_ETH,
        message: 'Vote submitted successfully!'
      };
    } catch (error) {
      console.error('Voting error:', error);
      const errorMessage = error.message.includes('user rejected') 
        ? 'Transaction was rejected' 
        : error.message.includes('insufficient funds')
          ? 'Insufficient funds for voting fee'
          : 'Error processing your vote. Please try again.';
          
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage,
        code: error.code
      };
    } finally {
      setIsVoting(false);
    }
  };

  return { 
    vote, 
    isVoting, 
    error,
    votingPrice: VOTE_PRICE_ETH
  };
};
