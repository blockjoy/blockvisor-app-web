import { InitialFilter } from '../ui/NodeUIHelpers';

export const resultsStatus = (length: number, filter: InitialFilter) => {
  const isFiltered = Object.values(filter).some((x) => x.length !== 0);
  const isEmpty = length === 0;

  return {
    isFiltered,
    isEmpty,
  };
};
