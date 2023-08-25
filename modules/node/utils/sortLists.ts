import {
  BlockchainNetwork,
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { sort } from '@shared/components';

export const sortVersions = (list: BlockchainVersion[]) =>
  sort(list, {
    order: 'asc',
    field: 'version',
  });

export const sortNetworks = (list: BlockchainNetwork[]) =>
  sort(list, {
    order: 'asc',
    field: 'name',
  });

export const sortNodeTypes = (list: BlockchainNodeType[]) =>
  sort(list, {
    order: 'asc',
    field: 'name',
  });
