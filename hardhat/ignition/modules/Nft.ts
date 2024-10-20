import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('NFT', (m) => {
  const args: any[] = [];
  const NFT = m.contract('NFT', args, {});

  return { NFT };
});
