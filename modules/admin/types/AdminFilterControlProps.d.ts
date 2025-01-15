import { Protocol } from '@modules/grpc/library/blockjoy/v1/protocol';
import { User } from '@modules/grpc/library/blockjoy/v1/user';

type AdminFilterControlProps<T = any> = {
  isOpen?: boolean;
  columnName: string;
  items?: AdminFilterDropdownItem[];
  values?: string[];
  listAll?: T[];
  protocols?: Protocol[];
  users?: User[];
  onFilterChange: (item: AdminFilterDropdownItem) => void;
};
