import { selector } from 'recoil';
import { authAtoms } from '@modules/auth';

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

const isNodeFiltersOpen = selector<boolean>({
  key: 'layout.nodes.filters.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['nodes.filters.isOpen'] ?? false;
  },
});

const hostView = selector<View>({
  key: 'layout.hosts.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['hosts.view'] ?? 'table';
  },
});

const isHostFiltersOpen = selector<boolean>({
  key: 'layout.hosts.filters.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['hosts.filters.isOpen'] ?? false;
  },
});

const adminFullWidth = selector<boolean>({
  key: 'layout.admin.fullWidth',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['admin.fullWidth'] ?? false;
  },
});

export const layoutSelectors = {
  layout,

  isSidebarOpen,

  nodeView,
  isNodeFiltersOpen,

  hostView,
  isHostFiltersOpen,

  adminFullWidth,
};
