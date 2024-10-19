'use client';

import { useState } from 'react';

import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';

import ContractForm from './components/ContractForm';
import ContractsTable from './components/ContractsTable';

const Contracts = () => {
  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };
  return (
    <>
      <Box>
        <Container style={{ margin: '20px' }}>
          <Button variant="contained" onClick={handleModalOpen}>
            Create contract
          </Button>
        </Container>
        <Container style={{ margin: '20px' }}>
          <ContractsTable />
        </Container>
      </Box>
      <Dialog
        open={modal}
        onClose={handleModalClose}
        PaperProps={{
          style: {
            backgroundColor: 'black',
            color: 'white',
            minWidth: '1000px',
          },
        }}
      >
        <DialogTitle>New Contract</DialogTitle>
        <DialogContent>
          <ContractForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Contracts;
