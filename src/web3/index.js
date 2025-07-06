import { UMI_RPC } from "./contracts";
import { ethers } from "ethers";

// Returns a provider for Umi Network
export function getUmiProvider() {
  return new ethers.JsonRpcProvider(UMI_RPC);
}