import { atom } from 'recoil';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';

const protocols = atom<Protocol[]>({
  key: 'protocols.list',
  default: [],
});

const protocolsLoadingState = atom<LoadingState>({
  key: 'protocols.loadingState',
  default: 'initializing',
});

const protocolSearch = atom<string | null>({
  key: 'protocols.search',
  default: null,
});

export const protocolAtoms = {
  protocols,
  protocolsLoadingState,
  protocolSearch,
};
