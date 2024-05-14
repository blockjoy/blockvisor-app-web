import { selector, selectorFamily } from 'recoil';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  BlockchainSimple,
  blockchainAtoms,
  NetworkConfigSimple,
} from '@modules/node';
import { nodeTypeList } from '@shared/constants/lookups';
import { sort } from '@shared/components';

const blockchainsHasError = selector<boolean>({
  key: 'blockchains.hasError',
  get: ({ get }) => {
    const blockchainsAll = get(blockchainAtoms.blockchains);

    return !Array.isArray(blockchainsAll) || !blockchainsAll.length;
  },
});

const blockchainsFilteredByName = selectorFamily<Blockchain[], string>({
  key: 'blockchains.filteredByName',
  get:
    (keyword: string) =>
    ({ get }) => {
      const blockchainsAll = get(blockchainAtoms.blockchains);

      return blockchainsAll?.filter((blockchain) =>
        blockchain.name?.toLowerCase().includes(keyword.toLowerCase()),
      );
    },
});

const blockchainsByTypeAndVersion = selector<BlockchainSimple[]>({
  key: 'blockchains.byTypeAndVersion',
  get: ({ get }) => {
    const blockchainsAll = get(blockchainAtoms.blockchains);

    return blockchainsAll?.flatMap((blockchain) =>
      blockchain.nodeTypes.flatMap((nodeType) =>
        nodeType.versions.map((version) => ({
          blockchainId: blockchain.id,
          nodeType: nodeType.nodeType,
          version: version.version,
        })),
      ),
    );
  },
});

const filteredBySearchTermBlockchains = selector({
  key: 'blockchains.filtered',
  get: ({ get }) => {
    const filter = get(blockchainAtoms.blockchainSearch);
    const list = get(blockchainAtoms.blockchains);

    if (filter && filter.length) {
      return list.filter((item) =>
        item.name?.toUpperCase().includes(filter.toUpperCase()),
      );
    } else {
      return list;
    }
  },
});

const blockchainsWithNodeTypes = selector({
  key: 'blockchains.listWithNodeTypes',
  get: ({ get }) => {
    const blockchainList = get(blockchainAtoms.blockchains);
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

const activeBlockchain = selectorFamily<Blockchain | null, string>({
  key: 'blockchains.active',
  get:
    (id) =>
    ({ get }) => {
      const blockchainList = get(blockchainAtoms.blockchains);
      const activeBlockchain = blockchainList?.find((b) => b.id === id);

      return activeBlockchain || null;
    },
});

const blockchainNetworks = selector<NetworkConfigSimple[]>({
  key: 'blockchains.networks',
  get: ({ get }) => {
    const blockchainsAll = get(blockchainAtoms.blockchains);

    const allNetworks = blockchainsAll.flatMap((blockchain) =>
      blockchain.nodeTypes.flatMap((nodeType) =>
        nodeType.versions.flatMap((version) =>
          version.networks.map((network) => ({
            id: network.name,
            name: network.name,
          })),
        ),
      ),
    );

    const uniqueItems = allNetworks.reduce((accumulator, currentItem) => {
      if (!accumulator[currentItem.id]) {
        accumulator[currentItem.id] = currentItem;
      }
      return accumulator;
    }, {});

    return sort(Object.values(uniqueItems), {
      field: 'name',
      order: 'asc',
    });
  },
});

export const blockchainSelectors = {
  blockchainsHasError,
  blockchainsFilteredByName,
  blockchainsByTypeAndVersion,

  activeBlockchain,
  filteredBySearchTermBlockchains,
  blockchainsWithNodeTypes,
  blockchainNetworks,
};
