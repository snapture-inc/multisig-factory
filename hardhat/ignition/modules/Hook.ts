import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import dotenv from 'dotenv';
dotenv.config();

export default buildModule('Hook', (m) => {
  const usdc = process.env.USDC_ADDRESS ?? '';
  const nft = process.env.NFT_ADDRESS ?? '';
  const args = [nft, usdc];
  const Hook = m.contract('Hook', args, { id: 'id_1' });

  return { Hook };
});
