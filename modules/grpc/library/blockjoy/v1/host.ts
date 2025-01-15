/* eslint-disable */
import Long from 'long';
import type { CallContext, CallOptions } from 'nice-grpc-common';
import _m0 from 'protobufjs/minimal';
import { Timestamp } from '../../google/protobuf/timestamp';
import { BillingAmount } from '../common/v1/currency';
import { HostIpAddress, ScheduleType } from '../common/v1/host';
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
  /** The region of the host. */
  region: Region | undefined;
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
  /** The lookup key of this region. */
  regionKey: string;
  /** The display name of this region. */
  displayName: string;
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
  /** The region id of the host. */
  regionId: string;
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
  regionKey: string;
  displayName: string;
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
  /** Get region info from an id. */
  regionId?: string | undefined;
  /** Get region info from a key. */
  regionKey?: string | undefined;
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
  /** The image to list regions for. */
  imageId: string;
  /** The org id for private hosts, images or protocols. */
  orgId?: string | undefined;
}

export interface HostServiceListRegionsResponse {
  regions: RegionInfo[];
}

export interface RegionInfo {
  region: Region | undefined;
  validHosts: number;
  freeIps: number;
}

export interface HostServiceUpdateHostRequest {
  /** The host id to update. */
  hostId: string;
  /** Update the network name of the host. */
  networkName?: string | undefined;
  /** Update the display name of the host. */
  displayName?: string | undefined;
  /** Update the region of the host. */
  regionId?: string | undefined;
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

export interface HostServiceUpdateRegionRequest {
  /** The region id to update. */
  regionId: string;
  /** Update the display name for this region. */
  displayName?: string | undefined;
  /** Update the SKU code for this region. */
  skuCode?: string | undefined;
}

export interface HostServiceUpdateRegionResponse {
  region: Region | undefined;
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
      BillingAmount.encode(message.cost, writer.uint32(202).fork()).ldelim();
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
    message.hostId = object.hostId ?? '';
    message.orgId = object.orgId ?? undefined;
    message.orgName = object.orgName ?? undefined;
    message.region =
      object.region !== undefined && object.region !== null
        ? Region.fromPartial(object.region)
        : undefined;
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
  return { regionId: '', regionKey: '', displayName: '', skuCode: undefined };
}

export const Region = {
  encode(
    message: Region,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.regionId !== '') {
      writer.uint32(10).string(message.regionId);
    }
    if (message.regionKey !== '') {
      writer.uint32(18).string(message.regionKey);
    }
    if (message.displayName !== '') {
      writer.uint32(26).string(message.displayName);
    }
    if (message.skuCode !== undefined) {
      writer.uint32(34).string(message.skuCode);
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

          message.regionKey = reader.string();
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
    message.regionKey = object.regionKey ?? '';
    message.displayName = object.displayName ?? '';
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

export const HostServiceCreateHostRequest = {
  encode(
    message: HostServiceCreateHostRequest,
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
  ): HostServiceCreateHostRequest {
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
    base?: DeepPartial<HostServiceCreateHostRequest>,
  ): HostServiceCreateHostRequest {
    return HostServiceCreateHostRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceCreateHostRequest>,
  ): HostServiceCreateHostRequest {
    const message = createBaseHostServiceCreateHostRequest();
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

function createBaseHostServiceCreateHostResponse(): HostServiceCreateHostResponse {
  return { host: undefined, token: '', refresh: '', provisionOrgId: '' };
}

export const HostServiceCreateHostResponse = {
  encode(
    message: HostServiceCreateHostResponse,
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
  ): HostServiceCreateHostResponse {
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
    base?: DeepPartial<HostServiceCreateHostResponse>,
  ): HostServiceCreateHostResponse {
    return HostServiceCreateHostResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceCreateHostResponse>,
  ): HostServiceCreateHostResponse {
    const message = createBaseHostServiceCreateHostResponse();
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

function createBaseHostServiceCreateRegionRequest(): HostServiceCreateRegionRequest {
  return { regionKey: '', displayName: '', skuCode: undefined };
}

export const HostServiceCreateRegionRequest = {
  encode(
    message: HostServiceCreateRegionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.regionKey !== '') {
      writer.uint32(10).string(message.regionKey);
    }
    if (message.displayName !== '') {
      writer.uint32(18).string(message.displayName);
    }
    if (message.skuCode !== undefined) {
      writer.uint32(26).string(message.skuCode);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceCreateRegionRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceCreateRegionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.regionKey = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
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

  create(
    base?: DeepPartial<HostServiceCreateRegionRequest>,
  ): HostServiceCreateRegionRequest {
    return HostServiceCreateRegionRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceCreateRegionRequest>,
  ): HostServiceCreateRegionRequest {
    const message = createBaseHostServiceCreateRegionRequest();
    message.regionKey = object.regionKey ?? '';
    message.displayName = object.displayName ?? '';
    message.skuCode = object.skuCode ?? undefined;
    return message;
  },
};

function createBaseHostServiceCreateRegionResponse(): HostServiceCreateRegionResponse {
  return { region: undefined };
}

export const HostServiceCreateRegionResponse = {
  encode(
    message: HostServiceCreateRegionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.region !== undefined) {
      Region.encode(message.region, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceCreateRegionResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceCreateRegionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.region = Region.decode(reader, reader.uint32());
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
    base?: DeepPartial<HostServiceCreateRegionResponse>,
  ): HostServiceCreateRegionResponse {
    return HostServiceCreateRegionResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceCreateRegionResponse>,
  ): HostServiceCreateRegionResponse {
    const message = createBaseHostServiceCreateRegionResponse();
    message.region =
      object.region !== undefined && object.region !== null
        ? Region.fromPartial(object.region)
        : undefined;
    return message;
  },
};

function createBaseHostServiceGetHostRequest(): HostServiceGetHostRequest {
  return { hostId: '' };
}

export const HostServiceGetHostRequest = {
  encode(
    message: HostServiceGetHostRequest,
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
  ): HostServiceGetHostRequest {
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
    object: DeepPartial<HostServiceGetHostRequest>,
  ): HostServiceGetHostRequest {
    const message = createBaseHostServiceGetHostRequest();
    message.hostId = object.hostId ?? '';
    return message;
  },
};

function createBaseHostServiceGetHostResponse(): HostServiceGetHostResponse {
  return { host: undefined };
}

export const HostServiceGetHostResponse = {
  encode(
    message: HostServiceGetHostResponse,
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
  ): HostServiceGetHostResponse {
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
    object: DeepPartial<HostServiceGetHostResponse>,
  ): HostServiceGetHostResponse {
    const message = createBaseHostServiceGetHostResponse();
    message.host =
      object.host !== undefined && object.host !== null
        ? Host.fromPartial(object.host)
        : undefined;
    return message;
  },
};

function createBaseHostServiceGetRegionRequest(): HostServiceGetRegionRequest {
  return { regionId: undefined, regionKey: undefined };
}

export const HostServiceGetRegionRequest = {
  encode(
    message: HostServiceGetRegionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.regionId !== undefined) {
      writer.uint32(10).string(message.regionId);
    }
    if (message.regionKey !== undefined) {
      writer.uint32(18).string(message.regionKey);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceGetRegionRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceGetRegionRequest();
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

          message.regionKey = reader.string();
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
    base?: DeepPartial<HostServiceGetRegionRequest>,
  ): HostServiceGetRegionRequest {
    return HostServiceGetRegionRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceGetRegionRequest>,
  ): HostServiceGetRegionRequest {
    const message = createBaseHostServiceGetRegionRequest();
    message.regionId = object.regionId ?? undefined;
    message.regionKey = object.regionKey ?? undefined;
    return message;
  },
};

function createBaseHostServiceGetRegionResponse(): HostServiceGetRegionResponse {
  return { region: undefined };
}

export const HostServiceGetRegionResponse = {
  encode(
    message: HostServiceGetRegionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.region !== undefined) {
      Region.encode(message.region, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceGetRegionResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceGetRegionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.region = Region.decode(reader, reader.uint32());
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
    base?: DeepPartial<HostServiceGetRegionResponse>,
  ): HostServiceGetRegionResponse {
    return HostServiceGetRegionResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceGetRegionResponse>,
  ): HostServiceGetRegionResponse {
    const message = createBaseHostServiceGetRegionResponse();
    message.region =
      object.region !== undefined && object.region !== null
        ? Region.fromPartial(object.region)
        : undefined;
    return message;
  },
};

function createBaseHostServiceListHostsRequest(): HostServiceListHostsRequest {
  return {
    orgIds: [],
    bvVersions: [],
    offset: 0,
    limit: 0,
    search: undefined,
    sort: [],
  };
}

export const HostServiceListHostsRequest = {
  encode(
    message: HostServiceListHostsRequest,
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
  ): HostServiceListHostsRequest {
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
    object: DeepPartial<HostServiceListHostsRequest>,
  ): HostServiceListHostsRequest {
    const message = createBaseHostServiceListHostsRequest();
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

export const HostServiceListHostsResponse = {
  encode(
    message: HostServiceListHostsResponse,
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
  ): HostServiceListHostsResponse {
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
    object: DeepPartial<HostServiceListHostsResponse>,
  ): HostServiceListHostsResponse {
    const message = createBaseHostServiceListHostsResponse();
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
      RegionInfo.encode(v!, writer.uint32(10).fork()).ldelim();
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

          message.regions.push(RegionInfo.decode(reader, reader.uint32()));
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
    message.regions =
      object.regions?.map((e) => RegionInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRegionInfo(): RegionInfo {
  return { region: undefined, validHosts: 0, freeIps: 0 };
}

export const RegionInfo = {
  encode(
    message: RegionInfo,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.region !== undefined) {
      Region.encode(message.region, writer.uint32(10).fork()).ldelim();
    }
    if (message.validHosts !== 0) {
      writer.uint32(16).uint32(message.validHosts);
    }
    if (message.freeIps !== 0) {
      writer.uint32(24).uint32(message.freeIps);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegionInfo {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegionInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.region = Region.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.validHosts = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.freeIps = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RegionInfo>): RegionInfo {
    return RegionInfo.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RegionInfo>): RegionInfo {
    const message = createBaseRegionInfo();
    message.region =
      object.region !== undefined && object.region !== null
        ? Region.fromPartial(object.region)
        : undefined;
    message.validHosts = object.validHosts ?? 0;
    message.freeIps = object.freeIps ?? 0;
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

export const HostServiceUpdateHostRequest = {
  encode(
    message: HostServiceUpdateHostRequest,
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
  ): HostServiceUpdateHostRequest {
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
    base?: DeepPartial<HostServiceUpdateHostRequest>,
  ): HostServiceUpdateHostRequest {
    return HostServiceUpdateHostRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceUpdateHostRequest>,
  ): HostServiceUpdateHostRequest {
    const message = createBaseHostServiceUpdateHostRequest();
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

export const HostServiceUpdateHostResponse = {
  encode(
    message: HostServiceUpdateHostResponse,
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
  ): HostServiceUpdateHostResponse {
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
    base?: DeepPartial<HostServiceUpdateHostResponse>,
  ): HostServiceUpdateHostResponse {
    return HostServiceUpdateHostResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceUpdateHostResponse>,
  ): HostServiceUpdateHostResponse {
    const message = createBaseHostServiceUpdateHostResponse();
    message.host =
      object.host !== undefined && object.host !== null
        ? Host.fromPartial(object.host)
        : undefined;
    return message;
  },
};

function createBaseHostServiceUpdateRegionRequest(): HostServiceUpdateRegionRequest {
  return { regionId: '', displayName: undefined, skuCode: undefined };
}

export const HostServiceUpdateRegionRequest = {
  encode(
    message: HostServiceUpdateRegionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.regionId !== '') {
      writer.uint32(10).string(message.regionId);
    }
    if (message.displayName !== undefined) {
      writer.uint32(18).string(message.displayName);
    }
    if (message.skuCode !== undefined) {
      writer.uint32(26).string(message.skuCode);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceUpdateRegionRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceUpdateRegionRequest();
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

          message.displayName = reader.string();
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

  create(
    base?: DeepPartial<HostServiceUpdateRegionRequest>,
  ): HostServiceUpdateRegionRequest {
    return HostServiceUpdateRegionRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceUpdateRegionRequest>,
  ): HostServiceUpdateRegionRequest {
    const message = createBaseHostServiceUpdateRegionRequest();
    message.regionId = object.regionId ?? '';
    message.displayName = object.displayName ?? undefined;
    message.skuCode = object.skuCode ?? undefined;
    return message;
  },
};

function createBaseHostServiceUpdateRegionResponse(): HostServiceUpdateRegionResponse {
  return { region: undefined };
}

export const HostServiceUpdateRegionResponse = {
  encode(
    message: HostServiceUpdateRegionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.region !== undefined) {
      Region.encode(message.region, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): HostServiceUpdateRegionResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostServiceUpdateRegionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.region = Region.decode(reader, reader.uint32());
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
    base?: DeepPartial<HostServiceUpdateRegionResponse>,
  ): HostServiceUpdateRegionResponse {
    return HostServiceUpdateRegionResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<HostServiceUpdateRegionResponse>,
  ): HostServiceUpdateRegionResponse {
    const message = createBaseHostServiceUpdateRegionResponse();
    message.region =
      object.region !== undefined && object.region !== null
        ? Region.fromPartial(object.region)
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

/** Service for managing hosts. */
export type HostServiceDefinition = typeof HostServiceDefinition;
export const HostServiceDefinition = {
  name: 'HostService',
  fullName: 'blockjoy.v1.HostService',
  methods: {
    /** Create a new host. */
    createHost: {
      name: 'CreateHost',
      requestType: HostServiceCreateHostRequest,
      requestStream: false,
      responseType: HostServiceCreateHostResponse,
      responseStream: false,
      options: {},
    },
    /** Create a new region. */
    createRegion: {
      name: 'CreateRegion',
      requestType: HostServiceCreateRegionRequest,
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
    listHosts: {
      name: 'ListHosts',
      requestType: HostServiceListHostsRequest,
      requestStream: false,
      responseType: HostServiceListHostsResponse,
      responseStream: false,
      options: {},
    },
    /** List the regions with available hosts. */
    listRegions: {
      name: 'ListRegions',
      requestType: HostServiceListRegionsRequest,
      requestStream: false,
      responseType: HostServiceListRegionsResponse,
      responseStream: false,
      options: {},
    },
    /** Update an existing host. */
    updateHost: {
      name: 'UpdateHost',
      requestType: HostServiceUpdateHostRequest,
      requestStream: false,
      responseType: HostServiceUpdateHostResponse,
      responseStream: false,
      options: {},
    },
    /** Update an existing region. */
    updateRegion: {
      name: 'UpdateRegion',
      requestType: HostServiceUpdateRegionRequest,
      requestStream: false,
      responseType: HostServiceUpdateRegionResponse,
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
  /** Update an existing region. */
  updateRegion(
    request: HostServiceUpdateRegionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<HostServiceUpdateRegionResponse>>;
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
  /** Update an existing region. */
  updateRegion(
    request: DeepPartial<HostServiceUpdateRegionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<HostServiceUpdateRegionResponse>;
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
