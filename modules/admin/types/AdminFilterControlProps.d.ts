import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';

type AdminFilterControlProps = {
  isOpen?: boolean;
  columnName: string;
  items?: AdminFilterDropdownItem[];
  values?: string[];
  listAll?: any[];
  blockchains?: Blockchain[];
  onFilterChange: (item: AdminFilterDropdownItem) => void;
};
