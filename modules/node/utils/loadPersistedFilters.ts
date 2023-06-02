export const loadPersistedFilters = () => {
  const nodeFilters = localStorage.getItem('nodeFilters');
  if (!nodeFilters) return null;

  const localStorageFilters = JSON.parse(localStorage.getItem('nodeFilters')!);

  const blockchain: FilterItem[] = localStorageFilters.blockchain;
  const status: FilterItem[] = localStorageFilters.status;
  const type: FilterItem[] = localStorageFilters.type;
  const health = localStorageFilters.health;

  return {
    blockchain,
    status,
    type,
    health,
  };
};
