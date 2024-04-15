type Cell = {
  key: string;
  data?: string | number;
  component: EmotionJSX.Element;
};

type TableHeader = {
  key: string;
  name: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  textAlign?: string;
  isHiddenOnMobile?: boolean;
  component?: EmotionJSX.Element;
  dataField?: any;
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
  additionalStyles?: SerializedStyles[];
  isHover?: boolean;
};
