type TableHeader = {
  key: string;
  name: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  textAlign?: string;
  isHiddenOnMobile?: boolean;
  component?: EmotionJSX.Element;
  dataField?: string;
  sort?: boolean;
};

type TableRow = {
  key: string;
  cells: TableCell[];
};

type TableCell = {
  key: string;
  component: EmotionJSX.Element;
};
