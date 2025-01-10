/* eslint-disable */
import Long from 'long';
import type { CallContext, CallOptions } from 'nice-grpc-common';
import _m0 from 'protobufjs/minimal';
import { Timestamp } from '../../google/protobuf/timestamp';
import { BillingAmount } from '../common/v1/currency';
import { Resource } from '../common/v1/resource';
import { SearchOperator, SortOrder } from '../common/v1/search';
import { Tags, UpdateTags } from '../common/v1/tag';

export const protobufPackage = 'blockjoy.v1';

export enum HostSortField {
  HOST_SORT_FIELD_UNSPECIFIED = 0,
  HOST_SORT_FIELD_NETWORK_NAME = 1,
  HOST_SORT_FIELD_DISPLAY_NAME = 2,
  HOST_SORT_FIELD_OS = 3,
  HOST_SORT_FIELD_OS_VERSION = 4,
  HOST_SORT_FIELD_BV_VERSION = 5,
  HOST_SORT_FIELD_CPU_CORES = 6,
  HOST_SORT_FIELD_MEMORY_BYTES = 7,
  HOST_SORT_FIELD_DISK_BYTES = 8,
  HOST_SORT_FIELD_NODE_COUNT = 9,
  HOST_SORT_FIELD_CREATED_AT = 10,
  HOST_SORT_FIELD_UPDATED_AT = 11,
  UNRECOGNIZED = -1,
}

export interface Host {
  /** The id of the host. */
  hostId: string;
  /** The org id of a private host. */
  orgId?: string | undefined;
  /** The org name of a private host. */
  orgName?: string | undefined;
  /** The region of this host. */
  region?: string | undefined;
  /** The network name of the host. */
  networkName: string;
  /** The display name of the host. */
  displayName?: string | undefined;
  /** When to schedule nodes to this host. */
  scheduleType: ScheduleType;
  /** The operating system running on the host. */
  os: string;
  /** The version of the operating system running on the host. */
  osVersion: string;
  /** The version of blockvisor running on the host. */
  bvVersion: string;
  /** The IP address of this host */
  ipAddress: string;
  /** The IP gateway for this host. */
  ipGateway: string;
  /** IP addresses available to nodes running on this host. */
  ipAddresses: HostIpAddress[];
  /** The number of logical cores this host has. */
  cpuCores: number;
  /** The amount of memory this host has (in bytes). */
  memoryBytes: number;
  /** The amount of disk space this host has (in bytes). */
  diskBytes: number;
  /** The number of nodes on this host. */
  nodeCount: number;
  /** A list of tags attached to this host. */
  tags: Tags | undefined;
  /** Who created this host. */
  createdBy: Resource | undefined;
  /** When this host was created. */
  createdAt: Date | undefined;
  /** When this host was last updated. */
  updatedAt: Date | undefined;
  /** The cost of this host. */
  cost?: BillingAmount | undefined;
}

export interface Region {
  /** The id of this region. */
  regionId: string;
  /** The display name of this region. */
  name: string;
  /** The SKU code for this region. */
  skuCode?: string | undefined;
}

export interface HostServiceCreateHostRequest {
  /** An org-user's provisioning token to create this host. */
  provisionToken: string;
  /** Whether this host is private to the provisioning org. */
  isPrivate: boolean;
  /** The network name of the host. */
  networkName: string;
  /** The display name of the host. */
  displayName?: string | undefined;
  /** The region of the host */
  region?: string | undefined;
  /** When to schedule nodes to this host. */
  scheduleType: ScheduleType;
  /** The operating system this host is running. */
  os: string;
  /** The operating system version. */
  osVersion: string;
  /** The blockvisor version running on the host. */
  bvVersion: string;
  /** The ip address of this host. */
  ipAddress: string;
  /** The ip gateway for this host. */
  ipGateway: string;
  /** IP addresses available to nodes running on this host. */
  ips: string[];
  /** The number of logical cores on this host. */
  cpuCores: number;
  /** The amount of memory this host has (in bytes). */
  memoryBytes: number;
  /** The amount of storage this host has (in bytes). */
  diskBytes: number;
  /** A list of tags attached to this host. */
  tags: Tags | undefined;
}

export interface HostServiceCreateHostResponse {
  host: Host | undefined;
  token: string;
  refresh: string;
  provisionOrgId: string;
}

export interface HostServiceCreateRegionRequest {
  name: string;
  skuCode?: string | undefined;
}

export interface HostServiceCreateRegionResponse {
  region: Region | undefined;
}

export interface HostServiceGetHostRequest {
  hostId: string;
}

export interface HostServiceGetHostResponse {
  host: Host | undefined;
}

export interface HostServiceGetRegionRequest {
  regionId: string;
}

export interface HostServiceGetRegionResponse {
  region: Region | undefined;
}

export interface HostServiceListHostsRequest {
  /** Only list private hosts with these org ids. */
  orgIds: string[];
  /** Only list hosts running these blockvisor versions. */
  bvVersions: string[];
  /** The number of results to skip. */
  offset: number;
  /** Limit the number of results. */
  limit: number;
  /** Search these parameters. */
  search?: HostSearch | undefined;
  /** Sort the results in this order. */
  sort: HostSort[];
}

