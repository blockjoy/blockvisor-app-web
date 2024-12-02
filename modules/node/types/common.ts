import { UINodeFilterCriteria } from '@modules/grpc';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { NodeSort } from '@modules/grpc/library/blockjoy/v1/node';
import { NodePlacement } from '@modules/grpc/library/blockjoy/common/v1/node';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';

export type NodeLauncherPropertyGroup = {
  name: string;
  value: string;
  uiType: UiType;
  properties: ImageProperty[];
};

export type NodeLauncherState = {
  properties?: NodeLauncherPropertyGroup[];
  keyFiles?: NodeFiles[];
  allowIps: FilteredIpAddr[];
  denyIps: FilteredIpAddr[];
  placement: NodePlacement;
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
  // nodeTypeProperties: NodeProperty[];
  key_files?: File[];
  network: string;
  allowedIps: FilteredIpAddr[];
  deniedIps: FilteredIpAddr[];
};

export type BlockchainSimple = {
  protocolId?: string;
  // nodeType?: NodeType;
  version?: string;
};

export type BlockchainSimpleWRegion = BlockchainSimple & {
  regions: Region[];
};

export type NetworkConfigSimple = {
  id: string;
  protocolId?: string;
  name?: string;
  // netType?: NetType;
};

export type InitialNodeQueryParams = {
  pagination: Pagination;
  filter: UINodeFilterCriteria;
  sort: NodeSort[];
};
