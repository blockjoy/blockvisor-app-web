import {
  Blockchain,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  NetworkConfig,
  NetType,
} from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  blockchainList,
  nodeNetworkTypes,
  nodeTypes,
} from '@shared/constants/lookups';
import { NodeLauncherState } from '@modules/node';

type Payload = {
  blockchain?: Blockchain | null;
  nodeLauncher?: NodeLauncherState;
  version?: BlockchainVersion | null;
  region?: Region | null;
};

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

  if ('nodeLauncher' in payload) {
    const { blockchain, nodeLauncher, version, region } = payload;
    if (!blockchain || !nodeLauncher || !version || !region) return '';

    // PRODUCT
    SKU.product = 'FMN';

    // REGION
    SKU.region = region.pricingTier;

    // NETWORK
    const selectedNetwork: NetworkConfig | null =
      version?.networks.find(
        (network: NetworkConfig) => network.name === nodeLauncher.network,
      ) || null;
    const selectedNetType: NetType | null = selectedNetwork?.netType || null;

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
    SKU.nodeType = nodeTypes[nodeLauncher?.nodeType];

    console.log('SKU', SKU);
    return `${SKU.product}-${SKU.nodeBlockchain}-${SKU.nodeType}-${SKU.nodeNetwork}-${SKU.region}`;
  }

  return '';
};
