export const loadPersistedFilters = () => {
  const nodeFilters = localStorage.getItem('node.filters');
  if (!nodeFilters) return null;

  const localStorageFilters = JSON.parse(nodeFilters);

  return localStorageFilters;
};
