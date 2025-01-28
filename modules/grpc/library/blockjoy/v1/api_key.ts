/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Resource } from "../common/v1/resource";

export const protobufPackage = "blockjoy.v1";

export interface ApiKey {
  /** The id of this api key. */
  apiKeyId: string;
  /** A descriptive label for this api key. */
  label: string;
  /** The resource this key takes actions as. */
  resource:
    | Resource
    | undefined;
  /** The granted set of key permissions. */
  permissions: string[];
  /** The time this api key was created. */
  createdAt: Date | undefined;
}

export interface ApiKeyServiceCreateRequest {
  /** A descriptive label for this api key. */
  label: string;
  /** The resource this key will take actions as. */
  resource:
    | Resource
    | undefined;
  /** Grant the key these permissions. */
  permissions: string[];
}

export interface ApiKeyServiceCreateResponse {
  /** The bearer secret for this api key. */
  apiKey: string;
  /** The time this api key was created. */
  createdAt: Date | undefined;
}

export interface ApiKeyServiceListRequest {
}

export interface ApiKeyServiceListResponse {
  /** A list of the api keys. */
  apiKeys: ApiKey[];
}

export interface ApiKeyServiceDeleteRequest {
  /** The id of the api key to delete. */
  apiKeyId: string;
}

export interface ApiKeyServiceDeleteResponse {
}

function createBaseApiKey(): ApiKey {
  return { apiKeyId: "", label: "", resource: undefined, permissions: [], createdAt: undefined };
}

export const ApiKey = {
  encode(message: ApiKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== "") {
      writer.uint32(10).string(message.apiKeyId);
    }
    if (message.label !== "") {
      writer.uint32(18).string(message.label);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.permissions) {
      writer.uint32(34).string(v!);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKeyId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.label = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.permissions.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKey>): ApiKey {
    return ApiKey.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKey>): ApiKey {
    const message = createBaseApiKey();
    message.apiKeyId = object.apiKeyId ?? "";
    message.label = object.label ?? "";
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    message.permissions = object.permissions?.map((e) => e) || [];
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

function createBaseApiKeyServiceCreateRequest(): ApiKeyServiceCreateRequest {
  return { label: "", resource: undefined, permissions: [] };
}

export const ApiKeyServiceCreateRequest = {
  encode(message: ApiKeyServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.permissions) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.label = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.permissions.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceCreateRequest>): ApiKeyServiceCreateRequest {
    return ApiKeyServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceCreateRequest>): ApiKeyServiceCreateRequest {
    const message = createBaseApiKeyServiceCreateRequest();
    message.label = object.label ?? "";
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    message.permissions = object.permissions?.map((e) => e) || [];
    return message;
  },
};

function createBaseApiKeyServiceCreateResponse(): ApiKeyServiceCreateResponse {
  return { apiKey: "", createdAt: undefined };
}

export const ApiKeyServiceCreateResponse = {
  encode(message: ApiKeyServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKey !== "") {
      writer.uint32(10).string(message.apiKey);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKey = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceCreateResponse>): ApiKeyServiceCreateResponse {
    return ApiKeyServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceCreateResponse>): ApiKeyServiceCreateResponse {
    const message = createBaseApiKeyServiceCreateResponse();
    message.apiKey = object.apiKey ?? "";
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

function createBaseApiKeyServiceListRequest(): ApiKeyServiceListRequest {
  return {};
}

export const ApiKeyServiceListRequest = {
  encode(_: ApiKeyServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceListRequest();
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

  create(base?: DeepPartial<ApiKeyServiceListRequest>): ApiKeyServiceListRequest {
    return ApiKeyServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<ApiKeyServiceListRequest>): ApiKeyServiceListRequest {
    const message = createBaseApiKeyServiceListRequest();
    return message;
  },
};

function createBaseApiKeyServiceListResponse(): ApiKeyServiceListResponse {
  return { apiKeys: [] };
}

export const ApiKeyServiceListResponse = {
  encode(message: ApiKeyServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.apiKeys) {
      ApiKey.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKeys.push(ApiKey.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceListResponse>): ApiKeyServiceListResponse {
    return ApiKeyServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceListResponse>): ApiKeyServiceListResponse {
    const message = createBaseApiKeyServiceListResponse();
    message.apiKeys = object.apiKeys?.map((e) => ApiKey.fromPartial(e)) || [];
    return message;
  },
};

function createBaseApiKeyServiceDeleteRequest(): ApiKeyServiceDeleteRequest {
  return { apiKeyId: "" };
}

export const ApiKeyServiceDeleteRequest = {
  encode(message: ApiKeyServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== "") {
      writer.uint32(10).string(message.apiKeyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.apiKeyId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceDeleteRequest>): ApiKeyServiceDeleteRequest {
    return ApiKeyServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceDeleteRequest>): ApiKeyServiceDeleteRequest {
    const message = createBaseApiKeyServiceDeleteRequest();
    message.apiKeyId = object.apiKeyId ?? "";
    return message;
  },
};

function createBaseApiKeyServiceDeleteResponse(): ApiKeyServiceDeleteResponse {
  return {};
}

export const ApiKeyServiceDeleteResponse = {
  encode(_: ApiKeyServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceDeleteResponse();
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

  create(base?: DeepPartial<ApiKeyServiceDeleteResponse>): ApiKeyServiceDeleteResponse {
    return ApiKeyServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<ApiKeyServiceDeleteResponse>): ApiKeyServiceDeleteResponse {
    const message = createBaseApiKeyServiceDeleteResponse();
    return message;
  },
};

/** Service for managing api keys. */
export type ApiKeyServiceDefinition = typeof ApiKeyServiceDefinition;
export const ApiKeyServiceDefinition = {
  name: "ApiKeyService",
  fullName: "blockjoy.v1.ApiKeyService",
  methods: {
    /** Create a new api key. */
    create: {
      name: "Create",
      requestType: ApiKeyServiceCreateRequest,
      requestStream: false,
      responseType: ApiKeyServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** List existing api keys. */
    list: {
      name: "List",
      requestType: ApiKeyServiceListRequest,
      requestStream: false,
      responseType: ApiKeyServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Delete an existing api key. */
    delete: {
      name: "Delete",
      requestType: ApiKeyServiceDeleteRequest,
      requestStream: false,
      responseType: ApiKeyServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ApiKeyServiceImplementation<CallContextExt = {}> {
  /** Create a new api key. */
  create(
    request: ApiKeyServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceCreateResponse>>;
  /** List existing api keys. */
  list(
    request: ApiKeyServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceListResponse>>;
  /** Delete an existing api key. */
  delete(
    request: ApiKeyServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceDeleteResponse>>;
}

export interface ApiKeyServiceClient<CallOptionsExt = {}> {
  /** Create a new api key. */
  create(
    request: DeepPartial<ApiKeyServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceCreateResponse>;
  /** List existing api keys. */
  list(
    request: DeepPartial<ApiKeyServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceListResponse>;
  /** Delete an existing api key. */
  delete(
    request: DeepPartial<ApiKeyServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceDeleteResponse>;
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
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}
