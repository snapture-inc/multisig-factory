'use client';

import { useState } from 'react';

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';

import JobForm from './components/JobForm';
import JobsTable from './components/JobsTable';

const Jobs = () => {
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
        <Container
          style={{
            margin: '25px auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="contained" onClick={handleModalOpen}>
            Create job
          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" startIcon={<LocalAtmIcon />}>
              Deposit
            </Button>
          </div>
        </Container>
        <Container>
          <JobsTable />
        </Container>
      </Box>
      <Dialog
        open={modal}
        onClose={handleModalClose}
        PaperProps={{
          style: {
            backgroundColor: 'black',
            color: 'white',
            minWidth: '800px',
          },
        }}
      >
        <DialogTitle>New Job</DialogTitle>
        <DialogContent>
          <JobForm onClose={handleModalClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Jobs;
