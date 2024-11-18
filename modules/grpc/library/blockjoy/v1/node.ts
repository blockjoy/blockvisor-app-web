/* eslint-disable */
import Long from 'long';
import type { CallContext, CallOptions } from 'nice-grpc-common';
import _m0 from 'protobufjs/minimal';
import { Timestamp } from '../../google/protobuf/timestamp';
import { BillingAmount } from '../common/v1/currency';
import {
  FirewallConfig,
  FirewallRule,
  ImagePropertyValue,
  NodeConfig,
} from '../common/v1/config';
import {
  NextState,
  NodeJob,
  NodePlacement,
  NodeReport,
  NodeState,
  NodeStatus,
} from '../common/v1/node';
import { ProtocolVersionKey } from '../common/v1/protocol';
import { Resource } from '../common/v1/resource';
import { SearchOperator, SortOrder } from '../common/v1/search';
import { Tags, UpdateTags } from '../common/v1/tag';

export const protobufPackage = 'blockjoy.v1';

export enum NodeSortField {
  NODE_SORT_FIELD_UNSPECIFIED = 0,
  NODE_SORT_FIELD_NODE_NAME = 1,
  NODE_SORT_FIELD_DNS_NAME = 2,
  NODE_SORT_FIELD_DISPLAY_NAME = 3,
  NODE_SORT_FIELD_NODE_STATE = 4,
  NODE_SORT_FIELD_NEXT_STATE = 5,
  NODE_SORT_FIELD_PROTOCOL_STATE = 6,
  NODE_SORT_FIELD_PROTOCOL_HEALTH = 7,
  NODE_SORT_FIELD_BLOCK_HEIGHT = 8,
  NODE_SORT_FIELD_CREATED_AT = 9,
  NODE_SORT_FIELD_UPDATED_AT = 10,
  UNRECOGNIZED = -1,
}

export interface Node {
  nodeId: string;
  nodeName: string;
  displayName?: string | undefined;
  oldNodeId?: string | undefined;
  imageId: string;
  configId: string;
  config: NodeConfig | undefined;
  orgId: string;
  orgName: string;
  hostId: string;
  hostOrgId?: string | undefined;
  hostNetworkName: string;
  hostDisplayName?: string | undefined;
  protocolId: string;
  protocolName: string;
  protocolVersionId: string;
  versionKey: ProtocolVersionKey | undefined;
  semanticVersion: string;
  autoUpgrade: boolean;
  ipAddress: string;
  ipGateway: string;
  dnsName: string;
  p2pAddress?: string | undefined;
  dnsUrl?: string | undefined;
  blockHeight?: number | undefined;
  blockAge?: number | undefined;
  note?: string | undefined;
  placement: NodePlacement | undefined;
  nodeStatus: NodeStatus | undefined;
  jobs: NodeJob[];
  reports: NodeReport[];
  tags: Tags | undefined;
  createdBy: Resource | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  dataDirectoryMountpoint?: string | undefined;
  /** Monthly cost of this node. */
  cost?: BillingAmount | undefined;
}

/** Create a new node for some image. */
export interface NodeServiceCreateRequest {
  /** The org id that is creating the node. */
  orgId: string;
  /** The image id of the node to create. */
  imageId: string;
  /** Recreate a new node with the config from an existing one. */
  oldNodeId?: string | undefined;
  /** How to determine the host placment of the new node. */
  placement: NodePlacement | undefined;
  /** The image properties changed from their default values. */
  newValues: ImagePropertyValue[];
  /** Additional firewall rules to add to the node. */
  addRules: FirewallRule[];
  /** A list of tags that are attached to this node. */
  tags?: Tags | undefined;
}

export interface NodeServiceCreateResponse {
  nodes: Node[];
}

export interface NodeServiceGetRequest {
  nodeId: string;
}

export interface NodeServiceGetResponse {
  node: Node | undefined;
}

/** Query a set of nodes within an org. */
export interface NodeServiceListRequest {
  /** The orgs to list nodes for (or empty for all). */
  orgIds: string[];
  /** The number of results to skip. */
  offset: number;
  /** Limit the number of results. */
  limit: number;
  /** Search these parameters. */
  search?: NodeSearch | undefined;
  /** Sort the results in this order. */
  sort: NodeSort[];
  /** If non-empty, only return nodes for these protocol ids. */
  protocolIds: string[];
  /** If non-empty, only return nodes running on these hosts. */
  hostIds: string[];
  /** If non-empty, only return nodes created by these user ids. */
  userIds: string[];
  /** If non-empty, only return nodes with these ip addresses. */
  ipAddresses: string[];
  /** If non-empty, only return nodes in these states. */
  nodeStates: NodeState[];
  /** If non-empty, only return nodes with these next states. */
  nextStates: NextState[];
  /** If non-empty, only return nodes with these semantic versions. */
  semanticVersions: string[];
}

/** The fields used to search nodes rather than just filtering them. */
export interface NodeSearch {
  /** How to combine the parameters. */
  operator: SearchOperator;
  /** Search for the node id. */
  nodeId?: string | undefined;
  /** Search for the node name. */
  nodeName?: string | undefined;
  /** Search for the display name. */
  displayName?: string | undefined;
  /** Search for the DNS name. */
  dnsName?: string | undefined;
  /** Search for the node state. */
  nodeState?: NodeState | undefined;
  /** Search for the next state. */
  nextState?: NextState | undefined;
  /** Search for the protocol state. */
  protocolState?: string | undefined;
  /** Search for the protocol health. */
  protocolHealth?: string | undefined;
  /** Search for the node ip address. */
  ip?: string | undefined;
}

