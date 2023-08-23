/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

export enum ApiResource {
  API_RESOURCE_UNSPECIFIED = 0,
  API_RESOURCE_USER = 1,
  API_RESOURCE_ORG = 2,
  API_RESOURCE_NODE = 3,
  API_RESOURCE_HOST = 4,
  UNRECOGNIZED = -1,
}

export interface ApiKeyServiceCreateRequest {
  /** The (non-unique) label for this api key. */
  label: string;
  /** The scope of the api key. */
  scope: ApiKeyScope | undefined;
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
  id?:
    | string
    | undefined;
  /** The (non-unique) label for this api key. */
  label?:
    | string
    | undefined;
  /** The scope of this api key. */
  scope:
    | ApiKeyScope
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
  id: string;
  /** The (non-unique) new label for this api key. */
  label?:
    | string
    | undefined;
  /** The new scope of this api key. */
  scope: ApiKeyScope | undefined;
}

export interface ApiKeyServiceUpdateResponse {
  /** The time the api key was updated. */
  updatedAt: Date | undefined;
}

export interface ApiKeyServiceRegenerateRequest {
  /** The unique identifier to the api key to regenerate. */
  id: string;
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
  id: string;
}

export interface ApiKeyServiceDeleteResponse {
}

export interface ApiKeyScope {
  /** The resource scope of this api key. */
  resource: ApiResource;
  /** The resource identifier of this api key. */
  resourceId?: string | undefined;
}

function createBaseApiKeyServiceCreateRequest(): ApiKeyServiceCreateRequest {
  return { label: "", scope: undefined };
}

export const ApiKeyServiceCreateRequest = {
  encode(message: ApiKeyServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.scope !== undefined) {
      ApiKeyScope.encode(message.scope, writer.uint32(18).fork()).ldelim();
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

          message.scope = ApiKeyScope.decode(reader, reader.uint32());
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
    message.scope = (object.scope !== undefined && object.scope !== null)
      ? ApiKeyScope.fromPartial(object.scope)
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
  return { id: undefined, label: undefined, scope: undefined, createdAt: undefined, updatedAt: undefined };
}

export const ListApiKey = {
  encode(message: ListApiKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.label !== undefined) {
      writer.uint32(18).string(message.label);
    }
    if (message.scope !== undefined) {
      ApiKeyScope.encode(message.scope, writer.uint32(26).fork()).ldelim();
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

          message.id = reader.string();
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

          message.scope = ApiKeyScope.decode(reader, reader.uint32());
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
    message.id = object.id ?? undefined;
    message.label = object.label ?? undefined;
    message.scope = (object.scope !== undefined && object.scope !== null)
      ? ApiKeyScope.fromPartial(object.scope)
      : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseApiKeyServiceUpdateRequest(): ApiKeyServiceUpdateRequest {
  return { id: "", label: undefined, scope: undefined };
}

export const ApiKeyServiceUpdateRequest = {
  encode(message: ApiKeyServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.label !== undefined) {
      writer.uint32(18).string(message.label);
    }
    if (message.scope !== undefined) {
      ApiKeyScope.encode(message.scope, writer.uint32(26).fork()).ldelim();
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

          message.id = reader.string();
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

          message.scope = ApiKeyScope.decode(reader, reader.uint32());
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
    message.id = object.id ?? "";
    message.label = object.label ?? undefined;
    message.scope = (object.scope !== undefined && object.scope !== null)
      ? ApiKeyScope.fromPartial(object.scope)
      : undefined;
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
  return { id: "" };
}

export const ApiKeyServiceRegenerateRequest = {
  encode(message: ApiKeyServiceRegenerateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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

          message.id = reader.string();
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
    message.id = object.id ?? "";
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
  return { id: "" };
}

export const ApiKeyServiceDeleteRequest = {
  encode(message: ApiKeyServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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

          message.id = reader.string();
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
    message.id = object.id ?? "";
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

function createBaseApiKeyScope(): ApiKeyScope {
  return { resource: 0, resourceId: undefined };
}

export const ApiKeyScope = {
  encode(message: ApiKeyScope, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== 0) {
      writer.uint32(8).int32(message.resource);
    }
    if (message.resourceId !== undefined) {
      writer.uint32(18).string(message.resourceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiKeyScope {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiKeyScope();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resourceId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ApiKeyScope>): ApiKeyScope {
    return ApiKeyScope.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ApiKeyScope>): ApiKeyScope {
    const message = createBaseApiKeyScope();
    message.resource = object.resource ?? 0;
    message.resourceId = object.resourceId ?? undefined;
    return message;
  },
};

/** API key service functionality. */
export type ApiKeyServiceDefinition = typeof ApiKeyServiceDefinition;
export const ApiKeyServiceDefinition = {
  name: "ApiKeyService",
  fullName: "blockjoy.v1.ApiKeyService",
  methods: {
    create: {
      name: "Create",
      requestType: ApiKeyServiceCreateRequest,
      requestStream: false,
      responseType: ApiKeyServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    list: {
      name: "List",
      requestType: ApiKeyServiceListRequest,
      requestStream: false,
      responseType: ApiKeyServiceListResponse,
      responseStream: false,
      options: {},
    },
    update: {
      name: "Update",
      requestType: ApiKeyServiceUpdateRequest,
      requestStream: false,
      responseType: ApiKeyServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    regenerate: {
      name: "Regenerate",
      requestType: ApiKeyServiceRegenerateRequest,
      requestStream: false,
      responseType: ApiKeyServiceRegenerateResponse,
      responseStream: false,
      options: {},
    },
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
  create(
    request: ApiKeyServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceCreateResponse>>;
  list(
    request: ApiKeyServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceListResponse>>;
  update(
    request: ApiKeyServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceUpdateResponse>>;
  regenerate(
    request: ApiKeyServiceRegenerateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceRegenerateResponse>>;
  delete(
    request: ApiKeyServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ApiKeyServiceDeleteResponse>>;
}

export interface ApiKeyServiceClient<CallOptionsExt = {}> {
  create(
    request: DeepPartial<ApiKeyServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceCreateResponse>;
  list(
    request: DeepPartial<ApiKeyServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceListResponse>;
  update(
    request: DeepPartial<ApiKeyServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceUpdateResponse>;
  regenerate(
    request: DeepPartial<ApiKeyServiceRegenerateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ApiKeyServiceRegenerateResponse>;
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
