'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { Hook__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { formatCurrency } from '@/app/_lib/utils';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

interface Project {
  projectId: number;
  name: string;
  amount: number;
  proposals: number;
  approved: number;
}

const StyledTableCell = styled(TableCell)({
  color: 'white',
});

const ProjectsTable = () => {
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[]>([]);

  const { address, chainId } = useAccount();
  const signer = useEthersSigner();

  useEffect(() => {
    const fetchProjects = async () => {
      if (!chainId) return;
      const hookContractFactory = new Hook__factory(signer);
      const hookContract = hookContractFactory.attach(
        config[chainId?.toString() as keyof typeof config].hookContractAddress
      );
      const nextProjectIdFunc = hookContract.getFunction('nextProjectId');
      const getProjectFunc = hookContract.getFunction('getProject');
      const attestationCountFunc = hookContract.getFunction('attestationCount');
      const nextProjectId = Number(await nextProjectIdFunc.call(signer));
      const projects = [];

      for (let i = 0; i < nextProjectId; i++) {
        const jobId = i;
        const [projectId, name, description, amount, jobs] = await getProjectFunc(jobId);

        //loop through jobs
        let approved = 0;
        for (let j = 0; j < jobs.length; j++) {
          const jobId = j;
          const attestationCount = Number(await attestationCountFunc(BigInt(projectId as string), BigInt(jobId)));

          if (attestationCount == 2) approved++;
        }

        //get
        projects.push({
          projectId,
          name: description,
          proposals: jobs.length,
          approved,
          amount,
        } as Project);
      }

      return projects;
    };

    const interval = setInterval(() => {
      fetchProjects().then((res) => {
        if (res) setProjects(res);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [address, chainId, signer]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="contracts table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Contract</StyledTableCell>
            <StyledTableCell align="right">Proposals</StyledTableCell>
            <StyledTableCell align="right">Approved</StyledTableCell>
            <StyledTableCell align="right">Budget (USDC)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ background: 'white' }}>
          {projects &&
            projects.length > 0 &&
            projects.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Link href={`${pathname}/${row.projectId}/${encodeURIComponent(row.name)}`}>{row.name}</Link>
                </TableCell>
                <TableCell align="right">{row.proposals}</TableCell>
                <TableCell align="right">{row.approved}</TableCell>
                <TableCell align="right">{formatCurrency(row.amount)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;
