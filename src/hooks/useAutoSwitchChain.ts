import { useEffect } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";

// If the connected wallet is on the wrong network, switch (or add) Base Sepolia.
export function useAutoSwitchChain() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected && chainId !== undefined && chainId !== baseSepolia.id) {
      (async () => {
        try {
          await switchChain({ chainId: baseSepolia.id });
        } catch {
          /* declined — the network pill shows "Wrong network" */
        }
      })();
    }
  }, [isConnected, chainId, switchChain]);
}