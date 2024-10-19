'use client';

import { useState } from 'react';

import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';

import TransactionForm from './components/TransactionForm';
import TransactionsTable from './components/TransactionsTable';

const Transactions = () => {
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
            Create transaction
          </Button>
        </Container>
        <Container style={{ margin: '20px' }}>
          <TransactionsTable />
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
        <DialogTitle>New Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Transactions;
