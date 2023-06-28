/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

/**
 * Describe the node's chain related status
 * Generic, NOT chain specific states. These states are used to describe the
 * node's states as seen by the blockchain
 */
export enum NodeStatus {
  NODE_STATUS_UNSPECIFIED = 0,
  /** NODE_STATUS_PROVISIONING - General chain states */
  NODE_STATUS_PROVISIONING = 1,
  NODE_STATUS_BROADCASTING = 2,
  NODE_STATUS_CANCELLED = 3,
  NODE_STATUS_DELEGATING = 4,
  NODE_STATUS_DELINQUENT = 5,
  NODE_STATUS_DISABLED = 6,
  NODE_STATUS_EARNING = 7,
  NODE_STATUS_ELECTING = 8,
  NODE_STATUS_ELECTED = 9,
  NODE_STATUS_EXPORTED = 10,
  NODE_STATUS_INGESTING = 11,
  NODE_STATUS_MINING = 12,
  NODE_STATUS_MINTING = 13,
  NODE_STATUS_PROCESSING = 14,
  NODE_STATUS_RELAYING = 15,
  NODE_STATUS_REMOVED = 16,
  NODE_STATUS_REMOVING = 17,
  UNRECOGNIZED = -1,
}

/** Possible states the container is described with */
export enum ContainerStatus {
  CONTAINER_STATUS_UNSPECIFIED = 0,
  CONTAINER_STATUS_CREATING = 1,
  CONTAINER_STATUS_RUNNING = 2,
  CONTAINER_STATUS_STARTING = 3,
  CONTAINER_STATUS_STOPPING = 4,
  CONTAINER_STATUS_STOPPED = 5,
  CONTAINER_STATUS_UPGRADING = 6,
  CONTAINER_STATUS_UPGRADED = 7,
  CONTAINER_STATUS_DELETING = 8,
  CONTAINER_STATUS_DELETED = 9,
  CONTAINER_STATUS_INSTALLING = 10,
  CONTAINER_STATUS_SNAPSHOTTING = 11,
  CONTAINER_STATUS_FAILED = 12,
  UNRECOGNIZED = -1,
}

/** Describe the node's syncing status */
export enum SyncStatus {
  SYNC_STATUS_UNSPECIFIED = 0,
  SYNC_STATUS_SYNCING = 1,
  SYNC_STATUS_SYNCED = 2,
  UNRECOGNIZED = -1,
}

/** Describe the node's staking status */
export enum StakingStatus {
  STAKING_STATUS_UNSPECIFIED = 0,
  STAKING_STATUS_FOLLOWER = 1,
  STAKING_STATUS_STAKED = 2,
  STAKING_STATUS_STAKING = 3,
  STAKING_STATUS_VALIDATING = 4,
  STAKING_STATUS_CONSENSUS = 5,
  STAKING_STATUS_UNSTAKED = 6,
  UNRECOGNIZED = -1,
}

export enum NodeType {
  NODE_TYPE_UNSPECIFIED = 0,
  NODE_TYPE_MINER = 1,
  NODE_TYPE_ETL = 2,
  NODE_TYPE_VALIDATOR = 3,
  NODE_TYPE_API = 4,
  NODE_TYPE_ORACLE = 5,
  NODE_TYPE_RELAY = 6,
  NODE_TYPE_EXECUTION = 7,
  NODE_TYPE_BEACON = 8,
  NODE_TYPE_MEVBOOST = 9,
  NODE_TYPE_NODE = 10,
  NODE_TYPE_FULLNODE = 11,
  NODE_TYPE_LIGHTNODE = 12,
  UNRECOGNIZED = -1,
}

export enum UiType {
  UI_TYPE_UNSPECIFIED = 0,
  UI_TYPE_SWITCH = 1,
  UI_TYPE_PASSWORD = 2,
  UI_TYPE_TEXT = 3,
  UI_TYPE_FILE_UPLOAD = 4,
  UNRECOGNIZED = -1,
}

