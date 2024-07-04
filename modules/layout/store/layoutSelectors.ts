import { selector, selectorFamily } from 'recoil';
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

export const layoutSelectors = {
  layout,

  isSidebarOpen,

  nodeView,
  nodeViewMobile,
  activeNodeView,
  isNodeFiltersOpen,

  hostView,
  hostViewMobile,
  activeHostView,
  isHostFiltersOpen,
};
