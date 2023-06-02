import { hostFiltersDefaults } from '@shared/constants/lookups';

export type FilterCriteria = {
  hostStatus?: string[];
  hostMemory: [number, number];
  hostCPU: [number, number];
  hostSpace: [number, number];
};

export const buildParams = (
  status: FilterItem[],
  hostMemory: [number, number],
  hostCPU: [number, number],
  hostSpace: [number, number],
) => {
  const statusFilters: string[] = status
    .filter((item) => item.isChecked)
    .map((item) => item.id!);

  const params: FilterCriteria = {
    hostStatus: statusFilters || [],
    hostMemory: hostMemory || hostFiltersDefaults.memory,
    hostCPU: hostCPU || hostFiltersDefaults.cpu,
    hostSpace: hostSpace || hostFiltersDefaults.space,
  };

  return params;
};
