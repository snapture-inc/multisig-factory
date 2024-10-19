// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
require('dotenv').config();

module.exports = buildModule('Hook', (m) => {
  const usdc = 'process.env.USDC_ADDRESS';
  const nft = 'process.env.NFT_ADDRESS';
  const args = [nft, usdc];
  const Hook = m.contract('Hook', args, {});

  return { Hook };
});
