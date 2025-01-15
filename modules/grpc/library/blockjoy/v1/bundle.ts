/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

export interface BundleServiceRetrieveRequest {
  bundleId: BundleIdentifier | undefined;
}

export interface BundleServiceRetrieveResponse {
  url: string;
}

export interface BundleServiceListVersionsRequest {
}

export interface BundleServiceListVersionsResponse {
  bundleIds: BundleIdentifier[];
}

export interface BundleIdentifier {
  /** The semantic version of the bundle. */
  version: string;
}

function createBaseBundleServiceRetrieveRequest(): BundleServiceRetrieveRequest {
  return { bundleId: undefined };
}

export const BundleServiceRetrieveRequest = {
  encode(message: BundleServiceRetrieveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.bundleId !== undefined) {
      BundleIdentifier.encode(message.bundleId, writer.uint32(10).fork()).ldelim();
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

          message.bundleId = BundleIdentifier.decode(reader, reader.uint32());
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
    message.bundleId = (object.bundleId !== undefined && object.bundleId !== null)
      ? BundleIdentifier.fromPartial(object.bundleId)
      : undefined;
    return message;
  },
};

function createBaseBundleServiceRetrieveResponse(): BundleServiceRetrieveResponse {
  return { url: "" };
}

export const BundleServiceRetrieveResponse = {
  encode(message: BundleServiceRetrieveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
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

  create(base?: DeepPartial<BundleServiceRetrieveResponse>): BundleServiceRetrieveResponse {
    return BundleServiceRetrieveResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleServiceRetrieveResponse>): BundleServiceRetrieveResponse {
    const message = createBaseBundleServiceRetrieveResponse();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseBundleServiceListVersionsRequest(): BundleServiceListVersionsRequest {
  return {};
}

export const BundleServiceListVersionsRequest = {
  encode(_: BundleServiceListVersionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceListVersionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceListVersionsRequest();
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

  create(base?: DeepPartial<BundleServiceListVersionsRequest>): BundleServiceListVersionsRequest {
    return BundleServiceListVersionsRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<BundleServiceListVersionsRequest>): BundleServiceListVersionsRequest {
    const message = createBaseBundleServiceListVersionsRequest();
    return message;
  },
};

function createBaseBundleServiceListVersionsResponse(): BundleServiceListVersionsResponse {
  return { bundleIds: [] };
}

export const BundleServiceListVersionsResponse = {
  encode(message: BundleServiceListVersionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.bundleIds) {
      BundleIdentifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BundleServiceListVersionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBundleServiceListVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.bundleIds.push(BundleIdentifier.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BundleServiceListVersionsResponse>): BundleServiceListVersionsResponse {
    return BundleServiceListVersionsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BundleServiceListVersionsResponse>): BundleServiceListVersionsResponse {
    const message = createBaseBundleServiceListVersionsResponse();
    message.bundleIds = object.bundleIds?.map((e) => BundleIdentifier.fromPartial(e)) || [];
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

/** Retrieve and manage bundles. */
export type BundleServiceDefinition = typeof BundleServiceDefinition;
export const BundleServiceDefinition = {
  name: "BundleService",
  fullName: "blockjoy.v1.BundleService",
  methods: {
    /** Retrieve the bundle url for some version. */
    retrieve: {
      name: "Retrieve",
      requestType: BundleServiceRetrieveRequest,
      requestStream: false,
      responseType: BundleServiceRetrieveResponse,
      responseStream: false,
      options: {},
    },
    /** List all available bundle versions. */
    listVersions: {
      name: "ListVersions",
      requestType: BundleServiceListVersionsRequest,
      requestStream: false,
      responseType: BundleServiceListVersionsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface BundleServiceImplementation<CallContextExt = {}> {
  /** Retrieve the bundle url for some version. */
  retrieve(
    request: BundleServiceRetrieveRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BundleServiceRetrieveResponse>>;
  /** List all available bundle versions. */
  listVersions(
    request: BundleServiceListVersionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BundleServiceListVersionsResponse>>;
}

export interface BundleServiceClient<CallOptionsExt = {}> {
  /** Retrieve the bundle url for some version. */
  retrieve(
    request: DeepPartial<BundleServiceRetrieveRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BundleServiceRetrieveResponse>;
  /** List all available bundle versions. */
  listVersions(
    request: DeepPartial<BundleServiceListVersionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BundleServiceListVersionsResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
