/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Resource } from "../common/v1/resource";

export const protobufPackage = "blockjoy.v1";

export interface ApiKeyServiceCreateRequest {
  /** The (non-unique) label for this api key. */
  label: string;
  /** The resource of this api key. */
  resource: Resource | undefined;
}

export interface ApiKeyServiceCreateResponse {
  /** The bearer secret representation of the api key. */
  apiKey?:
    | string
    | undefined;
  /** The time this api key was created. */
  createdAt: Date | undefined;
}

export interface ApiKeyServiceListRequest {
}

export interface ApiKeyServiceListResponse {
  /** A list of the api keys. */
  apiKeys: ListApiKey[];
}

export interface ListApiKey {
  /** The unique identifier to this api key. */
  apiKeyId?:
    | string
    | undefined;
  /** The (non-unique) label for this api key. */
  label?:
    | string
    | undefined;
  /** The resource of this api key. */
  resource:
    | Resource
    | undefined;
  /** The time this api key was created. */
  createdAt:
    | Date
    | undefined;
  /** The last time this api key was updated. */
  updatedAt: Date | undefined;
}

export interface ApiKeyServiceUpdateRequest {
  /** The unique identifier to the api key to update. */
  apiKeyId: string;
  /** The (non-unique) new label for this api key. */
  label?: string | undefined;
}

export interface ApiKeyServiceUpdateResponse {
  /** The time the api key was updated. */
  updatedAt: Date | undefined;
}

export interface ApiKeyServiceRegenerateRequest {
  /** The unique identifier to the api key to regenerate. */
  apiKeyId: string;
}

export interface ApiKeyServiceRegenerateResponse {
  /** The new bearer secret representation for this api key. */
  apiKey?:
    | string
    | undefined;
  /** The time the api key was updated. */
  updatedAt: Date | undefined;
}

export interface ApiKeyServiceDeleteRequest {
  /** The unique identifier to the api key to delete. */
  apiKeyId: string;
}

export interface ApiKeyServiceDeleteResponse {
}

function createBaseApiKeyServiceCreateRequest(): ApiKeyServiceCreateRequest {
  return { label: "", resource: undefined };
}

export const ApiKeyServiceCreateRequest = {
  encode(message: ApiKeyServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(18).fork()).ldelim();
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
    return message;
  },
};

function createBaseApiKeyServiceCreateResponse(): ApiKeyServiceCreateResponse {
  return { apiKey: undefined, createdAt: undefined };
}

export const ApiKeyServiceCreateResponse = {
  encode(message: ApiKeyServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKey !== undefined) {
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
    message.apiKey = object.apiKey ?? undefined;
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
      ListApiKey.encode(v!, writer.uint32(10).fork()).ldelim();
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

          message.apiKeys.push(ListApiKey.decode(reader, reader.uint32()));
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
    message.apiKeys = object.apiKeys?.map((e) => ListApiKey.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListApiKey(): ListApiKey {
  return { apiKeyId: undefined, label: undefined, resource: undefined, createdAt: undefined, updatedAt: undefined };
}

export const ListApiKey = {
  encode(message: ListApiKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== undefined) {
      writer.uint32(10).string(message.apiKeyId);
    }
    if (message.label !== undefined) {
      writer.uint32(18).string(message.label);
    }
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(26).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListApiKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListApiKey();
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

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListApiKey>): ListApiKey {
    return ListApiKey.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListApiKey>): ListApiKey {
    const message = createBaseListApiKey();
    message.apiKeyId = object.apiKeyId ?? undefined;
    message.label = object.label ?? undefined;
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseApiKeyServiceUpdateRequest(): ApiKeyServiceUpdateRequest {
  return { apiKeyId: "", label: undefined };
}

export const ApiKeyServiceUpdateRequest = {
  encode(message: ApiKeyServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== "") {
      writer.uint32(10).string(message.apiKeyId);
    }
    if (message.label !== undefined) {
      writer.uint32(18).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceUpdateRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceUpdateRequest>): ApiKeyServiceUpdateRequest {
    return ApiKeyServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceUpdateRequest>): ApiKeyServiceUpdateRequest {
    const message = createBaseApiKeyServiceUpdateRequest();
    message.apiKeyId = object.apiKeyId ?? "";
    message.label = object.label ?? undefined;
    return message;
  },
};

function createBaseApiKeyServiceUpdateResponse(): ApiKeyServiceUpdateResponse {
  return { updatedAt: undefined };
}

export const ApiKeyServiceUpdateResponse = {
  encode(message: ApiKeyServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceUpdateResponse>): ApiKeyServiceUpdateResponse {
    return ApiKeyServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceUpdateResponse>): ApiKeyServiceUpdateResponse {
    const message = createBaseApiKeyServiceUpdateResponse();
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseApiKeyServiceRegenerateRequest(): ApiKeyServiceRegenerateRequest {
  return { apiKeyId: "" };
}

export const ApiKeyServiceRegenerateRequest = {
  encode(message: ApiKeyServiceRegenerateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKeyId !== "") {
      writer.uint32(10).string(message.apiKeyId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceRegenerateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceRegenerateRequest();
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

  create(base?: DeepPartial<ApiKeyServiceRegenerateRequest>): ApiKeyServiceRegenerateRequest {
    return ApiKeyServiceRegenerateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceRegenerateRequest>): ApiKeyServiceRegenerateRequest {
    const message = createBaseApiKeyServiceRegenerateRequest();
    message.apiKeyId = object.apiKeyId ?? "";
    return message;
  },
};

function createBaseApiKeyServiceRegenerateResponse(): ApiKeyServiceRegenerateResponse {
  return { apiKey: undefined, updatedAt: undefined };
}

export const ApiKeyServiceRegenerateResponse = {
  encode(message: ApiKeyServiceRegenerateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.apiKey !== undefined) {
      writer.uint32(10).string(message.apiKey);
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyServiceRegenerateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyServiceRegenerateResponse();
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

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyServiceRegenerateResponse>): ApiKeyServiceRegenerateResponse {
    return ApiKeyServiceRegenerateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyServiceRegenerateResponse>): ApiKeyServiceRegenerateResponse {
    const message = createBaseApiKeyServiceRegenerateResponse();
    message.apiKey = object.apiKey ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
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

/** API key service functionality. */
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
    /** Update an existing api key. */
    update: {
      name: "Update",
      requestType: ApiKeyServiceUpdateRequest,
      requestStream: false,
      responseType: ApiKeyServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Regenerate an existing api key token. */
    regenerate: {
      name: "Regenerate",
      requestType: ApiKeyServiceRegenerateRequest,
      requestStream: false,
      responseType: ApiKeyServiceRegenerateResponse,
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
  /** Update an existing api key. */
  update(
    request: ApiKeyServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceUpdateResponse>>;
  /** Regenerate an existing api key token. */
  regenerate(
    request: ApiKeyServiceRegenerateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceRegenerateResponse>>;
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
  /** Update an existing api key. */
  update(
    request: DeepPartial<ApiKeyServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceUpdateResponse>;
  /** Regenerate an existing api key token. */
  regenerate(
    request: DeepPartial<ApiKeyServiceRegenerateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceRegenerateResponse>;
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
