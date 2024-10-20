'use client';

import ethers from 'ethers';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { useAccount } from 'wagmi';

import { EvmChains, OnChainClientOptions, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Hook__factory, Nft__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { formatAddress, formatCurrency } from '@/app/_lib/utils';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

import Count from './Count';
import Nft from './Nft';

const StyledTableCell = styled(TableCell)({
  color: 'white',
});

interface Job {
  jobId: number;
  name: string;
  description: number;
  amount: number;
  metadata: string;
}

const JobsTable = () => {
  const { project: projectId, job: jobName } = useParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const { address, chainId } = useAccount();
  const signer = useEthersSigner();
  const [signClient, setSignClient] = useState<SignProtocolClient>();

  useEffect(() => {
    const newClient = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.sepolia,
      account: signer,
    } as OnChainClientOptions);

    setSignClient(newClient);
  }, [address, chainId, signer]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!chainId) return;
      const jobs = [];

      try {
        const hookContractFactory = new Hook__factory(signer);
        const hookContract = hookContractFactory.attach(
          config[chainId?.toString() as keyof typeof config].hookContractAddress
        );

        const nextJobIdFunc = hookContract.getFunction('nextJobId');
        const getJobFunc = hookContract.getFunction('getJob');
        const nextId = Number(await nextJobIdFunc(BigInt(projectId as string)));

        for (let i = 0; i < nextId; i++) {
          const [jobId, name, description, amount, metadata] = await getJobFunc(BigInt(projectId as string), BigInt(i));
          jobs.push({
            jobId,
            name,
            amount,
            metadata,
          } as Job);
        }
      } catch (error) {
        console.log('Error fetching jobs:', error);
      }

      return jobs;
    };

    const interval = setInterval(() => {
      fetchJobs().then((res) => {
        if (res) setJobs(res);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [address, chainId, signer]);

  const handleApprove = async (job: Job) => {
    if (!signClient) return;

    const attestationData = {
      project_id: BigInt(projectId as string),
      job_id: BigInt(job.jobId),
      timestamp: BigInt(Math.floor(Date.now() / 1000)),
      amount: BigInt(job.amount),
      action: true,
      ipfs_hash: job.metadata.toString(),
    };

    try {
      const schemaId = process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID;
      const attestation = await signClient.createAttestation({
        schemaId: schemaId!,
        data: attestationData,
        indexingValue: signer!.address,
      });

      console.log('Attestation created:', attestation);
    } catch (error) {
      console.error('Error creating attestation:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="contracts table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="15%">Job</StyledTableCell>
            <StyledTableCell width="15%" align="right">
              Image Hash
            </StyledTableCell>
            <StyledTableCell width="15%" align="right">
              NFT
            </StyledTableCell>
            <StyledTableCell width="15%" align="right">
              Approval
            </StyledTableCell>
            <StyledTableCell width="15%" align="right">
              Amount (USDC)
            </StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ background: 'white' }}>
          {jobs &&
            jobs.length > 0 &&
            jobs.map((job) => {
              const jodIdString = job.jobId.toString() as string;

              return (
                <TableRow key={job.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {job.name}
                  </TableCell>

                  <TableCell align="right">
                    <Link target="_blank" href={`${job.metadata}`}>
                      {formatAddress(job.metadata.replace('https://gateway.pinata.cloud/ipfs/', '').toString())}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Nft jobId={jodIdString}></Nft>
                  </TableCell>
                  <TableCell align="right">
                    <Count jobId={jodIdString}></Count>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(job.amount)}</TableCell>
                  <TableCell align="right" sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      onClick={async () => await handleApprove(job)}
                    >
                      Attest
                    </Button>
                    <Button size="small" variant="outlined" color="inherit">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobsTable;
