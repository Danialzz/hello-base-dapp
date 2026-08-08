# HelloBase 🔵 — On-Chain Message Board

A polished public message board dApp on **Base Sepolia**. Anyone can read the current message and leave their own (max 280 chars). Messages live forever on L2.

**Live**
- 🔵 **App:** [danialzz.github.io/hello-base-dapp](https://danialzz.github.io/hello-base-dapp/)
- 🔎 **Contract on BaseScan:** [sepolia.basescan.org/address/0x91296937E87cE57fF3cDD787289576E505BdD3c9](https://sepolia.basescan.org/address/0x91296937E87cE57fF3cDD787289576E505BdD3c9)

**Features**
- Beautiful glassmorphism UI with animated Base-blue gradients
- Real-time board state (message + last updater + total updates)
- On-chain event history feed
- Auto network switch / add Base Sepolia
- Confetti celebration on successful write
- One-call `getBoardState()` for efficient reads
- Fully tested Hardhat project + Basescan verification ready

---

## Project Structure

```
hello-base-dapp/
├── contracts/HelloBase.sol   # Solidity contract
├── scripts/deploy.js         # Deploy script
├── test/HelloBase.test.js    # Unit tests
├── frontend/index.html       # Single-file dApp (no build step)
├── hardhat.config.js
├── package.json
├── .env.example
└── README.md
```

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
2. Approve MetaMask → it will switch/add Base Sepolia automatically
3. Read the board, write a message, watch the history update

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
- Badge text → Mainnet

---

## Tech

- Solidity 0.8.20
- Hardhat + hardhat-toolbox
- ethers.js v6 (CDN, no frontend build)
- Base Sepolia (chainId 84532)

---

Made for Base. Leave your mark 🔵
