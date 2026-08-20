import { ConnectButton } from "@rainbow-me/rainbowkit";
import NetworkPill from "./NetworkPill";

const WALLET_ICON = (
  <span className="wallet-icon" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15v4" />
      <path d="M5 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
      <path d="M17 13h.01" />
    </svg>
  </span>
);

const CARET = (
  <svg
    className="btn-caret"
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <img className="brand-mark" src="assets/logo.svg" alt="HelloBase logo" width="38" height="38" />
        <span className="brand-name">HelloBase</span>
        <span className="brand-badge">Base Sepolia</span>
      </div>
      <div className="topbar-right">
        <NetworkPill />
        <ConnectButton.Custom>
          {({ account, chain, mounted, openAccountModal, openConnectModal }) => {
            const ready = mounted;
            const connected = ready && !!account && !!chain;
            return (
              <div className="connect-wrap">
                {connected ? (
                  <button
                    className="btn-addr connect-btn"
                    type="button"
                    onClick={openAccountModal}
                    title="Account"
                  >
                    <span className="account-status">
                      <span className="dot is-on" aria-hidden="true"></span>
                    </span>
                    <span>{account?.displayName}</span>
                    {CARET}
                    <span className="sr-only">Account</span>
                  </button>
                ) : (
                  <button
                    className="btn-primary connect-btn"
                    type="button"
                    onClick={openConnectModal}
                    disabled={!ready}
                  >
                    {WALLET_ICON}
                    <span className="connect-label">Connect wallet</span>
                    <span className="connect-arrow" aria-hidden="true">↗</span>
                  </button>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}