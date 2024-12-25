import { selector, selectorFamily } from 'recoil';
import isEqual from 'lodash/isEqual';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSort } from '@modules/grpc/library/blockjoy/v1/node';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { UINodeFilterCriteria } from '@modules/grpc';
import { capitalize } from 'utils/capitalize';
import {
  NODE_FILTERS_DEFAULT,
  NODE_SORT_DEFAULT,
} from '@shared/constants/lookups';
import { NodeStatusListItem, sort, transformHeaders } from '@shared/components';
import {
  nodeAtoms,
  protocolAtoms,
  InitialNodeQueryParams,
  NODE_LIST_ITEMS,
} from '@modules/node';
import { authAtoms } from '@modules/auth';
import { createDropdownValuesFromEnum } from '@modules/admin';
import { NodeState } from '@modules/grpc/library/blockjoy/common/v1/node';
import { layoutSelectors } from '@modules/layout';
import { organizationSelectors } from '@modules/organization';

const settings = selector<NodeSettings>({
  key: 'node.settings',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('nodes')) return {};

    return JSON.parse(userSettings?.nodes ?? '{}');
  },
});

const filters = selector<UINodeFilterCriteria>({
  key: 'node.filters',
  get: ({ get }) => {
    const nodeSettings = get(settings);
    const searchQuery = get(nodeAtoms.filtersSearchQuery);

    return nodeSettings?.filters
      ? {
          ...NODE_FILTERS_DEFAULT,
          ...nodeSettings.filters,
          keyword: searchQuery ?? '',
        }
      : NODE_FILTERS_DEFAULT;
  },
});

const isFiltersEmpty = selector({
  key: 'node.filters.isEmpty',
  get: ({ get }) => {
    const filtersVal = get(filters);

    return isEqual(filtersVal, NODE_FILTERS_DEFAULT);
  },
});

const nodeListHeaders = selector<TableHeader[]>({
  key: 'node.table.headers',
  get: ({ get }) => {
    const tableColumnsVal = get(layoutSelectors.tableColumns);

    const headers = transformHeaders(NODE_LIST_ITEMS, tableColumnsVal);

    return headers;
  },
});

const nodeSort = selector<NodeSort[]>({
  key: 'node.sort',
  get: ({ get }) => {
    const nodeSettings = get(settings);

    return nodeSettings?.sort ?? NODE_SORT_DEFAULT;
  },
});

const queryParams = selector<InitialNodeQueryParams>({
  key: 'node.queryParams',

  get: ({ get }) => {
    const filter = get(filters);
    const sort = get(nodeSort);
    const pagination = get(nodeAtoms.nodeListPagination);
    const keyword = get(nodeAtoms.filtersSearchQuery);

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

const filtersProtocolSelectedIds = selector<string[]>({
  key: 'node.filters.protocol',
  get: ({ get }) => get(filters)?.protocol ?? [],
});

const filtersProtocolAll = selectorFamily<FilterListItem[], string[]>({
  key: 'node.filters.protocol.all',
  get:
    (tempFilters: string[]) =>
    ({ get }) => {
      const allProtocols = get(protocolAtoms.protocols);
      if (!allProtocols.length) return [];

      const allFilters = allProtocols.map((protocol) => ({
        id: protocol.protocolId,
        name: capitalize(protocol.key),
        isChecked:
          tempFilters?.some((filter) => protocol.protocolId === filter) ??
          false,
      }));

      return allFilters;
    },
});

const filtersStatusAll = selectorFamily<FilterListItem[], string[]>({
  key: 'node.filters.nodeStatus.all',
  get: (tempFilters) => () => {
    const allStatuses: (NodeStatusListItem & FilterListItem)[] = sort(
      createDropdownValuesFromEnum(NodeState, 'NODE_STATE_').map((item) => ({
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
      isChecked: tempFilters?.some((filter) => status.id === filter) ?? false,
    }));

    return allFilters;
  },
});

const filtersVersionAll = selectorFamily<FilterListItem[], string[]>({
  key: 'node.filters.semanticVersions.all',
  get:
    (tempFilters) =>
    ({ get }) => {
      const allProtocols = get(protocolAtoms.protocols);
      if (!allProtocols.length) return [];

      const allVersions = allProtocols.flatMap((protocol) =>
        protocol.versions.map((version) => version.semanticVersion),
      );
      if (!allVersions.length) return [];

      const semanticVersions = allVersions
        .filter((version, index, self) => self.indexOf(version) === index)
        .sort();

      if (!semanticVersions) return [];

      const allFilters = semanticVersions.map((sv) => ({
        id: sv,
        name: sv,
        isChecked: tempFilters?.some((filter) => sv === filter) ?? false,
      }));

      return allFilters;
    },
});

const inactiveTags = selectorFamily<Tag[], any[]>({
  key: 'node.tags.inactive',
  get:
    (tags: Tag[]) =>
    ({ get }) => {
      const allTags = get(nodesTagsAll);

      const activeTagNames = new Set(tags.map((tag) => tag.name));

      return allTags.filter((allTag) => !activeTagNames.has(allTag.name));
    },
});

const nodesTagsAll = selector<Tag[]>({
  key: 'nodes.tags.all',
  get: ({ get }) => {
    const nodeList = get(nodeAtoms.nodeList);

    const tagMap = new Map<string, Tag>();

    nodeList.forEach((node) => {
      node.tags?.tags?.forEach((tag) => {
        if (tag?.name && !tagMap.has(tag.name)) {
          tagMap.set(tag.name, tag);
        }
      });
    });

    return Array.from(tagMap.values());
  },
});

const nodesCreatedBy = selector({
  key: 'nodes.list.createdBy',
  get: ({ get }) => {
    const nodeList = get(nodeAtoms.nodeList);

    const createdByIds: string[] = nodeList.map(
      (node) => node.createdBy?.resourceId!,
    );

    const organizationMembersByIds = get(
      organizationSelectors.organizationMembersByIds(createdByIds),
    );

    return organizationMembersByIds;
  },
});

export const nodeSelectors = {
  settings,

  filters,
  isFiltersEmpty,

  nodeListHeaders,

  nodeSort,
  queryParams,

  filtersProtocolSelectedIds,

  filtersProtocolAll,
  filtersStatusAll,
  filtersVersionAll,

  inactiveTags,

  nodesTagsAll,

  nodesCreatedBy,
};
