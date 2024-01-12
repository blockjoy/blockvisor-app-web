/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { NetworkConfig } from "../common/v1/blockchain";
import { ArchiveLocation, ImageIdentifier, RhaiPlugin } from "../common/v1/image";
import { NodeType, UiType } from "../common/v1/node";

export const protobufPackage = "blockjoy.v1";

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

export interface BlockchainServiceGetRequest {
  id: string;
  orgId?: string | undefined;
}

export interface BlockchainServiceGetResponse {
  blockchain: Blockchain | undefined;
}

export interface BlockchainServiceGetImageRequest {
  id: ImageIdentifier | undefined;
}

export interface BlockchainServiceGetImageResponse {
  location: ArchiveLocation | undefined;
}

export interface BlockchainServiceGetNetworksRequest {
  id: ImageIdentifier | undefined;
}

export interface BlockchainServiceGetNetworksResponse {
  networks: NetworkConfig[];
}

export interface BlockchainServiceGetPluginRequest {
  id: ImageIdentifier | undefined;
}

export interface BlockchainServiceGetPluginResponse {
  plugin: RhaiPlugin | undefined;
}

export interface BlockchainServiceGetRequirementsRequest {
  id: ImageIdentifier | undefined;
}

export interface BlockchainServiceGetRequirementsResponse {
  vcpuCount: number;
  memSizeBytes: number;
  diskSizeBytes: number;
}

export interface BlockchainServiceListRequest {
  orgId?: string | undefined;
}

export interface BlockchainServiceListResponse {
  blockchains: Blockchain[];
}

export interface BlockchainServiceListImageVersionsRequest {
  protocol: string;
  nodeType: NodeType;
}

