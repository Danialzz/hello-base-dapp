import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, HELLOBASE_ABI } from "../lib/contract";
import { copyText, shortAddr } from "../lib/utils";
import { on } from "../lib/events";
import { useToast } from "./Toast";
import CopyChip from "./CopyChip";

type BoardState = [string, `0x${string}`, bigint];

export default function Board() {
  const { data, isPending, isFetching, isError, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: HELLOBASE_ABI,
    functionName: "getBoardState",
    query: { staleTime: 10_000 },
  });

  const [justUpdated, setJustUpdated] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    const unsub = on("board:updated", () => {
      setJustUpdated(true);
      clearTimeout(t);
      t = window.setTimeout(() => setJustUpdated(false), 4200);
    });
    return () => {
      unsub();
      clearTimeout(t);
    };
  }, []);

  const { show } = useToast();
  const [msg, updater, count] = (data as BoardState | undefined) ?? [];
  const loading = isPending || (isFetching && !data);

  const copyWriter = async () => {
    if (!updater) return;
    if (await copyText(updater)) show("Address copied", "success");
    else show("Couldn’t copy address", "error");
  };

  return (
    <article className="card card--hero">
      <div className="card-label">
        <span className="card-dot"></span> On the board now
      </div>

      {loading ? (
        <div className="board-skeleton" aria-hidden="true">
          <span className="skeleton" style={{ width: "84%" }}></span>
          <span className="skeleton" style={{ width: "58%" }}></span>
        </div>
      ) : (
        <>
          <p className="board-quote" aria-hidden="true">
            &ldquo;
          </p>
          <p className={"board-message" + (msg ? "" : " empty")}>
            {isError
              ? "Couldn’t load the board. Try again."
              : msg || "The board is empty — be the first to leave your mark."}
          </p>
          {!isError && (
            <div className="board-meta">
              <CopyChip label={shortAddr(updater)} full={updater} title="Copy address" />
              <span className="board-updates">
                <b>{count?.toString() ?? "0"}</b> total updates
              </span>
              {justUpdated && <span className="board-updated">Updated just now</span>}
            </div>
          )}
          <div className="stats">
            <div className="stat">
              <div className="stat-value" title={count?.toString()}>
                {count?.toString() ?? "—"}
              </div>
              <div className="stat-label">Total updates</div>
            </div>
            <div className="stat">
              <button className="stat-writer" type="button" title="Copy address" onClick={copyWriter}>
                {shortAddr(updater)}
              </button>
              <div className="stat-label">Last writer</div>
            </div>
            <div className="stat">
              <div className="stat-value">Base Sepolia</div>
              <div className="stat-label">Network</div>
            </div>
          </div>
        </>
      )}

      <div className="board-actions">
        <span className="board-hint">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Live from the blockchain
        </span>
        <button className="btn-ghost" type="button" onClick={() => refetch()} disabled={isFetching}>
          Refresh board
        </button>
      </div>
    </article>
  );
}