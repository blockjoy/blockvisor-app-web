import { nodeStatusList } from '@shared/constants/lookups';
import { buildParams } from './buildParams';
import { loadPersistedFilters } from './loadPersistedFilters';

export const isInQuery = (node: any) => {
  const filtersAll = loadPersistedFilters();

  if (!filtersAll) return true;

  const blockchainID: string = node.blockchainId;
  const typeID: string = JSON.parse(node.type)['id'].toString();
  const statusID: string =
    nodeStatusList.find((nsl) => nsl.id === node.status)?.uuid ?? '';

  const filtersAllChecked = buildParams(
    filtersAll.blockchain,
    filtersAll.type,
    filtersAll.status,
  );

  if (
    !!filtersAllChecked.blockchain?.length &&
    !filtersAllChecked.blockchain?.includes(blockchainID)
  )
    return false;

  if (
    !!filtersAllChecked.node_type?.length &&
    !filtersAllChecked.node_type?.includes(typeID)
  )
    return false;

  if (
    !!filtersAllChecked.node_status?.length &&
    !filtersAllChecked.node_status?.includes(statusID)
  )
    return false;

  return true;
};