export interface HostSearch {
  /** How to combine the parameters. */
  operator: SearchOperator;
  /** Search for this host id. */
  hostId?: string | undefined;
  /** Search for this host name. */
  networkName?: string | undefined;
  /** Search for this display name. */
  displayName?: string | undefined;
  /** Search for this blockvisor version. */
  bvVersion?: string | undefined;
  /** Search for this operating system. */
  os?: string | undefined;
  /** Search for this ip address. */
  ip?: string | undefined;
}

export interface HostSort {
  field: HostSortField;
  order: SortOrder;
}

export interface HostServiceListHostsResponse {
  hosts: Host[];
  total: number;
}

export interface HostServiceListRegionsRequest {
  /** The image to find hosts for. */
  imageId: string;
  /** The org id to include private hosts, images or protocols. */
  orgId?: string | undefined;
}

export interface HostServiceListRegionsResponse {
  regions: Region[];
}

export interface HostServiceUpdateHostRequest {
  /** The host id to update. */
  hostId: string;
  /** Update the network name of the host. */
  networkName?: string | undefined;
  /** Update the display name of the host. */
  displayName?: string | undefined;
  /** Update the region of the host. */
  region?: string | undefined;
  /** Update the OS running on the host. */
  os?: string | undefined;
  /** Update the OS version running on the host. */
  osVersion?: string | undefined;
  /** Update the blockvisor version running on the host. */
  bvVersion?: string | undefined;
  /** Update the number of cpu cores on the host. */
  cpuCores?: number | undefined;
  /** Update the amount of memory on the host. */
  memoryBytes?: number | undefined;
  /** Update the amount of disk space on the host. */
  diskBytes?: number | undefined;
  /** When to schedule nodes to this host. */
  scheduleType?: ScheduleType | undefined;
  /** Update the existing host tags. */
  updateTags?: UpdateTags | undefined;
  /** The cost of this host. */
  cost?: BillingAmount | undefined;
}

export interface HostServiceUpdateHostResponse {
  host: Host | undefined;
}

export interface HostServiceDeleteHostRequest {
  hostId: string;
}

export interface HostServiceDeleteHostResponse {}

export interface HostServiceStartRequest {
  hostId: string;
}

export interface HostServiceStartResponse {}

export interface HostServiceStopRequest {
  hostId: string;
}

export interface HostServiceStopResponse {}

export interface HostServiceRestartRequest {
  hostId: string;
}

export interface HostServiceRestartResponse {}

export interface HostServiceDeleteRequest {
  hostId: string;
}

export interface HostServiceDeleteResponse {}

export interface HostServiceRegionsRequest {
  /** The image to find hosts for. */
  imageId: string;
  /** The org id to include private hosts, images or protocols. */
  orgId?: string | undefined;
}

export interface HostServiceRegionsResponse {
  regions: Region[];
}

export interface Region {
  name?: string | undefined;
  pricingTier?: string | undefined;
}

export interface HostIpAddress {
  /** The ip address. */
  ip: string;
  /** Whether the ip address is in use by a node. */
  assigned: boolean;
}

/** Used to indicate a change in the host status. */
export interface HostStatus {
  hostId: string;
  connectionStatus?: HostConnectionStatus | undefined;
}

function createBaseHost(): Host {
  return {
    hostId: '',
    orgId: undefined,
    orgName: undefined,
    region: undefined,
    networkName: '',
    displayName: undefined,
    scheduleType: 0,
    os: '',
    osVersion: '',
    bvVersion: '',
    ipAddress: '',
    ipGateway: '',
    ipAddresses: [],
    cpuCores: 0,
    memoryBytes: 0,
    diskBytes: 0,
    nodeCount: 0,
    tags: undefined,
    createdBy: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    cost: undefined,
    createdBy: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    cost: undefined,
  };
}

