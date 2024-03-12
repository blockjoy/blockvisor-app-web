import { UIHostFilterCriteria } from '@modules/grpc/clients/hostClient';

export const resultsStatus = (length: number, filter: UIHostFilterCriteria) => {
  const isFiltered = Object.values(filter).some((x) => x.length !== 0);
  const isEmpty = length === 0;

  return {
    isFiltered,
    isEmpty,
  };
};
