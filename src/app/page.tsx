'use client';

import { useState } from 'react';

import type { Theme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { PasskeyArgType } from '@safe-global/protocol-kit';

import { createPasskey, storePasskeyInLocalStorage } from '@/app/_lib/passkey';
import CustomThemeProvider from '@/app/components/CustomThemeProvider';
import LoginWithPasskey from '@/app/components/LoginWithPAsskey';
import SafeAccountDetails from '@/app/components/SafeAccountDetails';

function Create4337SafeAccount() {
  const [selectedPasskey, setSelectedPasskey] = useState<PasskeyArgType>();

  async function handleCreatePasskey() {
    const passkey = await createPasskey();

    storePasskeyInLocalStorage(passkey);
    setSelectedPasskey(passkey);
  }

  async function handleSelectPasskey(passkey: PasskeyArgType) {
    setSelectedPasskey(passkey);
  }

  return (
    <CustomThemeProvider>
      {(theme: Theme) => (
        <ThemeProvider theme={theme}>
          {selectedPasskey ? (
            <SafeAccountDetails passkey={selectedPasskey} />
          ) : (
            <LoginWithPasskey handleCreatePasskey={handleCreatePasskey} handleSelectPasskey={handleSelectPasskey} />
          )}
        </ThemeProvider>
      )}
    </CustomThemeProvider>
  );
}

export default Create4337SafeAccount;
