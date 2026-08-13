import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { connectorsForWallets, darkTheme } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  coinbaseWallet,
  rabbyWallet,
  braveWallet,
  injectedWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { BASE_SEPOLIA_RPC } from "./chain";

// WalletConnect Cloud project ID — REQUIRED by RainbowKit.
// Vite env vars are baked in at build time and can't be injected into the
// static GitHub Pages build, so the ID below is used as a safe fallback. This
// guarantees the app never boots with an empty project ID (RainbowKit throws
// and React never mounts). Get / rotate your own at
// https://cloud.walletconnect.com
const PROJECT_ID =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "53ae1c1db35129fa00631b4b986848b2";

const wallets = [
  metaMaskWallet,
  coinbaseWallet,
  rabbyWallet,
  braveWallet,
  injectedWallet,
  walletConnectWallet,
];

const connectors = connectorsForWallets(
  [{ groupName: "Recommended", wallets }],
  { appName: "HelloBase", projectId: PROJECT_ID },
);

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors,
  transports: {
    [baseSepolia.id]: http(BASE_SEPOLIA_RPC),
  },
});

// RainbowKit theme matched to HelloBase's dark, Base-blue aesthetic.
export const rainbowTheme = darkTheme({
  accentColor: "#0052FF",
  accentColorForeground: "#FFFFFF",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
});

export const appInfo = {
  appName: "HelloBase",
  learnMoreUrl: "https://danialzz.github.io/hello-base-dapp/",
};