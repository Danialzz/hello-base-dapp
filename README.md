# HelloBase dApp 🔵

A simple Hello World dApp deployed on the **Base network**. Store and retrieve a message on-chain via a clean frontend connected to MetaMask.

## Project Structure

```
hello-base-dapp/
├── contracts/
│   └── HelloBase.sol       # Solidity smart contract
├── scripts/
│   └── deploy.js           # Hardhat deploy script
├── test/
│   └── HelloBase.test.js   # Contract unit tests
├── frontend/
│   └── index.html          # Browser dApp (no build step needed)
├── hardhat.config.js       # Hardhat + Base network config
├── package.json
├── .env.example
└── .gitignore
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:
- `PRIVATE_KEY` — your wallet's private key (never commit this!)
- `BASESCAN_API_KEY` — from [basescan.org](https://basescan.org/myapikey) (for contract verification)

### 3. Compile the contract

```bash
npx hardhat compile
```

### 4. Run tests

```bash
npx hardhat test
```

### 5. Deploy to Base Sepolia Testnet

> First, get free testnet ETH from the [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

```bash
npm run deploy:testnet
```

Copy the deployed contract address from the output.

### 6. Update the frontend

Open `frontend/index.html` and replace:

```js
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
```

with your deployed address.

### 7. Open the frontend

Simply open `frontend/index.html` in your browser — no server required.

---

## Deploying to Base Mainnet

When you're ready for production:

```bash
npm run deploy:mainnet
```

Update `frontend/index.html`:
- Change `CONTRACT_ADDRESS` to your mainnet address
- Change the network badge text to `Base Mainnet`
- Change `BASE_SEPOLIA_CHAIN_ID` to `"0x2105"` (8453 in hex)
- Update Basescan links from `sepolia.basescan.org` to `basescan.org`

---

## Contract

**HelloBase.sol** — stores a single string message on-chain. Anyone can read it; anyone can update it.

| Function | Description |
|---|---|
| `getMessage()` | Returns the current stored message |
| `setMessage(string)` | Updates the message (max 280 chars) |

**Event:** `MessageUpdated(address sender, string newMessage)` — emitted on every update.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Smart Contract | Solidity 0.8.20 |
| Development | Hardhat |
| Network | Base (L2 on Ethereum) |
| Frontend | Vanilla HTML/JS + ethers.js v6 |
| Wallet | MetaMask |
