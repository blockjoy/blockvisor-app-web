import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { blockchainList, nodeTypes } from '@shared/constants/lookups';

type NodeType = { blockchain?: Blockchain; node?: NodeServiceCreateRequest };
type HostType = { host?: any };

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
