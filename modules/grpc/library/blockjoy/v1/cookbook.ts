/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

export enum NetType {
  NET_TYPE_UNSPECIFIED = 0,
  NET_TYPE_DEV = 1,
  NET_TYPE_TEST = 2,
  NET_TYPE_MAIN = 3,
  UNRECOGNIZED = -1,
}

export interface CookbookServiceRetrievePluginRequest {
  id: ConfigIdentifier | undefined;
}

export interface CookbookServiceRetrievePluginResponse {
  plugin: Plugin | undefined;
}

export interface CookbookServiceRetrieveImageRequest {
  id: ConfigIdentifier | undefined;
}

export interface CookbookServiceRetrieveImageResponse {
  location: ArchiveLocation | undefined;
}

export interface CookbookServiceRetrieveKernelRequest {
  id: ConfigIdentifier | undefined;
}

export interface CookbookServiceRetrieveKernelResponse {
  location: ArchiveLocation | undefined;
}

export interface CookbookServiceRequirementsRequest {
  id: ConfigIdentifier | undefined;
}

export interface CookbookServiceRequirementsResponse {
  /** The number of logical cores. */
  cpuCount: number;
  memSizeBytes: number;
  diskSizeBytes: number;
}

export interface CookbookServiceNetConfigurationsRequest {
  id: ConfigIdentifier | undefined;
}

export interface CookbookServiceNetConfigurationsResponse {
  networks: NetworkConfiguration[];
}

export interface CookbookServiceListBabelVersionsRequest {
  protocol: string;
  nodeType: string;
}

export interface CookbookServiceListBabelVersionsResponse {
  identifiers: ConfigIdentifier[];
}

export interface BundleServiceRetrieveRequest {
  id: BundleIdentifier | undefined;
}

export interface BundleServiceRetrieveResponse {
  location: ArchiveLocation | undefined;
}

export interface BundleServiceListBundleVersionsRequest {
}

export interface BundleServiceListBundleVersionsResponse {
  identifiers: BundleIdentifier[];
}

export interface BundleServiceDeleteRequest {
  id: BundleIdentifier | undefined;
}

export interface BundleServiceDeleteResponse {
}

/** Message type used for identifying a specific plugin. */
export interface ConfigIdentifier {
  /** snake_cased name of the blockchain. */
  protocol: string;
  /** snake_cased name of the node type. */
  nodeType: string;
  /** semantic version string of the node type version. */
  nodeVersion: string;
}

export interface BundleIdentifier {
  /** semantic version string of the bundle version. */
  version: string;
}

export interface Plugin {
  identifier:
    | ConfigIdentifier
    | undefined;
  /** Plugin script contents. */
  rhaiContent: Uint8Array;
}

export interface ArchiveLocation {
  url: string;
}

export interface NetworkConfiguration {
  name: string;
  url: string;
  netType: NetType;
  meta: { [key: string]: string };
}

export interface NetworkConfiguration_MetaEntry {
  key: string;
  value: string;
}

function createBaseCookbookServiceRetrievePluginRequest(): CookbookServiceRetrievePluginRequest {
  return { id: undefined };
}

