// import { NetworkConfig } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { HostIpAddress } from '@modules/grpc/library/blockjoy/common/v1/host';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { ProtocolVersion } from '@modules/grpc/library/blockjoy/v1/protocol';
import { sort } from '@shared/components';

export const sortVersions = (list: ProtocolVersion[] | undefined) => {
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
    compareVersions(
      toVersion(v1.semanticVersion),
      toVersion(v2.semanticVersion),
    ),
  );
};

export const sortNetworks = (list: any[] | undefined) => {
  if (!list) return [];

  const result: any[] = sort(list, {
    order: SortOrder.SORT_ORDER_ASCENDING,
    field: 'name',
  });

  return result;
};

// export const sortNodeTypes = (list: any[] | undefined) => {
//   if (!list) return [];

//   const result: BlockchainNodeType[] = sort(list, {
//     order: SortOrder.SORT_ORDER_ASCENDING,
//     field: 'name',
//   });

//   return result;
// };

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
