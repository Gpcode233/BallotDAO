import { ethers } from "ethers";
import { AVALANCHE_RPC } from "./contracts";

// Returns a provider for Avalanche C-Chain
export function getAvalancheProvider() {
  return new ethers.JsonRpcProvider(AVALANCHE_RPC);
}