'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { Nft__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { formatAddress } from '@/app/_lib/utils';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

const Nft = ({ jobId }: { jobId: string }) => {
  const [token, setToken] = useState('');
  const { project: projectId, job: jobName } = useParams();
  const { address, chainId } = useAccount();
  const signer = useEthersSigner();
  useEffect(() => {
    const fetchNfts = async () => {
      if (!chainId) return;
      const nftContractFactory = new Nft__factory(signer);
      const nftContract = nftContractFactory.attach(
        config[chainId?.toString() as keyof typeof config].nftContractAddress
      );

      const tokenUriFunc = nftContract.getFunction('tokenURI');

      try {
        const tokenResponse = await tokenUriFunc(projectId + jobId);
        return tokenResponse;
      } catch {
        return null;
      }
    };

    const interval = setInterval(() => {
      fetchNfts().then((res) => setToken(res));
    }, 5000);

    return () => clearInterval(interval);
  }, [address, chainId, signer]);

  if (token)
    return (
      <Link
        target="_blank"
        href={`https://gnosis-chiado.blockscout.com/token/0xA7175491676FA1c205fbc2215E4eEABeE2927f2b/instance/${projectId + jobId}`}
      >
        {formatAddress(token.replace('https://gateway.pinata.cloud/ipfs/', '').toString())}
      </Link>
    );

  return <></>;
};

export default Nft;