export interface NodeSort {
  field: NodeSortField;
  order: SortOrder;
}

/** This response contains the filtered nodes. */
export interface NodeServiceListResponse {
  nodes: Node[];
  total: number;
}

/** Report the current status of a node. */
export interface NodeServiceReportStatusRequest {
  /** The id of the node to report. */
  nodeId: string;
  /** The running config of the node. */
  configId: string;
  /** Update the node status. */
  status?: NodeStatus | undefined;
  /** Update the peer-to-peer address. */
  p2pAddress?: string | undefined;
}

export interface NodeServiceReportStatusResponse {}

/** Report an error with the node. */
export interface NodeServiceReportErrorRequest {
  /** The node id of the report. */
  nodeId: string;
  /** The resource creating the report. */
  createdBy: Resource | undefined;
  /** An error description of the problem. */
  message: string;
}

export interface NodeServiceReportErrorResponse {
  reportId: string;
}

export interface NodeServiceUpdateConfigRequest {
  /** The id of the node to update. */
  nodeId: string;
  /** Whether the node should automatically be upgraded. */
  autoUpgrade?: boolean | undefined;
  /** Move this node to a new org. */
  newOrgId?: string | undefined;
  /** Update the display name of this node. */
  newDisplayName?: string | undefined;
  /** Update the note that explains what this node is for. */
  newNote?: string | undefined;
  /** The cost of this host. */
  cost?: BillingAmount | undefined;
  /** Update these property keys to these values. */
  newValues: ImagePropertyValue[];
  /** Replace the firewall config with a new one. */
  newFirewall?: FirewallConfig | undefined;
  /** Update the node tags. */
  updateTags?: UpdateTags | undefined;
}

export interface NodeServiceUpdateConfigResponse {}

export interface NodeServiceUpgradeImageRequest {
  /** The ids of the nodes that you want to upgrade. */
  nodeIds: string[];
  /** The image_id to upgrade the nodes to. */
  imageId: string;
  /** The org_id of a private image. */
  orgId?: string | undefined;
}

export interface NodeServiceUpgradeImageResponse {}

export interface NodeServiceStartRequest {
  nodeId: string;
}

export interface NodeServiceStartResponse {}

export interface NodeServiceStopRequest {
  nodeId: string;
}

export interface NodeServiceStopResponse {}

export interface NodeServiceRestartRequest {
  nodeId: string;
}

export interface NodeServiceRestartResponse {}

export interface NodeServiceDeleteRequest {
  nodeId: string;
}

export interface NodeServiceDeleteResponse {}

