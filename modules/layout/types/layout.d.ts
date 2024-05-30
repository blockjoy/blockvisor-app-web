type View = 'table' | 'grid';

type Layout = {
  'sidebar.isOpen': boolean;
  'node.view': View;
  'node.filters.isOpen': boolean;
  'host.view': View;
  'host.filters.isOpen': boolean;
};

type LayoutSettings =
  | 'sidebar.isOpen'
  | 'node.view'
  | 'node.filters.isOpen'
  | 'host.view'
  | 'host.filters.isOpen';