export const Host = {
  encode(message: Host, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.orgName !== undefined) {
      writer.uint32(26).string(message.orgName);
    }
    if (message.region !== undefined) {
      Region.encode(message.region, writer.uint32(34).fork()).ldelim();
    }
    if (message.networkName !== '') {
      writer.uint32(42).string(message.networkName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(50).string(message.displayName);
    }
    if (message.scheduleType !== 0) {
      writer.uint32(56).int32(message.scheduleType);
    }
    if (message.os !== '') {
      writer.uint32(66).string(message.os);
    }
    if (message.osVersion !== '') {
      writer.uint32(74).string(message.osVersion);
    }
    if (message.bvVersion !== '') {
      writer.uint32(82).string(message.bvVersion);
    }
    if (message.ipAddress !== '') {
      writer.uint32(90).string(message.ipAddress);
    }
    if (message.ipGateway !== '') {
      writer.uint32(98).string(message.ipGateway);
    }
    for (const v of message.ipAddresses) {
      HostIpAddress.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    if (message.cpuCores !== 0) {
      writer.uint32(112).uint64(message.cpuCores);
    }
    if (message.memoryBytes !== 0) {
      writer.uint32(120).uint64(message.memoryBytes);
    }
    if (message.diskBytes !== 0) {
      writer.uint32(128).uint64(message.diskBytes);
    }
    if (message.nodeCount !== 0) {
      writer.uint32(136).uint64(message.nodeCount);
    }
    if (message.tags !== undefined) {
      Tags.encode(message.tags, writer.uint32(146).fork()).ldelim();
    }
    if (message.createdBy !== undefined) {
      Resource.encode(message.createdBy, writer.uint32(154).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(162).fork(),
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(170).fork(),
      ).ldelim();
    }
    if (message.cost !== undefined) {
      BillingAmount.encode(message.cost, writer.uint32(178).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Host {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHost();
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
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.region = Region.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.networkName = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.scheduleType = reader.int32() as any;
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

          message.bvVersion = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.ipAddress = reader.string();
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

          message.ipAddresses.push(
            HostIpAddress.decode(reader, reader.uint32()),
          );
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.cpuCores = longToNumber(reader.uint64() as Long);
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.memoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.diskBytes = longToNumber(reader.uint64() as Long);
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

          message.tags = Tags.decode(reader, reader.uint32());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.createdBy = Resource.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 22:
          if (tag !== 178) {
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
    message.hostId = object.hostId ?? '';
    message.orgId = object.orgId ?? undefined;
    message.orgName = object.orgName ?? undefined;
    message.region = object.region ?? undefined;
    message.networkName = object.networkName ?? '';
    message.displayName = object.displayName ?? undefined;
    message.scheduleType = object.scheduleType ?? 0;
    message.os = object.os ?? '';
    message.osVersion = object.osVersion ?? '';
    message.bvVersion = object.bvVersion ?? '';
    message.ipAddress = object.ipAddress ?? '';
    message.ipGateway = object.ipGateway ?? '';
    message.ipAddresses =
      object.ipAddresses?.map((e) => HostIpAddress.fromPartial(e)) || [];
    message.cpuCores = object.cpuCores ?? 0;
    message.memoryBytes = object.memoryBytes ?? 0;
    message.diskBytes = object.diskBytes ?? 0;
    message.nodeCount = object.nodeCount ?? 0;
    message.tags =
      object.tags !== undefined && object.tags !== null
        ? Tags.fromPartial(object.tags)
        : undefined;
    message.createdBy =
      object.createdBy !== undefined && object.createdBy !== null
        ? Resource.fromPartial(object.createdBy)
        : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.cost =
      object.cost !== undefined && object.cost !== null
        ? BillingAmount.fromPartial(object.cost)
        : undefined;
    return message;
  },
};

function createBaseRegion(): Region {
  return { regionId: '', name: '', skuCode: undefined };
}

export const Region = {
  encode(
    message: Region,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.regionId !== '') {
      writer.uint32(10).string(message.regionId);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    if (message.skuCode !== undefined) {
      writer.uint32(26).string(message.skuCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Region {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.regionId = reader.string();
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

          message.skuCode = reader.string();
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
    message.regionId = object.regionId ?? '';
    message.name = object.name ?? '';
    message.skuCode = object.skuCode ?? undefined;
    return message;
  },
};

function createBaseHostServiceCreateHostRequest(): HostServiceCreateHostRequest {
  return {
    provisionToken: '',
    isPrivate: false,
    networkName: '',
    displayName: undefined,
    regionId: '',
    scheduleType: 0,
    os: '',
    osVersion: '',
    bvVersion: '',
    ipAddress: '',
    ipGateway: '',
    ips: [],
    cpuCores: 0,
    memoryBytes: 0,
    diskBytes: 0,
    tags: undefined,
  };
}

export const HostServiceCreateRequest = {
  encode(
    message: HostServiceCreateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.provisionToken !== '') {
      writer.uint32(10).string(message.provisionToken);
    }
    if (message.isPrivate === true) {
      writer.uint32(16).bool(message.isPrivate);
    }
    if (message.networkName !== '') {
      writer.uint32(26).string(message.networkName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(34).string(message.displayName);
    }
    if (message.regionId !== '') {
      writer.uint32(42).string(message.regionId);
    }
    if (message.scheduleType !== 0) {
      writer.uint32(48).int32(message.scheduleType);
    }
    if (message.os !== '') {
      writer.uint32(58).string(message.os);
    }
    if (message.osVersion !== '') {
      writer.uint32(66).string(message.osVersion);
    }
    if (message.bvVersion !== '') {
      writer.uint32(74).string(message.bvVersion);
    }
    if (message.ipAddress !== '') {
      writer.uint32(82).string(message.ipAddress);
    }
    if (message.ipGateway !== '') {
      writer.uint32(90).string(message.ipGateway);
    }
    for (const v of message.ips) {
      writer.uint32(98).string(v!);
    }
    if (message.cpuCores !== 0) {
      writer.uint32(104).uint64(message.cpuCores);
    }
    if (message.memoryBytes !== 0) {
      writer.uint32(112).uint64(message.memoryBytes);
    }
    if (message.diskBytes !== 0) {
      writer.uint32(120).uint64(message.diskBytes);
    }
    if (message.tags !== undefined) {
      Tags.encode(message.tags, writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceCreateRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceCreateHostRequest();
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
          if (tag !== 16) {
            break;
          }

          message.isPrivate = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.networkName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.regionId = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.scheduleType = reader.int32() as any;
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

          message.bvVersion = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.ipAddress = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.ipGateway = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.ips.push(reader.string());
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.cpuCores = longToNumber(reader.uint64() as Long);
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.memoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.diskBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 16:
          if (tag !== 130) {
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

  create(
    base?: DeepPartial<HostServiceCreateRequest>,
  ): HostServiceCreateRequest {
    return HostServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceCreateRequest>,
  ): HostServiceCreateRequest {
    const message = createBaseHostServiceCreateRequest();
    message.provisionToken = object.provisionToken ?? '';
    message.isPrivate = object.isPrivate ?? false;
    message.networkName = object.networkName ?? '';
    message.displayName = object.displayName ?? undefined;
    message.regionId = object.regionId ?? '';
    message.scheduleType = object.scheduleType ?? 0;
    message.os = object.os ?? '';
    message.osVersion = object.osVersion ?? '';
    message.bvVersion = object.bvVersion ?? '';
    message.ipAddress = object.ipAddress ?? '';
    message.ipGateway = object.ipGateway ?? '';
    message.ips = object.ips?.map((e) => e) || [];
    message.cpuCores = object.cpuCores ?? 0;
    message.memoryBytes = object.memoryBytes ?? 0;
    message.diskBytes = object.diskBytes ?? 0;
    message.tags =
      object.tags !== undefined && object.tags !== null
        ? Tags.fromPartial(object.tags)
        : undefined;
    return message;
  },
};

function createBaseHostServiceCreateResponse(): HostServiceCreateResponse {
  return { host: undefined, token: '', refresh: '', provisionOrgId: '' };
}

export const HostServiceCreateResponse = {
  encode(
    message: HostServiceCreateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    if (message.token !== '') {
      writer.uint32(18).string(message.token);
    }
    if (message.refresh !== '') {
      writer.uint32(26).string(message.refresh);
    }
    if (message.provisionOrgId !== '') {
      writer.uint32(34).string(message.provisionOrgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceCreateResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceCreateHostResponse();
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.provisionOrgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<HostServiceCreateResponse>,
  ): HostServiceCreateResponse {
    return HostServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceCreateResponse>,
  ): HostServiceCreateResponse {
    const message = createBaseHostServiceCreateResponse();
    message.host =
      object.host !== undefined && object.host !== null
        ? Host.fromPartial(object.host)
        : undefined;
    message.token = object.token ?? '';
    message.refresh = object.refresh ?? '';
    message.provisionOrgId = object.provisionOrgId ?? '';
    return message;
  },
};

function createBaseHostServiceGetRequest(): HostServiceGetRequest {
  return { hostId: '' };
}

export const HostServiceGetRequest = {
  encode(
    message: HostServiceGetRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceGetRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceGetHostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<HostServiceGetHostRequest>,
  ): HostServiceGetHostRequest {
    return HostServiceGetHostRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceGetRequest>,
  ): HostServiceGetRequest {
    const message = createBaseHostServiceGetRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceGetHostResponse(): HostServiceGetHostResponse {
  return { host: undefined };
}

export const HostServiceGetResponse = {
  encode(
    message: HostServiceGetResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceGetResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceGetHostResponse();
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

  create(
    base?: DeepPartial<HostServiceGetHostResponse>,
  ): HostServiceGetHostResponse {
    return HostServiceGetHostResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceGetResponse>,
  ): HostServiceGetResponse {
    const message = createBaseHostServiceGetResponse();
    message.host =
      object.host !== undefined && object.host !== null
        ? Host.fromPartial(object.host)
        : undefined;
    return message;
  },
};

function createBaseHostServiceListRequest(): HostServiceListRequest {
  return {
    orgIds: [],
    bvVersions: [],
    offset: 0,
    limit: 0,
    search: undefined,
    sort: [],
  };
}

export const HostServiceListRequest = {
  encode(
    message: HostServiceListRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.orgIds) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.bvVersions) {
      writer.uint32(18).string(v!);
    }
    if (message.offset !== 0) {
      writer.uint32(24).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(32).uint64(message.limit);
    }
    if (message.search !== undefined) {
      HostSearch.encode(message.search, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sort) {
      HostSort.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceListRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceListHostsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bvVersions.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.search = HostSearch.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
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

  create(
    base?: DeepPartial<HostServiceListHostsRequest>,
  ): HostServiceListHostsRequest {
    return HostServiceListHostsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceListRequest>,
  ): HostServiceListRequest {
    const message = createBaseHostServiceListRequest();
    message.orgIds = object.orgIds?.map((e) => e) || [];
    message.bvVersions = object.bvVersions?.map((e) => e) || [];
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.search =
      object.search !== undefined && object.search !== null
        ? HostSearch.fromPartial(object.search)
        : undefined;
    message.sort = object.sort?.map((e) => HostSort.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostSearch(): HostSearch {
  return {
    operator: 0,
    hostId: undefined,
    networkName: undefined,
    displayName: undefined,
    bvVersion: undefined,
    os: undefined,
    ip: undefined,
  };
}

export const HostSearch = {
  encode(
    message: HostSearch,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.hostId !== undefined) {
      writer.uint32(18).string(message.hostId);
    }
    if (message.networkName !== undefined) {
      writer.uint32(26).string(message.networkName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(34).string(message.displayName);
    }
    if (message.bvVersion !== undefined) {
      writer.uint32(42).string(message.bvVersion);
    }
    if (message.os !== undefined) {
      writer.uint32(50).string(message.os);
    }
    if (message.ip !== undefined) {
      writer.uint32(58).string(message.ip);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostSearch {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.networkName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.bvVersion = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.os = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
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
    message.hostId = object.hostId ?? undefined;
    message.networkName = object.networkName ?? undefined;
    message.displayName = object.displayName ?? undefined;
    message.bvVersion = object.bvVersion ?? undefined;
    message.os = object.os ?? undefined;
    message.ip = object.ip ?? undefined;
    return message;
  },
};

function createBaseHostSort(): HostSort {
  return { field: 0, order: 0 };
}

export const HostSort = {
  encode(
    message: HostSort,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.field !== 0) {
      writer.uint32(8).int32(message.field);
    }
    if (message.order !== 0) {
      writer.uint32(16).int32(message.order);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostSort {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

function createBaseHostServiceListHostsResponse(): HostServiceListHostsResponse {
  return { hosts: [], total: 0 };
}

export const HostServiceListResponse = {
  encode(
    message: HostServiceListResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.hosts) {
      Host.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== 0) {
      writer.uint32(16).uint64(message.total);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceListResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceListHostsResponse();
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

          message.total = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<HostServiceListHostsResponse>,
  ): HostServiceListHostsResponse {
    return HostServiceListHostsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceListResponse>,
  ): HostServiceListResponse {
    const message = createBaseHostServiceListResponse();
    message.hosts = object.hosts?.map((e) => Host.fromPartial(e)) || [];
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseHostServiceListRegionsRequest(): HostServiceListRegionsRequest {
  return { imageId: '', orgId: undefined };
}

export const HostServiceListRegionsRequest = {
  encode(
    message: HostServiceListRegionsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.imageId !== '') {
      writer.uint32(10).string(message.imageId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceListRegionsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceListRegionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imageId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  create(
    base?: DeepPartial<HostServiceListRegionsRequest>,
  ): HostServiceListRegionsRequest {
    return HostServiceListRegionsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceListRegionsRequest>,
  ): HostServiceListRegionsRequest {
    const message = createBaseHostServiceListRegionsRequest();
    message.imageId = object.imageId ?? '';
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseHostServiceListRegionsResponse(): HostServiceListRegionsResponse {
  return { regions: [] };
}

export const HostServiceListRegionsResponse = {
  encode(
    message: HostServiceListRegionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.regions) {
      Region.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceListRegionsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceListRegionsResponse();
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

  create(
    base?: DeepPartial<HostServiceListRegionsResponse>,
  ): HostServiceListRegionsResponse {
    return HostServiceListRegionsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceListRegionsResponse>,
  ): HostServiceListRegionsResponse {
    const message = createBaseHostServiceListRegionsResponse();
    message.regions = object.regions?.map((e) => Region.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostServiceUpdateHostRequest(): HostServiceUpdateHostRequest {
  return {
    hostId: '',
    networkName: undefined,
    displayName: undefined,
    regionId: undefined,
    os: undefined,
    osVersion: undefined,
    bvVersion: undefined,
    cpuCores: undefined,
    memoryBytes: undefined,
    diskBytes: undefined,
    scheduleType: undefined,
    updateTags: undefined,
    cost: undefined,
  };
}

export const HostServiceUpdateRequest = {
  encode(
    message: HostServiceUpdateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    if (message.networkName !== undefined) {
      writer.uint32(18).string(message.networkName);
    }
    if (message.displayName !== undefined) {
      writer.uint32(26).string(message.displayName);
    }
    if (message.regionId !== undefined) {
      writer.uint32(34).string(message.regionId);
    }
    if (message.os !== undefined) {
      writer.uint32(42).string(message.os);
    }
    if (message.osVersion !== undefined) {
      writer.uint32(50).string(message.osVersion);
    }
    if (message.bvVersion !== undefined) {
      writer.uint32(58).string(message.bvVersion);
    }
    if (message.cpuCores !== undefined) {
      writer.uint32(64).uint64(message.cpuCores);
    }
    if (message.memoryBytes !== undefined) {
      writer.uint32(72).uint64(message.memoryBytes);
    }
    if (message.diskBytes !== undefined) {
      writer.uint32(80).uint64(message.diskBytes);
    }
    if (message.scheduleType !== undefined) {
      writer.uint32(88).int32(message.scheduleType);
    }
    if (message.updateTags !== undefined) {
      UpdateTags.encode(message.updateTags, writer.uint32(98).fork()).ldelim();
    }
    if (message.cost !== undefined) {
      BillingAmount.encode(message.cost, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceUpdateRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceUpdateHostRequest();
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
          if (tag !== 18) {
            break;
          }

          message.networkName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.regionId = reader.string();
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
        case 7:
          if (tag !== 58) {
            break;
          }

          message.bvVersion = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.cpuCores = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.memoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.diskBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.scheduleType = reader.int32() as any;
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.updateTags = UpdateTags.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
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

  create(
    base?: DeepPartial<HostServiceUpdateRequest>,
  ): HostServiceUpdateRequest {
    return HostServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceUpdateRequest>,
  ): HostServiceUpdateRequest {
    const message = createBaseHostServiceUpdateRequest();
    message.hostId = object.hostId ?? '';
    message.networkName = object.networkName ?? undefined;
    message.displayName = object.displayName ?? undefined;
    message.regionId = object.regionId ?? undefined;
    message.os = object.os ?? undefined;
    message.osVersion = object.osVersion ?? undefined;
    message.bvVersion = object.bvVersion ?? undefined;
    message.cpuCores = object.cpuCores ?? undefined;
    message.memoryBytes = object.memoryBytes ?? undefined;
    message.diskBytes = object.diskBytes ?? undefined;
    message.scheduleType = object.scheduleType ?? undefined;
    message.updateTags =
      object.updateTags !== undefined && object.updateTags !== null
        ? UpdateTags.fromPartial(object.updateTags)
        : undefined;
    message.cost =
      object.cost !== undefined && object.cost !== null
        ? BillingAmount.fromPartial(object.cost)
        : undefined;
    return message;
  },
};

function createBaseHostServiceUpdateHostResponse(): HostServiceUpdateHostResponse {
  return { host: undefined };
}

export const HostServiceUpdateResponse = {
  encode(
    message: HostServiceUpdateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceUpdateResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceUpdateHostResponse();
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

  create(
    base?: DeepPartial<HostServiceUpdateResponse>,
  ): HostServiceUpdateResponse {
    return HostServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceUpdateResponse>,
  ): HostServiceUpdateResponse {
    const message = createBaseHostServiceUpdateResponse();
    message.host =
      object.host !== undefined && object.host !== null
        ? Host.fromPartial(object.host)
        : undefined;
    return message;
  },
};

function createBaseHostServiceDeleteHostRequest(): HostServiceDeleteHostRequest {
  return { hostId: '' };
}

export const HostServiceDeleteHostRequest = {
  encode(
    message: HostServiceDeleteHostRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceDeleteHostRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceDeleteHostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<HostServiceDeleteHostRequest>,
  ): HostServiceDeleteHostRequest {
    return HostServiceDeleteHostRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceDeleteHostRequest>,
  ): HostServiceDeleteHostRequest {
    const message = createBaseHostServiceDeleteHostRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceDeleteHostResponse(): HostServiceDeleteHostResponse {
  return {};
}

export const HostServiceDeleteHostResponse = {
  encode(
    _: HostServiceDeleteHostResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceDeleteHostResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceDeleteHostResponse();
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

  create(
    base?: DeepPartial<HostServiceDeleteHostResponse>,
  ): HostServiceDeleteHostResponse {
    return HostServiceDeleteHostResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<HostServiceDeleteHostResponse>,
  ): HostServiceDeleteHostResponse {
    const message = createBaseHostServiceDeleteHostResponse();
    return message;
  },
};

function createBaseHostServiceStartRequest(): HostServiceStartRequest {
  return { hostId: '' };
}

export const HostServiceStartRequest = {
  encode(
    message: HostServiceStartRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceStartRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceStartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
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

  fromPartial(
    object: DeepPartial<HostServiceStartRequest>,
  ): HostServiceStartRequest {
    const message = createBaseHostServiceStartRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceStartResponse(): HostServiceStartResponse {
  return {};
}

export const HostServiceStartResponse = {
  encode(
    _: HostServiceStartResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceStartResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create(
    base?: DeepPartial<HostServiceStartResponse>,
  ): HostServiceStartResponse {
    return HostServiceStartResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<HostServiceStartResponse>,
  ): HostServiceStartResponse {
    const message = createBaseHostServiceStartResponse();
    return message;
  },
};

function createBaseHostServiceStopRequest(): HostServiceStopRequest {
  return { hostId: '' };
}

export const HostServiceStopRequest = {
  encode(
    message: HostServiceStopRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceStopRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceStopRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
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

  fromPartial(
    object: DeepPartial<HostServiceStopRequest>,
  ): HostServiceStopRequest {
    const message = createBaseHostServiceStopRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceStopResponse(): HostServiceStopResponse {
  return {};
}

export const HostServiceStopResponse = {
  encode(
    _: HostServiceStopResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceStopResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  fromPartial(
    _: DeepPartial<HostServiceStopResponse>,
  ): HostServiceStopResponse {
    const message = createBaseHostServiceStopResponse();
    return message;
  },
};

function createBaseHostServiceRestartRequest(): HostServiceRestartRequest {
  return { hostId: '' };
}

export const HostServiceRestartRequest = {
  encode(
    message: HostServiceRestartRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceRestartRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceRestartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<HostServiceRestartRequest>,
  ): HostServiceRestartRequest {
    return HostServiceRestartRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceRestartRequest>,
  ): HostServiceRestartRequest {
    const message = createBaseHostServiceRestartRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceRestartResponse(): HostServiceRestartResponse {
  return {};
}

export const HostServiceRestartResponse = {
  encode(
    _: HostServiceRestartResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceRestartResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create(
    base?: DeepPartial<HostServiceRestartResponse>,
  ): HostServiceRestartResponse {
    return HostServiceRestartResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<HostServiceRestartResponse>,
  ): HostServiceRestartResponse {
    const message = createBaseHostServiceRestartResponse();
    return message;
  },
};

function createBaseHostServiceDeleteRequest(): HostServiceDeleteRequest {
  return { hostId: '' };
}

export const HostServiceDeleteRequest = {
  encode(
    message: HostServiceDeleteRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceDeleteRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<HostServiceDeleteRequest>,
  ): HostServiceDeleteRequest {
    return HostServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceDeleteRequest>,
  ): HostServiceDeleteRequest {
    const message = createBaseHostServiceDeleteRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceDeleteResponse(): HostServiceDeleteResponse {
  return {};
}

export const HostServiceDeleteResponse = {
  encode(
    _: HostServiceDeleteResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceDeleteResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create(
    base?: DeepPartial<HostServiceDeleteResponse>,
  ): HostServiceDeleteResponse {
    return HostServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<HostServiceDeleteResponse>,
  ): HostServiceDeleteResponse {
    const message = createBaseHostServiceDeleteResponse();
    return message;
  },
};

function createBaseHostServiceRegionsRequest(): HostServiceRegionsRequest {
  return { imageId: '', orgId: undefined };
}

export const HostServiceRegionsRequest = {
  encode(
    message: HostServiceRegionsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.imageId !== '') {
      writer.uint32(10).string(message.imageId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceRegionsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceRegionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imageId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  create(
    base?: DeepPartial<HostServiceRegionsRequest>,
  ): HostServiceRegionsRequest {
    return HostServiceRegionsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceRegionsRequest>,
  ): HostServiceRegionsRequest {
    const message = createBaseHostServiceRegionsRequest();
    message.imageId = object.imageId ?? '';
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseHostServiceRegionsResponse(): HostServiceRegionsResponse {
  return { regions: [] };
}

export const HostServiceRegionsResponse = {
  encode(
    message: HostServiceRegionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.regions) {
      Region.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceRegionsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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

  create(
    base?: DeepPartial<HostServiceRegionsResponse>,
  ): HostServiceRegionsResponse {
    return HostServiceRegionsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceRegionsResponse>,
  ): HostServiceRegionsResponse {
    const message = createBaseHostServiceRegionsResponse();
    message.regions = object.regions?.map((e) => Region.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRegion(): Region {
  return { name: undefined, pricingTier: undefined };
}

export const Region = {
  encode(
    message: Region,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.pricingTier !== undefined) {
      writer.uint32(18).string(message.pricingTier);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Region {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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
  return { ip: '', assigned: false };
}

export const HostIpAddress = {
  encode(
    message: HostIpAddress,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.ip !== '') {
      writer.uint32(10).string(message.ip);
    }
    if (message.assigned === true) {
      writer.uint32(16).bool(message.assigned);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostIpAddress {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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
    message.ip = object.ip ?? '';
    message.assigned = object.assigned ?? false;
    return message;
  },
};

function createBaseHostStatus(): HostStatus {
  return { hostId: '', connectionStatus: undefined };
}

export const HostStatus = {
  encode(
    message: HostStatus,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.hostId !== '') {
      writer.uint32(10).string(message.hostId);
    }
    if (message.connectionStatus !== undefined) {
      writer.uint32(16).int32(message.connectionStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostStatus {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
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
    message.hostId = object.hostId ?? '';
    message.connectionStatus = object.connectionStatus ?? undefined;
    return message;
  },
};

/** Service for managing hosts. */
export type HostServiceDefinition = typeof HostServiceDefinition;
export const HostServiceDefinition = {
  name: 'HostService',
  fullName: 'blockjoy.v1.HostService',
  methods: {
    /** Create a single host. */
    create: {
      name: 'Create',
      requestType: HostServiceCreateRequest,
      requestStream: false,
      responseType: HostServiceCreateHostResponse,
      responseStream: false,
      options: {},
    },
    /** Get info for a single host. */
    get: {
      name: 'Get',
      requestType: HostServiceGetRequest,
      requestStream: false,
      responseType: HostServiceCreateRegionResponse,
      responseStream: false,
      options: {},
    },
    /** Get the info for a host. */
    getHost: {
      name: 'GetHost',
      requestType: HostServiceGetHostRequest,
      requestStream: false,
      responseType: HostServiceGetHostResponse,
      responseStream: false,
      options: {},
    },
    /** Get the info for a region. */
    getRegion: {
      name: 'GetRegion',
      requestType: HostServiceGetRegionRequest,
      requestStream: false,
      responseType: HostServiceGetRegionResponse,
      responseStream: false,
      options: {},
    },
    /** List all hosts matching some criteria. */
    list: {
      name: 'List',
      requestType: HostServiceListRequest,
      requestStream: false,
      responseType: HostServiceListHostsResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single host. */
    update: {
      name: 'Update',
      requestType: HostServiceUpdateRequest,
      requestStream: false,
      responseType: HostServiceListRegionsResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single host. */
    delete: {
      name: 'Delete',
      requestType: HostServiceDeleteRequest,
      requestStream: false,
      responseType: HostServiceUpdateHostResponse,
      responseStream: false,
      options: {},
    },
    /** Delete an existing host. */
    deleteHost: {
      name: 'DeleteHost',
      requestType: HostServiceDeleteHostRequest,
      requestStream: false,
      responseType: HostServiceDeleteHostResponse,
      responseStream: false,
      options: {},
    },
    /** Start a host. */
    start: {
      name: 'Start',
      requestType: HostServiceStartRequest,
      requestStream: false,
      responseType: HostServiceStartResponse,
      responseStream: false,
      options: {},
    },
    /** Stop a host. */
    stop: {
      name: 'Stop',
      requestType: HostServiceStopRequest,
      requestStream: false,
      responseType: HostServiceStopResponse,
      responseStream: false,
      options: {},
    },
    /** Restart a host. */
    restart: {
      name: 'Restart',
      requestType: HostServiceRestartRequest,
      requestStream: false,
      responseType: HostServiceRestartResponse,
      responseStream: false,
      options: {},
    },
    /** Returns a list of regions where there are hosts available */
    regions: {
      name: 'Regions',
      requestType: HostServiceRegionsRequest,
      requestStream: false,
      responseType: HostServiceRegionsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface HostServiceImplementation<CallContextExt = {}> {
  /** Create a new host. */
  createHost(
    request: HostServiceCreateHostRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceCreateHostResponse>>;
  /** Create a new region. */
  createRegion(
    request: HostServiceCreateRegionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceCreateRegionResponse>>;
  /** Get the info for a host. */
  getHost(
    request: HostServiceGetHostRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceGetHostResponse>>;
  /** Get the info for a region. */
  getRegion(
    request: HostServiceGetRegionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceGetRegionResponse>>;
  /** List all hosts matching some criteria. */
  listHosts(
    request: HostServiceListHostsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceListHostsResponse>>;
  /** List the regions with available hosts. */
  listRegions(
    request: HostServiceListRegionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceListRegionsResponse>>;
  /** Update an existing host. */
  updateHost(
    request: HostServiceUpdateHostRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceUpdateHostResponse>>;
  /** Delete an existing host. */
  deleteHost(
    request: HostServiceDeleteHostRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceDeleteHostResponse>>;
  /** Start a host. */
  start(
    request: HostServiceStartRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceStartResponse>>;
  /** Stop a host. */
  stop(
    request: HostServiceStopRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceStopResponse>>;
  /** Restart a host. */
  restart(
    request: HostServiceRestartRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceRestartResponse>>;
}

export interface HostServiceClient<CallOptionsExt = {}> {
  /** Create a new host. */
  createHost(
    request: DeepPartial<HostServiceCreateHostRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceCreateHostResponse>;
  /** Create a new region. */
  createRegion(
    request: DeepPartial<HostServiceCreateRegionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceCreateRegionResponse>;
  /** Get the info for a host. */
  getHost(
    request: DeepPartial<HostServiceGetHostRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceGetHostResponse>;
  /** Get the info for a region. */
  getRegion(
    request: DeepPartial<HostServiceGetRegionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceGetRegionResponse>;
  /** List all hosts matching some criteria. */
  listHosts(
    request: DeepPartial<HostServiceListHostsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceListHostsResponse>;
  /** List the regions with available hosts. */
  listRegions(
    request: DeepPartial<HostServiceListRegionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceListRegionsResponse>;
  /** Update an existing host. */
  updateHost(
    request: DeepPartial<HostServiceUpdateHostRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceUpdateHostResponse>;
  /** Delete an existing host. */
  deleteHost(
    request: DeepPartial<HostServiceDeleteHostRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceDeleteHostResponse>;
  /** Start a host. */
  start(
    request: DeepPartial<HostServiceStartRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceStartResponse>;
  /** Stop a host. */
  stop(
    request: DeepPartial<HostServiceStopRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceStopResponse>;
  /** Restart a host. */
  restart(
    request: DeepPartial<HostServiceRestartRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceRestartResponse>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw 'Unable to locate global object';
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
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
    throw new tsProtoGlobalThis.Error(
      'Value is larger than Number.MAX_SAFE_INTEGER',
    );
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
