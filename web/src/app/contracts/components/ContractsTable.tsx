'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { formatCurrency } from '@/app/_lib/utils';

function createData(name: string, proposals: number, approved: number, amount: number) {
  return { name, proposals, approved, amount };
}

const rows = [createData('Improvement to Building A', 20, 6, 24000)];

const StyledTableCell = styled(TableCell)({
  color: 'white',
});

export default function ContractsTable() {
  const pathname = usePathname();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="contracts table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Contract</StyledTableCell>
            <StyledTableCell align="right">Proposals</StyledTableCell>
            <StyledTableCell align="right">Approved</StyledTableCell>
            <StyledTableCell align="right">Total Amount (SGD)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ background: 'white' }}>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link href={`${pathname}/${encodeURIComponent(row.name)}`}>{row.name}</Link>
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
}