function createBaseNode(): Node {
  return {
    nodeId: '',
    nodeName: '',
    displayName: undefined,
    oldNodeId: undefined,
    imageId: '',
    configId: '',
    config: undefined,
    orgId: '',
    orgName: '',
    hostId: '',
    hostOrgId: undefined,
    hostNetworkName: '',
    hostDisplayName: undefined,
    protocolId: '',
    protocolName: '',
    protocolVersionId: '',
    versionKey: undefined,
    semanticVersion: '',
    autoUpgrade: false,
    ipAddress: '',
    ipGateway: '',
    dnsName: '',
    p2pAddress: undefined,
    dnsUrl: undefined,
    blockHeight: undefined,
    blockAge: undefined,
    note: undefined,
    placement: undefined,
    nodeStatus: undefined,
    jobs: [],
    reports: [],
    tags: undefined,
    cost: undefined,
    createdBy: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.nodeName !== '') {
      writer.uint32(18).string(message.nodeName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(26).string(message.displayName);
    }
    if (message.oldNodeId !== undefined) {
      writer.uint32(34).string(message.oldNodeId);
    }
    if (message.imageId !== '') {
      writer.uint32(42).string(message.imageId);
    }
    if (message.configId !== '') {
      writer.uint32(50).string(message.configId);
    }
    if (message.config !== undefined) {
      NodeConfig.encode(message.config, writer.uint32(58).fork()).ldelim();
    }
    if (message.orgId !== '') {
      writer.uint32(66).string(message.orgId);
    }
    if (message.orgName !== '') {
      writer.uint32(74).string(message.orgName);
    }
    if (message.hostId !== '') {
      writer.uint32(82).string(message.hostId);
    }
    if (message.hostOrgId !== undefined) {
      writer.uint32(90).string(message.hostOrgId);
    }
    if (message.hostNetworkName !== '') {
      writer.uint32(98).string(message.hostNetworkName);
    }
    if (message.hostDisplayName !== undefined) {
      writer.uint32(106).string(message.hostDisplayName);
    }
    if (message.protocolId !== '') {
      writer.uint32(114).string(message.protocolId);
    }
    if (message.protocolName !== '') {
      writer.uint32(122).string(message.protocolName);
    }
    if (message.protocolVersionId !== '') {
      writer.uint32(130).string(message.protocolVersionId);
    }
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(
        message.versionKey,
        writer.uint32(138).fork(),
      ).ldelim();
    }
    if (message.semanticVersion !== '') {
      writer.uint32(146).string(message.semanticVersion);
    }
    if (message.autoUpgrade === true) {
      writer.uint32(152).bool(message.autoUpgrade);
    }
    if (message.ipAddress !== '') {
      writer.uint32(162).string(message.ipAddress);
    }
    if (message.ipGateway !== '') {
      writer.uint32(170).string(message.ipGateway);
    }
    if (message.dnsName !== '') {
      writer.uint32(178).string(message.dnsName);
    }
    if (message.p2pAddress !== undefined) {
      writer.uint32(186).string(message.p2pAddress);
    }
    if (message.dnsUrl !== undefined) {
      writer.uint32(194).string(message.dnsUrl);
    }
    if (message.blockHeight !== undefined) {
      writer.uint32(200).uint64(message.blockHeight);
    }
    if (message.blockAge !== undefined) {
      writer.uint32(208).uint64(message.blockAge);
    }
    if (message.note !== undefined) {
      writer.uint32(218).string(message.note);
    }
    if (message.placement !== undefined) {
      NodePlacement.encode(
        message.placement,
        writer.uint32(226).fork(),
      ).ldelim();
    }
    if (message.nodeStatus !== undefined) {
      NodeStatus.encode(message.nodeStatus, writer.uint32(234).fork()).ldelim();
    }
    for (const v of message.jobs) {
      NodeJob.encode(v!, writer.uint32(242).fork()).ldelim();
    }
    for (const v of message.reports) {
      NodeReport.encode(v!, writer.uint32(250).fork()).ldelim();
    }
    if (message.tags !== undefined) {
      Tags.encode(message.tags, writer.uint32(258).fork()).ldelim();
    }
    if (message.createdBy !== undefined) {
      Resource.encode(message.createdBy, writer.uint32(266).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(274).fork(),
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(282).fork(),
      ).ldelim();
    }
    if (message.cost !== undefined) {
      BillingAmount.encode(message.cost, writer.uint32(314).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodeName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.oldNodeId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.imageId = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.configId = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.config = NodeConfig.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.hostOrgId = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.hostNetworkName = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.hostDisplayName = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.protocolId = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.protocolName = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.protocolVersionId = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.versionKey = ProtocolVersionKey.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.semanticVersion = reader.string();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.autoUpgrade = reader.bool();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.ipAddress = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.dnsName = reader.string();
          continue;
        case 23:
          if (tag !== 186) {
            break;
          }

          message.p2pAddress = reader.string();
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.dnsUrl = reader.string();
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.blockHeight = longToNumber(reader.uint64() as Long);
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }

          message.blockAge = longToNumber(reader.uint64() as Long);
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.note = reader.string();
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.placement = NodePlacement.decode(reader, reader.uint32());
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.nodeStatus = NodeStatus.decode(reader, reader.uint32());
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.jobs.push(NodeJob.decode(reader, reader.uint32()));
          continue;
        case 31:
          if (tag !== 250) {
            break;
          }

          message.reports.push(NodeReport.decode(reader, reader.uint32()));
          continue;
        case 32:
          if (tag !== 258) {
            break;
          }

          message.tags = Tags.decode(reader, reader.uint32());
          continue;
        case 33:
          if (tag !== 266) {
            break;
          }

          message.createdBy = Resource.decode(reader, reader.uint32());
          continue;
        case 34:
          if (tag !== 274) {
            break;
          }

          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 35:
          if (tag !== 282) {
            break;
          }

          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 39:
          if (tag !== 314) {
            break;
          }

          message.cost = BillingAmount.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Node>): Node {
    return Node.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Node>): Node {
    const message = createBaseNode();
    message.nodeId = object.nodeId ?? '';
    message.nodeName = object.nodeName ?? '';
    message.displayName = object.displayName ?? undefined;
    message.oldNodeId = object.oldNodeId ?? undefined;
    message.imageId = object.imageId ?? '';
    message.configId = object.configId ?? '';
    message.config =
      object.config !== undefined && object.config !== null
        ? NodeConfig.fromPartial(object.config)
        : undefined;
    message.orgId = object.orgId ?? '';
    message.orgName = object.orgName ?? '';
    message.hostId = object.hostId ?? '';
    message.hostOrgId = object.hostOrgId ?? undefined;
    message.hostNetworkName = object.hostNetworkName ?? '';
    message.hostDisplayName = object.hostDisplayName ?? undefined;
    message.protocolId = object.protocolId ?? '';
    message.protocolName = object.protocolName ?? '';
    message.protocolVersionId = object.protocolVersionId ?? '';
    message.versionKey =
      object.versionKey !== undefined && object.versionKey !== null
        ? ProtocolVersionKey.fromPartial(object.versionKey)
        : undefined;
    message.semanticVersion = object.semanticVersion ?? '';
    message.autoUpgrade = object.autoUpgrade ?? false;
    message.ipAddress = object.ipAddress ?? '';
    message.ipGateway = object.ipGateway ?? '';
    message.dnsName = object.dnsName ?? '';
    message.p2pAddress = object.p2pAddress ?? undefined;
    message.dnsUrl = object.dnsUrl ?? undefined;
    message.blockHeight = object.blockHeight ?? undefined;
    message.blockAge = object.blockAge ?? undefined;
    message.note = object.note ?? undefined;
    message.placement =
      object.placement !== undefined && object.placement !== null
        ? NodePlacement.fromPartial(object.placement)
        : undefined;
    message.nodeStatus =
      object.nodeStatus !== undefined && object.nodeStatus !== null
        ? NodeStatus.fromPartial(object.nodeStatus)
        : undefined;
    message.jobs = object.jobs?.map((e) => NodeJob.fromPartial(e)) || [];
    message.reports =
      object.reports?.map((e) => NodeReport.fromPartial(e)) || [];
    message.tags =
      object.tags !== undefined && object.tags !== null
        ? Tags.fromPartial(object.tags)
        : undefined;
    message.cost =
      object.cost !== undefined && object.cost !== null
        ? BillingAmount.fromPartial(object.cost)
        : undefined;
    message.createdBy =
      object.createdBy !== undefined && object.createdBy !== null
        ? Resource.fromPartial(object.createdBy)
        : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseNodeServiceCreateRequest(): NodeServiceCreateRequest {
  return {
    orgId: '',
    imageId: '',
    oldNodeId: undefined,
    placement: undefined,
    newValues: [],
    addRules: [],
    tags: undefined,
  };
}

export const NodeServiceCreateRequest = {
  encode(
    message: NodeServiceCreateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.orgId !== '') {
      writer.uint32(10).string(message.orgId);
    }
    if (message.imageId !== '') {
      writer.uint32(18).string(message.imageId);
    }
    if (message.oldNodeId !== undefined) {
      writer.uint32(26).string(message.oldNodeId);
    }
    if (message.placement !== undefined) {
      NodePlacement.encode(
        message.placement,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    for (const v of message.newValues) {
      ImagePropertyValue.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.addRules) {
      FirewallRule.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.tags !== undefined) {
      Tags.encode(message.tags, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceCreateRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.imageId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.oldNodeId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.placement = NodePlacement.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.newValues.push(
            ImagePropertyValue.decode(reader, reader.uint32()),
          );
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.addRules.push(FirewallRule.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.tags = Tags.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceCreateRequest>,
  ): NodeServiceCreateRequest {
    return NodeServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceCreateRequest>,
  ): NodeServiceCreateRequest {
    const message = createBaseNodeServiceCreateRequest();
    message.orgId = object.orgId ?? '';
    message.imageId = object.imageId ?? '';
    message.oldNodeId = object.oldNodeId ?? undefined;
    message.placement =
      object.placement !== undefined && object.placement !== null
        ? NodePlacement.fromPartial(object.placement)
        : undefined;
    message.newValues =
      object.newValues?.map((e) => ImagePropertyValue.fromPartial(e)) || [];
    message.addRules =
      object.addRules?.map((e) => FirewallRule.fromPartial(e)) || [];
    message.tags =
      object.tags !== undefined && object.tags !== null
        ? Tags.fromPartial(object.tags)
        : undefined;
    return message;
  },
};

function createBaseNodeServiceCreateResponse(): NodeServiceCreateResponse {
  return { nodes: [] };
}

export const NodeServiceCreateResponse = {
  encode(
    message: NodeServiceCreateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceCreateResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodes.push(Node.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceCreateResponse>,
  ): NodeServiceCreateResponse {
    return NodeServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceCreateResponse>,
  ): NodeServiceCreateResponse {
    const message = createBaseNodeServiceCreateResponse();
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeServiceGetRequest(): NodeServiceGetRequest {
  return { nodeId: '' };
}

export const NodeServiceGetRequest = {
  encode(
    message: NodeServiceGetRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceGetRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceGetRequest>): NodeServiceGetRequest {
    return NodeServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceGetRequest>,
  ): NodeServiceGetRequest {
    const message = createBaseNodeServiceGetRequest();
    message.nodeId = object.nodeId ?? '';
    return message;
  },
};

function createBaseNodeServiceGetResponse(): NodeServiceGetResponse {
  return { node: undefined };
}

export const NodeServiceGetResponse = {
  encode(
    message: NodeServiceGetResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceGetResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.node = Node.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceGetResponse>): NodeServiceGetResponse {
    return NodeServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceGetResponse>,
  ): NodeServiceGetResponse {
    const message = createBaseNodeServiceGetResponse();
    message.node =
      object.node !== undefined && object.node !== null
        ? Node.fromPartial(object.node)
        : undefined;
    return message;
  },
};

function createBaseNodeServiceListRequest(): NodeServiceListRequest {
  return {
    orgIds: [],
    offset: 0,
    limit: 0,
    search: undefined,
    sort: [],
    protocolIds: [],
    hostIds: [],
    userIds: [],
    ipAddresses: [],
    nodeStates: [],
    nextStates: [],
    semanticVersions: [],
  };
}

export const NodeServiceListRequest = {
  encode(
    message: NodeServiceListRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.orgIds) {
      writer.uint32(10).string(v!);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(24).uint64(message.limit);
    }
    if (message.search !== undefined) {
      NodeSearch.encode(message.search, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.sort) {
      NodeSort.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.protocolIds) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.hostIds) {
      writer.uint32(58).string(v!);
    }
    for (const v of message.userIds) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.ipAddresses) {
      writer.uint32(74).string(v!);
    }
    writer.uint32(82).fork();
    for (const v of message.nodeStates) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(90).fork();
    for (const v of message.nextStates) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.semanticVersions) {
      writer.uint32(98).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceListRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.search = NodeSearch.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sort.push(NodeSort.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.protocolIds.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.hostIds.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.userIds.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.ipAddresses.push(reader.string());
          continue;
        case 10:
          if (tag === 80) {
            message.nodeStates.push(reader.int32() as any);

            continue;
          }

          if (tag === 82) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.nodeStates.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 11:
          if (tag === 88) {
            message.nextStates.push(reader.int32() as any);

            continue;
          }

          if (tag === 90) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.nextStates.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.semanticVersions.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceListRequest>): NodeServiceListRequest {
    return NodeServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceListRequest>,
  ): NodeServiceListRequest {
    const message = createBaseNodeServiceListRequest();
    message.orgIds = object.orgIds?.map((e) => e) || [];
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.search =
      object.search !== undefined && object.search !== null
        ? NodeSearch.fromPartial(object.search)
        : undefined;
    message.sort = object.sort?.map((e) => NodeSort.fromPartial(e)) || [];
    message.protocolIds = object.protocolIds?.map((e) => e) || [];
    message.hostIds = object.hostIds?.map((e) => e) || [];
    message.userIds = object.userIds?.map((e) => e) || [];
    message.ipAddresses = object.ipAddresses?.map((e) => e) || [];
    message.nodeStates = object.nodeStates?.map((e) => e) || [];
    message.nextStates = object.nextStates?.map((e) => e) || [];
    message.semanticVersions = object.semanticVersions?.map((e) => e) || [];
    return message;
  },
};

function createBaseNodeSearch(): NodeSearch {
  return {
    operator: 0,
    nodeId: undefined,
    nodeName: undefined,
    displayName: undefined,
    dnsName: undefined,
    nodeState: undefined,
    nextState: undefined,
    protocolState: undefined,
    protocolHealth: undefined,
    ip: undefined,
  };
}

export const NodeSearch = {
  encode(
    message: NodeSearch,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.nodeId !== undefined) {
      writer.uint32(18).string(message.nodeId);
    }
    if (message.nodeName !== undefined) {
      writer.uint32(26).string(message.nodeName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(34).string(message.displayName);
    }
    if (message.dnsName !== undefined) {
      writer.uint32(42).string(message.dnsName);
    }
    if (message.nodeState !== undefined) {
      writer.uint32(48).int32(message.nodeState);
    }
    if (message.nextState !== undefined) {
      writer.uint32(56).int32(message.nextState);
    }
    if (message.protocolState !== undefined) {
      writer.uint32(66).string(message.protocolState);
    }
    if (message.protocolHealth !== undefined) {
      writer.uint32(74).string(message.protocolHealth);
    }
    if (message.ip !== undefined) {
      writer.uint32(82).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeSearch {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nodeName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.dnsName = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.nodeState = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.nextState = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.protocolState = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.protocolHealth = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.ip = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeSearch>): NodeSearch {
    return NodeSearch.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeSearch>): NodeSearch {
    const message = createBaseNodeSearch();
    message.operator = object.operator ?? 0;
    message.nodeId = object.nodeId ?? undefined;
    message.nodeName = object.nodeName ?? undefined;
    message.displayName = object.displayName ?? undefined;
    message.dnsName = object.dnsName ?? undefined;
    message.nodeState = object.nodeState ?? undefined;
    message.nextState = object.nextState ?? undefined;
    message.protocolState = object.protocolState ?? undefined;
    message.protocolHealth = object.protocolHealth ?? undefined;
    message.ip = object.ip ?? undefined;
    return message;
  },
};

function createBaseNodeSort(): NodeSort {
  return { field: 0, order: 0 };
}

export const NodeSort = {
  encode(
    message: NodeSort,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.field !== 0) {
      writer.uint32(8).int32(message.field);
    }
    if (message.order !== 0) {
      writer.uint32(16).int32(message.order);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeSort {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeSort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.order = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeSort>): NodeSort {
    return NodeSort.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeSort>): NodeSort {
    const message = createBaseNodeSort();
    message.field = object.field ?? 0;
    message.order = object.order ?? 0;
    return message;
  },
};

function createBaseNodeServiceListResponse(): NodeServiceListResponse {
  return { nodes: [], total: 0 };
}

export const NodeServiceListResponse = {
  encode(
    message: NodeServiceListResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== 0) {
      writer.uint32(16).uint64(message.total);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceListResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodes.push(Node.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.total = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceListResponse>): NodeServiceListResponse {
    return NodeServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceListResponse>,
  ): NodeServiceListResponse {
    const message = createBaseNodeServiceListResponse();
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseNodeServiceReportStatusRequest(): NodeServiceReportStatusRequest {
  return { nodeId: '', configId: '', status: undefined, p2pAddress: undefined };
}

export const NodeServiceReportStatusRequest = {
  encode(
    message: NodeServiceReportStatusRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.configId !== '') {
      writer.uint32(18).string(message.configId);
    }
    if (message.status !== undefined) {
      NodeStatus.encode(message.status, writer.uint32(26).fork()).ldelim();
    }
    if (message.p2pAddress !== undefined) {
      writer.uint32(34).string(message.p2pAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceReportStatusRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceReportStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.configId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.status = NodeStatus.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.p2pAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceReportStatusRequest>,
  ): NodeServiceReportStatusRequest {
    return NodeServiceReportStatusRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceReportStatusRequest>,
  ): NodeServiceReportStatusRequest {
    const message = createBaseNodeServiceReportStatusRequest();
    message.nodeId = object.nodeId ?? '';
    message.configId = object.configId ?? '';
    message.status =
      object.status !== undefined && object.status !== null
        ? NodeStatus.fromPartial(object.status)
        : undefined;
    message.p2pAddress = object.p2pAddress ?? undefined;
    return message;
  },
};

function createBaseNodeServiceReportStatusResponse(): NodeServiceReportStatusResponse {
  return {};
}

export const NodeServiceReportStatusResponse = {
  encode(
    _: NodeServiceReportStatusResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceReportStatusResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceReportStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceReportStatusResponse>,
  ): NodeServiceReportStatusResponse {
    return NodeServiceReportStatusResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceReportStatusResponse>,
  ): NodeServiceReportStatusResponse {
    const message = createBaseNodeServiceReportStatusResponse();
    return message;
  },
};

function createBaseNodeServiceReportErrorRequest(): NodeServiceReportErrorRequest {
  return { nodeId: '', createdBy: undefined, message: '' };
}

export const NodeServiceReportErrorRequest = {
  encode(
    message: NodeServiceReportErrorRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.createdBy !== undefined) {
      Resource.encode(message.createdBy, writer.uint32(18).fork()).ldelim();
    }
    if (message.message !== '') {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceReportErrorRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceReportErrorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.createdBy = Resource.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceReportErrorRequest>,
  ): NodeServiceReportErrorRequest {
    return NodeServiceReportErrorRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceReportErrorRequest>,
  ): NodeServiceReportErrorRequest {
    const message = createBaseNodeServiceReportErrorRequest();
    message.nodeId = object.nodeId ?? '';
    message.createdBy =
      object.createdBy !== undefined && object.createdBy !== null
        ? Resource.fromPartial(object.createdBy)
        : undefined;
    message.message = object.message ?? '';
    return message;
  },
};

function createBaseNodeServiceReportErrorResponse(): NodeServiceReportErrorResponse {
  return { reportId: '' };
}

export const NodeServiceReportErrorResponse = {
  encode(
    message: NodeServiceReportErrorResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.reportId !== '') {
      writer.uint32(10).string(message.reportId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceReportErrorResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceReportErrorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reportId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceReportErrorResponse>,
  ): NodeServiceReportErrorResponse {
    return NodeServiceReportErrorResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceReportErrorResponse>,
  ): NodeServiceReportErrorResponse {
    const message = createBaseNodeServiceReportErrorResponse();
    message.reportId = object.reportId ?? '';
    return message;
  },
};

function createBaseNodeServiceUpdateConfigRequest(): NodeServiceUpdateConfigRequest {
  return {
    nodeId: '',
    autoUpgrade: undefined,
    newOrgId: undefined,
    newDisplayName: undefined,
    newNote: undefined,
    newValues: [],
    newFirewall: undefined,
    updateTags: undefined,
    cost: undefined,
  };
}

export const NodeServiceUpdateConfigRequest = {
  encode(
    message: NodeServiceUpdateConfigRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.autoUpgrade !== undefined) {
      writer.uint32(16).bool(message.autoUpgrade);
    }
    if (message.newOrgId !== undefined) {
      writer.uint32(26).string(message.newOrgId);
    }
    if (message.newDisplayName !== undefined) {
      writer.uint32(34).string(message.newDisplayName);
    }
    if (message.newNote !== undefined) {
      writer.uint32(42).string(message.newNote);
    }
    for (const v of message.newValues) {
      ImagePropertyValue.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.newFirewall !== undefined) {
      FirewallConfig.encode(
        message.newFirewall,
        writer.uint32(58).fork(),
      ).ldelim();
    }
    if (message.updateTags !== undefined) {
      UpdateTags.encode(message.updateTags, writer.uint32(66).fork()).ldelim();
    }
    if (message.cost !== undefined) {
      BillingAmount.encode(message.cost, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceUpdateConfigRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceUpdateConfigRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.autoUpgrade = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newOrgId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.newDisplayName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.newNote = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.newValues.push(
            ImagePropertyValue.decode(reader, reader.uint32()),
          );
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.newFirewall = FirewallConfig.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.updateTags = UpdateTags.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.cost = BillingAmount.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceUpdateConfigRequest>,
  ): NodeServiceUpdateConfigRequest {
    return NodeServiceUpdateConfigRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceUpdateConfigRequest>,
  ): NodeServiceUpdateConfigRequest {
    const message = createBaseNodeServiceUpdateConfigRequest();
    message.nodeId = object.nodeId ?? '';
    message.autoUpgrade = object.autoUpgrade ?? undefined;
    message.newOrgId = object.newOrgId ?? undefined;
    message.newDisplayName = object.newDisplayName ?? undefined;
    message.newNote = object.newNote ?? undefined;
    message.newValues =
      object.newValues?.map((e) => ImagePropertyValue.fromPartial(e)) || [];
    message.newFirewall =
      object.newFirewall !== undefined && object.newFirewall !== null
        ? FirewallConfig.fromPartial(object.newFirewall)
        : undefined;
    message.updateTags =
      object.updateTags !== undefined && object.updateTags !== null
        ? UpdateTags.fromPartial(object.updateTags)
        : undefined;
    message.cost =
      object.cost !== undefined && object.cost !== null
        ? BillingAmount.fromPartial(object.cost)
        : undefined;
    return message;
  },
};

function createBaseNodeServiceUpdateConfigResponse(): NodeServiceUpdateConfigResponse {
  return {};
}

export const NodeServiceUpdateConfigResponse = {
  encode(
    _: NodeServiceUpdateConfigResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceUpdateConfigResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceUpdateConfigResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceUpdateConfigResponse>,
  ): NodeServiceUpdateConfigResponse {
    return NodeServiceUpdateConfigResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceUpdateConfigResponse>,
  ): NodeServiceUpdateConfigResponse {
    const message = createBaseNodeServiceUpdateConfigResponse();
    return message;
  },
};

function createBaseNodeServiceUpgradeImageRequest(): NodeServiceUpgradeImageRequest {
  return { nodeIds: [], imageId: '', orgId: undefined };
}

export const NodeServiceUpgradeImageRequest = {
  encode(
    message: NodeServiceUpgradeImageRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.nodeIds) {
      writer.uint32(10).string(v!);
    }
    if (message.imageId !== '') {
      writer.uint32(18).string(message.imageId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(26).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceUpgradeImageRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceUpgradeImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.imageId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceUpgradeImageRequest>,
  ): NodeServiceUpgradeImageRequest {
    return NodeServiceUpgradeImageRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceUpgradeImageRequest>,
  ): NodeServiceUpgradeImageRequest {
    const message = createBaseNodeServiceUpgradeImageRequest();
    message.nodeIds = object.nodeIds?.map((e) => e) || [];
    message.imageId = object.imageId ?? '';
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseNodeServiceUpgradeImageResponse(): NodeServiceUpgradeImageResponse {
  return {};
}

export const NodeServiceUpgradeImageResponse = {
  encode(
    _: NodeServiceUpgradeImageResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceUpgradeImageResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceUpgradeImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceUpgradeImageResponse>,
  ): NodeServiceUpgradeImageResponse {
    return NodeServiceUpgradeImageResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceUpgradeImageResponse>,
  ): NodeServiceUpgradeImageResponse {
    const message = createBaseNodeServiceUpgradeImageResponse();
    return message;
  },
};

function createBaseNodeServiceStartRequest(): NodeServiceStartRequest {
  return { nodeId: '' };
}

export const NodeServiceStartRequest = {
  encode(
    message: NodeServiceStartRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceStartRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceStartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceStartRequest>): NodeServiceStartRequest {
    return NodeServiceStartRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceStartRequest>,
  ): NodeServiceStartRequest {
    const message = createBaseNodeServiceStartRequest();
    message.nodeId = object.nodeId ?? '';
    return message;
  },
};

function createBaseNodeServiceStartResponse(): NodeServiceStartResponse {
  return {};
}

export const NodeServiceStartResponse = {
  encode(
    _: NodeServiceStartResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceStartResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceStartResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceStartResponse>,
  ): NodeServiceStartResponse {
    return NodeServiceStartResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceStartResponse>,
  ): NodeServiceStartResponse {
    const message = createBaseNodeServiceStartResponse();
    return message;
  },
};

function createBaseNodeServiceStopRequest(): NodeServiceStopRequest {
  return { nodeId: '' };
}

export const NodeServiceStopRequest = {
  encode(
    message: NodeServiceStopRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceStopRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceStopRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceStopRequest>): NodeServiceStopRequest {
    return NodeServiceStopRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceStopRequest>,
  ): NodeServiceStopRequest {
    const message = createBaseNodeServiceStopRequest();
    message.nodeId = object.nodeId ?? '';
    return message;
  },
};

function createBaseNodeServiceStopResponse(): NodeServiceStopResponse {
  return {};
}

export const NodeServiceStopResponse = {
  encode(
    _: NodeServiceStopResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceStopResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceStopResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceStopResponse>): NodeServiceStopResponse {
    return NodeServiceStopResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceStopResponse>,
  ): NodeServiceStopResponse {
    const message = createBaseNodeServiceStopResponse();
    return message;
  },
};

function createBaseNodeServiceRestartRequest(): NodeServiceRestartRequest {
  return { nodeId: '' };
}

export const NodeServiceRestartRequest = {
  encode(
    message: NodeServiceRestartRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceRestartRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceRestartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceRestartRequest>,
  ): NodeServiceRestartRequest {
    return NodeServiceRestartRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceRestartRequest>,
  ): NodeServiceRestartRequest {
    const message = createBaseNodeServiceRestartRequest();
    message.nodeId = object.nodeId ?? '';
    return message;
  },
};

function createBaseNodeServiceRestartResponse(): NodeServiceRestartResponse {
  return {};
}

export const NodeServiceRestartResponse = {
  encode(
    _: NodeServiceRestartResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceRestartResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceRestartResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceRestartResponse>,
  ): NodeServiceRestartResponse {
    return NodeServiceRestartResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceRestartResponse>,
  ): NodeServiceRestartResponse {
    const message = createBaseNodeServiceRestartResponse();
    return message;
  },
};

function createBaseNodeServiceDeleteRequest(): NodeServiceDeleteRequest {
  return { nodeId: '' };
}

export const NodeServiceDeleteRequest = {
  encode(
    message: NodeServiceDeleteRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.nodeId !== '') {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceDeleteRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceDeleteRequest>,
  ): NodeServiceDeleteRequest {
    return NodeServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<NodeServiceDeleteRequest>,
  ): NodeServiceDeleteRequest {
    const message = createBaseNodeServiceDeleteRequest();
    message.nodeId = object.nodeId ?? '';
    return message;
  },
};

function createBaseNodeServiceDeleteResponse(): NodeServiceDeleteResponse {
  return {};
}

export const NodeServiceDeleteResponse = {
  encode(
    _: NodeServiceDeleteResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): NodeServiceDeleteResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceDeleteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<NodeServiceDeleteResponse>,
  ): NodeServiceDeleteResponse {
    return NodeServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<NodeServiceDeleteResponse>,
  ): NodeServiceDeleteResponse {
    const message = createBaseNodeServiceDeleteResponse();
    return message;
  },
};

/** Service for interacting with a node. */
export type NodeServiceDefinition = typeof NodeServiceDefinition;
export const NodeServiceDefinition = {
  name: 'NodeService',
  fullName: 'blockjoy.v1.NodeService',
  methods: {
    /** Create a new node. */
    create: {
      name: 'Create',
      requestType: NodeServiceCreateRequest,
      requestStream: false,
      responseType: NodeServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Get details for a node. */
    get: {
      name: 'Get',
      requestType: NodeServiceGetRequest,
      requestStream: false,
      responseType: NodeServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** List all nodes belonging to an org. */
    list: {
      name: 'List',
      requestType: NodeServiceListRequest,
      requestStream: false,
      responseType: NodeServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Report the current status of a node. */
    reportStatus: {
      name: 'ReportStatus',
      requestType: NodeServiceReportStatusRequest,
      requestStream: false,
      responseType: NodeServiceReportStatusResponse,
      responseStream: false,
      options: {},
    },
    /** Report an error about this node. */
    reportError: {
      name: 'ReportError',
      requestType: NodeServiceReportErrorRequest,
      requestStream: false,
      responseType: NodeServiceReportErrorResponse,
      responseStream: false,
      options: {},
    },
    /** Update a node configuration. */
    updateConfig: {
      name: 'UpdateConfig',
      requestType: NodeServiceUpdateConfigRequest,
      requestStream: false,
      responseType: NodeServiceUpdateConfigResponse,
      responseStream: false,
      options: {},
    },
    /** Upgrade a node to a new image. */
    upgradeImage: {
      name: 'UpgradeImage',
      requestType: NodeServiceUpgradeImageRequest,
      requestStream: false,
      responseType: NodeServiceUpgradeImageResponse,
      responseStream: false,
      options: {},
    },
    /** Start a node. */
    start: {
      name: 'Start',
      requestType: NodeServiceStartRequest,
      requestStream: false,
      responseType: NodeServiceStartResponse,
      responseStream: false,
      options: {},
    },
    /** Stop a node. */
    stop: {
      name: 'Stop',
      requestType: NodeServiceStopRequest,
      requestStream: false,
      responseType: NodeServiceStopResponse,
      responseStream: false,
      options: {},
    },
    /** Restart a node. */
    restart: {
      name: 'Restart',
      requestType: NodeServiceRestartRequest,
      requestStream: false,
      responseType: NodeServiceRestartResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a node. */
    delete: {
      name: 'Delete',
      requestType: NodeServiceDeleteRequest,
      requestStream: false,
      responseType: NodeServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface NodeServiceImplementation<CallContextExt = {}> {
  /** Create a new node. */
  create(
    request: NodeServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceCreateResponse>>;
  /** Get details for a node. */
  get(
    request: NodeServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceGetResponse>>;
  /** List all nodes belonging to an org. */
  list(
    request: NodeServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceListResponse>>;
  /** Report the current status of a node. */
  reportStatus(
    request: NodeServiceReportStatusRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceReportStatusResponse>>;
  /** Report an error about this node. */
  reportError(
    request: NodeServiceReportErrorRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceReportErrorResponse>>;
  /** Update a node configuration. */
  updateConfig(
    request: NodeServiceUpdateConfigRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceUpdateConfigResponse>>;
  /** Upgrade a node to a new image. */
  upgradeImage(
    request: NodeServiceUpgradeImageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceUpgradeImageResponse>>;
  /** Start a node. */
  start(
    request: NodeServiceStartRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceStartResponse>>;
  /** Stop a node. */
  stop(
    request: NodeServiceStopRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceStopResponse>>;
  /** Restart a node. */
  restart(
    request: NodeServiceRestartRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceRestartResponse>>;
  /** Delete a node. */
  delete(
    request: NodeServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceDeleteResponse>>;
}

export interface NodeServiceClient<CallOptionsExt = {}> {
  /** Create a new node. */
  create(
    request: DeepPartial<NodeServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceCreateResponse>;
  /** Get details for a node. */
  get(
    request: DeepPartial<NodeServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceGetResponse>;
  /** List all nodes belonging to an org. */
  list(
    request: DeepPartial<NodeServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceListResponse>;
  /** Report the current status of a node. */
  reportStatus(
    request: DeepPartial<NodeServiceReportStatusRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceReportStatusResponse>;
  /** Report an error about this node. */
  reportError(
    request: DeepPartial<NodeServiceReportErrorRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceReportErrorResponse>;
  /** Update a node configuration. */
  updateConfig(
    request: DeepPartial<NodeServiceUpdateConfigRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceUpdateConfigResponse>;
  /** Upgrade a node to a new image. */
  upgradeImage(
    request: DeepPartial<NodeServiceUpgradeImageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceUpgradeImageResponse>;
  /** Start a node. */
  start(
    request: DeepPartial<NodeServiceStartRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceStartResponse>;
  /** Stop a node. */
  stop(
    request: DeepPartial<NodeServiceStopRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceStopResponse>;
  /** Restart a node. */
  restart(
    request: DeepPartial<NodeServiceRestartRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceRestartResponse>;
  /** Delete a node. */
  delete(
    request: DeepPartial<NodeServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceDeleteResponse>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw 'Unable to locate global object';
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error(
      'Value is larger than Number.MAX_SAFE_INTEGER',
    );
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
