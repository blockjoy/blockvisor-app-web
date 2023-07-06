import { Blockchain } from '@modules/grpc/library/blockjoy/v1/blockchain';
import { NodeServiceCreateRequest } from '@modules/grpc/library/blockjoy/v1/node';
import { blockchainList, nodeTypes } from '@shared/constants/lookups';

export const matchSKU = (
  blockchain: Blockchain,
  node: NodeServiceCreateRequest,
): string => {
  const productCategory: 'FMN' | 'SMH' = 'FMN';

  const blockchainName: string = blockchain?.name;
  const blockchainType: string =
    blockchainList.find(
      (blockchainItem) => blockchainItem.name === blockchainName,
    )?.abbreviation ?? '';

  const nodeType: string = nodeTypes[node?.nodeType];

  const region: string = 'EU';

  return `${productCategory}-${blockchainType}-${nodeType}-${region}`;
};
