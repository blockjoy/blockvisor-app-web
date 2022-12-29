import { UIFilterCriteria as FilterCriteria } from '@modules/client/grpc_client';
import { FilterItem } from '../store/nodeAtoms';
import { InitialFilter, itemsPerPage } from '../ui/NodeUIHelpers';

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

export const loadPersistedFilters = () => {
  const nodeFilters = localStorage.getItem('nodeFilters');
  if (!nodeFilters) return null;

  const localStorageFilters = JSON.parse(
    localStorage.getItem('nodeFilters')!,
  );

  const blockchain: FilterItem[] = localStorageFilters.blockchain;
  const status: FilterItem[] = localStorageFilters.status;
  const type: FilterItem[] = localStorageFilters.type;
  const health = localStorageFilters.health;

  return {
    blockchain,
    status,
    type,
    health,
  };
};

export const numOfItemsPerPage = () => {
  let items = 0;

  if (window.innerWidth < 568) {
    items = itemsPerPage['sm'];
  } else if (window.innerWidth > 2000 || window.innerHeight > 1000) {
    items = itemsPerPage['xxl'];
  } else {
    items = itemsPerPage['lg'];
  }
 
  return items;
};

export const resultsStatus = (
  length: number,
  filter: InitialFilter
) => {
  const isFiltered = Object.values(filter).some(x => x.length !== 0);
  const isEmpty = length === 0;

  return {
    isFiltered,
    isEmpty
  };
};
