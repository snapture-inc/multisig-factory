import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import MetaMaskContextProvider from '@/app/components/MetaMaskContextProvider';

import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multisig Factory',
  description: 'Multisig Factory',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MetaMaskContextProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <nav
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                }}
              ></nav>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginLeft: '40px',
                  marginRight: '40px',
                }}
              >
                {children}
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </MetaMaskContextProvider>
      </body>
    </html>
  );
}
