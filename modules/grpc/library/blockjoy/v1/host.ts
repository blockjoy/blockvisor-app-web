/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { BillingAmount } from "../common/v1/currency";
import { NodeType } from "../common/v1/node";
import { SearchOperator, SortOrder } from "../common/v1/search";
import { Tags, UpdateTags } from "../common/v1/tag";

export const protobufPackage = "blockjoy.v1";

export enum HostSortField {
  HOST_SORT_FIELD_UNSPECIFIED = 0,
  HOST_SORT_FIELD_HOST_NAME = 1,
  HOST_SORT_FIELD_CREATED_AT = 2,
  HOST_SORT_FIELD_VERSION = 3,
  HOST_SORT_FIELD_OS = 4,
  HOST_SORT_FIELD_OS_VERSION = 5,
  HOST_SORT_FIELD_CPU_COUNT = 6,
  HOST_SORT_FIELD_MEM_SIZE_BYTES = 7,
  HOST_SORT_FIELD_DISK_SIZE_BYTES = 8,
  HOST_SORT_FIELD_NODE_COUNT = 9,
  UNRECOGNIZED = -1,
}

/** The environment of host. */
export enum HostType {
  HOST_TYPE_UNSPECIFIED = 0,
  /** HOST_TYPE_CLOUD - This host is a host on the blockjoy cloud platform. */
  HOST_TYPE_CLOUD = 1,
  /** HOST_TYPE_PRIVATE - This host is a private host that can only be used by the org that owns it. */
  HOST_TYPE_PRIVATE = 2,
  UNRECOGNIZED = -1,
}

/** The connection status of a host. */
export enum HostConnectionStatus {
  HOST_CONNECTION_STATUS_UNSPECIFIED = 0,
  HOST_CONNECTION_STATUS_ONLINE = 1,
  HOST_CONNECTION_STATUS_OFFLINE = 2,
  UNRECOGNIZED = -1,
}

export enum ManagedBy {
  MANAGED_BY_UNSPECIFIED = 0,
  MANAGED_BY_AUTOMATIC = 1,
  MANAGED_BY_MANUAL = 2,
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
  cpuCount: number;
  /** The amount of physical memory the machine has. */
  memSizeBytes: number;
  /** The size of the physical disks the machine has. */
  diskSizeBytes: number;
  /** The operating system running on the machine, i.e. "BSD" or "Linux". */
  os: string;
  /** The version of said operating system running on the host. */
  osVersion: string;
  /** The ip address on which the machine is reachable. */
  ip: string;
  /**
   * The moment this host was created. Corresponds to the moment that the
   * host_provision was
   */
  createdAt:
    | Date
    | undefined;
  /** The ip gateway of this host. */
  ipGateway: string;
  /** The organization that this host belongs to. */
  orgId: string;
  /** The number of nodes on this host. */
  nodeCount: number;
  /** The name of the organization that this host belongs to. */
  orgName: string;
  /** The region of the host. */
  region?:
    | string
    | undefined;
  /** The optional billing amount for this host. */
  billingAmount?:
    | BillingAmount
    | undefined;
  /**
   * The root directory of the vmm, where all data related to the vmm is stored,
   * i.e. config data, secrets, vm mountpoints. Usually this will be
   * `/var/lib/blockvisor`.
   */
  vmmMountpoint?:
    | string
    | undefined;
  /** A list of ip addresses available for this host. */
  ipAddresses: HostIpAddress[];
  /** The entity that can make decisions on whether to run nodes on this host. */
  managedBy: ManagedBy;
  /** A list of tags that are attached to this host. */
  tags:
    | Tags
    | undefined;
  /** Monthly cost of this host. */
  cost?: BillingAmount | undefined;
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
  ipGateway: string;
  /**
   * A list of ip addresses that the nodes running on this host will be allowed
   * to use.
   */
  ips: string[];
  /**
   * The organization that this host belongs to. This field _must_ be populated
   * with the current organization id.
   */
  orgId?:
    | string
    | undefined;
  /** The region of the host */
  region?:
    | string
    | undefined;
  /** Optionally set a billing amount for this host. */
  billingAmount?:
    | BillingAmount
    | undefined;
  /**
   * The root directory of the vmm, where all data related to the vmm is stored,
   * i.e. config data, secrets, vm mountpoints. Usually this will be
   * `/var/lib/blockvisor`.
   */
  vmmMountpoint?:
    | string
    | undefined;
  /**
   * The entity that can make decisions on whether to run nodes on this host. By
   * default this value will be set to `Automatic`.
   */
  managedBy?:
    | ManagedBy
    | undefined;
  /** A list of tags that are attached to this host. */
  tags: Tags | undefined;
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
  orgIds: string[];
  /** The version of the blockvisor software running on the host. */
  versions: string[];
  /** The number of items to be skipped over. */
  offset: number;
  /**
   * The number of items that will be returned. Together with offset, you can
   * use this to get pagination.
   */
  limit: number;
  /** Search params. */
  search?:
    | HostSearch
    | undefined;
  /** The field sorting order of results. */
  sort: HostSort[];
}

