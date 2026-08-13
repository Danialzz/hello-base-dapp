import { CONTRACT_ADDRESS, CONTRACT_URL } from "../lib/contract";
import { shortAddr } from "../lib/utils";
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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img className="footer-mark" src="assets/logo.svg" alt="" width="26" height="26" />
          <span>
            Leave your mark on <strong>Base</strong>
          </span>
        </div>

        <div className="footer-status">
          <span className="footer-network">
            <span className="dot is-on" aria-hidden="true"></span> Base Sepolia
          </span>
          <span className="footer-sep">·</span>
          <span>Public &amp; permanent</span>
          <span className="footer-sep">·</span>
          <span>280 characters</span>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-contract">
          <span className="footer-label">Contract</span>
          <CopyChip label={shortAddr(CONTRACT_ADDRESS)} full={CONTRACT_ADDRESS} title="Copy contract address" />
          <a className="footer-explore" href={CONTRACT_URL} target="_blank" rel="noopener" title="View contract on BaseScan">
            BaseScan {EXTERNAL_ICON}
          </a>
        </div>

        <div className="footer-credits">
          Built for <strong>Base</strong> · Powered by wagmi + viem
        </div>
      </div>
    </footer>
  );
}