/** Blockchain node representation */
export interface Node {
  id: string;
  orgId: string;
  orgName: string;
  hostId: string;
  hostName: string;
  hostOrgId: string;
  blockchainId: string;
  blockchainName: string;
  name: string;
  /**
   * The P2P address of the node on the blockchain. This field is only set as
   * the node is started, so therefore it is optional.
   */
  address?: string | undefined;
  version: string;
  ip: string;
  nodeType: NodeType;
  properties: NodeProperty[];
  blockHeight?: number | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  status: NodeStatus;
  syncStatus: SyncStatus;
  containerStatus: ContainerStatus;
  stakingStatus?: StakingStatus | undefined;
  ipGateway: string;
  selfUpdate: boolean;
  network: string;
  /**
   * The id of the user that created this node. For the earliest nodes we
   * created, this field was not tracked and is therefore not populated.
   */
  createdBy?:
    | string
    | undefined;
  /** The name of the aforementioned user. */
  createdByName?:
    | string
    | undefined;
  /** The email of said aforementioned user. */
  createdByEmail?:
    | string
    | undefined;
  /** A list of ip addresses allowed to access public ports on this node. */
  allowIps: FilteredIpAddr[];
  /** A list of ip addresses denied all access to any ports on this node. */
  denyIps: FilteredIpAddr[];
  /** Logic with regards to where the node should placed. */
  placement: NodePlacement | undefined;
}

/** This message is used to create a new node. */
export interface NodeServiceCreateRequest {
  /** The id of the organization for which the node should be created. */
  orgId: string;
  /** The id of the blockchain that shoudl be ran inside the node. */
  blockchainId: string;
  /** The version of the node software that is ran. */
  version: string;
  /** The type of node that you want to create. */
  nodeType: NodeType;
  /** A list of properties. */
  properties: NodeProperty[];
  /**
   * The network that the blockchain will be a part of. Many blockchains have a
   * dedicated test network, such as "goerli" for ethereum.
   */
  network: string;
  /** Logic with regards to where the node should placed. */
  placement:
    | NodePlacement
    | undefined;
  /** A list of ip addresses allowed to access public ports on this node. */
  allowIps: FilteredIpAddr[];
  /** A list of ip addresses denied all access to any ports on this node. */
  denyIps: FilteredIpAddr[];
}

/** Message returned when a node is created. */
export interface NodeServiceCreateResponse {
  /** The actual node that was just created. */
  node: Node | undefined;
}

/**
 * This message is used to read info about a single node. For requests
 * pertaining to multiple nodes, use `NodeServiceListRequest`.
 */
export interface NodeServiceGetRequest {
  /** This should be the UUID of the node that you want to query. */
  id: string;
}

export interface NodeServiceGetResponse {
  /** The node that was queried will be placed in this field. */
  node: Node | undefined;
}

/**
 * This request is used to query a set of nodes within an org by the parameters
 * that are specified in the `filter` field.
 */
export interface NodeServiceListRequest {
  /** The organization within which we will search for nodes. */
  orgId: string;
  /** The number of items to be skipped over. */
  offset: number;
  /**
   * The number of items that will be returned. Together with offset, you can
   * use this to get pagination.
   */
  limit: number;
  /**
   * If this list is non-empty, only nodes that are any of these states will be
   * returned.
   */
  statuses: NodeStatus[];
  /**
   * If this list is non-empty, only nodes of any of these types will be
   * returned.
   */
  nodeTypes: NodeType[];
  /**
   * If this list is non-empty, only nodes that run a blockchain identified by
   * any of these blockchain ids will be returned.
   */
  blockchainIds: string[];
  /** If this value is provided, only nodes running on this host are provided. */
  hostId?: string | undefined;
}

/** This response will contain all the filtered nodes. */
export interface NodeServiceListResponse {
  /** The nodes that match the filter will be placed in this field. */
  nodes: Node[];
}

/** This request is used for updating a node. */
export interface NodeServiceUpdateRequest {
  /** The UUID of the node that you want to update. */
  id: string;
  /** The version of the blockchain software that should now be ran on the node. */
  version?:
    | string
    | undefined;
  /** Whether or not the node software should update itself. */
  selfUpdate?:
    | boolean
    | undefined;
  /** Set the container status field to this value. */
  containerStatus?:
    | ContainerStatus
    | undefined;
  /** Update the P2P address of the blockchain node. */
  address?:
    | string
    | undefined;
  /** A list of ip addresses allowed to access public ports on this node. */
  allowIps: FilteredIpAddr[];
  /** A list of ip addresses denied all access to any ports on this node. */
  denyIps: FilteredIpAddr[];
}