export interface HostSearch {
  /** The way the search parameters should be combined. */
  operator: SearchOperator;
  /** Search for the id of the host. */
  id?:
    | string
    | undefined;
  /** Search only for the name of the host. */
  name?:
    | string
    | undefined;
  /** Search only for the version of the host. */
  version?:
    | string
    | undefined;
  /** Search only for the operating system. */
  os?:
    | string
    | undefined;
  /** Search only for the ip address. */
  ip?: string | undefined;
}

export interface HostSort {
  field: HostSortField;
  order: SortOrder;
}

export interface HostServiceListResponse {
  hosts: Host[];
  /** The total number of hosts matching your query. */
  hostCount: number;
}

export interface HostServiceUpdateRequest {
  id: string;
  name?: string | undefined;
  version?: string | undefined;
  os?: string | undefined;
  osVersion?:
    | string
    | undefined;
  /** The region of the host. */
  region?:
    | string
    | undefined;
  /** Optionally set a billing amount for this host. */
  billingAmount?:
    | BillingAmount
    | undefined;
  /** This is total disk space installed on host, given in bytes. */
  totalDiskSpace?:
    | number
    | undefined;
  /** The entity that can make decisions on whether to run nodes on this host. */
  managedBy?:
    | ManagedBy
    | undefined;
  /**
   * If this is provided, the tags contained in this will update the existing
   * tags.
   */
  updateTags?:
    | UpdateTags
    | undefined;
  /** The cost of this host. */
  cost?: BillingAmount | undefined;
}

export interface HostServiceUpdateResponse {
}

export interface HostServiceStartRequest {
  id: string;
}

export interface HostServiceStartResponse {
}

export interface HostServiceStopRequest {
  id: string;
}

export interface HostServiceStopResponse {
}

export interface HostServiceRestartRequest {
  id: string;
}

export interface HostServiceRestartResponse {
}

export interface HostServiceDeleteRequest {
  id: string;
}

export interface HostServiceDeleteResponse {
}

/** Used to produce a list of regions that are available to deploy nodes to. */
export interface HostServiceRegionsRequest {
  /**
   * The org for which to produce the list. This field is required for users
   * that are not administrators of the whole system.
   */
  orgId?:
    | string
    | undefined;
  /** The type of host to include in this list. */
  hostType?:
    | HostType
    | undefined;
  /** The id of the blockchain that should be ran inside the node. */
  blockchainId: string;
  /** The version of the node software that is ran. */
  version: string;
  /** The type of node that you want to create. */
  nodeType: NodeType;
}

export interface HostServiceRegionsResponse {
  regions: Region[];
}

export interface Region {
  name?:
    | string
    | undefined;
  /**
   * We currently have regions in the following pricing tiers:
   * NA1: North america
   * EU1: Europe
   * AP1: Asia-Pacific
   */
  pricingTier?: string | undefined;
}

export interface HostIpAddress {
  /** The ip address as a string. */
  ip: string;
  /** Whether or not the ip address is currently in use by a node. */
  assigned: boolean;
}

