import { useEffect, useRef, useState } from "react";
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { baseSepolia } from "wagmi/chains";
import { CONTRACT_ADDRESS, HELLOBASE_ABI } from "../lib/contract";
import { friendlyError } from "../lib/utils";
import { emit } from "../lib/events";
import { fireConfetti } from "./confetti";
import { useToast } from "./Toast";

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
          placeholder="What’s on your mind?"
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

      <button
        className={"btn-primary btn-full write-btn" + (writing ? " is-pending" : "")}
        type="button"
        onClick={onSubmit}
        disabled={!isConnected || writing || over || wrongChain}
      >
        {writing ? (
          <>
            <span className="spinner"></span>
            <span>{isApproving ? "Awaiting approval…" : "Confirming on-chain…"}</span>
          </>
        ) : (
          "Save to blockchain"
        )}
      </button>

      {(statusText || txError) && (
        <div className={"tx-status" + (txError ? " error" : statusClass)} role="status" aria-live="polite">
          <span className="tx-dot" aria-hidden="true"></span>
          <span>{txError ?? statusText}</span>
        </div>
      )}
    </article>
  );
}