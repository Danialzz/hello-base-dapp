import { ConnectButton } from "@rainbow-me/rainbowkit";
import NetworkPill from "./NetworkPill";

const WALLET_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
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
                    <span className="dot is-on" aria-hidden="true"></span>
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
                    <span>Connect Wallet</span>
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