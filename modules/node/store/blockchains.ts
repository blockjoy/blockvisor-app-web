import { GrpcBlockchainObject } from '@modules/client/grpc_client';
import { atom } from 'recoil';

const blockchains = atom<GrpcBlockchainObject[]>({
  key: 'blockchains.get',
  default: [],
});

const blockchainsLoadingState = atom<LoadingState>({
  key: 'blockchains.loadingState',
  default: 'initializing',
});

export const blockchainsAtoms = {
  blockchains,
  blockchainsLoadingState,
};
