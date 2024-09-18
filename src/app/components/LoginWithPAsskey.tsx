import { useState } from 'react';

import { useSDK } from '@metamask/sdk-react';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { PasskeyArgType } from '@safe-global/protocol-kit';

type props = {
  handleCreatePasskey: () => void;
};

function LoginWithPasskey({ handleCreatePasskey }: props) {
  const [passkeys, setPasskeys] = useState<PasskeyArgType[]>([]);
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  async function handleConnect() {
    try {
      const accounts = await sdk?.connect();
      setPasskeys(accounts?.[0]);
    } catch (err) {
      console.warn('Failed to connect..', err);
    }
  }

  return (
    <Paper sx={{ margin: '32px auto 0' }}>
      <Stack padding={4}>
        <Typography textAlign={'center'} variant="h1" color={'primary'}>
          Snapture
        </Typography>

        <Typography textAlign={'center'} marginBottom={8} marginTop={8} variant="h4">
          <span>Smart Contract Factory.</span>
          <br />
          <span>Create your smart contract with ease.</span>
        </Typography>

        <Button onClick={handleCreatePasskey} startIcon={<FingerprintIcon />} variant="outlined">
          Create a new account
        </Button>

        <Divider sx={{ margin: '20px' }}>
          <Typography variant="caption" color="GrayText">
            OR
          </Typography>
        </Divider>

        <Button startIcon={<FingerprintIcon />} variant="contained" onClick={handleConnect}>
          Connect an existing account
        </Button>
      </Stack>
    </Paper>
  );
}

export default LoginWithPasskey;
