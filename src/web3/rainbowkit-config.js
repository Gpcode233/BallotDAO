import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

// Configure testnet chains
export const chains = [
  {
    ...sepolia,
    // Override any default Sepolia settings if needed
    rpcUrls: {
      ...sepolia.rpcUrls,
      // Use Alchemy RPC URL for better reliability
      default: { http: [process.env.REACT_APP_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'] },
      public: { http: [process.env.REACT_APP_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'] },
    },
  },
  // Keep Hardhat for local development
  {
    id: 31337,
    name: 'Hardhat Local',
    network: 'hardhat',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['http://127.0.0.1:8545'] },
      public: { http: ['http://127.0.0.1:8545'] },
    },
    testnet: true,
  }
];

// Get project ID from environment variable or use a default one for demo
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'BallotDAO',
  projectId: projectId,
  chains: chains,
  ssr: false,
  // Optional: Customize wallet options
  walletConnectOptions: {
    projectId: projectId,
    metadata: {
      name: 'BallotDAO',
      description: 'Decentralized Voting Platform',
      url: 'https://your-dapp-url.com',
      icons: ['https://your-dapp-url.com/logo.png']
    }
  },
});

export { chains };