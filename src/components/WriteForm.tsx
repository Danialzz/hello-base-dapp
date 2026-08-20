import { useEffect, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { baseSepolia } from "wagmi/chains";
import { CONTRACT_ADDRESS, HELLOBASE_ABI } from "../lib/contract";
import { friendlyError } from "../lib/utils";
import { emit } from "../lib/events";
import { fireConfetti } from "./confetti";
import { useToast } from "./Toast";

const WALLET_ICON = (
  <span className="wallet-icon" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15v4" />
      <path d="M5 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
      <path d="M17 13h.01" />
    </svg>
  </span>
);

const ARROW_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function WriteForm() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { show } = useToast();
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");

  const len = value.length;
  const over = len > 280;
  const wrongChain = isConnected && chainId !== baseSepolia.id;

  const { data: hash, error, isPending: isApproving, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed, isError: isReceiptError } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const justConfirmed = useRef(false);
  useEffect(() => {
    if (isConfirmed && !justConfirmed.current) {
      justConfirmed.current = true;
      fireConfetti();
      queryClient.invalidateQueries({ queryKey: ["readContract"] });
      queryClient.invalidateQueries({ queryKey: ["history"] });
      emit("board:updated");
      setValue("");
      show("Your message is now on-chain forever.", "success");
    }
  }, [isConfirmed, queryClient, show]);

  useEffect(() => {
    if (hash) justConfirmed.current = false;
  }, [hash]);

  const writing = isApproving || !!hash;
  const statusText = isApproving
    ? "Step 1 of 2 — approve in your wallet"
    : hash && !isConfirmed
      ? "Step 2 of 2 — confirming on Base…"
      : isConfirmed
        ? "Confirmed on-chain"
        : null;
  const statusClass = isConfirmed ? " success" : isReceiptError ? " error" : "";
  const txError = isReceiptError
    ? "Transaction failed on-chain."
    : error
      ? friendlyError(error, "Transaction failed")
      : null;

  const onSubmit = async () => {
    const v = value.trim();
    if (!v) {
      show("Your message can’t be empty", "error");
      return;
    }
    if (v.length > 280) {
      show("Messages are limited to 280 characters", "error");
      return;
    }
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: HELLOBASE_ABI,
        functionName: "setMessage",
        args: [v],
      });
    } catch (err) {
      show(friendlyError(err, "Transaction failed"), "error");
    }
  };

  const hint = isConnected
    ? "Every message is public and permanent on the chain. Pick your words — they’ll outlive this page."
    : "Connect a wallet to leave your mark. Every message is public and permanent on the chain.";

  return (
    <article className="card">
      <div className="card-label">
        <span className="card-dot"></span> Write a message
      </div>
      <p className="write-hint">{hint}</p>

      <div className="input-wrap">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={300}
          placeholder={isConnected ? "What’s on your mind?" : "Connect your wallet to write on-chain…"}
          disabled={!isConnected || writing}
          aria-label="Your message (up to 280 characters)"
        />
        <span className={"char-count" + (over ? " over" : "")}>{len} / 280</span>
      </div>
      <span
        className={"char-progress" + (over ? " over" : "")}
        style={{ width: `${Math.min((len / 280) * 100, 100)}%` }}
        aria-hidden="true"
      ></span>

      {isConnected ? (
        <button
          className={"btn-primary btn-full write-btn" + (writing ? " is-pending" : "")}
          type="button"
          onClick={onSubmit}
          disabled={writing || over || wrongChain}
        >
          {writing ? (
            <>
              <span className="spinner"></span>
              <span>{isApproving ? "Awaiting approval…" : "Confirming on-chain…"}</span>
            </>
          ) : (
            <>
              <span>Publish on-chain</span>
              {ARROW_ICON}
            </>
          )}
        </button>
      ) : (
        <ConnectButton.Custom>
          {({ mounted, openConnectModal }) => (
            <button
              className="btn-primary btn-full write-btn write-connect"
              type="button"
              onClick={openConnectModal}
              disabled={!mounted}
            >
              {WALLET_ICON}
              <span>Connect wallet to write</span>
              {ARROW_ICON}
            </button>
          )}
        </ConnectButton.Custom>
      )}

      {(statusText || txError) && (
        <div className={"tx-status" + (txError ? " error" : statusClass)} role="status" aria-live="polite">
          <span className="tx-dot" aria-hidden="true"></span>
          <span>{txError ?? statusText}</span>
        </div>
      )}
    </article>
  );
}