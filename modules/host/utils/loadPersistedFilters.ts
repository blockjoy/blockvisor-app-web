export const loadPersistedFilters = () => {
  const hostFilters = localStorage.getItem('host.filters');
  if (!hostFilters) return null;

  const localStorageFilters = JSON.parse(hostFilters);

  return localStorageFilters;
};
