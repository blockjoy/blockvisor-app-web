/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "v1";

export interface Host {
  /** This is the id of the host. */
  id: string;
  /** This is the randomly generated name of the host. */
  name: string;
  /** The version of the blockjoy control software running on the host. */
  version?:
    | string
    | undefined;
  /** The physical location of the server. */
  location?:
    | string
    | undefined;
  /** The number of logical cores the machine has. */
  cpuCount?:
    | number
    | undefined;
  /** The amount of physical memory the machine has. */
  memSizeBytes?:
    | number
    | undefined;
  /** The size of the physical disks the machine has. */
  diskSizeBytes?:
    | number
    | undefined;
  /** The operating system running on the machine, i.e. "BSD" or "Linux". */
  os?:
    | string
    | undefined;
  /** The version of said operating system running on the host. */
  osVersion?:
    | string
    | undefined;
  /** The ip address on which the machine is reachable. */
  ip: string;
  /** Current status of the machine, or `UNSPECIFIED`. */
  status: Host_HostStatus;
  /**
   * The moment this host was created. Corresponds to the moment that the
   * host_provision was
   */
  createdAt:
    | Date
    | undefined;
  /** The lowest ip address that this host may assign to a node. */
  ipRangeFrom?:
    | string
    | undefined;
  /** The highest ip address that this host may assign to a node. */
  ipRangeTo?:
    | string
    | undefined;
  /** The ip gateway of this host. */
  ipGateway?: string | undefined;
}

/** Possible states the container is described with */
export enum Host_HostStatus {
  HOST_STATUS_UNSPECIFIED = 0,
  HOST_STATUS_CREATING = 1,
  HOST_STATUS_RUNNING = 2,
  HOST_STATUS_STARTING = 3,
  HOST_STATUS_STOPPING = 4,
  HOST_STATUS_STOPPED = 5,
  HOST_STATUS_UPGRADING = 6,
  HOST_STATUS_UPGRADED = 7,
  HOST_STATUS_DELETING = 8,
  HOST_STATUS_DELETED = 9,
  HOST_STATUS_INSTALLING = 10,
  HOST_STATUS_SNAPSHOTTING = 11,
  UNRECOGNIZED = -1,
}

export interface CreateHostRequest {
  name: string;
  version: string;
  location?: string | undefined;
  cpuCount: number;
  memSizeBytes: number;
  diskSizeBytes: number;
  os: string;
  osVersion: string;
  ipAddr: string;
  ipRangeFrom: string;
  ipRangeTo: string;
  ipGateway: string;
}

export interface CreateHostResponse {
}

export interface GetHostRequest {
  id: string;
}

export interface GetHostResponse {
  host: Host | undefined;
}

export interface ListHostsRequest {
}

export interface ListHostsResponse {
  hosts: Host[];
}

export interface UpdateHostRequest {
  id: string;
  name?: string | undefined;
  version?: string | undefined;
  location?: string | undefined;
  os?: string | undefined;
  osVersion?: string | undefined;
}

export interface UpdateHostResponse {
}

export interface DeleteHostRequest {
  id: string;
}

export interface DeleteHostResponse {
}

export interface ProvisionHostRequest {
  otp: string;
  status: ProvisionHostRequest_ConnectionStatus;
  name: string;
  version: string;
  cpuCount: number;
  /** The amount of memory in bytes that the host has. */
  memSizeBytes: number;
  /** The amount of disk space in bytes that the host has. */
  diskSizeBytes: number;
  os: string;
  osVersion: string;
  ip: string;
}

export enum ProvisionHostRequest_ConnectionStatus {
  CONNECTION_STATUS_UNSPECIFIED = 0,
  CONNECTION_STATUS_ONLINE = 1,
  CONNECTION_STATUS_OFFLINE = 2,
  UNRECOGNIZED = -1,
}

export interface ProvisionHostResponse {
  hostId: string;
  token: string;
}

function createBaseHost(): Host {
  return {
    id: "",
    name: "",
    version: undefined,
    location: undefined,
    cpuCount: undefined,
    memSizeBytes: undefined,
    diskSizeBytes: undefined,
    os: undefined,
    osVersion: undefined,
    ip: "",
    status: 0,
    createdAt: undefined,
    ipRangeFrom: undefined,
    ipRangeTo: undefined,
    ipGateway: undefined,
  };
}

