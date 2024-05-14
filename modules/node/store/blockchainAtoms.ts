import { atom } from 'recoil';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

const blockchains = atom<Blockchain[]>({
  key: 'blockchains.list',
  default: [],
});

const blockchainsLoadingState = atom<LoadingState>({
  key: 'blockchains.loadingState',
  default: 'initializing',
});

const blockchainSearch = atom<string | null>({
  key: 'blockchains.search',
  default: null,
});

export const blockchainAtoms = {
  blockchains,
  blockchainsLoadingState,
  blockchainSearch,
};
