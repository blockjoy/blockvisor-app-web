/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "v1";

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

export interface GetHostProvisionRequest {
  id: string;
}

export interface GetHostProvisionResponse {
  hostProvisions: HostProvision | undefined;
}

export interface CreateHostProvisionRequest {
  ipRangeFrom: string;
  ipRangeTo: string;
  ipGateway: string;
}

export interface CreateHostProvisionResponse {
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
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.claimedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.installCmd = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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

function createBaseGetHostProvisionRequest(): GetHostProvisionRequest {
  return { id: "" };
}

export const GetHostProvisionRequest = {
  encode(message: GetHostProvisionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHostProvisionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHostProvisionRequest();
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

  create(base?: DeepPartial<GetHostProvisionRequest>): GetHostProvisionRequest {
    return GetHostProvisionRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetHostProvisionRequest>): GetHostProvisionRequest {
    const message = createBaseGetHostProvisionRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetHostProvisionResponse(): GetHostProvisionResponse {
  return { hostProvisions: undefined };
}

export const GetHostProvisionResponse = {
  encode(message: GetHostProvisionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostProvisions !== undefined) {
      HostProvision.encode(message.hostProvisions, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHostProvisionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHostProvisionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hostProvisions = HostProvision.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetHostProvisionResponse>): GetHostProvisionResponse {
    return GetHostProvisionResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetHostProvisionResponse>): GetHostProvisionResponse {
    const message = createBaseGetHostProvisionResponse();
    message.hostProvisions = (object.hostProvisions !== undefined && object.hostProvisions !== null)
      ? HostProvision.fromPartial(object.hostProvisions)
      : undefined;
    return message;
  },
};

function createBaseCreateHostProvisionRequest(): CreateHostProvisionRequest {
  return { ipRangeFrom: "", ipRangeTo: "", ipGateway: "" };
}

export const CreateHostProvisionRequest = {
  encode(message: CreateHostProvisionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ipRangeFrom !== "") {
      writer.uint32(10).string(message.ipRangeFrom);
    }
    if (message.ipRangeTo !== "") {
      writer.uint32(18).string(message.ipRangeTo);
    }
    if (message.ipGateway !== "") {
      writer.uint32(26).string(message.ipGateway);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHostProvisionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHostProvisionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateHostProvisionRequest>): CreateHostProvisionRequest {
    return CreateHostProvisionRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateHostProvisionRequest>): CreateHostProvisionRequest {
    const message = createBaseCreateHostProvisionRequest();
    message.ipRangeFrom = object.ipRangeFrom ?? "";
    message.ipRangeTo = object.ipRangeTo ?? "";
    message.ipGateway = object.ipGateway ?? "";
    return message;
  },
};

function createBaseCreateHostProvisionResponse(): CreateHostProvisionResponse {
  return { hostProvision: undefined };
}

export const CreateHostProvisionResponse = {
  encode(message: CreateHostProvisionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostProvision !== undefined) {
      HostProvision.encode(message.hostProvision, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHostProvisionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHostProvisionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hostProvision = HostProvision.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateHostProvisionResponse>): CreateHostProvisionResponse {
    return CreateHostProvisionResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateHostProvisionResponse>): CreateHostProvisionResponse {
    const message = createBaseCreateHostProvisionResponse();
    message.hostProvision = (object.hostProvision !== undefined && object.hostProvision !== null)
      ? HostProvision.fromPartial(object.hostProvision)
      : undefined;
    return message;
  },
};

/** Host provisioning */
export type HostProvisionsDefinition = typeof HostProvisionsDefinition;
export const HostProvisionsDefinition = {
  name: "HostProvisions",
  fullName: "v1.HostProvisions",
  methods: {
    /**
     * Get a single host provision identified by ID or a list of all available
     * host provisions
     */
    get: {
      name: "Get",
      requestType: GetHostProvisionRequest,
      requestStream: false,
      responseType: GetHostProvisionResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single host provision */
    create: {
      name: "Create",
      requestType: CreateHostProvisionRequest,
      requestStream: false,
      responseType: CreateHostProvisionResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface HostProvisionsServiceImplementation<CallContextExt = {}> {
  /**
   * Get a single host provision identified by ID or a list of all available
   * host provisions
   */
  get(
    request: GetHostProvisionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<GetHostProvisionResponse>>;
  /** Create a single host provision */
  create(
    request: CreateHostProvisionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CreateHostProvisionResponse>>;
}

export interface HostProvisionsClient<CallOptionsExt = {}> {
  /**
   * Get a single host provision identified by ID or a list of all available
   * host provisions
   */
  get(
    request: DeepPartial<GetHostProvisionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<GetHostProvisionResponse>;
  /** Create a single host provision */
  create(
    request: DeepPartial<CreateHostProvisionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CreateHostProvisionResponse>;
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
