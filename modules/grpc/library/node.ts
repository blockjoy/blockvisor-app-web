/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "v1";

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
  hostId: string;
  hostName: string;
  blockchainId: string;
  name: string;
  /**
   * The P2P address of the node on the blockchain. This field is only set as
   * the node is started, so therefore it is optional.
   */
  address?: string | undefined;
  version: string;
  ip?: string | undefined;
  nodeType: Node_NodeType;
  properties: Node_NodeProperty[];
  blockHeight?: number | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  status: Node_NodeStatus;
  syncStatus: Node_SyncStatus;
  containerStatus: Node_ContainerStatus;
  stakingStatus?: Node_StakingStatus | undefined;
  ipGateway: string;
  selfUpdate: boolean;
  network: string;
  blockchainName?:
    | string
    | undefined;
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
  /**
   * The scheduler decides where to place this node. Refer to the documentation
   * of the `NodeScheduler` message for more details.
   */
  scheduler: NodeScheduler | undefined;
}

/**
 * Describe the node's chain related status
 * Generic, NOT chain specific states. These states are used to describe the
 * node's states as seen by the blockchain
 */
export enum Node_NodeStatus {
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
export enum Node_ContainerStatus {
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
  UNRECOGNIZED = -1,
}

/** Describe the node's syncing status */
export enum Node_SyncStatus {
  SYNC_STATUS_UNSPECIFIED = 0,
  SYNC_STATUS_SYNCING = 1,
  SYNC_STATUS_SYNCED = 2,
  UNRECOGNIZED = -1,
}

/** Describe the node's staking status */
export enum Node_StakingStatus {
  STAKING_STATUS_UNSPECIFIED = 0,
  STAKING_STATUS_FOLLOWER = 1,
  STAKING_STATUS_STAKED = 2,
  STAKING_STATUS_STAKING = 3,
  STAKING_STATUS_VALIDATING = 4,
  STAKING_STATUS_CONSENSUS = 5,
  STAKING_STATUS_UNSTAKED = 6,
  UNRECOGNIZED = -1,
}

export enum Node_NodeType {
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

export interface Node_NodeProperty {
  name: string;
  label: string;
  description: string;
  uiType: UiType;
  disabled: boolean;
  required: boolean;
  value?: string | undefined;
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

/** This message is used to create a new node. */
export interface CreateNodeRequest {
  /** The id of the organization for which the node should be created. */
  orgId: string;
  /** The id of the blockchain that shoudl be ran inside the node. */
  blockchainId: string;
  /** The version of the node software that is ran. */
  version: string;
  /** The type of node that you want to create. */
  nodeType: Node_NodeType;
  /** A list of properties. */
  properties: Node_NodeProperty[];
  /**
   * The network that the blockchain will be a part of. Many blockchains have a
   * dedicated test network, such as "goerli" for ethereum.
   */
  network: string;
  /**
   * The scheduler decides where to place this node. Refer to the documentation
   * of the `NodeScheduler` message for more details.
   */
  scheduler: NodeScheduler | undefined;
}

/** Message returned when a node is created. */
export interface CreateNodeResponse {
  /** The actual node that was just created. */
  node: Node | undefined;
}

/**
 * This message is used to read info about a single node. For requests
 * pertaining to multiple nodes, use `ListNodesRequest`.
 */
export interface GetNodeRequest {
  /** This should be the UUID of the node that you want to query. */
  id: string;
}

export interface GetNodeResponse {
  /** The node that was queried will be placed in this field. */
  node: Node | undefined;
}

/**
 * This request is used to query a set of nodes within an org by the parameters
 * that are specified in the `filter` field.
 */
export interface ListNodesRequest {
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
  statuses: Node_NodeStatus[];
  /**
   * If this list is non-empty, only nodes of any of these types will be
   * returned.
   */
  nodeTypes: Node_NodeType[];
  /**
   * If this list is non-empty, only nodes that run a blockchain identified by
   * any of these blockchain ids will be returned.
   */
  blockchainIds: string[];
}

/** This response will contain all the filtered nodes. */
export interface ListNodesResponse {
  /** The nodes that match the filter will be placed in this field. */
  nodes: Node[];
}

/** This request is used for updating a node. */
export interface UpdateNodeRequest {
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
    | Node_ContainerStatus
    | undefined;
  /** Update the P2P address of the blockchain node. */
  address?: string | undefined;
}

export interface UpdateNodeResponse {
}

export interface DeleteNodeRequest {
  id: string;
}

export interface DeleteNodeResponse {
}

function createBaseNode(): Node {
  return {
    id: "",
    orgId: "",
    hostId: "",
    hostName: "",
    blockchainId: "",
    name: "",
    address: undefined,
    version: "",
    ip: undefined,
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
    blockchainName: undefined,
    createdBy: undefined,
    createdByName: undefined,
    createdByEmail: undefined,
    allowIps: [],
    denyIps: [],
    scheduler: undefined,
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
    if (message.hostId !== "") {
      writer.uint32(26).string(message.hostId);
    }
    if (message.hostName !== "") {
      writer.uint32(34).string(message.hostName);
    }
    if (message.blockchainId !== "") {
      writer.uint32(42).string(message.blockchainId);
    }
    if (message.name !== "") {
      writer.uint32(50).string(message.name);
    }
    if (message.address !== undefined) {
      writer.uint32(58).string(message.address);
    }
    if (message.version !== "") {
      writer.uint32(66).string(message.version);
    }
    if (message.ip !== undefined) {
      writer.uint32(74).string(message.ip);
    }
    if (message.nodeType !== 0) {
      writer.uint32(80).int32(message.nodeType);
    }
    for (const v of message.properties) {
      Node_NodeProperty.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.blockHeight !== undefined) {
      writer.uint32(104).uint64(message.blockHeight);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(122).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(130).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(136).int32(message.status);
    }
    if (message.syncStatus !== 0) {
      writer.uint32(144).int32(message.syncStatus);
    }
    if (message.containerStatus !== 0) {
      writer.uint32(96).int32(message.containerStatus);
    }
    if (message.stakingStatus !== undefined) {
      writer.uint32(152).int32(message.stakingStatus);
    }
    if (message.ipGateway !== "") {
      writer.uint32(162).string(message.ipGateway);
    }
    if (message.selfUpdate === true) {
      writer.uint32(168).bool(message.selfUpdate);
    }
    if (message.network !== "") {
      writer.uint32(178).string(message.network);
    }
    if (message.blockchainName !== undefined) {
      writer.uint32(186).string(message.blockchainName);
    }
    if (message.createdBy !== undefined) {
      writer.uint32(194).string(message.createdBy);
    }
    if (message.createdByName !== undefined) {
      writer.uint32(202).string(message.createdByName);
    }
    if (message.createdByEmail !== undefined) {
      writer.uint32(210).string(message.createdByEmail);
    }
    for (const v of message.allowIps) {
      FilteredIpAddr.encode(v!, writer.uint32(218).fork()).ldelim();
    }
    for (const v of message.denyIps) {
      FilteredIpAddr.encode(v!, writer.uint32(226).fork()).ldelim();
    }
    if (message.scheduler !== undefined) {
      NodeScheduler.encode(message.scheduler, writer.uint32(234).fork()).ldelim();
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
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.hostName = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.blockchainId = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.name = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.address = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.version = reader.string();
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 10:
          if (tag != 80) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.properties.push(Node_NodeProperty.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag != 104) {
            break;
          }

          message.blockHeight = longToNumber(reader.uint64() as Long);
          continue;
        case 15:
          if (tag != 122) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag != 130) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 17:
          if (tag != 136) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 18:
          if (tag != 144) {
            break;
          }

          message.syncStatus = reader.int32() as any;
          continue;
        case 12:
          if (tag != 96) {
            break;
          }

          message.containerStatus = reader.int32() as any;
          continue;
        case 19:
          if (tag != 152) {
            break;
          }

          message.stakingStatus = reader.int32() as any;
          continue;
        case 20:
          if (tag != 162) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 21:
          if (tag != 168) {
            break;
          }

          message.selfUpdate = reader.bool();
          continue;
        case 22:
          if (tag != 178) {
            break;
          }

          message.network = reader.string();
          continue;
        case 23:
          if (tag != 186) {
            break;
          }

          message.blockchainName = reader.string();
          continue;
        case 24:
          if (tag != 194) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 25:
          if (tag != 202) {
            break;
          }

          message.createdByName = reader.string();
          continue;
        case 26:
          if (tag != 210) {
            break;
          }

          message.createdByEmail = reader.string();
          continue;
        case 27:
          if (tag != 218) {
            break;
          }

          message.allowIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
        case 28:
          if (tag != 226) {
            break;
          }

          message.denyIps.push(FilteredIpAddr.decode(reader, reader.uint32()));
          continue;
        case 29:
          if (tag != 234) {
            break;
          }

          message.scheduler = NodeScheduler.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
    message.hostId = object.hostId ?? "";
    message.hostName = object.hostName ?? "";
    message.blockchainId = object.blockchainId ?? "";
    message.name = object.name ?? "";
    message.address = object.address ?? undefined;
    message.version = object.version ?? "";
    message.ip = object.ip ?? undefined;
    message.nodeType = object.nodeType ?? 0;
    message.properties = object.properties?.map((e) => Node_NodeProperty.fromPartial(e)) || [];
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
    message.blockchainName = object.blockchainName ?? undefined;
    message.createdBy = object.createdBy ?? undefined;
    message.createdByName = object.createdByName ?? undefined;
    message.createdByEmail = object.createdByEmail ?? undefined;
    message.allowIps = object.allowIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    message.denyIps = object.denyIps?.map((e) => FilteredIpAddr.fromPartial(e)) || [];
    message.scheduler = (object.scheduler !== undefined && object.scheduler !== null)
      ? NodeScheduler.fromPartial(object.scheduler)
      : undefined;
    return message;
  },
};

function createBaseNode_NodeProperty(): Node_NodeProperty {
  return { name: "", label: "", description: "", uiType: 0, disabled: false, required: false, value: undefined };
}

export const Node_NodeProperty = {
  encode(message: Node_NodeProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.uiType !== 0) {
      writer.uint32(32).int32(message.uiType);
    }
    if (message.disabled === true) {
      writer.uint32(40).bool(message.disabled);
    }
    if (message.required === true) {
      writer.uint32(48).bool(message.required);
    }
    if (message.value !== undefined) {
      writer.uint32(58).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Node_NodeProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNode_NodeProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.label = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.uiType = reader.int32() as any;
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.disabled = reader.bool();
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.required = reader.bool();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Node_NodeProperty>): Node_NodeProperty {
    return Node_NodeProperty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Node_NodeProperty>): Node_NodeProperty {
    const message = createBaseNode_NodeProperty();
    message.name = object.name ?? "";
    message.label = object.label ?? "";
    message.description = object.description ?? "";
    message.uiType = object.uiType ?? 0;
    message.disabled = object.disabled ?? false;
    message.required = object.required ?? false;
    message.value = object.value ?? undefined;
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
          if (tag != 8) {
            break;
          }

          message.similarity = reader.int32() as any;
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
          if (tag != 10) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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

function createBaseCreateNodeRequest(): CreateNodeRequest {
  return { orgId: "", blockchainId: "", version: "", nodeType: 0, properties: [], network: "", scheduler: undefined };
}

export const CreateNodeRequest = {
  encode(message: CreateNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
      Node_NodeProperty.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(58).string(message.network);
    }
    if (message.scheduler !== undefined) {
      NodeScheduler.encode(message.scheduler, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateNodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag != 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.blockchainId = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.properties.push(Node_NodeProperty.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.network = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.scheduler = NodeScheduler.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateNodeRequest>): CreateNodeRequest {
    return CreateNodeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateNodeRequest>): CreateNodeRequest {
    const message = createBaseCreateNodeRequest();
    message.orgId = object.orgId ?? "";
    message.blockchainId = object.blockchainId ?? "";
    message.version = object.version ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.properties = object.properties?.map((e) => Node_NodeProperty.fromPartial(e)) || [];
    message.network = object.network ?? "";
    message.scheduler = (object.scheduler !== undefined && object.scheduler !== null)
      ? NodeScheduler.fromPartial(object.scheduler)
      : undefined;
    return message;
  },
};

function createBaseCreateNodeResponse(): CreateNodeResponse {
  return { node: undefined };
}

export const CreateNodeResponse = {
  encode(message: CreateNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateNodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.node = Node.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateNodeResponse>): CreateNodeResponse {
    return CreateNodeResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateNodeResponse>): CreateNodeResponse {
    const message = createBaseCreateNodeResponse();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    return message;
  },
};

function createBaseGetNodeRequest(): GetNodeRequest {
  return { id: "" };
}

export const GetNodeRequest = {
  encode(message: GetNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetNodeRequest>): GetNodeRequest {
    return GetNodeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetNodeRequest>): GetNodeRequest {
    const message = createBaseGetNodeRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetNodeResponse(): GetNodeResponse {
  return { node: undefined };
}

export const GetNodeResponse = {
  encode(message: GetNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.node = Node.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetNodeResponse>): GetNodeResponse {
    return GetNodeResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetNodeResponse>): GetNodeResponse {
    const message = createBaseGetNodeResponse();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    return message;
  },
};

function createBaseListNodesRequest(): ListNodesRequest {
  return { orgId: "", offset: 0, limit: 0, statuses: [], nodeTypes: [], blockchainIds: [] };
}

export const ListNodesRequest = {
  encode(message: ListNodesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNodesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNodesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag == 32) {
            message.statuses.push(reader.int32() as any);
            continue;
          }

          if (tag == 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.statuses.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 5:
          if (tag == 40) {
            message.nodeTypes.push(reader.int32() as any);
            continue;
          }

          if (tag == 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.nodeTypes.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 6:
          if (tag != 50) {
            break;
          }

          message.blockchainIds.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListNodesRequest>): ListNodesRequest {
    return ListNodesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListNodesRequest>): ListNodesRequest {
    const message = createBaseListNodesRequest();
    message.orgId = object.orgId ?? "";
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.statuses = object.statuses?.map((e) => e) || [];
    message.nodeTypes = object.nodeTypes?.map((e) => e) || [];
    message.blockchainIds = object.blockchainIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseListNodesResponse(): ListNodesResponse {
  return { nodes: [] };
}

export const ListNodesResponse = {
  encode(message: ListNodesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nodes) {
      Node.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListNodesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListNodesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.nodes.push(Node.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListNodesResponse>): ListNodesResponse {
    return ListNodesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListNodesResponse>): ListNodesResponse {
    const message = createBaseListNodesResponse();
    message.nodes = object.nodes?.map((e) => Node.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateNodeRequest(): UpdateNodeRequest {
  return { id: "", version: undefined, selfUpdate: undefined, containerStatus: undefined, address: undefined };
}

export const UpdateNodeRequest = {
  encode(message: UpdateNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateNodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.selfUpdate = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.containerStatus = reader.int32() as any;
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateNodeRequest>): UpdateNodeRequest {
    return UpdateNodeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateNodeRequest>): UpdateNodeRequest {
    const message = createBaseUpdateNodeRequest();
    message.id = object.id ?? "";
    message.version = object.version ?? undefined;
    message.selfUpdate = object.selfUpdate ?? undefined;
    message.containerStatus = object.containerStatus ?? undefined;
    message.address = object.address ?? undefined;
    return message;
  },
};

function createBaseUpdateNodeResponse(): UpdateNodeResponse {
  return {};
}

export const UpdateNodeResponse = {
  encode(_: UpdateNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateNodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateNodeResponse>): UpdateNodeResponse {
    return UpdateNodeResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UpdateNodeResponse>): UpdateNodeResponse {
    const message = createBaseUpdateNodeResponse();
    return message;
  },
};

function createBaseDeleteNodeRequest(): DeleteNodeRequest {
  return { id: "" };
}

export const DeleteNodeRequest = {
  encode(message: DeleteNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<DeleteNodeRequest>): DeleteNodeRequest {
    return DeleteNodeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DeleteNodeRequest>): DeleteNodeRequest {
    const message = createBaseDeleteNodeRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeleteNodeResponse(): DeleteNodeResponse {
  return {};
}

export const DeleteNodeResponse = {
  encode(_: DeleteNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteNodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteNodeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<DeleteNodeResponse>): DeleteNodeResponse {
    return DeleteNodeResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DeleteNodeResponse>): DeleteNodeResponse {
    const message = createBaseDeleteNodeResponse();
    return message;
  },
};

export type NodesDefinition = typeof NodesDefinition;
export const NodesDefinition = {
  name: "Nodes",
  fullName: "v1.Nodes",
  methods: {
    /** Get single blockchain node */
    get: {
      name: "Get",
      requestType: GetNodeRequest,
      requestStream: false,
      responseType: GetNodeResponse,
      responseStream: false,
      options: {},
    },
    /** Get nodes belonging to org */
    list: {
      name: "List",
      requestType: ListNodesRequest,
      requestStream: false,
      responseType: ListNodesResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single blockchain node */
    create: {
      name: "Create",
      requestType: CreateNodeRequest,
      requestStream: false,
      responseType: CreateNodeResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single blockchain node */
    update: {
      name: "Update",
      requestType: UpdateNodeRequest,
      requestStream: false,
      responseType: UpdateNodeResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single node */
    delete: {
      name: "Delete",
      requestType: DeleteNodeRequest,
      requestStream: false,
      responseType: DeleteNodeResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface NodesServiceImplementation<CallContextExt = {}> {
  /** Get single blockchain node */
  get(request: GetNodeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetNodeResponse>>;
  /** Get nodes belonging to org */
  list(request: ListNodesRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ListNodesResponse>>;
  /** Create a single blockchain node */
  create(request: CreateNodeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CreateNodeResponse>>;
  /** Update a single blockchain node */
  update(request: UpdateNodeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UpdateNodeResponse>>;
  /** Delete a single node */
  delete(request: DeleteNodeRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DeleteNodeResponse>>;
}

export interface NodesClient<CallOptionsExt = {}> {
  /** Get single blockchain node */
  get(request: DeepPartial<GetNodeRequest>, options?: CallOptions & CallOptionsExt): Promise<GetNodeResponse>;
  /** Get nodes belonging to org */
  list(request: DeepPartial<ListNodesRequest>, options?: CallOptions & CallOptionsExt): Promise<ListNodesResponse>;
  /** Create a single blockchain node */
  create(request: DeepPartial<CreateNodeRequest>, options?: CallOptions & CallOptionsExt): Promise<CreateNodeResponse>;
  /** Update a single blockchain node */
  update(request: DeepPartial<UpdateNodeRequest>, options?: CallOptions & CallOptionsExt): Promise<UpdateNodeResponse>;
  /** Delete a single node */
  delete(request: DeepPartial<DeleteNodeRequest>, options?: CallOptions & CallOptionsExt): Promise<DeleteNodeResponse>;
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
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
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
