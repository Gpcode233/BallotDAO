import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalanche } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'BallotDAO',
  projectId: '206aab28c12f413fd240699195d45c42', // Replace with your WalletConnect Cloud project ID
  chains: [avalanche],
  ssr: false,
});

export { avalanche as chains }; 