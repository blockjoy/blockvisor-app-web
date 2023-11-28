/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

export interface Subscription {
  id: string;
  orgId: string;
  userId: string;
  externalId: string;
}

export interface SubscriptionServiceCreateRequest {
  orgId: string;
  userId: string;
  externalId: string;
}

export interface SubscriptionServiceCreateResponse {
  subscription?: Subscription | undefined;
}

export interface SubscriptionServiceGetRequest {
  orgId: string;
}

export interface SubscriptionServiceGetResponse {
  subscription?: Subscription | undefined;
}

export interface SubscriptionServiceListRequest {
  userId?: string | undefined;
}

export interface SubscriptionServiceListResponse {
  subscriptions: Subscription[];
}

export interface SubscriptionServiceUpdateRequest {
  orgId?: string | undefined;
}

export interface SubscriptionServiceUpdateResponse {
}

export interface SubscriptionServiceDeleteRequest {
  id: string;
}

export interface SubscriptionServiceDeleteResponse {
}

function createBaseSubscription(): Subscription {
  return { id: "", orgId: "", userId: "", externalId: "" };
}

export const Subscription = {
  encode(message: Subscription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.userId !== "") {
      writer.uint32(26).string(message.userId);
    }
    if (message.externalId !== "") {
      writer.uint32(34).string(message.externalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Subscription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscription();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.externalId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Subscription>): Subscription {
    return Subscription.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Subscription>): Subscription {
    const message = createBaseSubscription();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    message.userId = object.userId ?? "";
    message.externalId = object.externalId ?? "";
    return message;
  },
};

function createBaseSubscriptionServiceCreateRequest(): SubscriptionServiceCreateRequest {
  return { orgId: "", userId: "", externalId: "" };
}

export const SubscriptionServiceCreateRequest = {
  encode(message: SubscriptionServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.externalId !== "") {
      writer.uint32(26).string(message.externalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.externalId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SubscriptionServiceCreateRequest>): SubscriptionServiceCreateRequest {
    return SubscriptionServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceCreateRequest>): SubscriptionServiceCreateRequest {
    const message = createBaseSubscriptionServiceCreateRequest();
    message.orgId = object.orgId ?? "";
    message.userId = object.userId ?? "";
    message.externalId = object.externalId ?? "";
    return message;
  },
};

function createBaseSubscriptionServiceCreateResponse(): SubscriptionServiceCreateResponse {
  return { subscription: undefined };
}

export const SubscriptionServiceCreateResponse = {
  encode(message: SubscriptionServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subscription !== undefined) {
      Subscription.encode(message.subscription, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subscription = Subscription.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SubscriptionServiceCreateResponse>): SubscriptionServiceCreateResponse {
    return SubscriptionServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceCreateResponse>): SubscriptionServiceCreateResponse {
    const message = createBaseSubscriptionServiceCreateResponse();
    message.subscription = (object.subscription !== undefined && object.subscription !== null)
      ? Subscription.fromPartial(object.subscription)
      : undefined;
    return message;
  },
};

function createBaseSubscriptionServiceGetRequest(): SubscriptionServiceGetRequest {
  return { orgId: "" };
}

export const SubscriptionServiceGetRequest = {
  encode(message: SubscriptionServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceGetRequest();
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

  create(base?: DeepPartial<SubscriptionServiceGetRequest>): SubscriptionServiceGetRequest {
    return SubscriptionServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceGetRequest>): SubscriptionServiceGetRequest {
    const message = createBaseSubscriptionServiceGetRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseSubscriptionServiceGetResponse(): SubscriptionServiceGetResponse {
  return { subscription: undefined };
}

export const SubscriptionServiceGetResponse = {
  encode(message: SubscriptionServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subscription !== undefined) {
      Subscription.encode(message.subscription, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subscription = Subscription.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SubscriptionServiceGetResponse>): SubscriptionServiceGetResponse {
    return SubscriptionServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceGetResponse>): SubscriptionServiceGetResponse {
    const message = createBaseSubscriptionServiceGetResponse();
    message.subscription = (object.subscription !== undefined && object.subscription !== null)
      ? Subscription.fromPartial(object.subscription)
      : undefined;
    return message;
  },
};

function createBaseSubscriptionServiceListRequest(): SubscriptionServiceListRequest {
  return { userId: undefined };
}

export const SubscriptionServiceListRequest = {
  encode(message: SubscriptionServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== undefined) {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SubscriptionServiceListRequest>): SubscriptionServiceListRequest {
    return SubscriptionServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceListRequest>): SubscriptionServiceListRequest {
    const message = createBaseSubscriptionServiceListRequest();
    message.userId = object.userId ?? undefined;
    return message;
  },
};

function createBaseSubscriptionServiceListResponse(): SubscriptionServiceListResponse {
  return { subscriptions: [] };
}

export const SubscriptionServiceListResponse = {
  encode(message: SubscriptionServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.subscriptions) {
      Subscription.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.subscriptions.push(Subscription.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<SubscriptionServiceListResponse>): SubscriptionServiceListResponse {
    return SubscriptionServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceListResponse>): SubscriptionServiceListResponse {
    const message = createBaseSubscriptionServiceListResponse();
    message.subscriptions = object.subscriptions?.map((e) => Subscription.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSubscriptionServiceUpdateRequest(): SubscriptionServiceUpdateRequest {
  return { orgId: undefined };
}

export const SubscriptionServiceUpdateRequest = {
  encode(message: SubscriptionServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceUpdateRequest();
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

  create(base?: DeepPartial<SubscriptionServiceUpdateRequest>): SubscriptionServiceUpdateRequest {
    return SubscriptionServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceUpdateRequest>): SubscriptionServiceUpdateRequest {
    const message = createBaseSubscriptionServiceUpdateRequest();
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseSubscriptionServiceUpdateResponse(): SubscriptionServiceUpdateResponse {
  return {};
}

export const SubscriptionServiceUpdateResponse = {
  encode(_: SubscriptionServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceUpdateResponse();
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

  create(base?: DeepPartial<SubscriptionServiceUpdateResponse>): SubscriptionServiceUpdateResponse {
    return SubscriptionServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<SubscriptionServiceUpdateResponse>): SubscriptionServiceUpdateResponse {
    const message = createBaseSubscriptionServiceUpdateResponse();
    return message;
  },
};

function createBaseSubscriptionServiceDeleteRequest(): SubscriptionServiceDeleteRequest {
  return { id: "" };
}

export const SubscriptionServiceDeleteRequest = {
  encode(message: SubscriptionServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceDeleteRequest();
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

  create(base?: DeepPartial<SubscriptionServiceDeleteRequest>): SubscriptionServiceDeleteRequest {
    return SubscriptionServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SubscriptionServiceDeleteRequest>): SubscriptionServiceDeleteRequest {
    const message = createBaseSubscriptionServiceDeleteRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseSubscriptionServiceDeleteResponse(): SubscriptionServiceDeleteResponse {
  return {};
}

export const SubscriptionServiceDeleteResponse = {
  encode(_: SubscriptionServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubscriptionServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubscriptionServiceDeleteResponse();
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

  create(base?: DeepPartial<SubscriptionServiceDeleteResponse>): SubscriptionServiceDeleteResponse {
    return SubscriptionServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<SubscriptionServiceDeleteResponse>): SubscriptionServiceDeleteResponse {
    const message = createBaseSubscriptionServiceDeleteResponse();
    return message;
  },
};

/** Service for managing third-party subscriptions. */
export type SubscriptionServiceDefinition = typeof SubscriptionServiceDefinition;
export const SubscriptionServiceDefinition = {
  name: "SubscriptionService",
  fullName: "blockjoy.v1.SubscriptionService",
  methods: {
    /** Create a new third-party subscription. */
    create: {
      name: "Create",
      requestType: SubscriptionServiceCreateRequest,
      requestStream: false,
      responseType: SubscriptionServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Get details for a single subscription. */
    get: {
      name: "Get",
      requestType: SubscriptionServiceGetRequest,
      requestStream: false,
      responseType: SubscriptionServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** List details of subscriptions matching some criteria. */
    list: {
      name: "List",
      requestType: SubscriptionServiceListRequest,
      requestStream: false,
      responseType: SubscriptionServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Update an existing third-party subscription. */
    update: {
      name: "Update",
      requestType: SubscriptionServiceUpdateRequest,
      requestStream: false,
      responseType: SubscriptionServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Delete an existing third-party subscription. */
    delete: {
      name: "Delete",
      requestType: SubscriptionServiceDeleteRequest,
      requestStream: false,
      responseType: SubscriptionServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface SubscriptionServiceImplementation<CallContextExt = {}> {
  /** Create a new third-party subscription. */
  create(
    request: SubscriptionServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SubscriptionServiceCreateResponse>>;
  /** Get details for a single subscription. */
  get(
    request: SubscriptionServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SubscriptionServiceGetResponse>>;
  /** List details of subscriptions matching some criteria. */
  list(
    request: SubscriptionServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SubscriptionServiceListResponse>>;
  /** Update an existing third-party subscription. */
  update(
    request: SubscriptionServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SubscriptionServiceUpdateResponse>>;
  /** Delete an existing third-party subscription. */
  delete(
    request: SubscriptionServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<SubscriptionServiceDeleteResponse>>;
}

export interface SubscriptionServiceClient<CallOptionsExt = {}> {
  /** Create a new third-party subscription. */
  create(
    request: DeepPartial<SubscriptionServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SubscriptionServiceCreateResponse>;
  /** Get details for a single subscription. */
  get(
    request: DeepPartial<SubscriptionServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SubscriptionServiceGetResponse>;
  /** List details of subscriptions matching some criteria. */
  list(
    request: DeepPartial<SubscriptionServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SubscriptionServiceListResponse>;
  /** Update an existing third-party subscription. */
  update(
    request: DeepPartial<SubscriptionServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SubscriptionServiceUpdateResponse>;
  /** Delete an existing third-party subscription. */
  delete(
    request: DeepPartial<SubscriptionServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<SubscriptionServiceDeleteResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
