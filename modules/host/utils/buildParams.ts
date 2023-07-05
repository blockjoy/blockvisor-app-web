import { hostFiltersDefaults } from '@shared/constants/lookups';

export type FilterCriteria = {
  hostStatus?: string[];
  hostMemory: [number, number];
  hostCPU: [number, number];
  hostSpace: [number, number];
};

export const buildParams = (
  hostMemory: [number, number],
  hostCPU: [number, number],
  hostSpace: [number, number],
) => {
  const params: FilterCriteria = {
    hostMemory: hostMemory || hostFiltersDefaults.memory,
    hostCPU: hostCPU || hostFiltersDefaults.cpu,
    hostSpace: hostSpace || hostFiltersDefaults.space,
  };

  return params;
};
