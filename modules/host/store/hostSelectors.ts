import { selector, selectorFamily } from 'recoil';
import isEqual from 'lodash/isEqual';
import {
  Host,
  HostSort,
  HostStatus,
} from '@modules/grpc/library/blockjoy/v1/host';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { hostClient, UIHostFilterCriteria } from '@modules/grpc';
import { authAtoms, authSelectors } from '@modules/auth';
import { hostAtoms, InitialHostQueryParams } from '@modules/host';
import { sort } from '@shared/components';
import { nodeStatusList } from '@shared/constants/nodeStatusList';
import {
  HOST_FILTERS_DEFAULT,
  HOST_SORT_DEFAULT,
} from '@shared/constants/lookups';
import { nodeLauncherAtoms } from '@modules/node';
import { organizationSelectors } from '@modules/organization';

const settings = selector<HostSettings>({
  key: 'host.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('hosts')) return {};

    return JSON.parse(userSettings?.hosts ?? '{}');
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

const isFiltersEmpty = selector({
  key: 'host.filters.isEmpty',
  get: ({ get }) => {
    const filtersVal = get(filters);

    return isEqual(filtersVal, HOST_FILTERS_DEFAULT);
  },
});

const hostSort = selector<HostSort[]>({
  key: 'host.sort',
  get: ({ get }) => {
    const hostSettings = get(settings);

    return hostSettings?.sort ?? HOST_SORT_DEFAULT;
  },
});

const queryParams = selector<InitialHostQueryParams>({
  key: 'host.queryParams',

  get: ({ get }) => {
    const filter = get(filters);
    const sort = get(hostSort);
    const pagination = get(hostAtoms.hostListPagination);
    const keyword = get(hostAtoms.filtersSearchQuery);

    return {
      pagination,
      filter: {
        ...filter,
        keyword: keyword ?? filter.keyword,
      },
      sort,
    };
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
        order: SortOrder.SORT_ORDER_ASCENDING,
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

const isManagedHost = selector({
  key: 'host.selected.isManaged',
  get: ({ get }) => {
    const selectedHosts = get(nodeLauncherAtoms.selectedHosts);
    if (!selectedHosts?.length) return;

    const isSuperUser = get(authSelectors.isSuperUser);
    const defaultOrganization = get(organizationSelectors.defaultOrganization);

    return (
      !isSuperUser &&
      defaultOrganization?.id === selectedHosts?.[0]?.host?.orgId
    );
  },
});

export const hostSelectors = {
  settings,
  filters,
  isFiltersEmpty,
  hostSort,
  queryParams,

  filtersStatusAll,

  hostById,

  hostListSorted,

  isManagedHost,
};
