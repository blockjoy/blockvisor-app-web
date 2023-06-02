export const loadPersistedFilters = () => {
  const hostFilters = localStorage.getItem('hostFilters');
  if (!hostFilters) return null;

  const localStorageFilters = JSON.parse(localStorage.getItem('hostFilters')!);

  const status: FilterItem[] = localStorageFilters.status;
  const memory: [number, number] = localStorageFilters.memory;
  const cpu: [number, number] = localStorageFilters.cpu;
  const space: [number, number] = localStorageFilters.space;

  return {
    status,
    memory,
    cpu,
    space,
  };
};
