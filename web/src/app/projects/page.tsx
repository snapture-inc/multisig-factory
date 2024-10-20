'use client';

import { useState } from 'react';

import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';

import ProjectForm from './components/ProjectForm';
import ProjectsTable from './components/ProjectsTable';

const Projects = () => {
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
            margin: '10px auto',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="contained" onClick={handleModalOpen}>
            Create project
          </Button>
        </Container>
        <Container style={{}}>
          <ProjectsTable />
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
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <ProjectForm onClose={handleModalClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Projects;
