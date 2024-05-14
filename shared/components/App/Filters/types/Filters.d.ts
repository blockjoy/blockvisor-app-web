type FilterItem = {
  id: string;
  name: string;
  disabled?: boolean;
  type?: 'check' | 'range';
  count?: number;
  list?: FilterListItem[];
  label?: string;
  step?: number;
  min?: number;
  max?: number;
  values?: [number, number];
  setValues?: (val: [number, number]) => void;
  formatter?: any;
  customValues?: any;
};

type FilterListItem = {
  id?: string;
  name?: string;
  isChecked?: boolean;
};
