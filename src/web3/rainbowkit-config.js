import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { NETWORKS } from './contracts';

// Convert our network config to RainbowKit format
const getRainbowKitChains = () => {
  return Object.values(NETWORKS).map(network => ({
    id: network.chainId,
    name: network.name,
    network: network.name.toLowerCase().replace(/\s+/g, '-'),
    nativeCurrency: network.nativeCurrency || {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: { http: [network.rpcUrl] },
      public: { http: [network.rpcUrl] },
    },
    testnet: network.chainId !== 1, // Assume anything not mainnet is testnet
    blockExplorers: network.blockExplorerUrls ? {
      default: { name: 'Explorer', url: network.explorerUrl },
    } : undefined,
  }));
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