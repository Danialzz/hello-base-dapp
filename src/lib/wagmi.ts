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

const PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "";

const wallets = [
  metaMaskWallet,
  coinbaseWallet,
  rabbyWallet,
  braveWallet,
  injectedWallet,
  // WalletConnect needs a project ID (https://cloud.walletconnect.com).
  // Omit the connector when none is configured so the app still works.
  ...(PROJECT_ID ? [walletConnectWallet] : []),
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