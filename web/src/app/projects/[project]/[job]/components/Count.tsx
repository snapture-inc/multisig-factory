'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { Hook__factory, NFT__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { formatAddress, formatCurrency } from '@/app/_lib/utils';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

const Count = ({ jobId }: { jobId: string }) => {
  const [count, setCount] = useState(0);
  const { project: projectId, job: jobName } = useParams();
  const { address, chainId } = useAccount();
  const signer = useEthersSigner();
  useEffect(() => {
    const fetchNfts = async () => {
      if (!chainId) return;
      const hookContractFactory = new Hook__factory(signer);
      const hookContract = hookContractFactory.attach(
        config[chainId?.toString() as keyof typeof config].hookContractAddress
      );

      const attestationCountFunc = hookContract.getFunction('attestationCount');
      const attestationCount = Number(await attestationCountFunc(BigInt(projectId as string), BigInt(jobId)));
      return attestationCount;
    };

    const interval = setInterval(() => {
      fetchNfts().then((res) => {
        if (res) setCount(res);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [address, chainId, signer]);

  return <span>{`${count}/2`}</span>;
};

export default Count;
