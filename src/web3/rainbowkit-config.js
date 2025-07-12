import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Default chain configuration that will be dynamically updated by the wallet
const defaultChains = [
  {
    id: 1,
    name: 'Ethereum',
    network: 'ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: ['https://cloudflare-eth.com'] },
      public: { http: ['https://cloudflare-eth.com'] },
    },
    testnet: false,
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  },
];

// This will be populated dynamically by the wallet
const getRainbowKitChains = () => {
  return defaultChains;
};

// Get project ID from environment variable or use a default one for demo
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';

// Get the app URL from environment variables or use a default
const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:3000';

export const config = getDefaultConfig({
  appName: 'BallotDAO',
  projectId: projectId,
  chains: getRainbowKitChains(),
  ssr: false, // Disable server-side rendering for now
  // Optional: Customize wallet options
  walletConnectOptions: {
    projectId: projectId,
    metadata: {
      name: 'BallotDAO',
      description: 'Decentralized Voting Platform',
      url: appUrl,
      icons: [`${appUrl}/logo.png`]
    }
  },
});