/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { ArchiveLocation } from "../common/v1/image";

export const protobufPackage = "blockjoy.v1";

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

export interface BundleIdentifier {
  /** The semantic version of the bundle version. */
  version: string;
}

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

/** Retrieve and manage BVD bundles. */
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

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
