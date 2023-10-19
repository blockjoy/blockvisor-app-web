/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { NodeType, UiType } from "./node";

export const protobufPackage = "blockjoy.v1";

export enum BlockchainNetworkType {
  BLOCKCHAIN_NETWORK_TYPE_UNSPECIFIED = 0,
  BLOCKCHAIN_NETWORK_TYPE_DEV = 1,
  BLOCKCHAIN_NETWORK_TYPE_TEST = 2,
  BLOCKCHAIN_NETWORK_TYPE_MAIN = 3,
  UNRECOGNIZED = -1,
}

export interface Blockchain {
  id: string;
  name: string;
  description?: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  projectUrl?: string | undefined;
  repoUrl?:
    | string
    | undefined;
  /** All possible node types that can be created for this chain. */
  nodeTypes: BlockchainNodeType[];
  /** Optional statistics around the state of this chain. */
  stats: BlockchainStats | undefined;
}

export interface BlockchainStats {
  nodeCount?: number | undefined;
  nodeCountActive?: number | undefined;
  nodeCountSyncing?: number | undefined;
  nodeCountProvisioning?: number | undefined;
  nodeCountFailed?: number | undefined;
}

export interface BlockchainServiceGetRequest {
  id: string;
  orgId?: string | undefined;
}

export interface BlockchainServiceGetResponse {
  blockchain: Blockchain | undefined;
}

export interface BlockchainServiceListRequest {
  orgId?: string | undefined;
}

export interface BlockchainServiceListResponse {
  blockchains: Blockchain[];
}

export interface BlockchainNodeType {
  id: string;
  nodeType: NodeType;
  description?: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  versions: BlockchainVersion[];
}

export interface BlockchainVersion {
  id: string;
  version: string;
  description?: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  networks: BlockchainNetwork[];
  properties: BlockchainProperty[];
}

export interface BlockchainServiceAddNodeTypeRequest {
  /** The blockchain UUID for the new `node_type`. */
  id: string;
  /** The new `node_type` supported by the blockchain. */
  nodeType: NodeType;
  /** A readable description of this new `node_type`. */
  description?: string | undefined;
}

export interface BlockchainServiceAddNodeTypeResponse {
}

export interface BlockchainServiceAddVersionRequest {
  /** The blockchain UUID to add the new version to. */
  id: string;
  /** A semantically parseable representation of the new version. */
  version: string;
  /** A readable description of the new version. */
  description?:
    | string
    | undefined;
  /** The node type of the new version (with cookbook metadata available). */
  nodeType: NodeType;
  /** The properties applicable to this `version` and `node_type`. */
  properties: BlockchainProperty[];
}

export interface BlockchainServiceAddVersionResponse {
  version: BlockchainVersion | undefined;
}

/**
 * A property that is supported by a node of a particular:
 * 1. blockchain type,
 * 2. node type,
 * 3. version.
 * When a blockchain node is created, a list of properties must be submitted by
 * the caller. The properties that are required / allowed are defined by these
 * properties here.
 */
export interface BlockchainProperty {
  /** The name of this property, i.e. `validator-key`. */
  name: string;
  /** A nice looking name that can be used for display purposes. */
  displayName: string;
  /**
   * If there is one, this field contains the default value that should be
   * used if the user supplies no value.
   */
  default?:
    | string
    | undefined;
  /**
   * The way this field should be displayed when a node with this property is
   * created.
   */
  uiType: UiType;
  /**
   * If this is true then the property _must_ be supplied when a node of this
   * type and version is created. If this is false, then the property is treated
   * as optional and may be omitted.
   */
  required: boolean;
}

export interface BlockchainNetwork {
  name: string;
  url: string;
  netType: BlockchainNetworkType;
}

function createBaseBlockchain(): Blockchain {
  return {
    id: "",
    name: "",
    description: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    projectUrl: undefined,
    repoUrl: undefined,
    nodeTypes: [],
    stats: undefined,
  };
}

