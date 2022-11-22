import { GrpcBlockchainObject } from '@modules/client/grpc_client';
import { nodeTypeList } from '@shared/constants/lookups';
import { atom, selector } from 'recoil';

const blockchainSearch = atom<string | null>({
  key: 'blockchains.search',
  default: null,
});

const blockchains = atom<GrpcBlockchainObject[]>({
  key: 'blockchains.list',
  default: [],
});

const filteredBySearchTermBlockchains = selector({
  key: 'blockchains.filtered',
  get: ({ get }) => {
    const filter = get(blockchainSearch);
    const list = get(blockchains);

    if (filter && filter.length) {
      return list.filter((item) =>
        item.name?.toUpperCase().includes(filter.toUpperCase()),
      );
    } else {
      return list;
    }
  },
});

const blockchainsLoadingState = atom<LoadingState>({
  key: 'blockchains.loadingState',
  default: 'initializing',
});

const blockchainsWithNodeTypes = selector({
  key: 'blockchains.listWithNodeTypes',
  get: ({ get }) => {
    const blockchainList = get(blockchains);
    return blockchainList.map((block) => {
      return {
        ...block,
        supported_node_types: block.supported_node_types
          .map((s: any) => {
            return nodeTypeList
              .map((f) => {
                if (f.id === s.id) {
                  return {
                    ...f,
                    properties: [...s.properties],
                  };
                }
              })
              .filter((e) => e);
          })
          .flat(),
      };
    });
  },
});

export const blockchainSelectors = {
  blockchainsWithNodeTypes,
  filteredBySearchTermBlockchains,
};
export const blockchainsAtoms = {
  blockchains,
  blockchainsLoadingState,
  blockchainSearch,
};
