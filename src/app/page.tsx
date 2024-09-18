'use client';

import { useState } from 'react';

import { PasskeyArgType } from '@safe-global/protocol-kit';

import { createPasskey, storePasskeyInLocalStorage } from '@/app/_lib/passkey';
import LoginWithPasskey from '@/app/components/LoginWithPasskey';
import SafeAccountDetails from '@/app/components/SafeAccountDetails';

function Home() {
  const [selectedPasskey, setSelectedPasskey] = useState<PasskeyArgType>();

  async function handleCreatePasskey() {
    const passkey = await createPasskey();

    storePasskeyInLocalStorage(passkey);
    setSelectedPasskey(passkey);
  }

  return (
    <>
      {selectedPasskey ? (
        <SafeAccountDetails passkey={selectedPasskey} />
      ) : (
        <LoginWithPasskey handleCreatePasskey={handleCreatePasskey} />
      )}
    </>
  );
}

export default Home;