/** Used to indicate a change in the host status. */
export interface HostStatus {
  hostId: string;
  connectionStatus?: HostConnectionStatus | undefined;
}

function createBaseHost(): Host {
  return {
    id: "",
    name: "",
    version: "",
    cpuCount: 0,
    memSizeBytes: 0,
    diskSizeBytes: 0,
    os: "",
    osVersion: "",
    ip: "",
    createdAt: undefined,
    ipGateway: "",
    orgId: "",
    nodeCount: 0,
    orgName: "",
    region: undefined,
    billingAmount: undefined,
    vmmMountpoint: undefined,
    ipAddresses: [],
    managedBy: 0,
    tags: undefined,
    cost: undefined,
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
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(98).fork()).ldelim();
    }
    if (message.ipGateway !== "") {
      writer.uint32(122).string(message.ipGateway);
    }
    if (message.orgId !== "") {
      writer.uint32(130).string(message.orgId);
    }
    if (message.nodeCount !== 0) {
      writer.uint32(136).uint64(message.nodeCount);
    }
    if (message.orgName !== "") {
      writer.uint32(146).string(message.orgName);
    }
    if (message.region !== undefined) {
      writer.uint32(154).string(message.region);
    }
    if (message.billingAmount !== undefined) {
      BillingAmount.encode(message.billingAmount, writer.uint32(162).fork()).ldelim();
    }
    if (message.vmmMountpoint !== undefined) {
      writer.uint32(170).string(message.vmmMountpoint);
    }
    for (const v of message.ipAddresses) {
      HostIpAddress.encode(v!, writer.uint32(178).fork()).ldelim();
    }
    if (message.managedBy !== 0) {
      writer.uint32(184).int32(message.managedBy);
    }
    if (message.tags !== undefined) {
      Tags.encode(message.tags, writer.uint32(194).fork()).ldelim();
    }
    if (message.cost !== undefined) {
      BillingAmount.encode(message.cost, writer.uint32(202).fork()).ldelim();
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
        case 12:
          if (tag !== 98) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
        case 17:
          if (tag !== 136) {
            break;
          }

          message.nodeCount = longToNumber(reader.uint64() as Long);
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.region = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.billingAmount = BillingAmount.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.vmmMountpoint = reader.string();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.ipAddresses.push(HostIpAddress.decode(reader, reader.uint32()));
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.managedBy = reader.int32() as any;
          continue;
        case 24:
          if (tag !== 194) {
            break;
          }

          message.tags = Tags.decode(reader, reader.uint32());
          continue;
        case 25:
          if (tag !== 202) {
            break;
          }

          message.cost = BillingAmount.decode(reader, reader.uint32());
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
    message.cpuCount = object.cpuCount ?? 0;
    message.memSizeBytes = object.memSizeBytes ?? 0;
    message.diskSizeBytes = object.diskSizeBytes ?? 0;
    message.os = object.os ?? "";
    message.osVersion = object.osVersion ?? "";
    message.ip = object.ip ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.ipGateway = object.ipGateway ?? "";
    message.orgId = object.orgId ?? "";
    message.nodeCount = object.nodeCount ?? 0;
    message.orgName = object.orgName ?? "";
    message.region = object.region ?? undefined;
    message.billingAmount = (object.billingAmount !== undefined && object.billingAmount !== null)
      ? BillingAmount.fromPartial(object.billingAmount)
      : undefined;
    message.vmmMountpoint = object.vmmMountpoint ?? undefined;
    message.ipAddresses = object.ipAddresses?.map((e) => HostIpAddress.fromPartial(e)) || [];
    message.managedBy = object.managedBy ?? 0;
    message.tags = (object.tags !== undefined && object.tags !== null) ? Tags.fromPartial(object.tags) : undefined;
    message.cost = (object.cost !== undefined && object.cost !== null)
      ? BillingAmount.fromPartial(object.cost)
      : undefined;
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
    ipGateway: "",
    ips: [],
    orgId: undefined,
    region: undefined,
    billingAmount: undefined,
    vmmMountpoint: undefined,
    managedBy: undefined,
    tags: undefined,
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
    if (message.ipGateway !== "") {
      writer.uint32(98).string(message.ipGateway);
    }
    for (const v of message.ips) {
      writer.uint32(146).string(v!);
    }
    if (message.orgId !== undefined) {
      writer.uint32(106).string(message.orgId);
    }
    if (message.region !== undefined) {
      writer.uint32(114).string(message.region);
    }
    if (message.billingAmount !== undefined) {
      BillingAmount.encode(message.billingAmount, writer.uint32(122).fork()).ldelim();
    }
    if (message.vmmMountpoint !== undefined) {
      writer.uint32(130).string(message.vmmMountpoint);
    }
    if (message.managedBy !== undefined) {
      writer.uint32(136).int32(message.managedBy);
    }
    if (message.tags !== undefined) {
      Tags.encode(message.tags, writer.uint32(154).fork()).ldelim();
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
        case 12:
          if (tag !== 98) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.ips.push(reader.string());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.region = reader.string();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.billingAmount = BillingAmount.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.vmmMountpoint = reader.string();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.managedBy = reader.int32() as any;
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.tags = Tags.decode(reader, reader.uint32());
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
    message.ipGateway = object.ipGateway ?? "";
    message.ips = object.ips?.map((e) => e) || [];
    message.orgId = object.orgId ?? undefined;
    message.region = object.region ?? undefined;
    message.billingAmount = (object.billingAmount !== undefined && object.billingAmount !== null)
      ? BillingAmount.fromPartial(object.billingAmount)
      : undefined;
    message.vmmMountpoint = object.vmmMountpoint ?? undefined;
    message.managedBy = object.managedBy ?? undefined;
    message.tags = (object.tags !== undefined && object.tags !== null) ? Tags.fromPartial(object.tags) : undefined;
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
  return { orgIds: [], versions: [], offset: 0, limit: 0, search: undefined, sort: [] };
}

export const HostServiceListRequest = {
  encode(message: HostServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orgIds) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.versions) {
      writer.uint32(50).string(v!);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(24).uint64(message.limit);
    }
    if (message.search !== undefined) {
      HostSearch.encode(message.search, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.sort) {
      HostSort.encode(v!, writer.uint32(42).fork()).ldelim();
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

          message.orgIds.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.versions.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.search = HostSearch.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.sort.push(HostSort.decode(reader, reader.uint32()));
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
    message.orgIds = object.orgIds?.map((e) => e) || [];
    message.versions = object.versions?.map((e) => e) || [];
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.search = (object.search !== undefined && object.search !== null)
      ? HostSearch.fromPartial(object.search)
      : undefined;
    message.sort = object.sort?.map((e) => HostSort.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostSearch(): HostSearch {
  return { operator: 0, id: undefined, name: undefined, version: undefined, os: undefined, ip: undefined };
}

export const HostSearch = {
  encode(message: HostSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.id !== undefined) {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    if (message.version !== undefined) {
      writer.uint32(34).string(message.version);
    }
    if (message.os !== undefined) {
      writer.uint32(42).string(message.os);
    }
    if (message.ip !== undefined) {
      writer.uint32(50).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operator = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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

          message.ip = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostSearch>): HostSearch {
    return HostSearch.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostSearch>): HostSearch {
    const message = createBaseHostSearch();
    message.operator = object.operator ?? 0;
    message.id = object.id ?? undefined;
    message.name = object.name ?? undefined;
    message.version = object.version ?? undefined;
    message.os = object.os ?? undefined;
    message.ip = object.ip ?? undefined;
    return message;
  },
};

function createBaseHostSort(): HostSort {
  return { field: 0, order: 0 };
}

export const HostSort = {
  encode(message: HostSort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== 0) {
      writer.uint32(8).int32(message.field);
    }
    if (message.order !== 0) {
      writer.uint32(16).int32(message.order);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostSort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostSort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.order = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostSort>): HostSort {
    return HostSort.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostSort>): HostSort {
    const message = createBaseHostSort();
    message.field = object.field ?? 0;
    message.order = object.order ?? 0;
    return message;
  },
};

function createBaseHostServiceListResponse(): HostServiceListResponse {
  return { hosts: [], hostCount: 0 };
}

export const HostServiceListResponse = {
  encode(message: HostServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.hosts) {
      Host.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostCount !== 0) {
      writer.uint32(16).uint64(message.hostCount);
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
        case 2:
          if (tag !== 16) {
            break;
          }

          message.hostCount = longToNumber(reader.uint64() as Long);
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
    message.hostCount = object.hostCount ?? 0;
    return message;
  },
};

function createBaseHostServiceUpdateRequest(): HostServiceUpdateRequest {
  return {
    id: "",
    name: undefined,
    version: undefined,
    os: undefined,
    osVersion: undefined,
    region: undefined,
    billingAmount: undefined,
    totalDiskSpace: undefined,
    managedBy: undefined,
    updateTags: undefined,
    cost: undefined,
  };
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
    if (message.region !== undefined) {
      writer.uint32(34).string(message.region);
    }
    if (message.billingAmount !== undefined) {
      BillingAmount.encode(message.billingAmount, writer.uint32(58).fork()).ldelim();
    }
    if (message.totalDiskSpace !== undefined) {
      writer.uint32(64).uint64(message.totalDiskSpace);
    }
    if (message.managedBy !== undefined) {
      writer.uint32(72).int32(message.managedBy);
    }
    if (message.updateTags !== undefined) {
      UpdateTags.encode(message.updateTags, writer.uint32(82).fork()).ldelim();
    }
    if (message.cost !== undefined) {
      BillingAmount.encode(message.cost, writer.uint32(90).fork()).ldelim();
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.region = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.billingAmount = BillingAmount.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.totalDiskSpace = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.managedBy = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.updateTags = UpdateTags.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.cost = BillingAmount.decode(reader, reader.uint32());
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
    message.region = object.region ?? undefined;
    message.billingAmount = (object.billingAmount !== undefined && object.billingAmount !== null)
      ? BillingAmount.fromPartial(object.billingAmount)
      : undefined;
    message.totalDiskSpace = object.totalDiskSpace ?? undefined;
    message.managedBy = object.managedBy ?? undefined;
    message.updateTags = (object.updateTags !== undefined && object.updateTags !== null)
      ? UpdateTags.fromPartial(object.updateTags)
      : undefined;
    message.cost = (object.cost !== undefined && object.cost !== null)
      ? BillingAmount.fromPartial(object.cost)
      : undefined;
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

function createBaseHostServiceStartRequest(): HostServiceStartRequest {
  return { id: "" };
}

export const HostServiceStartRequest = {
  encode(message: HostServiceStartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceStartRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceStartRequest();
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

  create(base?: DeepPartial<HostServiceStartRequest>): HostServiceStartRequest {
    return HostServiceStartRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceStartRequest>): HostServiceStartRequest {
    const message = createBaseHostServiceStartRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseHostServiceStartResponse(): HostServiceStartResponse {
  return {};
}

export const HostServiceStartResponse = {
  encode(_: HostServiceStartResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceStartResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceStartResponse();
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

  create(base?: DeepPartial<HostServiceStartResponse>): HostServiceStartResponse {
    return HostServiceStartResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostServiceStartResponse>): HostServiceStartResponse {
    const message = createBaseHostServiceStartResponse();
    return message;
  },
};

function createBaseHostServiceStopRequest(): HostServiceStopRequest {
  return { id: "" };
}

export const HostServiceStopRequest = {
  encode(message: HostServiceStopRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceStopRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceStopRequest();
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

  create(base?: DeepPartial<HostServiceStopRequest>): HostServiceStopRequest {
    return HostServiceStopRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceStopRequest>): HostServiceStopRequest {
    const message = createBaseHostServiceStopRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseHostServiceStopResponse(): HostServiceStopResponse {
  return {};
}

export const HostServiceStopResponse = {
  encode(_: HostServiceStopResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceStopResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceStopResponse();
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

  create(base?: DeepPartial<HostServiceStopResponse>): HostServiceStopResponse {
    return HostServiceStopResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostServiceStopResponse>): HostServiceStopResponse {
    const message = createBaseHostServiceStopResponse();
    return message;
  },
};

function createBaseHostServiceRestartRequest(): HostServiceRestartRequest {
  return { id: "" };
}

export const HostServiceRestartRequest = {
  encode(message: HostServiceRestartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceRestartRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceRestartRequest();
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

  create(base?: DeepPartial<HostServiceRestartRequest>): HostServiceRestartRequest {
    return HostServiceRestartRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceRestartRequest>): HostServiceRestartRequest {
    const message = createBaseHostServiceRestartRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseHostServiceRestartResponse(): HostServiceRestartResponse {
  return {};
}

export const HostServiceRestartResponse = {
  encode(_: HostServiceRestartResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceRestartResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceRestartResponse();
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

  create(base?: DeepPartial<HostServiceRestartResponse>): HostServiceRestartResponse {
    return HostServiceRestartResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostServiceRestartResponse>): HostServiceRestartResponse {
    const message = createBaseHostServiceRestartResponse();
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

function createBaseHostServiceRegionsRequest(): HostServiceRegionsRequest {
  return { orgId: undefined, hostType: undefined, blockchainId: "", version: "", nodeType: 0 };
}

export const HostServiceRegionsRequest = {
  encode(message: HostServiceRegionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.hostType !== undefined) {
      writer.uint32(16).int32(message.hostType);
    }
    if (message.blockchainId !== "") {
      writer.uint32(26).string(message.blockchainId);
    }
    if (message.version !== "") {
      writer.uint32(34).string(message.version);
    }
    if (message.nodeType !== 0) {
      writer.uint32(40).int32(message.nodeType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceRegionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceRegionsRequest();
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

          message.hostType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.blockchainId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.version = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceRegionsRequest>): HostServiceRegionsRequest {
    return HostServiceRegionsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceRegionsRequest>): HostServiceRegionsRequest {
    const message = createBaseHostServiceRegionsRequest();
    message.orgId = object.orgId ?? undefined;
    message.hostType = object.hostType ?? undefined;
    message.blockchainId = object.blockchainId ?? "";
    message.version = object.version ?? "";
    message.nodeType = object.nodeType ?? 0;
    return message;
  },
};

function createBaseHostServiceRegionsResponse(): HostServiceRegionsResponse {
  return { regions: [] };
}

export const HostServiceRegionsResponse = {
  encode(message: HostServiceRegionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.regions) {
      Region.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostServiceRegionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceRegionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.regions.push(Region.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostServiceRegionsResponse>): HostServiceRegionsResponse {
    return HostServiceRegionsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostServiceRegionsResponse>): HostServiceRegionsResponse {
    const message = createBaseHostServiceRegionsResponse();
    message.regions = object.regions?.map((e) => Region.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRegion(): Region {
  return { name: undefined, pricingTier: undefined };
}

export const Region = {
  encode(message: Region, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.pricingTier !== undefined) {
      writer.uint32(18).string(message.pricingTier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Region {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pricingTier = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Region>): Region {
    return Region.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Region>): Region {
    const message = createBaseRegion();
    message.name = object.name ?? undefined;
    message.pricingTier = object.pricingTier ?? undefined;
    return message;
  },
};

function createBaseHostIpAddress(): HostIpAddress {
  return { ip: "", assigned: false };
}

export const HostIpAddress = {
  encode(message: HostIpAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    if (message.assigned === true) {
      writer.uint32(16).bool(message.assigned);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostIpAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostIpAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.assigned = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostIpAddress>): HostIpAddress {
    return HostIpAddress.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostIpAddress>): HostIpAddress {
    const message = createBaseHostIpAddress();
    message.ip = object.ip ?? "";
    message.assigned = object.assigned ?? false;
    return message;
  },
};

function createBaseHostStatus(): HostStatus {
  return { hostId: "", connectionStatus: undefined };
}

export const HostStatus = {
  encode(message: HostStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.connectionStatus !== undefined) {
      writer.uint32(16).int32(message.connectionStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.connectionStatus = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostStatus>): HostStatus {
    return HostStatus.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostStatus>): HostStatus {
    const message = createBaseHostStatus();
    message.hostId = object.hostId ?? "";
    message.connectionStatus = object.connectionStatus ?? undefined;
    return message;
  },
};

/** Manage hosts. */
export type HostServiceDefinition = typeof HostServiceDefinition;
export const HostServiceDefinition = {
  name: "HostService",
  fullName: "blockjoy.v1.HostService",
  methods: {
    /** Create a single host. */
    create: {
      name: "Create",
      requestType: HostServiceCreateRequest,
      requestStream: false,
      responseType: HostServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Get info for a single host. */
    get: {
      name: "Get",
      requestType: HostServiceGetRequest,
      requestStream: false,
      responseType: HostServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** List all hosts matching some criteria. */
    list: {
      name: "List",
      requestType: HostServiceListRequest,
      requestStream: false,
      responseType: HostServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single host. */
    update: {
      name: "Update",
      requestType: HostServiceUpdateRequest,
      requestStream: false,
      responseType: HostServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single host. */
    delete: {
      name: "Delete",
      requestType: HostServiceDeleteRequest,
      requestStream: false,
      responseType: HostServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
    /** Start a single host. */
    start: {
      name: "Start",
      requestType: HostServiceStartRequest,
      requestStream: false,
      responseType: HostServiceStartResponse,
      responseStream: false,
      options: {},
    },
    /** Stop a single host. */
    stop: {
      name: "Stop",
      requestType: HostServiceStopRequest,
      requestStream: false,
      responseType: HostServiceStopResponse,
      responseStream: false,
      options: {},
    },
    /** Restart a single host. */
    restart: {
      name: "Restart",
      requestType: HostServiceRestartRequest,
      requestStream: false,
      responseType: HostServiceRestartResponse,
      responseStream: false,
      options: {},
    },
    /** Returns a list of regions where there are hosts available */
    regions: {
      name: "Regions",
      requestType: HostServiceRegionsRequest,
      requestStream: false,
      responseType: HostServiceRegionsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface HostServiceImplementation<CallContextExt = {}> {
  /** Create a single host. */
  create(
    request: HostServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceCreateResponse>>;
  /** Get info for a single host. */
  get(
    request: HostServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceGetResponse>>;
  /** List all hosts matching some criteria. */
  list(
    request: HostServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceListResponse>>;
  /** Update a single host. */
  update(
    request: HostServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceUpdateResponse>>;
  /** Delete a single host. */
  delete(
    request: HostServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceDeleteResponse>>;
  /** Start a single host. */
  start(
    request: HostServiceStartRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceStartResponse>>;
  /** Stop a single host. */
  stop(
    request: HostServiceStopRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceStopResponse>>;
  /** Restart a single host. */
  restart(
    request: HostServiceRestartRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceRestartResponse>>;
  /** Returns a list of regions where there are hosts available */
  regions(
    request: HostServiceRegionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceRegionsResponse>>;
}

export interface HostServiceClient<CallOptionsExt = {}> {
  /** Create a single host. */
  create(
    request: DeepPartial<HostServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceCreateResponse>;
  /** Get info for a single host. */
  get(
    request: DeepPartial<HostServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceGetResponse>;
  /** List all hosts matching some criteria. */
  list(
    request: DeepPartial<HostServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceListResponse>;
  /** Update a single host. */
  update(
    request: DeepPartial<HostServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceUpdateResponse>;
  /** Delete a single host. */
  delete(
    request: DeepPartial<HostServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceDeleteResponse>;
  /** Start a single host. */
  start(
    request: DeepPartial<HostServiceStartRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceStartResponse>;
  /** Stop a single host. */
  stop(
    request: DeepPartial<HostServiceStopRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceStopResponse>;
  /** Restart a single host. */
  restart(
    request: DeepPartial<HostServiceRestartRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceRestartResponse>;
  /** Returns a list of regions where there are hosts available */
  regions(
    request: DeepPartial<HostServiceRegionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceRegionsResponse>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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
