import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import {
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

export const sortNetworks = (list: NetworkConfig[] | undefined) => {
  if (!list) return [];

  const result: NetworkConfig[] = sort(list, {
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
