import React from 'react';
import { useWallet, useTokenBalance, useProposals } from '../web3/hooks';
import { getContractAddresses } from '../web3/contracts';

function ContractStatus() {
  const { address, isConnected, isCorrectNetwork } = useWallet();
  const contractAddresses = getContractAddresses();
  const { data: tokenBalance, isLoading: balanceLoading } = useTokenBalance(address);
  const { data: proposalCount, isLoading: proposalsLoading } = useProposals();

  const formatBalance = (balance) => {
    if (!balance) return '0';
    return (Number(balance) / 1e18).toFixed(2);
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="bg-card p-4 rounded-lg border border-accent">
        <h3 className="text-lg font-medium text-main mb-2">Contract Status</h3>
        <p className="text-muted">Please connect your wallet to view contract status.</p>
      </div>
    );
  }

  return (
    <div className="bg-card p-4 rounded-lg border border-accent">
      <h3 className="text-lg font-medium text-main mb-4">Contract Status</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted">Network:</span>
          <span className={`text-sm font-medium ${isCorrectNetwork ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrectNetwork ? 'Hardhat Local' : 'Wrong Network'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted">Wallet:</span>
          <span className="text-sm font-medium text-main">{shortenAddress(address)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted">Token Balance:</span>
          <span className="text-sm font-medium text-main">
            {balanceLoading ? 'Loading...' : `${formatBalance(tokenBalance)} BALLOT`}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted">Total Proposals:</span>
          <span className="text-sm font-medium text-main">
            {proposalsLoading ? 'Loading...' : proposalCount || 0}
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-accent">
        <h4 className="text-sm font-medium text-main mb-2">Contract Addresses:</h4>
        <div className="space-y-1 text-xs text-muted">
          <div>BallotToken: {shortenAddress(contractAddresses.BALLOT_TOKEN)}</div>
          <div>BallotDAO: {shortenAddress(contractAddresses.BALLOT_DAO)}</div>
          <div>DAOTreasury: {shortenAddress(contractAddresses.DAO_TREASURY)}</div>
        </div>
      </div>
    </div>
  );
}

export default ContractStatus; 