/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { NodeType, UiType } from "./node";

export const protobufPackage = "blockjoy.v1";

export enum BlockchainStatus {
  BLOCKCHAIN_STATUS_UNSPECIFIED = 0,
  BLOCKCHAIN_STATUS_DEVELOPMENT = 1,
  BLOCKCHAIN_STATUS_ALPHA = 2,
  BLOCKCHAIN_STATUS_BETA = 3,
  BLOCKCHAIN_STATUS_PRODUCTION = 4,
  BLOCKCHAIN_STATUS_DELETED = 5,
  UNRECOGNIZED = -1,
}

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
  description: string;
  status: BlockchainStatus;
  projectUrl?: string | undefined;
  repoUrl?: string | undefined;
  version?: string | undefined;
  createdAt: Date | undefined;
  updatedAt?:
    | Date
    | undefined;
  /**
   * This list contains all the possible node types that can be created for this
   * kind of blockchain.
   */
  nodesTypes: SupportedNodeType[];
  networks: BlockchainNetwork[];
}

export interface BlockchainServiceGetRequest {
  id: string;
}

export interface BlockchainServiceGetResponse {
  blockchain: Blockchain | undefined;
}

export interface BlockchainServiceListRequest {
}

export interface BlockchainServiceListResponse {
  blockchains: Blockchain[];
}

export interface SupportedNodeType {
  nodeType: NodeType;
  version: string;
  properties: SupportedNodeProperty[];
}

export interface SupportedNodeProperty {
  name: string;
  default?: string | undefined;
  uiType: UiType;
  disabled: boolean;
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
    description: "",
    status: 0,
    projectUrl: undefined,
    repoUrl: undefined,
    version: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    nodesTypes: [],
    networks: [],
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
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    if (message.projectUrl !== undefined) {
      writer.uint32(42).string(message.projectUrl);
    }
    if (message.repoUrl !== undefined) {
      writer.uint32(50).string(message.repoUrl);
    }
    if (message.version !== undefined) {
      writer.uint32(58).string(message.version);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(66).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.nodesTypes) {
      SupportedNodeType.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.networks) {
      BlockchainNetwork.encode(v!, writer.uint32(90).fork()).ldelim();
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
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.name = reader.string();
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

          message.status = reader.int32() as any;
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.projectUrl = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.repoUrl = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.version = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.nodesTypes.push(SupportedNodeType.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.networks.push(BlockchainNetwork.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
    message.description = object.description ?? "";
    message.status = object.status ?? 0;
    message.projectUrl = object.projectUrl ?? undefined;
    message.repoUrl = object.repoUrl ?? undefined;
    message.version = object.version ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.nodesTypes = object.nodesTypes?.map((e) => SupportedNodeType.fromPartial(e)) || [];
    message.networks = object.networks?.map((e) => BlockchainNetwork.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainServiceGetRequest(): BlockchainServiceGetRequest {
  return { id: "" };
}

export const BlockchainServiceGetRequest = {
  encode(message: BlockchainServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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

  create(base?: DeepPartial<BlockchainServiceGetRequest>): BlockchainServiceGetRequest {
    return BlockchainServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainServiceGetRequest>): BlockchainServiceGetRequest {
    const message = createBaseBlockchainServiceGetRequest();
    message.id = object.id ?? "";
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
          if (tag != 10) {
            break;
          }

          message.blockchain = Blockchain.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
  return {};
}

export const BlockchainServiceListRequest = {
  encode(_: BlockchainServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainServiceListRequest();
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

  create(base?: DeepPartial<BlockchainServiceListRequest>): BlockchainServiceListRequest {
    return BlockchainServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<BlockchainServiceListRequest>): BlockchainServiceListRequest {
    const message = createBaseBlockchainServiceListRequest();
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
          if (tag != 10) {
            break;
          }

          message.blockchains.push(Blockchain.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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

function createBaseSupportedNodeType(): SupportedNodeType {
  return { nodeType: 0, version: "", properties: [] };
}

export const SupportedNodeType = {
  encode(message: SupportedNodeType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeType !== 0) {
      writer.uint32(8).int32(message.nodeType);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    for (const v of message.properties) {
      SupportedNodeProperty.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SupportedNodeType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupportedNodeType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.properties.push(SupportedNodeProperty.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SupportedNodeType>): SupportedNodeType {
    return SupportedNodeType.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SupportedNodeType>): SupportedNodeType {
    const message = createBaseSupportedNodeType();
    message.nodeType = object.nodeType ?? 0;
    message.version = object.version ?? "";
    message.properties = object.properties?.map((e) => SupportedNodeProperty.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSupportedNodeProperty(): SupportedNodeProperty {
  return { name: "", default: undefined, uiType: 0, disabled: false, required: false };
}

export const SupportedNodeProperty = {
  encode(message: SupportedNodeProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.default !== undefined) {
      writer.uint32(18).string(message.default);
    }
    if (message.uiType !== 0) {
      writer.uint32(24).int32(message.uiType);
    }
    if (message.disabled === true) {
      writer.uint32(32).bool(message.disabled);
    }
    if (message.required === true) {
      writer.uint32(40).bool(message.required);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SupportedNodeProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupportedNodeProperty();
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

          message.default = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.uiType = reader.int32() as any;
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.disabled = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.required = reader.bool();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SupportedNodeProperty>): SupportedNodeProperty {
    return SupportedNodeProperty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SupportedNodeProperty>): SupportedNodeProperty {
    const message = createBaseSupportedNodeProperty();
    message.name = object.name ?? "";
    message.default = object.default ?? undefined;
    message.uiType = object.uiType ?? 0;
    message.disabled = object.disabled ?? false;
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
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.netType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
}

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
