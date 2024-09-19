'use client';

import { FormEvent, useEffect, useState } from 'react';

import { Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  input: { color: 'white' },
});

const ContractForm = () => {
  const [name, setName] = useState('');
  const [threshold, setThreshold] = useState(1);
  const [reviewers, setReviewers] = useState(['']);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && reviewers) {
      console.log(name, reviewers);
    }
  };

  useEffect(() => {
    const newReviewers = Array.from({ length: threshold }, (_, i) => reviewers[i] || '');
    setReviewers(newReviewers);
  }, [threshold]);

  const handleReviewerChange = (index: number, value: string) => {
    const newReviewers = [...reviewers];
    newReviewers[index] = value;
    setReviewers(newReviewers);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Container style={{ marginTop: '10px' }}>
        <StyledTextField
          label="Name"
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
          value={name}
        />
        <StyledTextField
          label="Threshold"
          onChange={(e) => setThreshold(Number(e.target.value))}
          required
          variant="outlined"
          value={threshold}
          fullWidth
          sx={{ mb: 2 }}
        />

        {reviewers.map((reviewer, index) => (
          <StyledTextField
            key={index}
            label={`Reviewer ${index + 1}`}
            onChange={(e) => handleReviewerChange(index, e.target.value)}
            required
            variant="outlined"
            value={reviewer}
            fullWidth
            sx={{ mb: 2 }}
          />
        ))}
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Container>
    </form>
  );
};

export default ContractForm;
