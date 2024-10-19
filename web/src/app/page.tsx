'use client';

import { useState } from 'react';

import { PasskeyArgType } from '@safe-global/protocol-kit';

import { createPasskey, storePasskeyInLocalStorage } from '@/app/_lib/passkey';
import Login from '@/app/components/Login';
import SafeAccountDetails from '@/app/components/SafeAccountDetails';

const Home = () => {
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
        <Login handleCreatePasskey={handleCreatePasskey} />
      )}
    </>
  );
};

export default Home;
