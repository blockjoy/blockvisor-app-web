export type FilterCriteria = {
  blockchain?: string[];
  nodeType?: string[];
  nodeStatus?: string[];
};

export const buildParams = (
  blockchain: FilterItem[],
  nodeType: FilterItem[],
  status: FilterItem[],
) => {
  const blockchainFilters: string[] = blockchain
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const typeFilters: string[] = nodeType
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const statusFilters: string[] = status
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const params: FilterCriteria = {
    blockchain: blockchainFilters || [],
    nodeType: typeFilters || [],
    nodeStatus: statusFilters || [],
  };

  return params;
};
