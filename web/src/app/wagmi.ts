import { arbitrum, base, gnosisChiado, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const config = getDefaultConfig({
  appName: 'Snapture',
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID || '',
  chains: [
    gnosisChiado,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});
