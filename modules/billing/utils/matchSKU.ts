import {
  Blockchain,
  BlockchainVersion,
} from '@modules/grpc/library/blockjoy/v1/blockchain';
import {
  NetworkConfig,
  NetType,
} from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
import { nodeNetworkTypes, nodeTypes } from '@shared/constants/lookups';
import { NodeLauncherState } from '@modules/node';

type Payload = {
  blockchain?: Blockchain | null;
  nodeLauncher?: NodeLauncherState;
  version?: BlockchainVersion | null;
  region?: Region | null;
  network?: string | null;
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
    const {
      blockchain,
      nodeLauncher,
      version,
      region,
      network: aciveNetwork,
    } = payload;
    if (!blockchain || !nodeLauncher || !version || !region) return '';

    // PRODUCT
    SKU.product = 'FMN';

    // REGION
    SKU.region = region.pricingTier;

    // NETWORK
    const selectedNetwork: NetworkConfig | null =
      version?.networks.find(
        (network: NetworkConfig) => network.name === aciveNetwork,
      ) || null;
    const selectedNetType: NetType | null = selectedNetwork?.netType || null;

    SKU.nodeNetwork =
      nodeNetworkTypes?.find(
        (nnt: { id: number; value: string }) => nnt.id === selectedNetType,
      )?.value ?? 'MN';

    // BLOCKCHAIN
    SKU.nodeBlockchain = blockchain?.ticker ?? '';

    // NODE TYPE
    SKU.nodeType = nodeTypes[nodeLauncher?.nodeType];

    return `${SKU.product}-${SKU.nodeBlockchain}-${SKU.nodeType}-${SKU.nodeNetwork}-${SKU.region}`;
  }

  return '';
};
