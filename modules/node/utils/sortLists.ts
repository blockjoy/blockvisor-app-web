import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import {
  BlockchainNodeType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { HostIpAddress } from '@modules/grpc/library/blockjoy/v1/host';
import { sort } from '@shared/components';

export const sortVersions = (list: BlockchainVersion[] | undefined) => {
  if (!list) return [];

  const toVersion = (raw: string) =>
    raw.split('.').map((elem) => +elem.replace(/\D/g, ''));

  const compareVersions = (v1: number[], v2: number[]) => {
    const len = v1.length > v2.length ? v2.length : v1.length;
    for (let idx = 0; idx < len; ++idx) {
      if (v1[idx] < v2[idx]) {
        return 1;
      } else if (v1[idx] > v2[idx]) {
        return -1;
      }
    }
    return 0;
  };

  return [...list].sort((v1, v2) =>
    compareVersions(toVersion(v1.version), toVersion(v2.version)),
  );
};

export const sortNetworks = (list: NetworkConfig[] | undefined) => {
  if (!list) return [];

  const result: NetworkConfig[] = sort(list, {
    order: SortOrder.SORT_ORDER_ASCENDING,
    field: 'name',
  });

  return result;
};

export const sortNodeTypes = (list: BlockchainNodeType[] | undefined) => {
  if (!list) return [];

  const result: BlockchainNodeType[] = sort(list, {
    order: SortOrder.SORT_ORDER_ASCENDING,
    field: 'name',
  });

  return result;
};

export const sortIps = (ips: HostIpAddress[]) => {
  const ipsCopy = [...ips];
  const sortedIps = ipsCopy.sort((a, b) => {
    const num1 = Number(
      a.ip
        .split('.')
        .map((num) => `000${num}`.slice(-3))
        .join(''),
    );
    const num2 = Number(
      b.ip
        .split('.')
        .map((num) => `000${num}`.slice(-3))
        .join(''),
    );
    return num1 - num2;
  });

  return sortedIps;
};
