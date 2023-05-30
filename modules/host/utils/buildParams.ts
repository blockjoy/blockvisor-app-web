export type FilterCriteria = {
  hostStatus?: string[];
};

export const buildParams = (status: FilterItem[]) => {
  const statusFilters: string[] = status
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const params: FilterCriteria = {
    hostStatus: statusFilters || [],
  };

  return params;
};
