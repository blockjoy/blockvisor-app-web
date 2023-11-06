import {
  Blockchain,
  BlockchainNetwork,
  BlockchainNetworkType,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  blockchainList,
  nodeNetworkTypes,
  nodeTypes,
} from '@shared/constants/lookups';

type Payload =
  | {
      blockchain?: Blockchain | null;
      node?: UpdateSubscriptionNode;
      version?: BlockchainVersion | null;
      region?: Region | null;
    }
  | { host?: UpdateSubscriptionHost };

export const matchSKU = (type: 'node' | 'host', payload: Payload): string => {
  // SKU
  const SKU: {
    product?: string;
    region?: string;
    nodeBlockchain: string;
    nodeNetwork?: string;
    nodeType?: string;
  } = {
    product: '',
    region: '',
    nodeBlockchain: '',
    nodeNetwork: '',
    nodeType: '',
  };

  if ('node' in payload) {
    const { blockchain, node, version, region } = payload;
    if (!node || !blockchain || !version || !region) return '';

    // PRODUCT
    SKU.product = 'FMN';

    // REGION
    SKU.region = region.pricingTier;

    // NETWORK
    const selectedNetwork: BlockchainNetwork | null =
      version?.networks.find(
        (network: BlockchainNetwork) => network.name === node.network,
      ) || null;
    const selectedNetType: BlockchainNetworkType | null =
      selectedNetwork?.netType || null;

    SKU.nodeNetwork =
      nodeNetworkTypes?.find(
        (nnt: { id: number; value: string }) => nnt.id === selectedNetType,
      )?.value ?? 'MN';

    // BLOCKCHAIN
    const blockchainName: string = blockchain?.name;
    SKU.nodeBlockchain =
      blockchainList.find(
        (blockchainItem) => blockchainItem.name === blockchainName,
      )?.abbreviation ?? '';

    // NODE TYPE
    SKU.nodeType = nodeTypes[node?.nodeType];

    console.log('SKU', SKU);
    return `${SKU.product}-${SKU.nodeBlockchain}-${SKU.nodeType}-${SKU.nodeNetwork}-${SKU.region}`;
  } else if ('host' in payload) {
    const { host } = payload;
    if (!host) return '';

    return 'SMH-THREAD-BASE';
  } else return '';
};
