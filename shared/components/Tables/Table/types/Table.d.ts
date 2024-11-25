type Cell = {
  key: string;
  data?: string | number;
  component?: EmotionJSX.Element;
};

type TableHeader<K = string> = {
  key: K;
  name?: string;
  label?: string;
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
};

type Row = {
  key: string;
  cells: Cell[];
  isDanger?: boolean;
  isClickable?: boolean;
};

type TableProps<T> = {
  hideHeader?: boolean;
  headers?: TableHeader[];
  columns?: TableHeader[];
  rows?: Row[];
  onRowClick?: (id: string) => void;
  isLoading?: LoadingState;
  preload?: number;
  total?: number;
  verticalAlign?: 'top' | 'middle';
  fixedRowHeight?: string;
  queryParams?: T;
  setQueryParams?: (nextQueryParams: T) => void;
  handleSort?: (key: any) => void;
  handleUpdateColumns?: (columns: TableColumn[]) => void;
  additionalStyles?: SerializedStyles[];
  isHover?: boolean;
  isResizable?: boolean;
  isDraggable?: boolean;
  resize?: TableResize;
  drag?: TableDrag;
  context?: TableContext;
  contextItems?: any;
  tableRef?: MutableRefObject<HTMLTableElement | null>;
  wrapperRef?: MutableRefObject<HTMLDivElement | null>;
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
  onClick?: (key: string | null) => void;
  items?: TableContextGroup[];
};

type TableContextItem = {
  id?: TableHeaderAction;
  icon?: React.ReactNode;
  title?: string;
  onClick?: (header?: TableHeader) => void;
};

type TableContextGroup = { title?: string; items: TableContextItem[] };

type TableHeaderAction = 'sort_asc' | 'sort_desc' | 'hide';