export const Host = {
  encode(message: Host, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== undefined) {
      writer.uint32(26).string(message.version);
    }
    if (message.location !== undefined) {
      writer.uint32(34).string(message.location);
    }
    if (message.cpuCount !== undefined) {
      writer.uint32(40).uint64(message.cpuCount);
    }
    if (message.memSizeBytes !== undefined) {
      writer.uint32(48).uint64(message.memSizeBytes);
    }
    if (message.diskSizeBytes !== undefined) {
      writer.uint32(56).uint64(message.diskSizeBytes);
    }
    if (message.os !== undefined) {
      writer.uint32(66).string(message.os);
    }
    if (message.osVersion !== undefined) {
      writer.uint32(74).string(message.osVersion);
    }
    if (message.ip !== "") {
      writer.uint32(82).string(message.ip);
    }
    if (message.status !== 0) {
      writer.uint32(88).int32(message.status);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(98).fork()).ldelim();
    }
    if (message.ipRangeFrom !== undefined) {
      writer.uint32(106).string(message.ipRangeFrom);
    }
    if (message.ipRangeTo !== undefined) {
      writer.uint32(114).string(message.ipRangeTo);
    }
    if (message.ipGateway !== undefined) {
      writer.uint32(122).string(message.ipGateway);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Host {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHost();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.location = reader.string();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.cpuCount = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.memSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.diskSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.os = reader.string();
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.osVersion = reader.string();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 11:
          if (tag != 88) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 12:
          if (tag != 98) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag != 106) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 14:
          if (tag != 114) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 15:
          if (tag != 122) {
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

  create(base?: DeepPartial<Host>): Host {
    return Host.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Host>): Host {
    const message = createBaseHost();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? undefined;
    message.location = object.location ?? undefined;
    message.cpuCount = object.cpuCount ?? undefined;
    message.memSizeBytes = object.memSizeBytes ?? undefined;
    message.diskSizeBytes = object.diskSizeBytes ?? undefined;
    message.os = object.os ?? undefined;
    message.osVersion = object.osVersion ?? undefined;
    message.ip = object.ip ?? "";
    message.status = object.status ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.ipRangeFrom = object.ipRangeFrom ?? undefined;
    message.ipRangeTo = object.ipRangeTo ?? undefined;
    message.ipGateway = object.ipGateway ?? undefined;
    return message;
  },
};

function createBaseCreateHostRequest(): CreateHostRequest {
  return {
    name: "",
    version: "",
    location: undefined,
    cpuCount: 0,
    memSizeBytes: 0,
    diskSizeBytes: 0,
    os: "",
    osVersion: "",
    ipAddr: "",
    ipRangeFrom: "",
    ipRangeTo: "",
    ipGateway: "",
  };
}

export const CreateHostRequest = {
  encode(message: CreateHostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.location !== undefined) {
      writer.uint32(26).string(message.location);
    }
    if (message.cpuCount !== 0) {
      writer.uint32(32).uint64(message.cpuCount);
    }
    if (message.memSizeBytes !== 0) {
      writer.uint32(40).uint64(message.memSizeBytes);
    }
    if (message.diskSizeBytes !== 0) {
      writer.uint32(48).uint64(message.diskSizeBytes);
    }
    if (message.os !== "") {
      writer.uint32(58).string(message.os);
    }
    if (message.osVersion !== "") {
      writer.uint32(66).string(message.osVersion);
    }
    if (message.ipAddr !== "") {
      writer.uint32(74).string(message.ipAddr);
    }
    if (message.ipRangeFrom !== "") {
      writer.uint32(82).string(message.ipRangeFrom);
    }
    if (message.ipRangeTo !== "") {
      writer.uint32(90).string(message.ipRangeTo);
    }
    if (message.ipGateway !== "") {
      writer.uint32(98).string(message.ipGateway);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.version = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.location = reader.string();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.cpuCount = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.memSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.diskSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.os = reader.string();
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.osVersion = reader.string();
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.ipAddr = reader.string();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 11:
          if (tag != 90) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 12:
          if (tag != 98) {
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

  create(base?: DeepPartial<CreateHostRequest>): CreateHostRequest {
    return CreateHostRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateHostRequest>): CreateHostRequest {
    const message = createBaseCreateHostRequest();
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.location = object.location ?? undefined;
    message.cpuCount = object.cpuCount ?? 0;
    message.memSizeBytes = object.memSizeBytes ?? 0;
    message.diskSizeBytes = object.diskSizeBytes ?? 0;
    message.os = object.os ?? "";
    message.osVersion = object.osVersion ?? "";
    message.ipAddr = object.ipAddr ?? "";
    message.ipRangeFrom = object.ipRangeFrom ?? "";
    message.ipRangeTo = object.ipRangeTo ?? "";
    message.ipGateway = object.ipGateway ?? "";
    return message;
  },
};

function createBaseCreateHostResponse(): CreateHostResponse {
  return {};
}

export const CreateHostResponse = {
  encode(_: CreateHostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateHostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateHostResponse>): CreateHostResponse {
    return CreateHostResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<CreateHostResponse>): CreateHostResponse {
    const message = createBaseCreateHostResponse();
    return message;
  },
};

function createBaseGetHostRequest(): GetHostRequest {
  return { id: "" };
}

export const GetHostRequest = {
  encode(message: GetHostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHostRequest();
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

  create(base?: DeepPartial<GetHostRequest>): GetHostRequest {
    return GetHostRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetHostRequest>): GetHostRequest {
    const message = createBaseGetHostRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetHostResponse(): GetHostResponse {
  return { host: undefined };
}

export const GetHostResponse = {
  encode(message: GetHostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetHostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetHostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.host = Host.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetHostResponse>): GetHostResponse {
    return GetHostResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetHostResponse>): GetHostResponse {
    const message = createBaseGetHostResponse();
    message.host = (object.host !== undefined && object.host !== null) ? Host.fromPartial(object.host) : undefined;
    return message;
  },
};

function createBaseListHostsRequest(): ListHostsRequest {
  return {};
}

export const ListHostsRequest = {
  encode(_: ListHostsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListHostsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListHostsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListHostsRequest>): ListHostsRequest {
    return ListHostsRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<ListHostsRequest>): ListHostsRequest {
    const message = createBaseListHostsRequest();
    return message;
  },
};

function createBaseListHostsResponse(): ListHostsResponse {
  return { hosts: [] };
}

export const ListHostsResponse = {
  encode(message: ListHostsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.hosts) {
      Host.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListHostsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListHostsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hosts.push(Host.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListHostsResponse>): ListHostsResponse {
    return ListHostsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListHostsResponse>): ListHostsResponse {
    const message = createBaseListHostsResponse();
    message.hosts = object.hosts?.map((e) => Host.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateHostRequest(): UpdateHostRequest {
  return { id: "", name: undefined, version: undefined, location: undefined, os: undefined, osVersion: undefined };
}

export const UpdateHostRequest = {
  encode(message: UpdateHostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== undefined) {
      writer.uint32(26).string(message.version);
    }
    if (message.location !== undefined) {
      writer.uint32(34).string(message.location);
    }
    if (message.os !== undefined) {
      writer.uint32(42).string(message.os);
    }
    if (message.osVersion !== undefined) {
      writer.uint32(50).string(message.osVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateHostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateHostRequest();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.location = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.os = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.osVersion = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateHostRequest>): UpdateHostRequest {
    return UpdateHostRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateHostRequest>): UpdateHostRequest {
    const message = createBaseUpdateHostRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? undefined;
    message.version = object.version ?? undefined;
    message.location = object.location ?? undefined;
    message.os = object.os ?? undefined;
    message.osVersion = object.osVersion ?? undefined;
    return message;
  },
};

function createBaseUpdateHostResponse(): UpdateHostResponse {
  return {};
}

export const UpdateHostResponse = {
  encode(_: UpdateHostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateHostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateHostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateHostResponse>): UpdateHostResponse {
    return UpdateHostResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UpdateHostResponse>): UpdateHostResponse {
    const message = createBaseUpdateHostResponse();
    return message;
  },
};

function createBaseDeleteHostRequest(): DeleteHostRequest {
  return { id: "" };
}

export const DeleteHostRequest = {
  encode(message: DeleteHostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteHostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteHostRequest();
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

  create(base?: DeepPartial<DeleteHostRequest>): DeleteHostRequest {
    return DeleteHostRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DeleteHostRequest>): DeleteHostRequest {
    const message = createBaseDeleteHostRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeleteHostResponse(): DeleteHostResponse {
  return {};
}

export const DeleteHostResponse = {
  encode(_: DeleteHostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteHostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteHostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<DeleteHostResponse>): DeleteHostResponse {
    return DeleteHostResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DeleteHostResponse>): DeleteHostResponse {
    const message = createBaseDeleteHostResponse();
    return message;
  },
};

function createBaseProvisionHostRequest(): ProvisionHostRequest {
  return {
    otp: "",
    status: 0,
    name: "",
    version: "",
    cpuCount: 0,
    memSizeBytes: 0,
    diskSizeBytes: 0,
    os: "",
    osVersion: "",
    ip: "",
  };
}

export const ProvisionHostRequest = {
  encode(message: ProvisionHostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.otp !== "") {
      writer.uint32(10).string(message.otp);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.cpuCount !== 0) {
      writer.uint32(40).uint64(message.cpuCount);
    }
    if (message.memSizeBytes !== 0) {
      writer.uint32(48).uint64(message.memSizeBytes);
    }
    if (message.diskSizeBytes !== 0) {
      writer.uint32(56).uint64(message.diskSizeBytes);
    }
    if (message.os !== "") {
      writer.uint32(66).string(message.os);
    }
    if (message.osVersion !== "") {
      writer.uint32(74).string(message.osVersion);
    }
    if (message.ip !== "") {
      writer.uint32(82).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProvisionHostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProvisionHostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.otp = reader.string();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.cpuCount = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.memSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.diskSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag != 66) {
            break;
          }

          message.os = reader.string();
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.osVersion = reader.string();
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.ip = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ProvisionHostRequest>): ProvisionHostRequest {
    return ProvisionHostRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProvisionHostRequest>): ProvisionHostRequest {
    const message = createBaseProvisionHostRequest();
    message.otp = object.otp ?? "";
    message.status = object.status ?? 0;
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.cpuCount = object.cpuCount ?? 0;
    message.memSizeBytes = object.memSizeBytes ?? 0;
    message.diskSizeBytes = object.diskSizeBytes ?? 0;
    message.os = object.os ?? "";
    message.osVersion = object.osVersion ?? "";
    message.ip = object.ip ?? "";
    return message;
  },
};

function createBaseProvisionHostResponse(): ProvisionHostResponse {
  return { hostId: "", token: "" };
}

export const ProvisionHostResponse = {
  encode(message: ProvisionHostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProvisionHostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProvisionHostResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ProvisionHostResponse>): ProvisionHostResponse {
    return ProvisionHostResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProvisionHostResponse>): ProvisionHostResponse {
    const message = createBaseProvisionHostResponse();
    message.hostId = object.hostId ?? "";
    message.token = object.token ?? "";
    return message;
  },
};

/** Manage hosts */
export type HostsDefinition = typeof HostsDefinition;
export const HostsDefinition = {
  name: "Hosts",
  fullName: "v1.Hosts",
  methods: {
    /** Create a single host */
    create: {
      name: "Create",
      requestType: CreateHostRequest,
      requestStream: false,
      responseType: CreateHostResponse,
      responseStream: false,
      options: {},
    },
    get: {
      name: "Get",
      requestType: GetHostRequest,
      requestStream: false,
      responseType: GetHostResponse,
      responseStream: false,
      options: {},
    },
    list: {
      name: "List",
      requestType: ListHostsRequest,
      requestStream: false,
      responseType: ListHostsResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single host */
    update: {
      name: "Update",
      requestType: UpdateHostRequest,
      requestStream: false,
      responseType: UpdateHostResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single host */
    delete: {
      name: "Delete",
      requestType: DeleteHostRequest,
      requestStream: false,
      responseType: DeleteHostResponse,
      responseStream: false,
      options: {},
    },
    /** This endpoint creates a new host from an already created host provision. */
    provision: {
      name: "Provision",
      requestType: ProvisionHostRequest,
      requestStream: false,
      responseType: ProvisionHostResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface HostsServiceImplementation<CallContextExt = {}> {
  /** Create a single host */
  create(request: CreateHostRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CreateHostResponse>>;
  get(request: GetHostRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetHostResponse>>;
  list(request: ListHostsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ListHostsResponse>>;
  /** Update a single host */
  update(request: UpdateHostRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UpdateHostResponse>>;
  /** Delete a single host */
  delete(request: DeleteHostRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DeleteHostResponse>>;
  /** This endpoint creates a new host from an already created host provision. */
  provision(
    request: ProvisionHostRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProvisionHostResponse>>;
}

export interface HostsClient<CallOptionsExt = {}> {
  /** Create a single host */
  create(request: DeepPartial<CreateHostRequest>, options?: CallOptions & CallOptionsExt): Promise<CreateHostResponse>;
  get(request: DeepPartial<GetHostRequest>, options?: CallOptions & CallOptionsExt): Promise<GetHostResponse>;
  list(request: DeepPartial<ListHostsRequest>, options?: CallOptions & CallOptionsExt): Promise<ListHostsResponse>;
  /** Update a single host */
  update(request: DeepPartial<UpdateHostRequest>, options?: CallOptions & CallOptionsExt): Promise<UpdateHostResponse>;
  /** Delete a single host */
  delete(request: DeepPartial<DeleteHostRequest>, options?: CallOptions & CallOptionsExt): Promise<DeleteHostResponse>;
  /** This endpoint creates a new host from an already created host provision. */
  provision(
    request: DeepPartial<ProvisionHostRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProvisionHostResponse>;
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
