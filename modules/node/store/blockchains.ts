import { GrpcBlockchainObject } from '@modules/client/grpc_client';
import { nodeTypeList } from '@shared/constants/lookups';
import { atom, selector } from 'recoil';

const blockchains = atom<GrpcBlockchainObject[]>({
  key: 'blockchains.list',
  default: [],
});

const blockchainsLoadingState = atom<LoadingState>({
  key: 'blockchains.loadingState',
  default: 'initializing',
});

const blockchainsWithNodeTypes = selector({
  key: 'blockchains.listWithNodeTypes',
  get: ({ get }) => {
    const blockchainList = get(blockchains);
    blockchainList.map((block) => {
      return {
        ...block,
        supported_node_types: block.supported_node_types.map((s: any) => {
          return nodeTypeList
            .map((f) => {
              if (f.id === s.id) {
                const a = [...s.properties];

                const b = {
                  ...f,
                  properties: a,
                };
                return b;
              }
            })
            .filter((e) => e);
        }),
      };
    });
  },
});

export const blockchainSelectors = {
  blockchainsWithNodeTypes,
};
export const blockchainsAtoms = {
  blockchains,
  blockchainsLoadingState,
};
