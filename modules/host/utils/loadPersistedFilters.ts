export const loadPersistedFilters = () => {
  const hostFilters = localStorage.getItem('hostFilters');
  if (!hostFilters) return null;

  const localStorageFilters = JSON.parse(localStorage.getItem('hostFilters')!);

  const status: FilterItem[] = localStorageFilters.status;

  return {
    status,
  };
};
