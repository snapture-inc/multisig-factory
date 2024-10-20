export const config = {
  '11155111': {
    name: 'Sepolia',
    hookContractAddress: process.env.NEXT_PUBLIC_HOOK_CONTRACT_ADDRESS ?? '',
    usdcContractAddress: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS ?? '',
    nftContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? '',
  },
};
