import { selector, selectorFamily } from 'recoil';
import { Host, HostStatus } from '@modules/grpc/library/blockjoy/v1/host';
import { hostAtoms } from '@modules/host';
import { sort } from '@shared/components';
import { nodeStatusList } from '@shared/constants/nodeStatusList';

const hostListSorted = selector<Host[]>({
  key: 'hostList.sorted',
  get: ({ get }) => {
    try {
      const hosts = get(hostAtoms.hostList);
      return [...hosts].sort((orgA: Host, orgB: Host) => {
        if (orgA.name!.toLocaleLowerCase() < orgB.name!.toLocaleLowerCase())
          return -1;
        if (orgA.name!.toLocaleLowerCase() > orgB.name!.toLocaleLowerCase())
          return 1;
        return 0;
      });
    } catch (err) {
      console.log('hostListSortedError', err);
      return [];
    }
  },
});

const filtersStatusAll = selectorFamily<
  (HostStatus & FilterListItem)[],
  string[]
>({
  key: 'host.filters.hostStatus.all',
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

const filtersSearchQuery = selector<string>({
  key: 'host.filters.searchQuery',
  get: ({ get }) => get(hostAtoms.filters)?.keyword ?? '',
  set: ({ set }, newValue) =>
    set(hostAtoms.filters, (prevState: any) => ({
      ...prevState,
      keyword: newValue,
    })),
});

export const hostSelectors = {
  hostListSorted,
  filtersStatusAll,
  filtersSearchQuery,
};
