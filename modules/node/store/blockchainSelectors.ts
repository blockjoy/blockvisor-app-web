import { selector, selectorFamily } from 'recoil';
import { blockchainAtoms } from './blockchainAtoms';
import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

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

export const blockchainSelectors = {
  blockchainsHasError,
  blockchainsFilteredByName,
};