export interface NodeServiceUpdateResponse {
}

export interface NodeServiceDeleteRequest {
  id: string;
}

export interface NodeServiceDeleteResponse {
}

/**
 * This message contains the two possible ways in which the location of a node
 * may be determined.
 */
export interface NodePlacement {
  /**
   * Simply place the node on the provided host id. This means that retrying
   * on another host is disabled.
   */
  hostId?:
    | string
    | undefined;
  /**
   * The scheduler decides where to place this node. Refer to the
   * documentation of the `NodeScheduler` message for more details.
   */
  scheduler?: NodeScheduler | undefined;
}

/**
 * A node scheduler controls the way that the node is placed onto an appropriate
 * host. There are two fields, each representing a possible method of selecting
 * a host for this node to be scheduled on. They are sorted by priority, meaning
 * that `similarity` takes precedence over `resource`. The final field is
 * required, in order to make sure that the way we schedule a node is always
 * defined.
 */
export interface NodeScheduler {
  /** The way we want the node to react to similar nodes being on a host. */
  similarity?:
    | NodeScheduler_SimilarNodeAffinity
    | undefined;
  /** The way we want the node to react to hosts being full or empty. */
  resource: NodeScheduler_ResourceAffinity;
}

/**
 * Controls whether or not nodes of a similar type will be placed on the same
 * host or, conversely, be spread out over many hosts. "Similar" is defined
 * here as having the name `node_type`, `blockchain_id` and `org_id`. Note
 * that `version` is ignored here, so that we don't interfere with clustering
 * during when some of the nodes are upgraded, but others aren't yet.
 */
export enum NodeScheduler_SimilarNodeAffinity {
  SIMILAR_NODE_AFFINITY_UNSPECIFIED = 0,
  /**
   * SIMILAR_NODE_AFFINITY_CLUSTER - Schedule nodes similar on the same host machine. This is useful for nodes
   * that form groups with heavy intercommunication. Placing them on the same
   * host machine will ensure the lowest possible network latency between
   * them.
   */
  SIMILAR_NODE_AFFINITY_CLUSTER = 1,
  /**
   * SIMILAR_NODE_AFFINITY_SPREAD - Avoid scheduling nodes on hosts that already have a similar node running
   * on them. This is useful when multiple nodes are ran in parallel for the
   * sake of redundancy. Spreading the nodes ensures that one host going down
   * does not compromise other nodes.
   */
  SIMILAR_NODE_AFFINITY_SPREAD = 2,
  UNRECOGNIZED = -1,
}

/**
 * Controls whether nodes will prefer to be scheduled on the most utilized or
 * the least utilized hosts first. This allows you to do breadth- or depth-
 * first utilization of the available hosts.
 */
export enum NodeScheduler_ResourceAffinity {
  RESOURCE_AFFINITY_UNSPECIFIED = 0,
  /** RESOURCE_AFFINITY_MOST_RESOURCES - Prefer to utilize full hosts first. */
  RESOURCE_AFFINITY_MOST_RESOURCES = 1,
  /** RESOURCE_AFFINITY_LEAST_RESOURCES - Prefer to utilize empty hosts first. */
  RESOURCE_AFFINITY_LEAST_RESOURCES = 2,
  UNRECOGNIZED = -1,
}

/** IP Addresses used to filter access. */
export interface FilteredIpAddr {
  /** The ip address used in this filter. */
  ip: string;
  /** A user's description of what/why this address is being filtered. */
  description?: string | undefined;
}

export interface NodeProperty {
  name: string;
  uiType: UiType;
  disabled: boolean;
  required: boolean;
  value: string;
}

function createBaseNode(): Node {
  return {
    id: "",
    orgId: "",
    orgName: "",
    hostId: "",
    hostName: "",
    hostOrgId: "",
    blockchainId: "",
    blockchainName: "",
    name: "",
    address: undefined,
    version: "",
    ip: "",
    nodeType: 0,
    properties: [],
    blockHeight: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    status: 0,
    syncStatus: 0,
    containerStatus: 0,
    stakingStatus: undefined,
    ipGateway: "",
    selfUpdate: false,
    network: "",
    createdBy: undefined,
    createdByName: undefined,
    createdByEmail: undefined,
    allowIps: [],
    denyIps: [],
    placement: undefined,
  };
}

