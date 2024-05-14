import { selector, selectorFamily } from 'recoil';
import { Host, HostStatus } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient } from '@modules/grpc';
import { authSelectors } from '@modules/auth';
import { hostAtoms } from '@modules/host';
import { sort } from '@shared/components';
import { nodeStatusList } from '@shared/constants/nodeStatusList';

const hostById = selectorFamily<Host | null, string | undefined>({
  key: 'host.byId',
  get:
    (id) =>
    ({ get }) => {
      if (!id) return null;

      const hosts = get(hostAtoms.hostList);
      const host = hosts.find((host) => host.id === id);

      if (host) return host;

      const isSuperUser = get(authSelectors.isSuperUser);
      if (!isSuperUser) return null;

      const adminHost = get(adminHostById(id));
      return adminHost;
    },
});

const adminHostById = selectorFamily<Host | null, string>({
  key: 'host.byId.admin',
  get: (hostId) => async () => {
    try {
      const adminHost = await hostClient.getHost(hostId);
      return adminHost;
    } catch (error) {
      console.log('Error while fetching a host for admin', error);
      return null;
    }
  },
});

const hostListSorted = selector<Host[]>({
  key: 'hostList.sorted',
  get: ({ get }) => {
    const hosts = get(hostAtoms.hostList);
    return [...hosts].sort((orgA: Host, orgB: Host) => {
      if (orgA.name!.toLocaleLowerCase() < orgB.name!.toLocaleLowerCase())
        return -1;
      if (orgA.name!.toLocaleLowerCase() > orgB.name!.toLocaleLowerCase())
        return 1;
      return 0;
    });
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
  hostById,

  hostListSorted,

  filtersStatusAll,
  filtersSearchQuery,
};
