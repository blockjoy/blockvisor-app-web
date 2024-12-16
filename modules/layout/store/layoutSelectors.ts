import { selector, selectorFamily } from 'recoil';
import { authAtoms } from '@modules/auth';
import {
  NODE_LIST_LAYOUT_GROUPED_FIELDS,
  NODE_LIST_TAGS_PER_VIEW,
} from '@modules/node';

const layout = selector<LayoutSettings>({
  key: 'layout',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings?.hasOwnProperty('layout')) return {};

    return JSON.parse(userSettings?.layout ?? '{}');
  },
});

const isSidebarOpen = selector<boolean>({
  key: 'layout.sidebar.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['sidebar.isOpen'];
  },
});

const nodeView = selector<View>({
  key: 'layout.nodes.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['nodes.view'] ?? 'grid';
  },
});

const nodeViewMobile = selector<View>({
  key: 'layout.mobile.nodes.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['mobile.nodes.view'] ?? 'grid';
  },
});

const isNodeFiltersOpen = selector<boolean>({
  key: 'layout.nodes.filters.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['nodes.filters.isOpen'] ?? false;
  },
});

const tableColumns = selector<TableColumn[]>({
  key: 'layout.nodes.table.columns',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['nodes.table.columns'] ?? [];
  },
});

const tableColumnGroups = selector({
  key: 'layout.nodes.table.columns.groups',
  get: ({ get }) => {
    const tableColumnsVal = get(tableColumns);

    const tableColumnsVisible = new Map();
    tableColumnsVal.forEach((col) =>
      tableColumnsVisible.set(col.key, col.isVisible),
    );

    const groupedFields = NODE_LIST_LAYOUT_GROUPED_FIELDS.reduce<
      Record<string, boolean>
    >((group, groupedField) => {
      const isVisible = tableColumnsVisible.get(groupedField.key);
      group[groupedField.key!] = isVisible ?? groupedField.isGrouped;
      return group;
    }, {});

    return groupedFields;
  },
});

const tableTagsPerView = selector<number>({
  key: 'layout.nodes.table.tags.itemsPerView',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['nodes.table.tagsPerView'] ?? NODE_LIST_TAGS_PER_VIEW;
  },
});

const hostView = selector<View>({
  key: 'layout.hosts.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['hosts.view'] ?? 'table';
  },
});

const hostViewMobile = selector<View>({
  key: 'layout.mobile.hosts.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['mobile.hosts.view'] ?? 'grid';
  },
});

const isHostFiltersOpen = selector<boolean>({
  key: 'layout.hosts.filters.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['hosts.filters.isOpen'] ?? false;
  },
});

const activeNodeView = selectorFamily<View, boolean>({
  key: 'layout.nodes.activeView',
  get:
    (isXlrg) =>
    ({ get }) => {
      const nodeViewVal = get(nodeView);
      const nodeViewMobileVal = get(nodeViewMobile);

      return isXlrg ? nodeViewMobileVal : nodeViewVal;
    },
});

const activeHostView = selectorFamily<View, boolean>({
  key: 'layout.hosts.activeView',
  get:
    (isXlrg) =>
    ({ get }) => {
      const hostViewVal = get(hostView);
      const hostViewMobileVal = get(hostViewMobile);

      return isXlrg ? hostViewMobileVal : hostViewVal;
    },
});

const adminFullWidth = selector<boolean>({
  key: 'layout.admin.fullWidth',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['admin.fullWidth'] ?? false;
  },
});

const adminSidebarWidth = selector<number>({
  key: 'layout.admin.sidebarWidth',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['admin.sidebarWidth'] ?? 200;
  },
});

export const layoutSelectors = {
  layout,

  isSidebarOpen,

  nodeView,
  nodeViewMobile,
  activeNodeView,
  isNodeFiltersOpen,

  tableColumns,
  tableColumnGroups,
  tableTagsPerView,

  hostView,
  hostViewMobile,
  activeHostView,
  isHostFiltersOpen,

  adminFullWidth,
  adminSidebarWidth,
};
