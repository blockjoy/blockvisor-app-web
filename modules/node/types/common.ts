import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { UINodeFilterCriteria } from '@modules/grpc';
import { Host, Region } from '@modules/grpc/library/blockjoy/v1/host';
import { Node, NodeSort } from '@modules/grpc/library/blockjoy/v1/node';
import { NodePlacement } from '@modules/grpc/library/blockjoy/common/v1/node';
import { ImageProperty } from '@modules/grpc/library/blockjoy/v1/image';
import { UiType } from '@modules/grpc/library/blockjoy/common/v1/protocol';
import { FirewallRule } from '@modules/grpc/library/blockjoy/common/v1/config';

export type NodePropertyGroup = {
  key: string;
  keyGroup?: string;
  value: string;
  uiType: UiType;
  properties: ImageProperty[];
  displayName: string;
};

export type NodeConfig = {
  properties: NodePropertyGroup[];
  firewall: FirewallRule[];
  autoUpgrade: boolean;
};

export type NodeLauncherState = {
  properties?: NodePropertyGroup[];
  keyFiles?: NodeFiles[];
  placement: NodePlacement;
  firewall: FirewallRule[];
  defaultFirewall: FirewallRule[];
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
  key_files?: File[];
  network: string;
  allowedIps: FilteredIpAddr[];
  deniedIps: FilteredIpAddr[];
};

export type BlockchainSimple = {
  protocolId?: string;
  version?: string;
};

export type BlockchainSimpleWRegion = BlockchainSimple & {
  regions: Region[];
};

export type NetworkConfigSimple = {
  id: string;
  protocolId?: string;
  name?: string;
};

export type InitialNodeQueryParams = {
  pagination: Pagination;
  filter: UINodeFilterCriteria;
  sort: NodeSort[];
};

export type NodeListColumnKey = keyof Node | 'customNodeInfo';

export type NodeListLayoutGroupItem = {
  key: NodeListColumnKey;
  name: string;
  label?: string;
  dependencies?: NodeListColumnKey[];
  isGrouped?: boolean;
};

export type NodeListLayoutInputItem = {
  id?: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type NodeListItem = TableHeader<NodeListColumnKey> & {
  component: (node: Node) => EmotionJSX.Element;
  isDisabled?: boolean;
};
