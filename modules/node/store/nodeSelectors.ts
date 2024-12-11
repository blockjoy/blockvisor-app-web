import { selector, selectorFamily } from 'recoil';
import isEqual from 'lodash/isEqual';
import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { NodeSort } from '@modules/grpc/library/blockjoy/v1/node';
import { Tag } from '@modules/grpc/library/blockjoy/common/v1/tag';
import { UINodeFilterCriteria } from '@modules/grpc';
import {
  NODE_FILTERS_DEFAULT,
  NODE_SORT_DEFAULT,
} from '@shared/constants/lookups';
import { NodeStatusListItem, sort } from '@shared/components';
import {
  nodeAtoms,
  protocolAtoms,
  InitialNodeQueryParams,
} from '@modules/node';
import { authAtoms } from '@modules/auth';
import { createDropdownValuesFromEnum } from '@modules/admin';
import { NodeState } from '@modules/grpc/library/blockjoy/common/v1/node';

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
      ? { ...nodeSettings.filters, keyword: searchQuery ?? '' }
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

const filtersProtocolAll = selectorFamily<
  (Protocol & FilterListItem)[],
  string[]
>({
  key: 'node.filters.protocol.all',
  get:
    (tempFilters: string[]) =>
    ({ get }) => {
      const allProtocols = get(protocolAtoms.protocols);
      if (!allProtocols.length) return [];

      const allFilters = allProtocols.map((protocol) => ({
        ...protocol,
        name: protocol.name,
        isChecked: tempFilters?.some(
          (filter) => protocol.protocolId === filter,
        ),
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
      isChecked: tempFilters?.some((filter) => status.id === filter),
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

export const nodeSelectors = {
  settings,
  filters,
  isFiltersEmpty,
  nodeSort,
  queryParams,

  filtersProtocolSelectedIds,

  filtersProtocolAll,
  filtersStatusAll,

  inactiveTags,

  nodesTagsAll,
};
