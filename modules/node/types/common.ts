import { NetType } from '@modules/grpc/library/blockjoy/common/v1/blockchain';
import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import {
  NodePlacement,
  NodeProperty,
} from '@modules/grpc/library/blockjoy/v1/node';

export type NodeLauncherState = {
  blockchainId: string;
  nodeTypeVersion: string;
  nodeType: NodeType;
  properties?: NodeProperty[];
  keyFiles?: NodeFiles[];
  allowIps: FilteredIpAddr[];
  denyIps: FilteredIpAddr[];
  placement: NodePlacement;
  quantity: number | null;
};

export type NodeLauncherHost = {
  nodesToLaunch: number;
  host: Host;
  isValid?: boolean;
};

export type CreateNodeParams = {
  version: string;
  nodeType: number;
  blockchain: string;
  nodeTypeProperties: NodeProperty[];
  key_files?: File[];
  network: string;
  allowedIps: FilteredIpAddr[];
  deniedIps: FilteredIpAddr[];
};

export type BlockchainSimple = {
  blockchainId?: string;
  nodeType?: NodeType;
  version?: string;
};

export type BlockchainSimpleWRegion = BlockchainSimple & {
  regions: Region[];
};

export type NetworkConfigSimple = {
  id: string;
  blockchainId?: string;
  name?: string;
  netType?: NetType;
};
