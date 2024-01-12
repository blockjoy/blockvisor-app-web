/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { ArchiveLocation } from "../common/v1/image";

export const protobufPackage = "blockjoy.v1";

export interface KernelServiceRetrieveRequest {
  id: KernelIdentifier | undefined;
}

export interface KernelServiceRetrieveResponse {
  location: ArchiveLocation | undefined;
}

export interface KernelServiceListKernelVersionsRequest {
}

export interface KernelServiceListKernelVersionsResponse {
  identifiers: KernelIdentifier[];
}

export interface KernelIdentifier {
  /** The semantic version of the kernel version. */
  version: string;
}

function createBaseKernelServiceRetrieveRequest(): KernelServiceRetrieveRequest {
  return { id: undefined };
}

export const KernelServiceRetrieveRequest = {
  encode(message: KernelServiceRetrieveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      KernelIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KernelServiceRetrieveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKernelServiceRetrieveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = KernelIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<KernelServiceRetrieveRequest>): KernelServiceRetrieveRequest {
    return KernelServiceRetrieveRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KernelServiceRetrieveRequest>): KernelServiceRetrieveRequest {
    const message = createBaseKernelServiceRetrieveRequest();
    message.id = (object.id !== undefined && object.id !== null) ? KernelIdentifier.fromPartial(object.id) : undefined;
    return message;
  },
};

function createBaseKernelServiceRetrieveResponse(): KernelServiceRetrieveResponse {
  return { location: undefined };
}

export const KernelServiceRetrieveResponse = {
  encode(message: KernelServiceRetrieveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      ArchiveLocation.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KernelServiceRetrieveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKernelServiceRetrieveResponse();
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

  create(base?: DeepPartial<KernelServiceRetrieveResponse>): KernelServiceRetrieveResponse {
    return KernelServiceRetrieveResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KernelServiceRetrieveResponse>): KernelServiceRetrieveResponse {
    const message = createBaseKernelServiceRetrieveResponse();
    message.location = (object.location !== undefined && object.location !== null)
      ? ArchiveLocation.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseKernelServiceListKernelVersionsRequest(): KernelServiceListKernelVersionsRequest {
  return {};
}

export const KernelServiceListKernelVersionsRequest = {
  encode(_: KernelServiceListKernelVersionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KernelServiceListKernelVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKernelServiceListKernelVersionsRequest();
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

  create(base?: DeepPartial<KernelServiceListKernelVersionsRequest>): KernelServiceListKernelVersionsRequest {
    return KernelServiceListKernelVersionsRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<KernelServiceListKernelVersionsRequest>): KernelServiceListKernelVersionsRequest {
    const message = createBaseKernelServiceListKernelVersionsRequest();
    return message;
  },
};

function createBaseKernelServiceListKernelVersionsResponse(): KernelServiceListKernelVersionsResponse {
  return { identifiers: [] };
}

export const KernelServiceListKernelVersionsResponse = {
  encode(message: KernelServiceListKernelVersionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.identifiers) {
      KernelIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KernelServiceListKernelVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKernelServiceListKernelVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifiers.push(KernelIdentifier.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<KernelServiceListKernelVersionsResponse>): KernelServiceListKernelVersionsResponse {
    return KernelServiceListKernelVersionsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KernelServiceListKernelVersionsResponse>): KernelServiceListKernelVersionsResponse {
    const message = createBaseKernelServiceListKernelVersionsResponse();
    message.identifiers = object.identifiers?.map((e) => KernelIdentifier.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKernelIdentifier(): KernelIdentifier {
  return { version: "" };
}

export const KernelIdentifier = {
  encode(message: KernelIdentifier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KernelIdentifier {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKernelIdentifier();
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

  create(base?: DeepPartial<KernelIdentifier>): KernelIdentifier {
    return KernelIdentifier.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KernelIdentifier>): KernelIdentifier {
    const message = createBaseKernelIdentifier();
    message.version = object.version ?? "";
    return message;
  },
};

/** Manage VM kernels. */
export type KernelServiceDefinition = typeof KernelServiceDefinition;
export const KernelServiceDefinition = {
  name: "KernelService",
  fullName: "blockjoy.v1.KernelService",
  methods: {
    /** Retrieve kernel for specific version. */
    retrieve: {
      name: "Retrieve",
      requestType: KernelServiceRetrieveRequest,
      requestStream: false,
      responseType: KernelServiceRetrieveResponse,
      responseStream: false,
      options: {},
    },
    /** List all available kernel versions. */
    listKernelVersions: {
      name: "ListKernelVersions",
      requestType: KernelServiceListKernelVersionsRequest,
      requestStream: false,
      responseType: KernelServiceListKernelVersionsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface KernelServiceImplementation<CallContextExt = {}> {
  /** Retrieve kernel for specific version. */
  retrieve(
    request: KernelServiceRetrieveRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<KernelServiceRetrieveResponse>>;
  /** List all available kernel versions. */
  listKernelVersions(
    request: KernelServiceListKernelVersionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<KernelServiceListKernelVersionsResponse>>;
}

export interface KernelServiceClient<CallOptionsExt = {}> {
  /** Retrieve kernel for specific version. */
  retrieve(
    request: DeepPartial<KernelServiceRetrieveRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<KernelServiceRetrieveResponse>;
  /** List all available kernel versions. */
  listKernelVersions(
    request: DeepPartial<KernelServiceListKernelVersionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<KernelServiceListKernelVersionsResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
