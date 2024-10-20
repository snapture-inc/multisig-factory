'use client';

import { ethers } from 'ethers';
import { FormEvent, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Hook__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { usdcABI } from '@/app/_lib/usdcAbi';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

const StyledTextField = styled(TextField)({
  input: { color: 'white' },
});

interface ProjectFormProps {
  onClose: () => void;
}

const ProjectForm = ({ onClose }: ProjectFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [threshold, setThreshold] = useState(1);
  const [reviewers, setReviewers] = useState(['']);
  const [loading, setLoading] = useState(false);

  const signer = useEthersSigner();
  const { address, chainId } = useAccount();

  const hookContractAddress = config[chainId?.toString() as keyof typeof config].hookContractAddress;
  const usdcContractAddress = config[chainId?.toString() as keyof typeof config].usdcContractAddress;

  const hookContractFactory = new Hook__factory(signer);
  const hookContract = hookContractFactory.attach(hookContractAddress);
  const createProjectFunc = hookContract.getFunction('createProject');

  const usdcContract = new ethers.Contract(usdcContractAddress, usdcABI, signer);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (name && reviewers.length > 0) {
        const usdcResponse = await usdcContract.approve(hookContractAddress, amount);
        await usdcResponse.wait();
        const projectRes = await createProjectFunc(name, amount);
        await projectRes.wait();
        setAmount(0);
        setReviewers(['']);
        onClose();
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
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
          label="Amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
          value={amount}
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
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </Container>
    </form>
  );
};

export default ProjectForm;