export const CookbookServiceRetrievePluginRequest = {
  encode(message: CookbookServiceRetrievePluginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ConfigIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRetrievePluginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRetrievePluginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ConfigIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceRetrievePluginRequest>): CookbookServiceRetrievePluginRequest {
    return CookbookServiceRetrievePluginRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRetrievePluginRequest>): CookbookServiceRetrievePluginRequest {
    const message = createBaseCookbookServiceRetrievePluginRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ConfigIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseCookbookServiceRetrievePluginResponse(): CookbookServiceRetrievePluginResponse {
  return { plugin: undefined };
}

export const CookbookServiceRetrievePluginResponse = {
  encode(message: CookbookServiceRetrievePluginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.plugin !== undefined) {
      Plugin.encode(message.plugin, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRetrievePluginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRetrievePluginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.plugin = Plugin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceRetrievePluginResponse>): CookbookServiceRetrievePluginResponse {
    return CookbookServiceRetrievePluginResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRetrievePluginResponse>): CookbookServiceRetrievePluginResponse {
    const message = createBaseCookbookServiceRetrievePluginResponse();
    message.plugin = (object.plugin !== undefined && object.plugin !== null)
      ? Plugin.fromPartial(object.plugin)
      : undefined;
    return message;
  },
};

function createBaseCookbookServiceRetrieveImageRequest(): CookbookServiceRetrieveImageRequest {
  return { id: undefined };
}

export const CookbookServiceRetrieveImageRequest = {
  encode(message: CookbookServiceRetrieveImageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ConfigIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRetrieveImageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRetrieveImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ConfigIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceRetrieveImageRequest>): CookbookServiceRetrieveImageRequest {
    return CookbookServiceRetrieveImageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRetrieveImageRequest>): CookbookServiceRetrieveImageRequest {
    const message = createBaseCookbookServiceRetrieveImageRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ConfigIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseCookbookServiceRetrieveImageResponse(): CookbookServiceRetrieveImageResponse {
  return { location: undefined };
}

export const CookbookServiceRetrieveImageResponse = {
  encode(message: CookbookServiceRetrieveImageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      ArchiveLocation.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRetrieveImageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRetrieveImageResponse();
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

  create(base?: DeepPartial<CookbookServiceRetrieveImageResponse>): CookbookServiceRetrieveImageResponse {
    return CookbookServiceRetrieveImageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRetrieveImageResponse>): CookbookServiceRetrieveImageResponse {
    const message = createBaseCookbookServiceRetrieveImageResponse();
    message.location = (object.location !== undefined && object.location !== null)
      ? ArchiveLocation.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseCookbookServiceRetrieveKernelRequest(): CookbookServiceRetrieveKernelRequest {
  return { id: undefined };
}

export const CookbookServiceRetrieveKernelRequest = {
  encode(message: CookbookServiceRetrieveKernelRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ConfigIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRetrieveKernelRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRetrieveKernelRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ConfigIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceRetrieveKernelRequest>): CookbookServiceRetrieveKernelRequest {
    return CookbookServiceRetrieveKernelRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRetrieveKernelRequest>): CookbookServiceRetrieveKernelRequest {
    const message = createBaseCookbookServiceRetrieveKernelRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ConfigIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseCookbookServiceRetrieveKernelResponse(): CookbookServiceRetrieveKernelResponse {
  return { location: undefined };
}

export const CookbookServiceRetrieveKernelResponse = {
  encode(message: CookbookServiceRetrieveKernelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      ArchiveLocation.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRetrieveKernelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRetrieveKernelResponse();
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

  create(base?: DeepPartial<CookbookServiceRetrieveKernelResponse>): CookbookServiceRetrieveKernelResponse {
    return CookbookServiceRetrieveKernelResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRetrieveKernelResponse>): CookbookServiceRetrieveKernelResponse {
    const message = createBaseCookbookServiceRetrieveKernelResponse();
    message.location = (object.location !== undefined && object.location !== null)
      ? ArchiveLocation.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseCookbookServiceRequirementsRequest(): CookbookServiceRequirementsRequest {
  return { id: undefined };
}

export const CookbookServiceRequirementsRequest = {
  encode(message: CookbookServiceRequirementsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ConfigIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRequirementsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRequirementsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ConfigIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceRequirementsRequest>): CookbookServiceRequirementsRequest {
    return CookbookServiceRequirementsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRequirementsRequest>): CookbookServiceRequirementsRequest {
    const message = createBaseCookbookServiceRequirementsRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ConfigIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseCookbookServiceRequirementsResponse(): CookbookServiceRequirementsResponse {
  return { cpuCount: 0, memSizeBytes: 0, diskSizeBytes: 0 };
}

export const CookbookServiceRequirementsResponse = {
  encode(message: CookbookServiceRequirementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpuCount !== 0) {
      writer.uint32(8).uint64(message.cpuCount);
    }
    if (message.memSizeBytes !== 0) {
      writer.uint32(16).uint64(message.memSizeBytes);
    }
    if (message.diskSizeBytes !== 0) {
      writer.uint32(24).uint64(message.diskSizeBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceRequirementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceRequirementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.cpuCount = longToNumber(reader.uint64() as Long);
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

  create(base?: DeepPartial<CookbookServiceRequirementsResponse>): CookbookServiceRequirementsResponse {
    return CookbookServiceRequirementsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceRequirementsResponse>): CookbookServiceRequirementsResponse {
    const message = createBaseCookbookServiceRequirementsResponse();
    message.cpuCount = object.cpuCount ?? 0;
    message.memSizeBytes = object.memSizeBytes ?? 0;
    message.diskSizeBytes = object.diskSizeBytes ?? 0;
    return message;
  },
};

function createBaseCookbookServiceNetConfigurationsRequest(): CookbookServiceNetConfigurationsRequest {
  return { id: undefined };
}

export const CookbookServiceNetConfigurationsRequest = {
  encode(message: CookbookServiceNetConfigurationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ConfigIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceNetConfigurationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceNetConfigurationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ConfigIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceNetConfigurationsRequest>): CookbookServiceNetConfigurationsRequest {
    return CookbookServiceNetConfigurationsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceNetConfigurationsRequest>): CookbookServiceNetConfigurationsRequest {
    const message = createBaseCookbookServiceNetConfigurationsRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ConfigIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseCookbookServiceNetConfigurationsResponse(): CookbookServiceNetConfigurationsResponse {
  return { networks: [] };
}

export const CookbookServiceNetConfigurationsResponse = {
  encode(message: CookbookServiceNetConfigurationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.networks) {
      NetworkConfiguration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceNetConfigurationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceNetConfigurationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.networks.push(NetworkConfiguration.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceNetConfigurationsResponse>): CookbookServiceNetConfigurationsResponse {
    return CookbookServiceNetConfigurationsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceNetConfigurationsResponse>): CookbookServiceNetConfigurationsResponse {
    const message = createBaseCookbookServiceNetConfigurationsResponse();
    message.networks = object.networks?.map((e) => NetworkConfiguration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCookbookServiceListBabelVersionsRequest(): CookbookServiceListBabelVersionsRequest {
  return { protocol: "", nodeType: "" };
}

export const CookbookServiceListBabelVersionsRequest = {
  encode(message: CookbookServiceListBabelVersionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocol !== "") {
      writer.uint32(10).string(message.protocol);
    }
    if (message.nodeType !== "") {
      writer.uint32(18).string(message.nodeType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceListBabelVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceListBabelVersionsRequest();
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
          if (tag !== 18) {
            break;
          }

          message.nodeType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceListBabelVersionsRequest>): CookbookServiceListBabelVersionsRequest {
    return CookbookServiceListBabelVersionsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceListBabelVersionsRequest>): CookbookServiceListBabelVersionsRequest {
    const message = createBaseCookbookServiceListBabelVersionsRequest();
    message.protocol = object.protocol ?? "";
    message.nodeType = object.nodeType ?? "";
    return message;
  },
};

function createBaseCookbookServiceListBabelVersionsResponse(): CookbookServiceListBabelVersionsResponse {
  return { identifiers: [] };
}

export const CookbookServiceListBabelVersionsResponse = {
  encode(message: CookbookServiceListBabelVersionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.identifiers) {
      ConfigIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CookbookServiceListBabelVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCookbookServiceListBabelVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifiers.push(ConfigIdentifier.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CookbookServiceListBabelVersionsResponse>): CookbookServiceListBabelVersionsResponse {
    return CookbookServiceListBabelVersionsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CookbookServiceListBabelVersionsResponse>): CookbookServiceListBabelVersionsResponse {
    const message = createBaseCookbookServiceListBabelVersionsResponse();
    message.identifiers = object.identifiers?.map((e) => ConfigIdentifier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBundleServiceRetrieveRequest(): BundleServiceRetrieveRequest {
  return { id: undefined };
}

export const BundleServiceRetrieveRequest = {
  encode(message: BundleServiceRetrieveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      BundleIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceRetrieveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceRetrieveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = BundleIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BundleServiceRetrieveRequest>): BundleServiceRetrieveRequest {
    return BundleServiceRetrieveRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleServiceRetrieveRequest>): BundleServiceRetrieveRequest {
    const message = createBaseBundleServiceRetrieveRequest();
    message.id = (object.id !== undefined && object.id !== null) ? BundleIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseBundleServiceRetrieveResponse(): BundleServiceRetrieveResponse {
  return { location: undefined };
}

export const BundleServiceRetrieveResponse = {
  encode(message: BundleServiceRetrieveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      ArchiveLocation.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceRetrieveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceRetrieveResponse();
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

  create(base?: DeepPartial<BundleServiceRetrieveResponse>): BundleServiceRetrieveResponse {
    return BundleServiceRetrieveResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleServiceRetrieveResponse>): BundleServiceRetrieveResponse {
    const message = createBaseBundleServiceRetrieveResponse();
    message.location = (object.location !== undefined && object.location !== null)
      ? ArchiveLocation.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseBundleServiceListBundleVersionsRequest(): BundleServiceListBundleVersionsRequest {
  return {};
}

export const BundleServiceListBundleVersionsRequest = {
  encode(_: BundleServiceListBundleVersionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceListBundleVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceListBundleVersionsRequest();
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

  create(base?: DeepPartial<BundleServiceListBundleVersionsRequest>): BundleServiceListBundleVersionsRequest {
    return BundleServiceListBundleVersionsRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<BundleServiceListBundleVersionsRequest>): BundleServiceListBundleVersionsRequest {
    const message = createBaseBundleServiceListBundleVersionsRequest();
    return message;
  },
};

function createBaseBundleServiceListBundleVersionsResponse(): BundleServiceListBundleVersionsResponse {
  return { identifiers: [] };
}

export const BundleServiceListBundleVersionsResponse = {
  encode(message: BundleServiceListBundleVersionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.identifiers) {
      BundleIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceListBundleVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceListBundleVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifiers.push(BundleIdentifier.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BundleServiceListBundleVersionsResponse>): BundleServiceListBundleVersionsResponse {
    return BundleServiceListBundleVersionsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleServiceListBundleVersionsResponse>): BundleServiceListBundleVersionsResponse {
    const message = createBaseBundleServiceListBundleVersionsResponse();
    message.identifiers = object.identifiers?.map((e) => BundleIdentifier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBundleServiceDeleteRequest(): BundleServiceDeleteRequest {
  return { id: undefined };
}

export const BundleServiceDeleteRequest = {
  encode(message: BundleServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      BundleIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = BundleIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BundleServiceDeleteRequest>): BundleServiceDeleteRequest {
    return BundleServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleServiceDeleteRequest>): BundleServiceDeleteRequest {
    const message = createBaseBundleServiceDeleteRequest();
    message.id = (object.id !== undefined && object.id !== null) ? BundleIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseBundleServiceDeleteResponse(): BundleServiceDeleteResponse {
  return {};
}

export const BundleServiceDeleteResponse = {
  encode(_: BundleServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceDeleteResponse();
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

  create(base?: DeepPartial<BundleServiceDeleteResponse>): BundleServiceDeleteResponse {
    return BundleServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<BundleServiceDeleteResponse>): BundleServiceDeleteResponse {
    const message = createBaseBundleServiceDeleteResponse();
    return message;
  },
};

function createBaseConfigIdentifier(): ConfigIdentifier {
  return { protocol: "", nodeType: "", nodeVersion: "" };
}

export const ConfigIdentifier = {
  encode(message: ConfigIdentifier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocol !== "") {
      writer.uint32(10).string(message.protocol);
    }
    if (message.nodeType !== "") {
      writer.uint32(18).string(message.nodeType);
    }
    if (message.nodeVersion !== "") {
      writer.uint32(26).string(message.nodeVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfigIdentifier {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfigIdentifier();
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
          if (tag !== 18) {
            break;
          }

          message.nodeType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nodeVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ConfigIdentifier>): ConfigIdentifier {
    return ConfigIdentifier.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ConfigIdentifier>): ConfigIdentifier {
    const message = createBaseConfigIdentifier();
    message.protocol = object.protocol ?? "";
    message.nodeType = object.nodeType ?? "";
    message.nodeVersion = object.nodeVersion ?? "";
    return message;
  },
};

function createBaseBundleIdentifier(): BundleIdentifier {
  return { version: "" };
}

export const BundleIdentifier = {
  encode(message: BundleIdentifier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleIdentifier {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleIdentifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BundleIdentifier>): BundleIdentifier {
    return BundleIdentifier.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleIdentifier>): BundleIdentifier {
    const message = createBaseBundleIdentifier();
    message.version = object.version ?? "";
    return message;
  },
};

function createBasePlugin(): Plugin {
  return { identifier: undefined, rhaiContent: new Uint8Array() };
}

export const Plugin = {
  encode(message: Plugin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== undefined) {
      ConfigIdentifier.encode(message.identifier, writer.uint32(10).fork()).ldelim();
    }
    if (message.rhaiContent.length !== 0) {
      writer.uint32(18).bytes(message.rhaiContent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Plugin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlugin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifier = ConfigIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rhaiContent = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Plugin>): Plugin {
    return Plugin.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Plugin>): Plugin {
    const message = createBasePlugin();
    message.identifier = (object.identifier !== undefined && object.identifier !== null)
      ? ConfigIdentifier.fromPartial(object.identifier)
      : undefined;
    message.rhaiContent = object.rhaiContent ?? new Uint8Array();
    return message;
  },
};

function createBaseArchiveLocation(): ArchiveLocation {
  return { url: "" };
}

export const ArchiveLocation = {
  encode(message: ArchiveLocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArchiveLocation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchiveLocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ArchiveLocation>): ArchiveLocation {
    return ArchiveLocation.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ArchiveLocation>): ArchiveLocation {
    const message = createBaseArchiveLocation();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseNetworkConfiguration(): NetworkConfiguration {
  return { name: "", url: "", netType: 0, meta: {} };
}

export const NetworkConfiguration = {
  encode(message: NetworkConfiguration, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.netType !== 0) {
      writer.uint32(24).int32(message.netType);
    }
    Object.entries(message.meta).forEach(([key, value]) => {
      NetworkConfiguration_MetaEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkConfiguration {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkConfiguration();
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
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = NetworkConfiguration_MetaEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.meta[entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NetworkConfiguration>): NetworkConfiguration {
    return NetworkConfiguration.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NetworkConfiguration>): NetworkConfiguration {
    const message = createBaseNetworkConfiguration();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    message.netType = object.netType ?? 0;
    message.meta = Object.entries(object.meta ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseNetworkConfiguration_MetaEntry(): NetworkConfiguration_MetaEntry {
  return { key: "", value: "" };
}

export const NetworkConfiguration_MetaEntry = {
  encode(message: NetworkConfiguration_MetaEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkConfiguration_MetaEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkConfiguration_MetaEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  create(base?: DeepPartial<NetworkConfiguration_MetaEntry>): NetworkConfiguration_MetaEntry {
    return NetworkConfiguration_MetaEntry.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NetworkConfiguration_MetaEntry>): NetworkConfiguration_MetaEntry {
    const message = createBaseNetworkConfiguration_MetaEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

/** Babel cookbook service. */
export type CookbookServiceDefinition = typeof CookbookServiceDefinition;
export const CookbookServiceDefinition = {
  name: "CookbookService",
  fullName: "blockjoy.v1.CookbookService",
  methods: {
    /** Retrieve plugin for specific version and state. */
    retrievePlugin: {
      name: "RetrievePlugin",
      requestType: CookbookServiceRetrievePluginRequest,
      requestStream: false,
      responseType: CookbookServiceRetrievePluginResponse,
      responseStream: false,
      options: {},
    },
    /** Retrieve image for specific version and state. */
    retrieveImage: {
      name: "RetrieveImage",
      requestType: CookbookServiceRetrieveImageRequest,
      requestStream: false,
      responseType: CookbookServiceRetrieveImageResponse,
      responseStream: false,
      options: {},
    },
    /** Retrieve kernel file for specific version and state. */
    retrieveKernel: {
      name: "RetrieveKernel",
      requestType: CookbookServiceRetrieveKernelRequest,
      requestStream: false,
      responseType: CookbookServiceRetrieveKernelResponse,
      responseStream: false,
      options: {},
    },
    /** Retrieve hardware requirements for given identifier. */
    requirements: {
      name: "Requirements",
      requestType: CookbookServiceRequirementsRequest,
      requestStream: false,
      responseType: CookbookServiceRequirementsResponse,
      responseStream: false,
      options: {},
    },
    /** Retrieve net configurations for given chain. */
    netConfigurations: {
      name: "NetConfigurations",
      requestType: CookbookServiceNetConfigurationsRequest,
      requestStream: false,
      responseType: CookbookServiceNetConfigurationsResponse,
      responseStream: false,
      options: {},
    },
    /** List all available babel versions. */
    listBabelVersions: {
      name: "ListBabelVersions",
      requestType: CookbookServiceListBabelVersionsRequest,
      requestStream: false,
      responseType: CookbookServiceListBabelVersionsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface CookbookServiceImplementation<CallContextExt = {}> {
  /** Retrieve plugin for specific version and state. */
  retrievePlugin(
    request: CookbookServiceRetrievePluginRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CookbookServiceRetrievePluginResponse>>;
  /** Retrieve image for specific version and state. */
  retrieveImage(
    request: CookbookServiceRetrieveImageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CookbookServiceRetrieveImageResponse>>;
  /** Retrieve kernel file for specific version and state. */
  retrieveKernel(
    request: CookbookServiceRetrieveKernelRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CookbookServiceRetrieveKernelResponse>>;
  /** Retrieve hardware requirements for given identifier. */
  requirements(
    request: CookbookServiceRequirementsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CookbookServiceRequirementsResponse>>;
  /** Retrieve net configurations for given chain. */
  netConfigurations(
    request: CookbookServiceNetConfigurationsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CookbookServiceNetConfigurationsResponse>>;
  /** List all available babel versions. */
  listBabelVersions(
    request: CookbookServiceListBabelVersionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CookbookServiceListBabelVersionsResponse>>;
}

export interface CookbookServiceClient<CallOptionsExt = {}> {
  /** Retrieve plugin for specific version and state. */
  retrievePlugin(
    request: DeepPartial<CookbookServiceRetrievePluginRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CookbookServiceRetrievePluginResponse>;
  /** Retrieve image for specific version and state. */
  retrieveImage(
    request: DeepPartial<CookbookServiceRetrieveImageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CookbookServiceRetrieveImageResponse>;
  /** Retrieve kernel file for specific version and state. */
  retrieveKernel(
    request: DeepPartial<CookbookServiceRetrieveKernelRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CookbookServiceRetrieveKernelResponse>;
  /** Retrieve hardware requirements for given identifier. */
  requirements(
    request: DeepPartial<CookbookServiceRequirementsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CookbookServiceRequirementsResponse>;
  /** Retrieve net configurations for given chain. */
  netConfigurations(
    request: DeepPartial<CookbookServiceNetConfigurationsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CookbookServiceNetConfigurationsResponse>;
  /** List all available babel versions. */
  listBabelVersions(
    request: DeepPartial<CookbookServiceListBabelVersionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CookbookServiceListBabelVersionsResponse>;
}

/** Retrieve manage BVD bundles. */
export type BundleServiceDefinition = typeof BundleServiceDefinition;
export const BundleServiceDefinition = {
  name: "BundleService",
  fullName: "blockjoy.v1.BundleService",
  methods: {
    /** Retrieve image for specific version and state. */
    retrieve: {
      name: "Retrieve",
      requestType: BundleServiceRetrieveRequest,
      requestStream: false,
      responseType: BundleServiceRetrieveResponse,
      responseStream: false,
      options: {},
    },
    /** List all available bundle versions. */
    listBundleVersions: {
      name: "ListBundleVersions",
      requestType: BundleServiceListBundleVersionsRequest,
      requestStream: false,
      responseType: BundleServiceListBundleVersionsResponse,
      responseStream: false,
      options: {},
    },
    /** Delete bundle from storage. */
    delete: {
      name: "Delete",
      requestType: BundleServiceDeleteRequest,
      requestStream: false,
      responseType: BundleServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface BundleServiceImplementation<CallContextExt = {}> {
  /** Retrieve image for specific version and state. */
  retrieve(
    request: BundleServiceRetrieveRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BundleServiceRetrieveResponse>>;
  /** List all available bundle versions. */
  listBundleVersions(
    request: BundleServiceListBundleVersionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BundleServiceListBundleVersionsResponse>>;
  /** Delete bundle from storage. */
  delete(
    request: BundleServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BundleServiceDeleteResponse>>;
}

export interface BundleServiceClient<CallOptionsExt = {}> {
  /** Retrieve image for specific version and state. */
  retrieve(
    request: DeepPartial<BundleServiceRetrieveRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BundleServiceRetrieveResponse>;
  /** List all available bundle versions. */
  listBundleVersions(
    request: DeepPartial<BundleServiceListBundleVersionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BundleServiceListBundleVersionsResponse>;
  /** Delete bundle from storage. */
  delete(
    request: DeepPartial<BundleServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BundleServiceDeleteResponse>;
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
