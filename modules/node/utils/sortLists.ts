import {
  BlockchainNetwork,
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { sort } from '@shared/components';

export const sortVersions = (list: BlockchainVersion[] | undefined) => {
  if (!list) return [];

  const result: BlockchainVersion[] = sort(list, {
    order: 'asc',
    field: 'version',
  });

  return result;
};

export const sortNetworks = (list: BlockchainNetwork[] | undefined) => {
  if (!list) return [];

  const result: BlockchainNetwork[] = sort(list, {
    order: 'asc',
    field: 'name',
  });

  return result;
};

export const sortNodeTypes = (list: BlockchainNodeType[] | undefined) => {
  if (!list) return [];

  const result: BlockchainNodeType[] = sort(list, {
    order: 'asc',
    field: 'name',
  });

  return result;
};
