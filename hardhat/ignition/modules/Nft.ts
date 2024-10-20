import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('Nft', (m) => {
  const args: any[] = [];
  const Nft = m.contract('Nft', args, {});

  return { Nft };
});
