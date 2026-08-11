# HelloBase 🔵 — Leave Your Mark on Base

A premium public on-chain message board on **Base Sepolia**. Connect your wallet, write up to 280 characters, and your message lives on the chain forever. Anyone can read the board, every write is recorded in the event history.

Built with a calm, high-end web3 aesthetic — think Base, Coinbase, Rainbow — rather than a typical demo dApp.

**Live**
- 🔵 **App:** [danialzz.github.io/hello-base-dapp](https://danialzz.github.io/hello-base-dapp/)
- 🔎 **Contract on BaseScan:** [sepolia.basescan.org/address/0x91296937E87cE57fF3cDD787289576E505BdD3c9](https://sepolia.basescan.org/address/0x91296937E87cE57fF3cDD787289576E505BdD3c9)

---

## Features

- **Polished, product-grade UI** — refined dark glassmorphism with a Base-blue accent, gradient mesh + noise texture, ambient glows and a subtle dot grid
- **Design system** — Space Grotesk display type, Inter body, JetBrains Mono for on-chain data; generous spacing, layered shadows and micro-interactions throughout
- **Hero message display** — the current message is the focal point of the page, styled as a large quote panel with live board stats
- **Real-time board state** — message + last writer + total updates via one `getBoardState()` call
- **On-chain history feed** — latest 12 events with relative timestamps, update IDs, copyable address badges and a per-transaction BaseScan link
- **Skeleton loaders** — structured shimmer placeholders for the board and history instead of plain spinners
- **Auto network handling** — detects the wrong network and switches / adds Base Sepolia automatically; declines are handled gracefully
- **Clear transaction states** — step-by-step status line ("approve in wallet" → "confirming on Base") plus a pulsing button glow while a write is pending
- **Refined confetti** — a calm, eased burst on successful writes, plus a subtle glow flash on the hero message (respects `prefers-reduced-motion`)
- **Copy-to-clipboard** on every truncated address with clear "Copied" feedback
- **Live network status pill** in the header
- **Branding & social** — custom SVG logo, favicon set (`.ico` + SVG + apple-touch-icon + webmanifest), Open Graph and Twitter Card tags
- **Accessibility basics** — visible focus states, `aria` labels, semantic landmarks, keyboard-friendly
- **Fully tested Hardhat project** + Basescan verification ready

---

## Project Structure

```
hello-base-dapp/
├── contracts/HelloBase.sol   # Solidity contract
├── scripts/deploy.js         # Deploy script
├── scripts/sync-docs.js      # Syncs frontend/ → docs/ for GitHub Pages
├── test/HelloBase.test.js    # Unit tests
├── frontend/                 # dApp source (single-file, no build step)
│   ├── index.html            # The entire dApp — HTML, CSS & JS
│   └── assets/               # Logo, favicons, webmanifest, OG image
├── docs/                     # GitHub Pages build of the frontend
│   └── index.html + assets/  # (mirror of frontend/)
├── hardhat.config.js
├── package.json
├── .env.example
└── README.md
```

> **`frontend/` and `docs/` are identical by design.** `docs/` is what GitHub
> Pages serves, so the two folders are kept as exact mirrors of each other.

---

## Syncing the GitHub Pages build

After editing anything under `frontend/` (`index.html` or `assets/`), mirror it
into `docs/` with a single command:

```bash
npm run sync:docs
```

This wipes and re-copies the whole `frontend/` folder into `docs/`, so they never
drift. Both folders are intentionally identical — there are no documented
differences between them.

---

## Quick Start

### 1. Install

```bash
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:

```
PRIVATE_KEY=your_wallet_private_key_without_0x
BASESCAN_API_KEY=optional_for_verification
```

> Never commit `.env`. The private key must have Base Sepolia ETH.

### 3. Compile & Test

```bash
npx hardhat compile
npx hardhat test
```

### 4. Get free testnet ETH

- [Coinbase Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
- [QuickNode Faucet](https://faucet.quicknode.com/base/sepolia)
- [Alchemy Faucet](https://www.alchemy.com/faucets/base-sepolia)

### 5. Deploy to Base Sepolia

```bash
npm run deploy:testnet
```

Copy the printed contract address.

### 6. Wire the frontend

Open `frontend/index.html` and replace:

```js
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
```

with your deployed address.

### 7. Use it

Open `frontend/index.html` in a browser (or serve it with any static server).

1. Click **Connect Wallet**
2. Approve MetaMask → it will switch / add Base Sepolia automatically
3. Read the board, write a message, watch the history update
4. Click any address to copy it

---

## Contract API

| Function / Event | Description |
|---|---|
| `getMessage()` | Current message string |
| `setMessage(string)` | Update message (1–280 chars) |
| `getBoardState()` | Returns `(message, lastUpdater, updateCount)` |
| `lastUpdater()` | Address of last writer |
| `updateCount()` | Total number of updates |
| `MessageUpdated(sender, newMessage, updateId, timestamp)` | Emitted on every write |

---

## Deploy to Base Mainnet

When ready:

```bash
npm run deploy:mainnet
```

Then update the frontend:
- `CONTRACT_ADDRESS`
- Chain ID → `"0x2105"` (8453)
- Explorer links → `basescan.org`
- Network pill / badge text → Mainnet

---

## Tech

- Solidity 0.8.20
- Hardhat + hardhat-toolbox
- ethers.js v6 (CDN, no frontend build)
- Base Sepolia (chainId 84532)
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

---

Made for Base. Leave your mark 🔵
