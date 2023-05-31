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
    hostMemory: hostMemory || [2, 512],
    hostCPU: hostCPU || [1, 64],
    hostSpace: hostSpace || [256, 10240],
  };

  return params;
};
