import { ethers } from "ethers";
import { getNetworkConfig } from "./contracts";

// Returns a provider for the specified network
export function getNetworkProvider(chainId) {
  const network = getNetworkConfig(chainId);
  if (!network || !network.rpcUrl) {
    throw new Error(`No RPC URL found for network ${chainId}`);
  }
  return new ethers.JsonRpcProvider(network.rpcUrl);
}

// For backward compatibility
export function getUmiProvider() {
  return getNetworkProvider(42069); // Umi Network chain ID
}