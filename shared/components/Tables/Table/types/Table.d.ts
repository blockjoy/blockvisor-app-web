type TableCell<K = string> = {
  key: K;
  data?: string | number;
  component?: EmotionJSX.Element;
};

type TableHeader<K = string> = {
  key: K;
  name?: string;
  label?: string;
  order?: number;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  textAlign?: string;
  isHiddenOnMobile?: boolean;
  component?: EmotionJSX.Element;
  dataField?: any;
  isVisible?: boolean;
  hideLabel?: boolean;
  alwaysVisible?: boolean;
  actions?: TableHeaderAction[];
  handleClick?: (id: string) => void;
};

type TableRow<K = string, C = string> = {
  key: K;
  cells: TableCell<C>[];
  isDanger?: boolean;
  isClickable?: boolean;
};

type TableProps<T> = {
  hideHeader?: boolean;
  headers?: TableHeader[];
  columns?: TableHeader[];
  rows?: TableRow[];
  onRowClick?: (id: string) => void;
  isLoading?: LoadingState;
  preload?: number;
  total?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
  queryParams?: T;
  setQueryParams?: (nextQueryParams: T) => void;
  sort?: Sort[];
  handleSort?: (key: any) => void;
  handleUpdateColumns?: (columns: TableColumn[]) => void;
  additionalStyles?: SerializedStyles[];
  isHover?: boolean;
  isResizable?: boolean;
  isDraggable?: boolean;
  resize?: TableResize;
  drag?: TableDrag;
  context?: TableContext;
  contextItems?: TableContextGroup[];
  tableRef?: React.MutableRefObject<HTMLTableElement | null>;
  wrapperRef?: React.MutableRefObject<HTMLDivElement | null>;
  handleHeaderRef?: (el: HTMLTableCellElement | null, colIndex: number) => void;
};

type TableColumn = {
  key?: string;
  width?: string;
  order?: number;
  isVisible?: boolean;
};

type TableResize = {
  isResizable?: boolean;
  isResizing?: boolean;
  resizeIndex?: number | null;
  onResize?: (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    index: number,
  ) => void;
};

type TableDrag = {
  isDraggable?: boolean;
  draggingIndex?: number | null;
  targetIndex?: number | null;
  deltaX?: number | null;
  itemShiftsX?: number[];
  onDrag?: (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    index: number,
  ) => void;
};

type TableContext = {
  key?: string | null;
  onClick?: (key: string | null, index?: number) => void;
  items?: TableContextGroup[];
  position?: TableContextPosition;
};

type TableContextItem = {
  id?: TableHeaderAction;
  icon?: React.ReactNode;
  title?: string;
  onClick?: (header?: TableHeader) => void;
};

type TableContextPosition = {
  top?: number;
  left?: number;
};

type TableContextGroup = { title?: string; items: TableContextItem[] };

type TableHeaderAction =
  | 'sort_asc'
  | 'sort_desc'
  | 'move_to_start'
  | 'move_to_left'
  | 'move_to_right'
  | 'move_to_end'
  | 'hide';

type TableHeaderMoveAction = 'start' | 'left' | 'right' | 'end';