export const Node = {
  encode(message: Node, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.orgName !== "") {
      writer.uint32(26).string(message.orgName);
    }
    if (message.hostId !== "") {
      writer.uint32(34).string(message.hostId);
    }
    if (message.hostName !== "") {
      writer.uint32(42).string(message.hostName);
    }
    if (message.hostOrgId !== "") {
      writer.uint32(50).string(message.hostOrgId);
    }
    if (message.blockchainId !== "") {
      writer.uint32(58).string(message.blockchainId);
    }
    if (message.blockchainName !== "") {
      writer.uint32(66).string(message.blockchainName);
    }
    if (message.name !== "") {
      writer.uint32(74).string(message.name);
    }
    if (message.address !== undefined) {
      writer.uint32(82).string(message.address);
    }
    if (message.version !== "") {
      writer.uint32(90).string(message.version);
    }
    if (message.ip !== "") {
      writer.uint32(98).string(message.ip);
    }
    if (message.nodeType !== 0) {
      writer.uint32(104).int32(message.nodeType);
    }
    for (const v of message.properties) {
      NodeProperty.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    if (message.blockHeight !== undefined) {
      writer.uint32(120).uint64(message.blockHeight);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(130).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(138).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(144).int32(message.status);
    }
    if (message.syncStatus !== 0) {
      writer.uint32(152).int32(message.syncStatus);
    }
    if (message.containerStatus !== 0) {
      writer.uint32(160).int32(message.containerStatus);
    }
    if (message.stakingStatus !== undefined) {
      writer.uint32(168).int32(message.stakingStatus);
    }
    if (message.ipGateway !== "") {
      writer.uint32(178).string(message.ipGateway);
    }
    if (message.selfUpdate === true) {
      writer.uint32(184).bool(message.selfUpdate);
    }
    if (message.network !== "") {
      writer.uint32(194).string(message.network);
    }
    if (message.createdBy !== undefined) {
      writer.uint32(202).string(message.createdBy);
    }
    if (message.createdByName !== undefined) {
      writer.uint32(210).string(message.createdByName);
    }
    if (message.createdByEmail !== undefined) {
      writer.uint32(218).string(message.createdByEmail);
    }
    for (const v of message.allowIps) {
      FilteredIpAddr.encode(v!, writer.uint32(226).fork()).ldelim();
    }
    for (const v of message.denyIps) {
      FilteredIpAddr.encode(v!, writer.uint32(234).fork()).ldelim();
    }
    if (message.placement !== undefined) {
      NodePlacement.encode(message.placement, writer.uint32(242).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.hostName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.hostOrgId = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.blockchainId = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.blockchainName = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.name = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.address = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.version = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.properties.push(NodeProperty.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.blockHeight = longToNumber(reader.uint64() as Long);
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.syncStatus = reader.int32() as any;
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.containerStatus = reader.int32() as any;
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.stakingStatus = reader.int32() as any;
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.selfUpdate = reader.bool();
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.network = reader.string();
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.createdByName = reader.string();
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.createdByEmail = reader.string();
          continue;
        case 28:
          if (tag !== 226) {
            break;
          }

          message.allowIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
        case 29:
          if (tag !== 234) {
            break;
          }

          message.denyIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
        case 30:
          if (tag !== 242) {
            break;
          }

          message.placement = NodePlacement.decode(reader, reader.uint32());
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
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    message.orgName = object.orgName ?? "";
    message.hostId = object.hostId ?? "";
    message.hostName = object.hostName ?? "";
    message.hostOrgId = object.hostOrgId ?? "";
    message.blockchainId = object.blockchainId ?? "";
    message.blockchainName = object.blockchainName ?? "";
    message.name = object.name ?? "";
    message.address = object.address ?? undefined;
    message.version = object.version ?? "";
    message.ip = object.ip ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.properties = object.properties?.map((e) => NodeProperty.fromPartial(e)) || [];
    message.blockHeight = object.blockHeight ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.status = object.status ?? 0;
    message.syncStatus = object.syncStatus ?? 0;
    message.containerStatus = object.containerStatus ?? 0;
    message.stakingStatus = object.stakingStatus ?? undefined;
    message.ipGateway = object.ipGateway ?? "";
    message.selfUpdate = object.selfUpdate ?? false;
    message.network = object.network ?? "";
    message.createdBy = object.createdBy ?? undefined;
    message.createdByName = object.createdByName ?? undefined;
    message.createdByEmail = object.createdByEmail ?? undefined;
    message.allowIps = object.allowIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    message.denyIps = object.denyIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    message.placement = (object.placement !== undefined && object.placement !== null)
      ? NodePlacement.fromPartial(object.placement)
      : undefined;
    return message;
  },
};

function createBaseNodeServiceCreateRequest(): NodeServiceCreateRequest {
  return {
    orgId: "",
    blockchainId: "",
    version: "",
    nodeType: 0,
    properties: [],
    network: "",
    placement: undefined,
    allowIps: [],
    denyIps: [],
  };
}

export const NodeServiceCreateRequest = {
  encode(message: NodeServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.blockchainId !== "") {
      writer.uint32(26).string(message.blockchainId);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.nodeType !== 0) {
      writer.uint32(40).int32(message.nodeType);
    }
    for (const v of message.properties) {
      NodeProperty.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(58).string(message.network);
    }
    if (message.placement !== undefined) {
      NodePlacement.encode(message.placement, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.allowIps) {
      FilteredIpAddr.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.denyIps) {
      FilteredIpAddr.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.blockchainId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.properties.push(NodeProperty.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.network = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.placement = NodePlacement.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.allowIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.denyIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceCreateRequest>): NodeServiceCreateRequest {
    return NodeServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeServiceCreateRequest>): NodeServiceCreateRequest {
    const message = createBaseNodeServiceCreateRequest();
    message.orgId = object.orgId ?? "";
    message.blockchainId = object.blockchainId ?? "";
    message.version = object.version ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.properties = object.properties?.map((e) => NodeProperty.fromPartial(e)) || [];
    message.network = object.network ?? "";
    message.placement = (object.placement !== undefined && object.placement !== null)
      ? NodePlacement.fromPartial(object.placement)
      : undefined;
    message.allowIps = object.allowIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    message.denyIps = object.denyIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeServiceCreateResponse(): NodeServiceCreateResponse {
  return { node: undefined };
}

export const NodeServiceCreateResponse = {
  encode(message: NodeServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceCreateResponse();
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

  create(base?: DeepPartial<NodeServiceCreateResponse>): NodeServiceCreateResponse {
    return NodeServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeServiceCreateResponse>): NodeServiceCreateResponse {
    const message = createBaseNodeServiceCreateResponse();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    return message;
  },
};

function createBaseNodeServiceGetRequest(): NodeServiceGetRequest {
  return { id: "" };
}

export const NodeServiceGetRequest = {
  encode(message: NodeServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
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

  fromPartial(object: DeepPartial<NodeServiceGetRequest>): NodeServiceGetRequest {
    const message = createBaseNodeServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseNodeServiceGetResponse(): NodeServiceGetResponse {
  return { node: undefined };
}

export const NodeServiceGetResponse = {
  encode(message: NodeServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromPartial(object: DeepPartial<NodeServiceGetResponse>): NodeServiceGetResponse {
    const message = createBaseNodeServiceGetResponse();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    return message;
  },
};

function createBaseNodeServiceListRequest(): NodeServiceListRequest {
  return { orgId: "", offset: 0, limit: 0, statuses: [], nodeTypes: [], blockchainIds: [], hostId: undefined };
}

export const NodeServiceListRequest = {
  encode(message: NodeServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(24).uint64(message.limit);
    }
    writer.uint32(34).fork();
    for (const v of message.statuses) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(42).fork();
    for (const v of message.nodeTypes) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.blockchainIds) {
      writer.uint32(50).string(v!);
    }
    if (message.hostId !== undefined) {
      writer.uint32(58).string(message.hostId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceListRequest();
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
          if (tag === 32) {
            message.statuses.push(reader.int32() as any);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.statuses.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 5:
          if (tag === 40) {
            message.nodeTypes.push(reader.int32() as any);

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.nodeTypes.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.blockchainIds.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.hostId = reader.string();
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

  fromPartial(object: DeepPartial<NodeServiceListRequest>): NodeServiceListRequest {
    const message = createBaseNodeServiceListRequest();
    message.orgId = object.orgId ?? "";
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.statuses = object.statuses?.map((e) => e) || [];
    message.nodeTypes = object.nodeTypes?.map((e) => e) || [];
    message.blockchainIds = object.blockchainIds?.map((e) => e) || [];
    message.hostId = object.hostId ?? undefined;
    return message;
  },
};

function createBaseNodeServiceListResponse(): NodeServiceListResponse {
  return { nodes: [] };
}

export const NodeServiceListResponse = {
  encode(message: NodeServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromPartial(object: DeepPartial<NodeServiceListResponse>): NodeServiceListResponse {
    const message = createBaseNodeServiceListResponse();
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeServiceUpdateRequest(): NodeServiceUpdateRequest {
  return {
    id: "",
    version: undefined,
    selfUpdate: undefined,
    containerStatus: undefined,
    address: undefined,
    allowIps: [],
    denyIps: [],
  };
}

export const NodeServiceUpdateRequest = {
  encode(message: NodeServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== undefined) {
      writer.uint32(18).string(message.version);
    }
    if (message.selfUpdate !== undefined) {
      writer.uint32(32).bool(message.selfUpdate);
    }
    if (message.containerStatus !== undefined) {
      writer.uint32(40).int32(message.containerStatus);
    }
    if (message.address !== undefined) {
      writer.uint32(50).string(message.address);
    }
    for (const v of message.allowIps) {
      FilteredIpAddr.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.denyIps) {
      FilteredIpAddr.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.selfUpdate = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.containerStatus = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.address = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.allowIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.denyIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceUpdateRequest>): NodeServiceUpdateRequest {
    return NodeServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeServiceUpdateRequest>): NodeServiceUpdateRequest {
    const message = createBaseNodeServiceUpdateRequest();
    message.id = object.id ?? "";
    message.version = object.version ?? undefined;
    message.selfUpdate = object.selfUpdate ?? undefined;
    message.containerStatus = object.containerStatus ?? undefined;
    message.address = object.address ?? undefined;
    message.allowIps = object.allowIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    message.denyIps = object.denyIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeServiceUpdateResponse(): NodeServiceUpdateResponse {
  return {};
}

export const NodeServiceUpdateResponse = {
  encode(_: NodeServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceUpdateResponse();
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

  create(base?: DeepPartial<NodeServiceUpdateResponse>): NodeServiceUpdateResponse {
    return NodeServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeServiceUpdateResponse>): NodeServiceUpdateResponse {
    const message = createBaseNodeServiceUpdateResponse();
    return message;
  },
};

function createBaseNodeServiceDeleteRequest(): NodeServiceDeleteRequest {
  return { id: "" };
}

export const NodeServiceDeleteRequest = {
  encode(message: NodeServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeServiceDeleteRequest>): NodeServiceDeleteRequest {
    return NodeServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeServiceDeleteRequest>): NodeServiceDeleteRequest {
    const message = createBaseNodeServiceDeleteRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseNodeServiceDeleteResponse(): NodeServiceDeleteResponse {
  return {};
}

export const NodeServiceDeleteResponse = {
  encode(_: NodeServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create(base?: DeepPartial<NodeServiceDeleteResponse>): NodeServiceDeleteResponse {
    return NodeServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeServiceDeleteResponse>): NodeServiceDeleteResponse {
    const message = createBaseNodeServiceDeleteResponse();
    return message;
  },
};

function createBaseNodePlacement(): NodePlacement {
  return { hostId: undefined, scheduler: undefined };
}

export const NodePlacement = {
  encode(message: NodePlacement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== undefined) {
      writer.uint32(10).string(message.hostId);
    }
    if (message.scheduler !== undefined) {
      NodeScheduler.encode(message.scheduler, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePlacement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePlacement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.scheduler = NodeScheduler.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodePlacement>): NodePlacement {
    return NodePlacement.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodePlacement>): NodePlacement {
    const message = createBaseNodePlacement();
    message.hostId = object.hostId ?? undefined;
    message.scheduler = (object.scheduler !== undefined && object.scheduler !== null)
      ? NodeScheduler.fromPartial(object.scheduler)
      : undefined;
    return message;
  },
};

function createBaseNodeScheduler(): NodeScheduler {
  return { similarity: undefined, resource: 0 };
}

export const NodeScheduler = {
  encode(message: NodeScheduler, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.similarity !== undefined) {
      writer.uint32(8).int32(message.similarity);
    }
    if (message.resource !== 0) {
      writer.uint32(16).int32(message.resource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeScheduler {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeScheduler();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.similarity = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeScheduler>): NodeScheduler {
    return NodeScheduler.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeScheduler>): NodeScheduler {
    const message = createBaseNodeScheduler();
    message.similarity = object.similarity ?? undefined;
    message.resource = object.resource ?? 0;
    return message;
  },
};

function createBaseFilteredIpAddr(): FilteredIpAddr {
  return { ip: "", description: undefined };
}

export const FilteredIpAddr = {
  encode(message: FilteredIpAddr, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    if (message.description !== undefined) {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilteredIpAddr {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilteredIpAddr();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<FilteredIpAddr>): FilteredIpAddr {
    return FilteredIpAddr.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<FilteredIpAddr>): FilteredIpAddr {
    const message = createBaseFilteredIpAddr();
    message.ip = object.ip ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseNodeProperty(): NodeProperty {
  return { name: "", uiType: 0, disabled: false, required: false, value: "" };
}

export const NodeProperty = {
  encode(message: NodeProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.uiType !== 0) {
      writer.uint32(16).int32(message.uiType);
    }
    if (message.disabled === true) {
      writer.uint32(24).bool(message.disabled);
    }
    if (message.required === true) {
      writer.uint32(32).bool(message.required);
    }
    if (message.value !== "") {
      writer.uint32(42).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.uiType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.disabled = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeProperty>): NodeProperty {
    return NodeProperty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeProperty>): NodeProperty {
    const message = createBaseNodeProperty();
    message.name = object.name ?? "";
    message.uiType = object.uiType ?? 0;
    message.disabled = object.disabled ?? false;
    message.required = object.required ?? false;
    message.value = object.value ?? "";
    return message;
  },
};

export type NodeServiceDefinition = typeof NodeServiceDefinition;
export const NodeServiceDefinition = {
  name: "NodeService",
  fullName: "blockjoy.v1.NodeService",
  methods: {
    /** Create a single blockchain node */
    create: {
      name: "Create",
      requestType: NodeServiceCreateRequest,
      requestStream: false,
      responseType: NodeServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Get single blockchain node */
    get: {
      name: "Get",
      requestType: NodeServiceGetRequest,
      requestStream: false,
      responseType: NodeServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** Get nodes belonging to org */
    list: {
      name: "List",
      requestType: NodeServiceListRequest,
      requestStream: false,
      responseType: NodeServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single blockchain node */
    update: {
      name: "Update",
      requestType: NodeServiceUpdateRequest,
      requestStream: false,
      responseType: NodeServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single node */
    delete: {
      name: "Delete",
      requestType: NodeServiceDeleteRequest,
      requestStream: false,
      responseType: NodeServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface NodeServiceImplementation<CallContextExt = {}> {
  /** Create a single blockchain node */
  create(
    request: NodeServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceCreateResponse>>;
  /** Get single blockchain node */
  get(
    request: NodeServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceGetResponse>>;
  /** Get nodes belonging to org */
  list(
    request: NodeServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceListResponse>>;
  /** Update a single blockchain node */
  update(
    request: NodeServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceUpdateResponse>>;
  /** Delete a single node */
  delete(
    request: NodeServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<NodeServiceDeleteResponse>>;
}

export interface NodeServiceClient<CallOptionsExt = {}> {
  /** Create a single blockchain node */
  create(
    request: DeepPartial<NodeServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceCreateResponse>;
  /** Get single blockchain node */
  get(
    request: DeepPartial<NodeServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceGetResponse>;
  /** Get nodes belonging to org */
  list(
    request: DeepPartial<NodeServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceListResponse>;
  /** Update a single blockchain node */
  update(
    request: DeepPartial<NodeServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceUpdateResponse>;
  /** Delete a single node */
  delete(
    request: DeepPartial<NodeServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<NodeServiceDeleteResponse>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
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
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
