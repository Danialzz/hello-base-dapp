# HelloBase 🔵 — Leave Your Mark on Base

A premium public on-chain message board on **Base Sepolia**. Anyone can read the board instantly — no wallet needed — and connect a wallet to write up to 280 characters. Your message lives on-chain and every write is recorded in the event history.

Built with a calm, high-end web3 aesthetic inspired by Base, Coinbase and Rainbow rather than a typical demo dApp.

**Live**
- 🔵 **App:** [danialzz.github.io/hello-base-dapp](https://danialzz.github.io/hello-base-dapp/)
- 🔎 **Contract on BaseScan:** [sepolia.basescan.org/address/0x91296937E87cE57fF3cDD787289576E505BdD3c9](https://sepolia.basescan.org/address/0x91296937E87cE57fF3cDD787289576E505BdD3c9)

## Features

- **Product-grade UI** — dark glassmorphism, Base-blue accents, gradient mesh, noise texture and ambient glows
- **View-only mode** — read the board and recent history without connecting a wallet
- **Real-time board state** — message, last writer and update count via `getBoardState()`
- **On-chain history** — latest events with timestamps, update IDs, copyable addresses and BaseScan links
- **Skeleton loaders** — polished loading states instead of plain spinners
- **Automatic network handling** — detects and switches to Base Sepolia when supported
- **Multi-wallet connect** — RainbowKit with MetaMask, Coinbase Wallet, Rabby, Brave, WalletConnect and browser wallets
- **Wallet controls** — copy address and disconnect from the connected account menu
- **Responsive layout** — desktop and mobile-friendly header, cards and controls
- **Favicon/branding** — shared HelloBase logo across the app, browser tab and install metadata
- **Accessibility basics** — focus states, ARIA labels and keyboard-friendly controls
- **Hardhat tests** — contract behavior covered by automated unit tests

## Project Structure

```text
hello-base-dapp/
├── contracts/HelloBase.sol
├── scripts/deploy.js
├── test/HelloBase.test.js
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── index.css
├── public/
├── docs/                     # generated GitHub Pages build
├── .github/workflows/        # CI + docs build workflow
├── hardhat.config.js
├── package.json
├── .env.example
└── README.md
```

## Development

Install dependencies:

```bash
npm install
```

Run the frontend locally:

```bash
npm run dev
```

Run type checking and contract tests:

```bash
npm run typecheck
npm test
```

Build the production site:

```bash
npm run build
```

The Vite build is written to `docs/`. GitHub Pages serves the `docs/` directory from the `main` branch.

### Automated validation and Pages build

Every push and pull request targeting `main` runs:

1. Dependency installation
2. TypeScript type checking
3. Hardhat contract tests
4. Vite production build

For pushes to `main`, the workflow also commits any changed `docs/` output back to the repository so GitHub Pages stays synchronized with `src/`.

## Environment

Copy `.env.example` to `.env` for local deployment configuration:

```text
PRIVATE_KEY=your_wallet_private_key_without_0x
BASESCAN_API_KEY=optional_for_verification
VITE_WALLETCONNECT_PROJECT_ID=your_project_id
```

Never commit `.env` or a private key. The Hardhat deployment configuration intentionally has **no fallback private key**; deployment accounts must be explicitly provided through `PRIVATE_KEY`.

The frontend can use `VITE_CONTRACT_ADDRESS` to override the deployed contract address at build time.

## Contract

The current Base Sepolia deployment is:

`0x91296937E87cE57fF3cDD787289576E505BdD3c9`

The contract supports:

| Function / Event | Description |
|---|---|
| `getMessage()` | Current message |
| `setMessage(string)` | Update message, 1–280 characters |
| `getBoardState()` | Message, last updater and update count |
| `lastUpdater()` | Address of last writer |
| `updateCount()` | Total number of updates |
| `MessageUpdated(...)` | Emitted for every write |

## Deployment

Base Sepolia:

```bash
npm run deploy:testnet
```

Base mainnet:

```bash
npm run deploy:mainnet
```

Before a production deployment, verify the contract address, chain, explorer URL and frontend environment values. Do not put a deployment private key in source control.

## Tech Stack

- Solidity 0.8.20
- Hardhat + hardhat-toolbox
- React 18 + Vite
- wagmi + viem + RainbowKit
- Base Sepolia (chain ID 84532)

Made for Base. Leave your mark 🔵
