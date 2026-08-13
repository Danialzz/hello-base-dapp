import { useHistory } from "../hooks/useHistory";
import { shortAddr, timeAgo } from "../lib/utils";
import { txUrl } from "../lib/contract";
import CopyChip from "./CopyChip";

const EXTERNAL_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

function SkeletonRows() {
  return (
    <div className="history-skeleton" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div className="skeleton-item" key={i}>
          <div className="skeleton-head">
            <span className="skeleton skeleton-chip" style={{ width: 54 }}></span>
            <span className="skeleton skeleton-chip" style={{ width: 128 }}></span>
          </div>
          <span className="skeleton skeleton-line" style={{ width: "86%" }}></span>
          <span className="skeleton skeleton-line" style={{ width: "44%" }}></span>
        </div>
      ))}
    </div>
  );
}

export default function History() {
  const { data, isPending, isError } = useHistory();
  const count = data?.length ?? 0;

  const note = isPending
    ? "Loading…"
    : count === 0
      ? "No activity"
      : count === 12
        ? "Latest 12 updates"
        : `Latest ${count} updates`;

  return (
    <article className="card">
      <div className="card-label">
        <span className="card-dot"></span> Recent activity
        <span className="history-note">{note}</span>
      </div>

      <div className="history-list" aria-live="polite">
        {isPending ? (
          <SkeletonRows />
        ) : isError ? (
          <div className="history-empty">
            <strong>Couldn’t load history</strong>
            <br />
            <span>RPC limits may apply — refresh to retry.</span>
          </div>
        ) : count === 0 ? (
          <div className="history-empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-6l-2 3h-4l-2-3H2" />
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <p>
              <strong>No messages yet</strong>
            </p>
            <span>Be the first to leave your mark on Base.</span>
          </div>
        ) : (
          data?.map((item, i) => (
            <div
              className="history-item"
              key={item.hash + item.id}
              style={{ animationDelay: `${Math.min(i * 55, 420)}ms` }}
            >
              <div className="history-head">
                <span className="history-id">#{item.id}</span>
                <CopyChip label={shortAddr(item.sender)} full={item.sender} title="Copy address" />
              </div>
              <p className="history-msg">{item.message}</p>
              <div className="history-foot">
                <div className="history-left">
                  <span
                    className="history-time"
                    title={item.timestamp ? new Date(item.timestamp).toLocaleString() : ""}
                  >
                    {item.timestamp ? timeAgo(item.timestamp) : "—"}
                  </span>
                  <span className="history-tx">on-chain</span>
                </div>
                <a
                  className="history-link"
                  href={txUrl(item.hash)}
                  target="_blank"
                  rel="noopener"
                  title="View transaction on BaseScan"
                >
                  BaseScan {EXTERNAL_ICON}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}