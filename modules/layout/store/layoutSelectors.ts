import { selector } from 'recoil';
import { authAtoms } from '@modules/auth';

const layout = selector<Layout>({
  key: 'layout',
  get: ({ get }) => {
    const userSettings = get(authAtoms.userSettings);
    if (!userSettings.hasOwnProperty('layout')) return {};

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
  key: 'layout.node.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['node.view'] ?? 'grid';
  },
});

const isNodeFiltersOpen = selector<boolean>({
  key: 'layout.node.filters.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['node.filters.isOpen'] ?? false;
  },
});

const hostView = selector<View>({
  key: 'layout.host.view',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['host.view'] ?? 'table';
  },
});

const isHostFiltersOpen = selector<boolean>({
  key: 'layout.host.filters.isOpen',
  get: ({ get }) => {
    const layoutVal = get(layout);

    return layoutVal?.['host.filters.isOpen'] ?? false;
  },
});

export const layoutSelectors = {
  layout,

  isSidebarOpen,

  nodeView,
  isNodeFiltersOpen,

  hostView,
  isHostFiltersOpen,
};
