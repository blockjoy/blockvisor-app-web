/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

export enum HostConnectionStatus {
  HOST_CONNECTION_STATUS_UNSPECIFIED = 0,
  HOST_CONNECTION_STATUS_ONLINE = 1,
  HOST_CONNECTION_STATUS_OFFLINE = 2,
  UNRECOGNIZED = -1,
}

/** Possible states the container is described with */
export enum HostStatus {
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

export interface Host {
  /** This is the id of the host. */
  id: string;
  /** This is the randomly generated name of the host. */
  name: string;
  /** The version of the blockjoy control software running on the host. */
  version: string;
  /**
   * The number of logical cores the machine has, _not_ the number of physical
   * cores.
   */
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
  os: string;
  /** The version of said operating system running on the host. */
  osVersion: string;
  /** The ip address on which the machine is reachable. */
  ip: string;
  /** Current status of the machine, or `UNSPECIFIED`. */
  status: HostStatus;
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
  ipGateway?:
    | string
    | undefined;
  /** The organization that this host belongs to. */
  orgId?: string | undefined;
}

export interface HostServiceCreateRequest {
  /**
   * Each user has a token within an organization that we use to identify which
   * user created this organization.
   */
  provisionToken: string;
  /** A name to recognise the host by. */
  name: string;
  /** The version of the blockvisor software running on the host. */
  version: string;
  /**
   * The number of logical cores on this computer, _not_ the number of physical
   * cores.
   */
  cpuCount: number;
  /** The amount of memory that this computer has, in bytes. */
  memSizeBytes: number;
  /** The amount of storage that this computer has, in bytes. */
  diskSizeBytes: number;
  /** The operating system running on this computer. */
  os: string;
  /** The version of said operating system. */
  osVersion: string;
  ipAddr: string;
  ipRangeFrom: string;
  ipRangeTo: string;
  ipGateway: string;
  /**
   * The organization that this host belongs to. This field _must_ be populated
   * with the current organization id.
   */
  orgId?: string | undefined;
}

export interface HostServiceCreateResponse {
  host: Host | undefined;
  token: string;
  refresh: string;
}

export interface HostServiceGetRequest {
  id: string;
}

export interface HostServiceGetResponse {
  host: Host | undefined;
}

export interface HostServiceListRequest {
  orgId: string;
  /** If this value is provided, only hosts with the given status are returned. */
  status?: HostStatus | undefined;
}

export interface HostServiceListResponse {
  hosts: Host[];
}

export interface HostServiceUpdateRequest {
  id: string;
  name?: string | undefined;
  version?: string | undefined;
  os?: string | undefined;
  osVersion?: string | undefined;
}

export interface HostServiceUpdateResponse {
}

export interface HostServiceDeleteRequest {
  id: string;
}

export interface HostServiceDeleteResponse {
}

function createBaseHost(): Host {
  return {
    id: "",
    name: "",
    version: "",
    cpuCount: undefined,
    memSizeBytes: undefined,
    diskSizeBytes: undefined,
    os: "",
    osVersion: "",
    ip: "",
    status: 0,
    createdAt: undefined,
    ipRangeFrom: undefined,
    ipRangeTo: undefined,
    ipGateway: undefined,
    orgId: undefined,
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
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
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
    if (message.os !== "") {
      writer.uint32(66).string(message.os);
    }
    if (message.osVersion !== "") {
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
    if (message.orgId !== undefined) {
      writer.uint32(130).string(message.orgId);
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
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.cpuCount = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.memSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.diskSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.os = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.osVersion = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 16:
          if (tag !== 130) {
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

  create(base?: DeepPartial<Host>): Host {
    return Host.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Host>): Host {
    const message = createBaseHost();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.cpuCount = object.cpuCount ?? undefined;
    message.memSizeBytes = object.memSizeBytes ?? undefined;
    message.diskSizeBytes = object.diskSizeBytes ?? undefined;
    message.os = object.os ?? "";
    message.osVersion = object.osVersion ?? "";
    message.ip = object.ip ?? "";
    message.status = object.status ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.ipRangeFrom = object.ipRangeFrom ?? undefined;
    message.ipRangeTo = object.ipRangeTo ?? undefined;
    message.ipGateway = object.ipGateway ?? undefined;
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseHostServiceCreateRequest(): HostServiceCreateRequest {
  return {
    provisionToken: "",
    name: "",
    version: "",
    cpuCount: 0,
    memSizeBytes: 0,
    diskSizeBytes: 0,
    os: "",
    osVersion: "",
    ipAddr: "",
    ipRangeFrom: "",
    ipRangeTo: "",
    ipGateway: "",
    orgId: undefined,
  };
}

export const HostServiceCreateRequest = {
  encode(message: HostServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.provisionToken !== "") {
      writer.uint32(10).string(message.provisionToken);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
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
    if (message.orgId !== undefined) {
      writer.uint32(106).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.provisionToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.cpuCount = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.memSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.diskSizeBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.os = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.osVersion = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.ipAddr = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.ipRangeFrom = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.ipRangeTo = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
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

  create(base?: DeepPartial<HostServiceCreateRequest>): HostServiceCreateRequest {
    return HostServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceCreateRequest>): HostServiceCreateRequest {
    const message = createBaseHostServiceCreateRequest();
    message.provisionToken = object.provisionToken ?? "";
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.cpuCount = object.cpuCount ?? 0;
    message.memSizeBytes = object.memSizeBytes ?? 0;
    message.diskSizeBytes = object.diskSizeBytes ?? 0;
    message.os = object.os ?? "";
    message.osVersion = object.osVersion ?? "";
    message.ipAddr = object.ipAddr ?? "";
    message.ipRangeFrom = object.ipRangeFrom ?? "";
    message.ipRangeTo = object.ipRangeTo ?? "";
    message.ipGateway = object.ipGateway ?? "";
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseHostServiceCreateResponse(): HostServiceCreateResponse {
  return { host: undefined, token: "", refresh: "" };
}

export const HostServiceCreateResponse = {
  encode(message: HostServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.refresh !== "") {
      writer.uint32(26).string(message.refresh);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.host = Host.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.token = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.refresh = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceCreateResponse>): HostServiceCreateResponse {
    return HostServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceCreateResponse>): HostServiceCreateResponse {
    const message = createBaseHostServiceCreateResponse();
    message.host = (object.host !== undefined && object.host !== null) ? Host.fromPartial(object.host) : undefined;
    message.token = object.token ?? "";
    message.refresh = object.refresh ?? "";
    return message;
  },
};

function createBaseHostServiceGetRequest(): HostServiceGetRequest {
  return { id: "" };
}

export const HostServiceGetRequest = {
  encode(message: HostServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceGetRequest();
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

  create(base?: DeepPartial<HostServiceGetRequest>): HostServiceGetRequest {
    return HostServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceGetRequest>): HostServiceGetRequest {
    const message = createBaseHostServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseHostServiceGetResponse(): HostServiceGetResponse {
  return { host: undefined };
}

export const HostServiceGetResponse = {
  encode(message: HostServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.host = Host.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceGetResponse>): HostServiceGetResponse {
    return HostServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceGetResponse>): HostServiceGetResponse {
    const message = createBaseHostServiceGetResponse();
    message.host = (object.host !== undefined && object.host !== null) ? Host.fromPartial(object.host) : undefined;
    return message;
  },
};

function createBaseHostServiceListRequest(): HostServiceListRequest {
  return { orgId: "", status: undefined };
}

export const HostServiceListRequest = {
  encode(message: HostServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.status !== undefined) {
      writer.uint32(16).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceListRequest();
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
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceListRequest>): HostServiceListRequest {
    return HostServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceListRequest>): HostServiceListRequest {
    const message = createBaseHostServiceListRequest();
    message.orgId = object.orgId ?? "";
    message.status = object.status ?? undefined;
    return message;
  },
};

function createBaseHostServiceListResponse(): HostServiceListResponse {
  return { hosts: [] };
}

export const HostServiceListResponse = {
  encode(message: HostServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.hosts) {
      Host.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hosts.push(Host.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceListResponse>): HostServiceListResponse {
    return HostServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceListResponse>): HostServiceListResponse {
    const message = createBaseHostServiceListResponse();
    message.hosts = object.hosts?.map((e) => Host.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostServiceUpdateRequest(): HostServiceUpdateRequest {
  return { id: "", name: undefined, version: undefined, os: undefined, osVersion: undefined };
}

export const HostServiceUpdateRequest = {
  encode(message: HostServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.version !== undefined) {
      writer.uint32(26).string(message.version);
    }
    if (message.os !== undefined) {
      writer.uint32(42).string(message.os);
    }
    if (message.osVersion !== undefined) {
      writer.uint32(50).string(message.osVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceUpdateRequest();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.os = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.osVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceUpdateRequest>): HostServiceUpdateRequest {
    return HostServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceUpdateRequest>): HostServiceUpdateRequest {
    const message = createBaseHostServiceUpdateRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? undefined;
    message.version = object.version ?? undefined;
    message.os = object.os ?? undefined;
    message.osVersion = object.osVersion ?? undefined;
    return message;
  },
};

function createBaseHostServiceUpdateResponse(): HostServiceUpdateResponse {
  return {};
}

export const HostServiceUpdateResponse = {
  encode(_: HostServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceUpdateResponse();
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

  create(base?: DeepPartial<HostServiceUpdateResponse>): HostServiceUpdateResponse {
    return HostServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostServiceUpdateResponse>): HostServiceUpdateResponse {
    const message = createBaseHostServiceUpdateResponse();
    return message;
  },
};

function createBaseHostServiceDeleteRequest(): HostServiceDeleteRequest {
  return { id: "" };
}

export const HostServiceDeleteRequest = {
  encode(message: HostServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceDeleteRequest();
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

  create(base?: DeepPartial<HostServiceDeleteRequest>): HostServiceDeleteRequest {
    return HostServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceDeleteRequest>): HostServiceDeleteRequest {
    const message = createBaseHostServiceDeleteRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseHostServiceDeleteResponse(): HostServiceDeleteResponse {
  return {};
}

export const HostServiceDeleteResponse = {
  encode(_: HostServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceDeleteResponse();
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

  create(base?: DeepPartial<HostServiceDeleteResponse>): HostServiceDeleteResponse {
    return HostServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostServiceDeleteResponse>): HostServiceDeleteResponse {
    const message = createBaseHostServiceDeleteResponse();
    return message;
  },
};

/** Manage hosts. */
export type HostServiceDefinition = typeof HostServiceDefinition;
export const HostServiceDefinition = {
  name: "HostService",
  fullName: "blockjoy.v1.HostService",
  methods: {
    /** Create a single host */
    create: {
      name: "Create",
      requestType: HostServiceCreateRequest,
      requestStream: false,
      responseType: HostServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    get: {
      name: "Get",
      requestType: HostServiceGetRequest,
      requestStream: false,
      responseType: HostServiceGetResponse,
      responseStream: false,
      options: {},
    },
    list: {
      name: "List",
      requestType: HostServiceListRequest,
      requestStream: false,
      responseType: HostServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single host */
    update: {
      name: "Update",
      requestType: HostServiceUpdateRequest,
      requestStream: false,
      responseType: HostServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single host */
    delete: {
      name: "Delete",
      requestType: HostServiceDeleteRequest,
      requestStream: false,
      responseType: HostServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface HostServiceImplementation<CallContextExt = {}> {
  /** Create a single host */
  create(
    request: HostServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceCreateResponse>>;
  get(
    request: HostServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceGetResponse>>;
  list(
    request: HostServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceListResponse>>;
  /** Update a single host */
  update(
    request: HostServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceUpdateResponse>>;
  /** Delete a single host */
  delete(
    request: HostServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceDeleteResponse>>;
}

export interface HostServiceClient<CallOptionsExt = {}> {
  /** Create a single host */
  create(
    request: DeepPartial<HostServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceCreateResponse>;
  get(
    request: DeepPartial<HostServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceGetResponse>;
  list(
    request: DeepPartial<HostServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceListResponse>;
  /** Update a single host */
  update(
    request: DeepPartial<HostServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceUpdateResponse>;
  /** Delete a single host */
  delete(
    request: DeepPartial<HostServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceDeleteResponse>;
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
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
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
