import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';

type AdminFilterControlProps<T = any> = {
  isOpen?: boolean;
  columnName: string;
  items?: AdminFilterDropdownItem[];
  values?: string[];
  listAll?: T[];
  protocols?: Protocol[];
  onFilterChange: (item: AdminFilterDropdownItem) => void;
};
