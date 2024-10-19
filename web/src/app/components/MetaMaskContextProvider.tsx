'use client';

import { MetaMaskProvider } from '@metamask/sdk-react';

const MetaMaskContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: 'Multisig Factory',
          url: typeof window !== 'undefined' ? window.location.host : 'defaultHost',
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};

export default MetaMaskContextProvider;
