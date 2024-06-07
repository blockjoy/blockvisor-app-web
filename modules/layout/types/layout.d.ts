type View = 'table' | 'grid';

type LayoutSettings = {
  'sidebar.isOpen': boolean;
  'nodes.view': View;
  'nodes.filters.isOpen': boolean;
  'hosts.view': View;
  'hosts.filters.isOpen': boolean;
};
