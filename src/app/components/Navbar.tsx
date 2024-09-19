'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSDK } from '@metamask/sdk-react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { formatAddress } from '@/app/_lib/utils';

export default function Navbar() {
  const router = useRouter();
  const [account, setAccount] = useState<string>();
  const { sdk } = useSDK();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accounts = await sdk?.connect();
        setAccount(accounts?.[0]);
      } catch (err) {
        console.warn('failed to connect..', err);
      }
    };
    fetchAccount();
  }, [sdk]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ color: 'white' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.push('/')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contracts
          </Typography>
          <Button color="inherit">{formatAddress(account)}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
