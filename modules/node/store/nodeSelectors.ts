import { selector, selectorFamily } from 'recoil';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { nodeTypeList } from '@shared/constants/lookups';
import { sort } from '@shared/components';
import { nodeAtoms, blockchainAtoms, BlockchainSimple } from '@modules/node';

const regionsByBlockchain = selectorFamily<Region[], BlockchainSimple>({
  key: 'node.regions.byBlockchain',
  get:
    ({ blockchainId, version, nodeType }) =>
    ({ get }) => {
      const regionsList = get(nodeAtoms.allRegions);

      return (
        regionsList.find(
          (region) =>
            region.blockchainId === blockchainId &&
            region.version === version &&
            region.nodeType === nodeType,
        )?.regions ?? []
      );
    },
});

const filtersBlockchainSelectedIds = selector<string[]>({
  key: 'node.filters.blockchain',
  get: ({ get }) => get(nodeAtoms.filters)?.blockchain ?? [],
  set: ({ set }, newValue) =>
    set(nodeAtoms.filters, (prevState: any) => ({
      ...prevState,
      blockchain: newValue,
    })),
});

const filtersStatusSelectedIds = selector<string[]>({
  key: 'node.filters.nodeStatus',
  get: ({ get }) => get(nodeAtoms.filters)?.nodeStatus ?? [],
  set: ({ set }, newValue) =>
    set(nodeAtoms.filters, (prevState: any) => ({
      ...prevState,
      nodeStatus: newValue,
    })),
});

const filtersTypeSelectedIds = selector<string[]>({
  key: 'node.filters.nodeType',
  get: ({ get }) => get(nodeAtoms.filters)?.nodeType ?? [],
  set: ({ set }, newValue) =>
    set(nodeAtoms.filters, (prevState: any) => ({
      ...prevState,
      nodeType: newValue,
    })),
});

const filtersBlockchainAll = selectorFamily<any, string[]>({
  key: 'node.filters.blockchain.all',
  get:
    (tempFilters: string[]) =>
    ({ get }) => {
      const allBlockchains = get(blockchainAtoms.blockchains);
      if (!allBlockchains.length) return [];

      const allFilters = allBlockchains.map((blockchain) => ({
        ...blockchain,
        isChecked: tempFilters.some((filter) => blockchain.id === filter),
      }));

      return allFilters;
    },
});

const filtersStatusAll = selectorFamily<any, any[]>({
  key: 'node.filters.nodeStatus.all',
  get: (tempFilters: string[]) => () => {
    const allStatuses = sort(
      nodeStatusList
        .filter((item) => item.id !== 0 && !item.type)
        .map((item) => ({
          ...item,
          name: item.name?.toLowerCase(),
          id: item.id?.toString(),
        })),
      {
        field: 'name',
        order: 'asc',
      },
    );

    if (!allStatuses.length) return [];

    const allFilters = allStatuses.map((status) => ({
      ...status,
      isChecked: tempFilters.some((filter) => status.id === filter),
    }));

    return allFilters;
  },
});

const filtersTypeAll = selectorFamily<any, any[]>({
  key: 'node.filters.nodeType.all',
  get: (tempFilters: string[]) => () => {
    const allTypes = nodeTypeList.map((item) => ({
      name: item.name,
      id: item.id.toString()!,
    }));

    if (!allTypes.length) return [];

    const allFilters = allTypes.map((type) => ({
      ...type,
      isChecked: tempFilters.some((filter) => type.id === filter),
    }));

    return allFilters;
  },
});

export const nodeSelectors = {
  regionsByBlockchain,

  filtersBlockchainSelectedIds,
  filtersStatusSelectedIds,
  filtersTypeSelectedIds,

  filtersBlockchainAll,
  filtersStatusAll,
  filtersTypeAll,
};
