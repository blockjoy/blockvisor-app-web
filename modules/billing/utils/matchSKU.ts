import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  Host,
  HostServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/host';
import {
  Node,
  NodeServiceCreateRequest,
} from '@modules/grpc/library/blockjoy/v1/node';
import { NodeLauncherState } from '@modules/node';
import { blockchainList, nodeTypes } from '@shared/constants/lookups';

type NodeType = {
  blockchain?: Blockchain;
  node?: Node | NodeLauncherState | NodeServiceCreateRequest | null;
};

type HostType = { host?: Host | HostServiceCreateRequest };

type Payload = NodeType | HostType;

export const matchSKU = (type: 'node' | 'host', payload: Payload): string => {
  const region: string = 'EU';
  const productCategory: 'FMN' | 'SMH' = type === 'node' ? 'FMN' : 'SMH';

  if ('node' in payload) {
    const { blockchain, node } = payload;
    if (!node || !blockchain) return '';

    const blockchainName: string = blockchain?.name;
    const blockchainType: string =
      blockchainList.find(
        (blockchainItem) => blockchainItem.name === blockchainName,
      )?.abbreviation ?? '';

    const nodeType: string = nodeTypes[node?.nodeType];

    return `${productCategory}-${blockchainType}-${nodeType}-${region}`;
  } else if ('host' in payload) {
    const { host } = payload;
    if (!host) return '';

    return 'SMH-THREAD-BASE';
  } else return '';
};
