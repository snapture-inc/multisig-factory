'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { Nft__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { formatAddress } from '@/app/_lib/utils';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

type Token = {
  tokenUri: string;
  tokenId: number;
};

const Nft = ({ jobId }: { jobId: string }) => {
  const [token, setToken] = useState<Token>();
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

      const totalSupplyFunc = nftContract.getFunction('totalSupply');
      const tokenUriFunc = nftContract.getFunction('tokenURI');
      const getTokenIdByProjectAndJobFunc = nftContract.getFunction('getTokenIdByProjectAndJob');

      try {
        const totalSupply = await totalSupplyFunc();
        if (totalSupply === BigInt(0)) return undefined;

        const tokenId = await getTokenIdByProjectAndJobFunc(BigInt(projectId as string), BigInt(jobId));
        if (!tokenId) return undefined;

        const tokenUri = await tokenUriFunc(tokenId);
        return { tokenUri, tokenId };
      } catch {
        return undefined;
      }
    };

    const interval = setInterval(() => {
      fetchNfts().then((res) => {
        if (!res) setToken(undefined);
        setToken(res);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [address, chainId, signer]);

  if (token)
    return (
      <Link
        target="_blank"
        href={`https://sepolia.etherscan.io/nft/0x5230B61438C3f1b309E2b924dBf6FAFa33bbB73e/${Number(token.tokenId)}`}
      >
        {formatAddress(token.tokenUri.replace('https://gateway.pinata.cloud/ipfs/', '').toString())}
      </Link>
    );

  return <>-</>;
};

export default Nft;
