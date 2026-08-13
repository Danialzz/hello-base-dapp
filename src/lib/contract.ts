import { parseAbi } from "viem";

// Deployed HelloBase contract on Base Sepolia.
// Override at build time with VITE_CONTRACT_ADDRESS if you redeploy.
export const CONTRACT_ADDRESS: `0x${string}` =
  (import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}` | undefined) ||
  "0x91296937E87cE57fF3cDD787289576E505BdD3c9";

export const HELLOBASE_ABI = parseAbi([
  "function getBoardState() view returns (string currentMessage, address currentLastUpdater, uint256 totalUpdates)",
  "function getMessage() view returns (string)",
  "function lastUpdater() view returns (address)",
  "function updateCount() view returns (uint256)",
  "function setMessage(string _newMessage)",
  "event MessageUpdated(address indexed sender, string newMessage, uint256 indexed updateId, uint256 timestamp)",
]);

export const BASESCAN_URL = "https://sepolia.basescan.org";
export const txUrl = (hash: string) => `${BASESCAN_URL}/tx/${hash}`;
export const addressUrl = (addr: string) => `${BASESCAN_URL}/address/${addr}`;
export const CONTRACT_URL = `${BASESCAN_URL}/address/${CONTRACT_ADDRESS}`;