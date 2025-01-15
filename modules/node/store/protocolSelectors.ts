import { selector, selectorFamily } from 'recoil';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { protocolAtoms } from '@modules/node';

const protocolsHasError = selector<boolean>({
  key: 'protocols.hasError',
  get: ({ get }) => {
    const protocolsAll = get(protocolAtoms.protocols);

    return !Array.isArray(protocolsAll) || !protocolsAll.length;
  },
});

const protocolsFilteredByName = selectorFamily<Protocol[], string>({
  key: 'protocols.filteredByName',
  get:
    (keyword: string) =>
    ({ get }) => {
      const protocolsAll = get(protocolAtoms.protocols);

      return protocolsAll?.filter((protocol) =>
        protocol.name?.toLowerCase().includes(keyword.toLowerCase()),
      );
    },
});

const filteredBySearchTermBlockchains = selector({
  key: 'protocols.filtered',
  get: ({ get }) => {
    const filter = get(protocolAtoms.protocolSearch);
    const list = get(protocolAtoms.protocols);

    if (filter && filter.length) {
      return list.filter((item) =>
        item.name?.toUpperCase().includes(filter.toUpperCase()),
      );
    } else {
      return list;
    }
  },
});

export const protocolSelectors = {
  protocolsHasError,
  protocolsFilteredByName,
  filteredBySearchTermBlockchains,
};
