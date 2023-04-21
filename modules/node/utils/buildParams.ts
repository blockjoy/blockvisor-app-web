import { FilterItem } from '../store/nodeAtoms';

export type FilterCriteria = {
  blockchain?: string[];
  node_type?: string[];
  node_status?: string[];
};

export const buildParams = (
  blockchain: FilterItem[],
  type: FilterItem[],
  status: FilterItem[],
) => {
  const blockchainFilters: string[] = blockchain
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const typeFilters: string[] = type
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const statusFilters: string[] = status
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const params: FilterCriteria = {
    blockchain: blockchainFilters || [],
    node_type: typeFilters || [],
    node_status: statusFilters || [],
  };

  return params;
};