export interface BlockchainServiceListImageVersionsResponse {
  identifiers: ImageIdentifier[];
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
  networks: NetworkConfig[];
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
  /** The node type of the new version. */
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

export interface BlockchainStats {
  nodeCount?: number | undefined;
  nodeCountActive?: number | undefined;
  nodeCountSyncing?: number | undefined;
  nodeCountProvisioning?: number | undefined;
  nodeCountFailed?: number | undefined;
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

function createBaseBlockchainServiceGetImageRequest(): BlockchainServiceGetImageRequest {
  return { id: undefined };
}

export const BlockchainServiceGetImageRequest = {
  encode(message: BlockchainServiceGetImageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetImageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetImageRequest>): BlockchainServiceGetImageRequest {
    return BlockchainServiceGetImageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetImageRequest>): BlockchainServiceGetImageRequest {
    const message = createBaseBlockchainServiceGetImageRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetImageResponse(): BlockchainServiceGetImageResponse {
  return { location: undefined };
}

export const BlockchainServiceGetImageResponse = {
  encode(message: BlockchainServiceGetImageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      ArchiveLocation.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetImageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.location = ArchiveLocation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetImageResponse>): BlockchainServiceGetImageResponse {
    return BlockchainServiceGetImageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetImageResponse>): BlockchainServiceGetImageResponse {
    const message = createBaseBlockchainServiceGetImageResponse();
    message.location = (object.location !== undefined && object.location !== null)
      ? ArchiveLocation.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetNetworksRequest(): BlockchainServiceGetNetworksRequest {
  return { id: undefined };
}

export const BlockchainServiceGetNetworksRequest = {
  encode(message: BlockchainServiceGetNetworksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetNetworksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetNetworksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetNetworksRequest>): BlockchainServiceGetNetworksRequest {
    return BlockchainServiceGetNetworksRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetNetworksRequest>): BlockchainServiceGetNetworksRequest {
    const message = createBaseBlockchainServiceGetNetworksRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetNetworksResponse(): BlockchainServiceGetNetworksResponse {
  return { networks: [] };
}

export const BlockchainServiceGetNetworksResponse = {
  encode(message: BlockchainServiceGetNetworksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.networks) {
      NetworkConfig.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetNetworksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetNetworksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.networks.push(NetworkConfig.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetNetworksResponse>): BlockchainServiceGetNetworksResponse {
    return BlockchainServiceGetNetworksResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetNetworksResponse>): BlockchainServiceGetNetworksResponse {
    const message = createBaseBlockchainServiceGetNetworksResponse();
    message.networks = object.networks?.map((e) => NetworkConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainServiceGetPluginRequest(): BlockchainServiceGetPluginRequest {
  return { id: undefined };
}

export const BlockchainServiceGetPluginRequest = {
  encode(message: BlockchainServiceGetPluginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetPluginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetPluginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetPluginRequest>): BlockchainServiceGetPluginRequest {
    return BlockchainServiceGetPluginRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetPluginRequest>): BlockchainServiceGetPluginRequest {
    const message = createBaseBlockchainServiceGetPluginRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetPluginResponse(): BlockchainServiceGetPluginResponse {
  return { plugin: undefined };
}

export const BlockchainServiceGetPluginResponse = {
  encode(message: BlockchainServiceGetPluginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plugin !== undefined) {
      RhaiPlugin.encode(message.plugin, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetPluginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetPluginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plugin = RhaiPlugin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetPluginResponse>): BlockchainServiceGetPluginResponse {
    return BlockchainServiceGetPluginResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetPluginResponse>): BlockchainServiceGetPluginResponse {
    const message = createBaseBlockchainServiceGetPluginResponse();
    message.plugin = (object.plugin !== undefined && object.plugin !== null)
      ? RhaiPlugin.fromPartial(object.plugin)
      : undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetRequirementsRequest(): BlockchainServiceGetRequirementsRequest {
  return { id: undefined };
}

export const BlockchainServiceGetRequirementsRequest = {
  encode(message: BlockchainServiceGetRequirementsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetRequirementsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetRequirementsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetRequirementsRequest>): BlockchainServiceGetRequirementsRequest {
    return BlockchainServiceGetRequirementsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetRequirementsRequest>): BlockchainServiceGetRequirementsRequest {
    const message = createBaseBlockchainServiceGetRequirementsRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseBlockchainServiceGetRequirementsResponse(): BlockchainServiceGetRequirementsResponse {
  return { vcpuCount: 0, memSizeBytes: 0, diskSizeBytes: 0 };
}

export const BlockchainServiceGetRequirementsResponse = {
  encode(message: BlockchainServiceGetRequirementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vcpuCount !== 0) {
      writer.uint32(8).uint32(message.vcpuCount);
    }
    if (message.memSizeBytes !== 0) {
      writer.uint32(16).uint64(message.memSizeBytes);
    }
    if (message.diskSizeBytes !== 0) {
      writer.uint32(24).uint64(message.diskSizeBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceGetRequirementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceGetRequirementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.vcpuCount = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.memSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.diskSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceGetRequirementsResponse>): BlockchainServiceGetRequirementsResponse {
    return BlockchainServiceGetRequirementsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetRequirementsResponse>): BlockchainServiceGetRequirementsResponse {
    const message = createBaseBlockchainServiceGetRequirementsResponse();
    message.vcpuCount = object.vcpuCount ?? 0;
    message.memSizeBytes = object.memSizeBytes ?? 0;
    message.diskSizeBytes = object.diskSizeBytes ?? 0;
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

function createBaseBlockchainServiceListImageVersionsRequest(): BlockchainServiceListImageVersionsRequest {
  return { protocol: "", nodeType: 0 };
}

export const BlockchainServiceListImageVersionsRequest = {
  encode(message: BlockchainServiceListImageVersionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocol !== "") {
      writer.uint32(10).string(message.protocol);
    }
    if (message.nodeType !== 0) {
      writer.uint32(16).int32(message.nodeType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceListImageVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceListImageVersionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocol = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceListImageVersionsRequest>): BlockchainServiceListImageVersionsRequest {
    return BlockchainServiceListImageVersionsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainServiceListImageVersionsRequest>,
  ): BlockchainServiceListImageVersionsRequest {
    const message = createBaseBlockchainServiceListImageVersionsRequest();
    message.protocol = object.protocol ?? "";
    message.nodeType = object.nodeType ?? 0;
    return message;
  },
};

function createBaseBlockchainServiceListImageVersionsResponse(): BlockchainServiceListImageVersionsResponse {
  return { identifiers: [] };
}

export const BlockchainServiceListImageVersionsResponse = {
  encode(message: BlockchainServiceListImageVersionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.identifiers) {
      ImageIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceListImageVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceListImageVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifiers.push(ImageIdentifier.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainServiceListImageVersionsResponse>): BlockchainServiceListImageVersionsResponse {
    return BlockchainServiceListImageVersionsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainServiceListImageVersionsResponse>,
  ): BlockchainServiceListImageVersionsResponse {
    const message = createBaseBlockchainServiceListImageVersionsResponse();
    message.identifiers = object.identifiers?.map((e) => ImageIdentifier.fromPartial(e)) || [];
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
      NetworkConfig.encode(v!, writer.uint32(50).fork()).ldelim();
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

          message.networks.push(NetworkConfig.decode(reader, reader.uint32()));
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
    message.networks = object.networks?.map((e) => NetworkConfig.fromPartial(e)) || [];
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

/** Service for blockchain-specific requests. */
export type BlockchainServiceDefinition = typeof BlockchainServiceDefinition;
export const BlockchainServiceDefinition = {
  name: "BlockchainService",
  fullName: "blockjoy.v1.BlockchainService",
  methods: {
    /** Get a single blockchain's info from its id. */
    get: {
      name: "Get",
      requestType: BlockchainServiceGetRequest,
      requestStream: false,
      responseType: BlockchainServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** Get an image archive location for some image identifier. */
    getImage: {
      name: "GetImage",
      requestType: BlockchainServiceGetImageRequest,
      requestStream: false,
      responseType: BlockchainServiceGetImageResponse,
      responseStream: false,
      options: {},
    },
    /** Get a blockchain plugin for some image identifier. */
    getPlugin: {
      name: "GetPlugin",
      requestType: BlockchainServiceGetPluginRequest,
      requestStream: false,
      responseType: BlockchainServiceGetPluginResponse,
      responseStream: false,
      options: {},
    },
    /** Get hardware requirements for some image identifier. */
    getRequirements: {
      name: "GetRequirements",
      requestType: BlockchainServiceGetRequirementsRequest,
      requestStream: false,
      responseType: BlockchainServiceGetRequirementsResponse,
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
    /** List node versions for some protocol and node type. */
    listImageVersions: {
      name: "ListImageVersions",
      requestType: BlockchainServiceListImageVersionsRequest,
      requestStream: false,
      responseType: BlockchainServiceListImageVersionsResponse,
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
  /** Get a single blockchain's info from its id. */
  get(
    request: BlockchainServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceGetResponse>>;
  /** Get an image archive location for some image identifier. */
  getImage(
    request: BlockchainServiceGetImageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceGetImageResponse>>;
  /** Get a blockchain plugin for some image identifier. */
  getPlugin(
    request: BlockchainServiceGetPluginRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceGetPluginResponse>>;
  /** Get hardware requirements for some image identifier. */
  getRequirements(
    request: BlockchainServiceGetRequirementsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceGetRequirementsResponse>>;
  /** Returns a list of all blockchains. */
  list(
    request: BlockchainServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceListResponse>>;
  /** List node versions for some protocol and node type. */
  listImageVersions(
    request: BlockchainServiceListImageVersionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainServiceListImageVersionsResponse>>;
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
  /** Get a single blockchain's info from its id. */
  get(
    request: DeepPartial<BlockchainServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceGetResponse>;
  /** Get an image archive location for some image identifier. */
  getImage(
    request: DeepPartial<BlockchainServiceGetImageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceGetImageResponse>;
  /** Get a blockchain plugin for some image identifier. */
  getPlugin(
    request: DeepPartial<BlockchainServiceGetPluginRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceGetPluginResponse>;
  /** Get hardware requirements for some image identifier. */
  getRequirements(
    request: DeepPartial<BlockchainServiceGetRequirementsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceGetRequirementsResponse>;
  /** Returns a list of all blockchains. */
  list(
    request: DeepPartial<BlockchainServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceListResponse>;
  /** List node versions for some protocol and node type. */
  listImageVersions(
    request: DeepPartial<BlockchainServiceListImageVersionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainServiceListImageVersionsResponse>;
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

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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
