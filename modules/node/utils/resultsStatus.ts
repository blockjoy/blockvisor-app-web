import { UINodeFilterCriteria } from '@modules/grpc/clients/nodeClient';

export const resultsStatus = (length: number, filter: UINodeFilterCriteria) => {
  const isFiltered = Object.values(filter).some((x) => x.length !== 0);
  const isEmpty = length === 0;

  return {
    isFiltered,
    isEmpty,
  };
};
