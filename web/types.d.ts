import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface window {
    ethereum?: ExternalProvider;
  }
}
