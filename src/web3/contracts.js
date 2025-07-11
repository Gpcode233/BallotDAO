// Contract ABIs
import BallotDAOABI from './BallotDAO.json';
import BallotTokenABI from './BallotToken.json';
import DAOTreasuryABI from './DAOTreasury.json';

// Environment configuration
const ENV = import.meta.env;

// Contract addresses by network
export const CONTRACT_ADDRESSES = {
  // Local development (Hardhat)
  localhost: {
    BALLOT_DAO: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    BALLOT_TOKEN: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    DAO_TREASURY: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  },
  // Sepolia Testnet (will be populated after deployment)
  sepolia: {
    BALLOT_DAO: ENV.VITE_SEPOLIA_BALLOT_DAO || "",
    BALLOT_TOKEN: ENV.VITE_SEPOLIA_BALLOT_TOKEN || "",
    DAO_TREASURY: ENV.VITE_SEPOLIA_DAO_TREASURY || ""
  }
};

// Get contract addresses for the current network
export const getContractAddresses = (chainId) => {
  switch (chainId) {
    case 31337: // Hardhat
    case 1337:  // Hardhat (alternative)
      return CONTRACT_ADDRESSES.localhost;
    case 11155111: // Sepolia
      return CONTRACT_ADDRESSES.sepolia;
    default:
      console.warn(`Unknown network ID: ${chainId}, using localhost addresses`);
      return CONTRACT_ADDRESSES.localhost;
  }
};

// Contract ABIs
export const CONTRACT_ABIS = {
  BALLOT_DAO: BallotDAOABI.abi,
  BALLOT_TOKEN: BallotTokenABI.abi,
  DAO_TREASURY: DAOTreasuryABI.abi
};

// Network configuration
export const NETWORKS = {
  hardhat: {
    chainId: 31337,
    name: "Hardhat Local",
    rpcUrl: "http://127.0.0.1:8545",
    explorerUrl: "",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    }
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: ENV.VITE_SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
    explorerUrl: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18
    },
    // Optional: Add block explorer URLs for transactions
    blockExplorerUrls: ["https://sepolia.etherscan.io"]
  }
};

// Helper to get current network config
export const getNetworkConfig = (chainId) => {
  return Object.values(NETWORKS).find(network => network.chainId === chainId) || NETWORKS.hardhat;
};