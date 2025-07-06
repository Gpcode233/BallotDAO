import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { umi } from './hooks';

export const config = getDefaultConfig({
  appName: 'BallotDAO',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect Cloud project ID
  chains: [umi],
  ssr: false,
});

export { umi as chains }; 