export const Blockchain = {
  encode(message: Blockchain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.projectUrl !== undefined) {
      writer.uint32(50).string(message.projectUrl);
    }
    if (message.repoUrl !== undefined) {
      writer.uint32(58).string(message.repoUrl);
    }
    for (const v of message.nodeTypes) {
      BlockchainNodeType.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.stats !== undefined) {
      BlockchainStats.encode(message.stats, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Blockchain {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchain();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.projectUrl = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.repoUrl = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.nodeTypes.push(BlockchainNodeType.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.stats = BlockchainStats.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Blockchain>): Blockchain {
    return Blockchain.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Blockchain>): Blockchain {
    const message = createBaseBlockchain();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.projectUrl = object.projectUrl ?? undefined;
    message.repoUrl = object.repoUrl ?? undefined;
    message.nodeTypes = object.nodeTypes?.map((e) => BlockchainNodeType.fromPartial(e)) || [];
    message.stats = (object.stats !== undefined && object.stats !== null)
      ? BlockchainStats.fromPartial(object.stats)
      : undefined;
    return message;
  },
};

function createBaseBlockchainStats(): BlockchainStats {
  return {
    nodeCount: undefined,
    nodeCountActive: undefined,
    nodeCountSyncing: undefined,
    nodeCountProvisioning: undefined,
    nodeCountFailed: undefined,
  };
}

export const BlockchainStats = {
  encode(message: BlockchainStats, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeCount !== undefined) {
      writer.uint32(8).uint64(message.nodeCount);
    }
    if (message.nodeCountActive !== undefined) {
      writer.uint32(16).uint64(message.nodeCountActive);
    }
    if (message.nodeCountSyncing !== undefined) {
      writer.uint32(24).uint64(message.nodeCountSyncing);
    }
    if (message.nodeCountProvisioning !== undefined) {
      writer.uint32(32).uint64(message.nodeCountProvisioning);
    }
    if (message.nodeCountFailed !== undefined) {
      writer.uint32(40).uint64(message.nodeCountFailed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainStats {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.nodeCount = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nodeCountActive = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nodeCountSyncing = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nodeCountProvisioning = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.nodeCountFailed = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainStats>): BlockchainStats {
    return BlockchainStats.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainStats>): BlockchainStats {
    const message = createBaseBlockchainStats();
    message.nodeCount = object.nodeCount ?? undefined;
    message.nodeCountActive = object.nodeCountActive ?? undefined;
    message.nodeCountSyncing = object.nodeCountSyncing ?? undefined;
    message.nodeCountProvisioning = object.nodeCountProvisioning ?? undefined;
    message.nodeCountFailed = object.nodeCountFailed ?? undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetRequest(): BlockchainServiceGetRequest {
  return { id: "", orgId: undefined };
}

export const BlockchainServiceGetRequest = {
  encode(message: BlockchainServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetRequest>): BlockchainServiceGetRequest {
    return BlockchainServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetRequest>): BlockchainServiceGetRequest {
    const message = createBaseBlockchainServiceGetRequest();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetResponse(): BlockchainServiceGetResponse {
  return { blockchain: undefined };
}

export const BlockchainServiceGetResponse = {
  encode(message: BlockchainServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockchain !== undefined) {
      Blockchain.encode(message.blockchain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.blockchain = Blockchain.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetResponse>): BlockchainServiceGetResponse {
    return BlockchainServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetResponse>): BlockchainServiceGetResponse {
    const message = createBaseBlockchainServiceGetResponse();
    message.blockchain = (object.blockchain !== undefined && object.blockchain !== null)
      ? Blockchain.fromPartial(object.blockchain)
      : undefined;
    return message;
  },
};

function createBaseBlockchainServiceListRequest(): BlockchainServiceListRequest {
  return { orgId: undefined };
}

export const BlockchainServiceListRequest = {
  encode(message: BlockchainServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  create(base?: DeepPartial<BlockchainServiceListRequest>): BlockchainServiceListRequest {
    return BlockchainServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceListRequest>): BlockchainServiceListRequest {
    const message = createBaseBlockchainServiceListRequest();
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseBlockchainServiceListResponse(): BlockchainServiceListResponse {
  return { blockchains: [] };
}

export const BlockchainServiceListResponse = {
  encode(message: BlockchainServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.blockchains) {
      Blockchain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.blockchains.push(Blockchain.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceListResponse>): BlockchainServiceListResponse {
    return BlockchainServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceListResponse>): BlockchainServiceListResponse {
    const message = createBaseBlockchainServiceListResponse();
    message.blockchains = object.blockchains?.map((e) => Blockchain.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainNodeType(): BlockchainNodeType {
  return { id: "", nodeType: 0, description: undefined, createdAt: undefined, updatedAt: undefined, versions: [] };
}

export const BlockchainNodeType = {
  encode(message: BlockchainNodeType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.nodeType !== 0) {
      writer.uint32(16).int32(message.nodeType);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.versions) {
      BlockchainVersion.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainNodeType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainNodeType();
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
          if (tag !== 16) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.versions.push(BlockchainVersion.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainNodeType>): BlockchainNodeType {
    return BlockchainNodeType.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainNodeType>): BlockchainNodeType {
    const message = createBaseBlockchainNodeType();
    message.id = object.id ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.description = object.description ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.versions = object.versions?.map((e) => BlockchainVersion.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainVersion(): BlockchainVersion {
  return {
    id: "",
    version: "",
    description: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    networks: [],
    properties: [],
  };
}

export const BlockchainVersion = {
  encode(message: BlockchainVersion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.networks) {
      BlockchainNetwork.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.properties) {
      BlockchainProperty.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainVersion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainVersion();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.networks.push(BlockchainNetwork.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.properties.push(BlockchainProperty.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainVersion>): BlockchainVersion {
    return BlockchainVersion.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainVersion>): BlockchainVersion {
    const message = createBaseBlockchainVersion();
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    message.description = object.description ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.networks = object.networks?.map((e) => BlockchainNetwork.fromPartial(e)) || [];
    message.properties = object.properties?.map((e) => BlockchainProperty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainServiceAddNodeTypeRequest(): BlockchainServiceAddNodeTypeRequest {
  return { id: "", nodeType: 0, description: undefined };
}

export const BlockchainServiceAddNodeTypeRequest = {
  encode(message: BlockchainServiceAddNodeTypeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.nodeType !== 0) {
      writer.uint32(16).int32(message.nodeType);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceAddNodeTypeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceAddNodeTypeRequest();
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
          if (tag !== 16) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
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

  create(base?: DeepPartial<BlockchainServiceAddNodeTypeRequest>): BlockchainServiceAddNodeTypeRequest {
    return BlockchainServiceAddNodeTypeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceAddNodeTypeRequest>): BlockchainServiceAddNodeTypeRequest {
    const message = createBaseBlockchainServiceAddNodeTypeRequest();
    message.id = object.id ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseBlockchainServiceAddNodeTypeResponse(): BlockchainServiceAddNodeTypeResponse {
  return {};
}

export const BlockchainServiceAddNodeTypeResponse = {
  encode(_: BlockchainServiceAddNodeTypeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceAddNodeTypeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceAddNodeTypeResponse();
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

  create(base?: DeepPartial<BlockchainServiceAddNodeTypeResponse>): BlockchainServiceAddNodeTypeResponse {
    return BlockchainServiceAddNodeTypeResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<BlockchainServiceAddNodeTypeResponse>): BlockchainServiceAddNodeTypeResponse {
    const message = createBaseBlockchainServiceAddNodeTypeResponse();
    return message;
  },
};

function createBaseBlockchainServiceAddVersionRequest(): BlockchainServiceAddVersionRequest {
  return { id: "", version: "", description: undefined, nodeType: 0, properties: [] };
}

export const BlockchainServiceAddVersionRequest = {
  encode(message: BlockchainServiceAddVersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.nodeType !== 0) {
      writer.uint32(32).int32(message.nodeType);
    }
    for (const v of message.properties) {
      BlockchainProperty.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceAddVersionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceAddVersionRequest();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.properties.push(BlockchainProperty.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceAddVersionRequest>): BlockchainServiceAddVersionRequest {
    return BlockchainServiceAddVersionRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceAddVersionRequest>): BlockchainServiceAddVersionRequest {
    const message = createBaseBlockchainServiceAddVersionRequest();
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    message.description = object.description ?? undefined;
    message.nodeType = object.nodeType ?? 0;
    message.properties = object.properties?.map((e) => BlockchainProperty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainServiceAddVersionResponse(): BlockchainServiceAddVersionResponse {
  return { version: undefined };
}

export const BlockchainServiceAddVersionResponse = {
  encode(message: BlockchainServiceAddVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== undefined) {
      BlockchainVersion.encode(message.version, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceAddVersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceAddVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = BlockchainVersion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceAddVersionResponse>): BlockchainServiceAddVersionResponse {
    return BlockchainServiceAddVersionResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceAddVersionResponse>): BlockchainServiceAddVersionResponse {
    const message = createBaseBlockchainServiceAddVersionResponse();
    message.version = (object.version !== undefined && object.version !== null)
      ? BlockchainVersion.fromPartial(object.version)
      : undefined;
    return message;
  },
};

function createBaseBlockchainProperty(): BlockchainProperty {
  return { name: "", displayName: "", default: undefined, uiType: 0, required: false };
}

export const BlockchainProperty = {
  encode(message: BlockchainProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.default !== undefined) {
      writer.uint32(26).string(message.default);
    }
    if (message.uiType !== 0) {
      writer.uint32(32).int32(message.uiType);
    }
    if (message.required === true) {
      writer.uint32(40).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainProperty();
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
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.default = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.uiType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.required = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainProperty>): BlockchainProperty {
    return BlockchainProperty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainProperty>): BlockchainProperty {
    const message = createBaseBlockchainProperty();
    message.name = object.name ?? "";
    message.displayName = object.displayName ?? "";
    message.default = object.default ?? undefined;
    message.uiType = object.uiType ?? 0;
    message.required = object.required ?? false;
    return message;
  },
};

function createBaseBlockchainNetwork(): BlockchainNetwork {
  return { name: "", url: "", netType: 0 };
}

export const BlockchainNetwork = {
  encode(message: BlockchainNetwork, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.netType !== 0) {
      writer.uint32(24).int32(message.netType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainNetwork {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainNetwork();
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
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.netType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainNetwork>): BlockchainNetwork {
    return BlockchainNetwork.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainNetwork>): BlockchainNetwork {
    const message = createBaseBlockchainNetwork();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    message.netType = object.netType ?? 0;
    return message;
  },
};

/** Blockchain related service. */
export type BlockchainServiceDefinition = typeof BlockchainServiceDefinition;
export const BlockchainServiceDefinition = {
  name: "BlockchainService",
  fullName: "blockjoy.v1.BlockchainService",
  methods: {
    /** Returns a single blockchain as identified by its id. */
    get: {
      name: "Get",
      requestType: BlockchainServiceGetRequest,
      requestStream: false,
      responseType: BlockchainServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** Returns a list of all blockchains. */
    list: {
      name: "List",
      requestType: BlockchainServiceListRequest,
      requestStream: false,
      responseType: BlockchainServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Add a new supported blockchain `node_type`. */
    addNodeType: {
      name: "AddNodeType",
      requestType: BlockchainServiceAddNodeTypeRequest,
      requestStream: false,
      responseType: BlockchainServiceAddNodeTypeResponse,
      responseStream: false,
      options: {},
    },
    /** Add a new blockchain version. */
    addVersion: {
      name: "AddVersion",
      requestType: BlockchainServiceAddVersionRequest,
      requestStream: false,
      responseType: BlockchainServiceAddVersionResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface BlockchainServiceImplementation<CallContextExt = {}> {
  /** Returns a single blockchain as identified by its id. */
  get(
    request: BlockchainServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceGetResponse>>;
  /** Returns a list of all blockchains. */
  list(
    request: BlockchainServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceListResponse>>;
  /** Add a new supported blockchain `node_type`. */
  addNodeType(
    request: BlockchainServiceAddNodeTypeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceAddNodeTypeResponse>>;
  /** Add a new blockchain version. */
  addVersion(
    request: BlockchainServiceAddVersionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceAddVersionResponse>>;
}

export interface BlockchainServiceClient<CallOptionsExt = {}> {
  /** Returns a single blockchain as identified by its id. */
  get(
    request: DeepPartial<BlockchainServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceGetResponse>;
  /** Returns a list of all blockchains. */
  list(
    request: DeepPartial<BlockchainServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceListResponse>;
  /** Add a new supported blockchain `node_type`. */
  addNodeType(
    request: DeepPartial<BlockchainServiceAddNodeTypeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceAddNodeTypeResponse>;
  /** Add a new blockchain version. */
  addVersion(
    request: DeepPartial<BlockchainServiceAddVersionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceAddVersionResponse>;
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
