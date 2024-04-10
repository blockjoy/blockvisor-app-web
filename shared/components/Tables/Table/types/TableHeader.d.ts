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
  sort?: boolean;
};
