import { selector, selectorFamily } from 'recoil';
import { Host, HostStatus } from '@modules/grpc/library/blockjoy/v1/host';
import { hostClient, UIHostFilterCriteria } from '@modules/grpc';
import { authAtoms, authSelectors } from '@modules/auth';
import { hostAtoms } from '@modules/host';
import { sort } from '@shared/components';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import { HOST_FILTERS_DEFAULT } from '@shared/constants/lookups';

const settings = selector<HostSettings>({
  key: 'host.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('hosts')) return {};

    return JSON.parse(userSettings?.hosts ?? '{}');
  },
});

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

const filters = selector<UIHostFilterCriteria>({
  key: 'host.filters',
  get: ({ get }) => {
    const hostSettings = get(settings);
    const searchQuery = get(hostAtoms.filtersSearchQuery);

    return hostSettings?.filters
      ? { ...hostSettings.filters, keyword: searchQuery ?? '' }
      : HOST_FILTERS_DEFAULT;
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
      isChecked: tempFilters?.some((filter) => status.id === filter),
    }));

    return allFilters;
  },
});

export const hostSelectors = {
  settings,

  hostById,

  hostListSorted,

  filters,
  filtersStatusAll,
};
