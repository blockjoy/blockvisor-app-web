import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { nodeTypeList } from '@shared/constants/lookups';
import { atom, selector } from 'recoil';

const blockchainSearch = atom<string | null>({
  key: 'blockchains.search',
  default: null,
});

const blockchains = atom<Blockchain[]>({
  key: 'blockchains.list',
  default: [],
});

const blockchainsHasError = selector<boolean>({
  key: 'blockchains.hasError',
  get: ({ get }) => {
    const blockchainsAll = get(blockchains);

    return !Array.isArray(blockchainsAll) || !blockchainsAll.length;
  },
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
        supported_node_types: block.nodeTypes
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
  blockchainsHasError,
  blockchainsWithNodeTypes,
  filteredBySearchTermBlockchains,
};
export const blockchainsAtoms = {
  blockchains,
  blockchainsLoadingState,
  blockchainSearch,
};
