import { useQuery } from "@tanstack/react-query";
import { usePublicClient } from "wagmi";
import { getAbiItem } from "viem";
import { baseSepolia } from "wagmi/chains";
import { CONTRACT_ADDRESS, HELLOBASE_ABI } from "../lib/contract";

export interface HistoryItem {
  id: string;
  sender: `0x${string}`;
  message: string;
  timestamp: number | null;
  hash: `0x${string}`;
}

const messageUpdated = getAbiItem({ abi: HELLOBASE_ABI, name: "MessageUpdated" });

export function useHistory() {
  const publicClient = usePublicClient({ chainId: baseSepolia.id });

  return useQuery({
    queryKey: ["history"],
    enabled: !!publicClient,
    staleTime: 15_000,
    queryFn: async (): Promise<HistoryItem[]> => {
      if (!publicClient) throw new Error("No public client");
      const currentBlock = await publicClient.getBlockNumber();
      const fromBlock = currentBlock - 5000n;
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: messageUpdated,
        fromBlock: fromBlock < 0n ? 0n : fromBlock,
        toBlock: "latest",
      });

      return logs
        .slice(-12)
        .reverse()
        .map((log) => {
          const args = log.args as {
            sender: `0x${string}`;
            newMessage: string;
            updateId: bigint;
            timestamp: bigint;
          };
          return {
            id: args.updateId.toString(),
            sender: args.sender,
            message: args.newMessage,
            timestamp: args.timestamp ? Number(args.timestamp) * 1000 : null,
            hash: log.transactionHash,
          };
        });
    },
  });
}