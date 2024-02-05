import { selector, selectorFamily } from 'recoil';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { BlockchainSimple, blockchainAtoms } from '@modules/node';

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

export const blockchainSelectors = {
  blockchainsHasError,
  blockchainsFilteredByName,
  blockchainsByTypeAndVersion,
};
