import { useRouter } from 'next/navigation';

import { useSDK } from '@metamask/sdk-react';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';

type props = {
  handleCreatePasskey: () => void;
};

const Login = ({ handleCreatePasskey }: props) => {
  const { sdk, connected } = useSDK();
  const router = useRouter();

  async function handleConnect() {
    try {
      const accounts = await sdk?.connect();
      if (connected && accounts) router.push('/projects');
    } catch (err) {
      console.warn('Failed to connect.', err);
    }
  }

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginLeft: '40px',
        marginRight: '40px',
      }}
    >
      <Paper sx={{ margin: '32px auto 0', color: 'white' }}>
        <Stack padding={4}>
          <Typography textAlign={'center'} variant="h1" color={'primary'}>
            Snapture
          </Typography>

          <Typography textAlign={'center'} marginBottom={8} marginTop={8} variant="h4">
            <span>Smart Contract Factory.</span>
            <br />
            <span>Create your smart contract with ease.</span>
          </Typography>

          <Button disabled onClick={handleCreatePasskey} startIcon={<FingerprintIcon />} variant="outlined">
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
    </Box>
  );
};

export default Login;
