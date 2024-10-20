'use client';

import { useParams } from 'next/navigation';
import { PinataSDK } from 'pinata-web3';
import { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAccount } from 'wagmi';

import { Button, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Hook__factory } from '@/../typechain';
import { config } from '@/app/_lib/networkConfig';
import { useEthersSigner } from '@/app/_lib/wagmi-signer';

const StyledTextField = styled(TextField)({
  input: { color: 'white' },
});

interface Job {
  id: string;
  name: string;
  amount: number;
  image_hash: string;
}

interface JobFormProps {
  onClose: () => void;
}

const JobForm = ({ onClose }: JobFormProps) => {
  const { project: projectId, job } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [file, uploadFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const signer = useEthersSigner();
  const { address, chainId } = useAccount();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const pinata = new PinataSDK({
        pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
        pinataGateway: 'crimson-added-hedgehog-755.mypinata.cloud',
      });
      const upload = await pinata.upload.file(file!);
      const jobId = uuidv4();

      const resJson = {
        name: name,
        description: description,
        image: upload.IpfsHash,
        jobId: jobId,
      };
      const newJob: Job = {
        id: jobId,
        name: name,
        amount: amount,
        image_hash: upload.IpfsHash,
      };

      const hookContractFactory = new Hook__factory(signer);
      const hookContract = hookContractFactory.attach(
        config[chainId?.toString() as keyof typeof config].hookContractAddress
      );
      const createJobFunc = hookContract.getFunction('createJob');

      const jobResponse = await createJobFunc(
        BigInt(projectId as string),
        name,
        description,
        amount,
        `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`
      );
      await jobResponse.wait();
      onClose();
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoading(false);
    }
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
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
          value={description}
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Completion Date"
            sx={{
              input: { color: 'white' },
              color: 'white',
              mb: 2,
              width: '100%',
            }}
            value={null}
          />
        </LocalizationProvider>

        <TextField
          type="file"
          id="outlined-basic"
          sx={{
            mb: 2,
            input: { color: 'white' },
            color: 'white',
            width: '100%',
          }}
          placeholder="Upload file"
          name="file"
          fullWidth
          onChange={(e: any) => uploadFile(e.target.files[0])}
        />

        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </Container>
    </form>
  );
};

export default JobForm;
