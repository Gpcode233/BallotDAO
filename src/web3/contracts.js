// Contract ABIs
import BallotDAOABI from './BallotDAO.json';
import BallotTokenABI from './BallotToken.json';
import DAOTreasuryABI from './DAOTreasury.json';

// Environment configuration
const ENV = import.meta.env;

// Default contract addresses (these should be set in your environment variables)
const DEFAULT_CONTRACTS = {
  BALLOT_DAO: ENV.VITE_BALLOT_DAO || "",
  BALLOT_TOKEN: ENV.VITE_BALLOT_TOKEN || "",
  DAO_TREASURY: ENV.VITE_DAO_TREASURY || ""
};

// Get contract addresses - now works with any network
export const getContractAddresses = () => {
  return DEFAULT_CONTRACTS;
};

// Contract ABIs
export const CONTRACT_ABIS = {
  BALLOT_DAO: BallotDAOABI.abi,
  BALLOT_TOKEN: BallotTokenABI.abi,
  DAO_TREASURY: DAOTreasuryABI.abi
};

// Default network configuration
export const getNetworkConfig = (chainId) => {
  // Return a generic network configuration for any chain
  return {
    chainId: chainId,
    name: `Chain ${chainId}`,
    rpcUrl: `https://network-${chainId}.example.com`, // This will be overridden by the wallet
    explorerUrl: "",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: []
  };
};