/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

/** HostProvision entity */
export interface HostProvision {
  id: string;
  /**
   * This field is populated only if this HostProvision has been used to create
   * a host. Afer that happens, the created host's id will be placed here.
   */
  hostId?: string | undefined;
  createdAt:
    | Date
    | undefined;
  /**
   * If this HostProvision has been used to create a Host, the moment of host
   * creation  will be placed here.
   */
  claimedAt?: Date | undefined;
  installCmd?: string | undefined;
  ipRangeFrom: string;
  ipRangeTo: string;
  ipGateway: string;
  orgId?: string | undefined;
}

export interface HostProvisionServiceGetRequest {
  id: string;
}

export interface HostProvisionServiceGetResponse {
  hostProvisions: HostProvision | undefined;
}

export interface HostProvisionServiceCreateRequest {
  ipRangeFrom: string;
  ipRangeTo: string;
  ipGateway: string;
  orgId?: string | undefined;
}

export interface HostProvisionServiceCreateResponse {
  hostProvision: HostProvision | undefined;
}

function createBaseHostProvision(): HostProvision {
  return {
    id: "",
    hostId: undefined,
    createdAt: undefined,
    claimedAt: undefined,
    installCmd: undefined,
    ipRangeFrom: "",
    ipRangeTo: "",
    ipGateway: "",
    orgId: undefined,
  };
}

export const HostProvision = {
  encode(message: HostProvision, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.hostId !== undefined) {
      writer.uint32(18).string(message.hostId);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    if (message.claimedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.claimedAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.installCmd !== undefined) {
      writer.uint32(42).string(message.installCmd);
    }
    if (message.ipRangeFrom !== "") {
      writer.uint32(50).string(message.ipRangeFrom);
    }
    if (message.ipRangeTo !== "") {
      writer.uint32(58).string(message.ipRangeTo);
    }
    if (message.ipGateway !== "") {
      writer.uint32(66).string(message.ipGateway);
    }
    if (message.orgId !== undefined) {
      writer.uint32(74).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostProvision {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostProvision();
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

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.claimedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.installCmd = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
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

  create(base?: DeepPartial<HostProvision>): HostProvision {
    return HostProvision.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostProvision>): HostProvision {
    const message = createBaseHostProvision();
    message.id = object.id ?? "";
    message.hostId = object.hostId ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.claimedAt = object.claimedAt ?? undefined;
    message.installCmd = object.installCmd ?? undefined;
    message.ipRangeFrom = object.ipRangeFrom ?? "";
    message.ipRangeTo = object.ipRangeTo ?? "";
    message.ipGateway = object.ipGateway ?? "";
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseHostProvisionServiceGetRequest(): HostProvisionServiceGetRequest {
  return { id: "" };
}

export const HostProvisionServiceGetRequest = {
  encode(message: HostProvisionServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostProvisionServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostProvisionServiceGetRequest();
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

  create(base?: DeepPartial<HostProvisionServiceGetRequest>): HostProvisionServiceGetRequest {
    return HostProvisionServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostProvisionServiceGetRequest>): HostProvisionServiceGetRequest {
    const message = createBaseHostProvisionServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseHostProvisionServiceGetResponse(): HostProvisionServiceGetResponse {
  return { hostProvisions: undefined };
}

export const HostProvisionServiceGetResponse = {
  encode(message: HostProvisionServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostProvisions !== undefined) {
      HostProvision.encode(message.hostProvisions, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostProvisionServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostProvisionServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostProvisions = HostProvision.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostProvisionServiceGetResponse>): HostProvisionServiceGetResponse {
    return HostProvisionServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostProvisionServiceGetResponse>): HostProvisionServiceGetResponse {
    const message = createBaseHostProvisionServiceGetResponse();
    message.hostProvisions = (object.hostProvisions !== undefined && object.hostProvisions !== null)
      ? HostProvision.fromPartial(object.hostProvisions)
      : undefined;
    return message;
  },
};

function createBaseHostProvisionServiceCreateRequest(): HostProvisionServiceCreateRequest {
  return { ipRangeFrom: "", ipRangeTo: "", ipGateway: "", orgId: undefined };
}

export const HostProvisionServiceCreateRequest = {
  encode(message: HostProvisionServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ipRangeFrom !== "") {
      writer.uint32(10).string(message.ipRangeFrom);
    }
    if (message.ipRangeTo !== "") {
      writer.uint32(18).string(message.ipRangeTo);
    }
    if (message.ipGateway !== "") {
      writer.uint32(26).string(message.ipGateway);
    }
    if (message.orgId !== undefined) {
      writer.uint32(34).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostProvisionServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostProvisionServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

  create(base?: DeepPartial<HostProvisionServiceCreateRequest>): HostProvisionServiceCreateRequest {
    return HostProvisionServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostProvisionServiceCreateRequest>): HostProvisionServiceCreateRequest {
    const message = createBaseHostProvisionServiceCreateRequest();
    message.ipRangeFrom = object.ipRangeFrom ?? "";
    message.ipRangeTo = object.ipRangeTo ?? "";
    message.ipGateway = object.ipGateway ?? "";
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseHostProvisionServiceCreateResponse(): HostProvisionServiceCreateResponse {
  return { hostProvision: undefined };
}

export const HostProvisionServiceCreateResponse = {
  encode(message: HostProvisionServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostProvision !== undefined) {
      HostProvision.encode(message.hostProvision, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostProvisionServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostProvisionServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostProvision = HostProvision.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostProvisionServiceCreateResponse>): HostProvisionServiceCreateResponse {
    return HostProvisionServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostProvisionServiceCreateResponse>): HostProvisionServiceCreateResponse {
    const message = createBaseHostProvisionServiceCreateResponse();
    message.hostProvision = (object.hostProvision !== undefined && object.hostProvision !== null)
      ? HostProvision.fromPartial(object.hostProvision)
      : undefined;
    return message;
  },
};

/** Host provisioning */
export type HostProvisionServiceDefinition = typeof HostProvisionServiceDefinition;
export const HostProvisionServiceDefinition = {
  name: "HostProvisionService",
  fullName: "blockjoy.v1.HostProvisionService",
  methods: {
    /**
     * Get a single host provision identified by ID or a list of all available
     * host provisions
     */
    get: {
      name: "Get",
      requestType: HostProvisionServiceGetRequest,
      requestStream: false,
      responseType: HostProvisionServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single host provision */
    create: {
      name: "Create",
      requestType: HostProvisionServiceCreateRequest,
      requestStream: false,
      responseType: HostProvisionServiceCreateResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface HostProvisionServiceImplementation<CallContextExt = {}> {
  /**
   * Get a single host provision identified by ID or a list of all available
   * host provisions
   */
  get(
    request: HostProvisionServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostProvisionServiceGetResponse>>;
  /** Create a single host provision */
  create(
    request: HostProvisionServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostProvisionServiceCreateResponse>>;
}

export interface HostProvisionServiceClient<CallOptionsExt = {}> {
  /**
   * Get a single host provision identified by ID or a list of all available
   * host provisions
   */
  get(
    request: DeepPartial<HostProvisionServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostProvisionServiceGetResponse>;
  /** Create a single host provision */
  create(
    request: DeepPartial<HostProvisionServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostProvisionServiceCreateResponse>;
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
