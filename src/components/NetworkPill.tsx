import { useAccount, useChainId } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export default function NetworkPill() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const wrong = isConnected && chainId !== baseSepolia.id;

  return (
    <span className={"network-pill" + (wrong ? " wrong" : "")} aria-live="polite">
      <span className="pill-dot"></span>
      <span className="pill-text">{wrong ? "Wrong network" : "Base Sepolia"}</span>
    </span>
  );
}