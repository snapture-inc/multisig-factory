# Multisig-Factory

## Project Description

- This project is built on top of Sign Protocol

  - the attestation schema

    - project_id
    - job_id
    - timestamp
    - amount
    - action
    - ipfd_hash

  - hook feature
    - to trigger NFT minting and fund distribution

## Getting Started

### Run Locally

- Get necessary API keys and configure `.env` at local.
- Go to [web](./web/) folder and run NextJS locally.

```bash
cd ./web
npm run dev
```

## Reference

Deployed smart contracts:

- Sepolia
  - Nft: https://sepolia.etherscan.io/address/0x5230B61438C3f1b309E2b924dBf6FAFa33bbB73e#code
  - Hook: https://sepolia.etherscan.io/address/0xCE85cFf74ED85B2B459bb416884774DFFC6D02fF#code
