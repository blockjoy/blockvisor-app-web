import { NodeType } from '@modules/grpc/library/blockjoy/common/v1/node';
import { Region } from '@modules/grpc/library/blockjoy/v1/host';
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
