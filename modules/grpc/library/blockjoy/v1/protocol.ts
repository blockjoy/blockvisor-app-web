/* eslint-disable */
import Long from 'long';
import type { CallContext, CallOptions } from 'nice-grpc-common';
import _m0 from 'protobufjs/minimal';
import { Empty } from '../../google/protobuf/empty';
import { Timestamp } from '../../google/protobuf/timestamp';
import { BillingAmount } from '../common/v1/currency';
import { ProtocolVersionKey, Visibility } from '../common/v1/protocol';
import { SearchOperator, SortOrder } from '../common/v1/search';

export const protobufPackage = 'blockjoy.v1';

export enum ProtocolSortField {
  PROTOCOL_SORT_FIELD_UNSPECIFIED = 0,
  PROTOCOL_SORT_FIELD_KEY = 1,
  PROTOCOL_SORT_FIELD_NAME = 2,
  UNRECOGNIZED = -1,
}

export interface Protocol {
  protocolId: string;
  orgId?: string | undefined;
  key: string;
  name: string;
  description?: string | undefined;
  ticker?: string | undefined;
  visibility: Visibility;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  versions: ProtocolVersion[];
}

export interface ProtocolVersion {
  protocolVersionId: string;
  orgId?: string | undefined;
  protocolId: string;
  versionKey: ProtocolVersionKey | undefined;
  semanticVersion: string;
  skuCode: string;
  description?: string | undefined;
  visibility: Visibility;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface ProtocolServiceAddProtocolRequest {
  /** Whether this is public or private protocol. */
  orgId?: string | undefined;
  /** The lookup key for this protocol. */
  key: string;
  /** The display name for this protocol. */
  name: string;
  /** A readable description of this protocol. */
  description?: string | undefined;
  /** The ticker symbol for blockchain protocols (e.g. ETH). */
  ticker?: string | undefined;
}

export interface ProtocolServiceAddProtocolResponse {
  protocol: Protocol | undefined;
}

export interface ProtocolServiceAddVersionRequest {
  /** Whether this is a public or private version. */
  orgId?: string | undefined;
  /** The lookup key of this version. */
  versionKey: ProtocolVersionKey | undefined;
  /** A semantic version of the protocol software. */
  semanticVersion: string;
  /** The SKU code for this version (e.g. ETH-MN). */
  skuCode: string;
  /** A readable description of this protocol version. */
  description?: string | undefined;
}

export interface ProtocolServiceAddVersionResponse {
  version: ProtocolVersion | undefined;
}

export interface ProtocolServiceGetLatestRequest {
  /** The version key to get the latest version of. */
  versionKey: ProtocolVersionKey | undefined;
  /** The org id for private protocols or versions. */
  orgId?: string | undefined;
}

export interface ProtocolServiceGetLatestResponse {
  protocolVersion: ProtocolVersion | undefined;
}

export interface ProtocolServiceGetPricingRequest {
  /** The version key to get the pricing for. */
  versionKey: ProtocolVersionKey | undefined;
  /** The org id for private protocols or versions. */
  orgId?: string | undefined;
  /** The region to request an instance for. */
  region: string;
}

export interface ProtocolServiceGetPricingResponse {
  billingAmount: BillingAmount | undefined;
}

export interface ProtocolServiceGetProtocolRequest {
  /** The protocol id to retrieve. */
  protocolId?: string | undefined;
  /** The protocol key to retrieve. */
  protocolKey?: string | undefined;
  /** The org id for private protocols. */
  orgId?: string | undefined;
}

export interface ProtocolServiceGetProtocolResponse {
  protocol: Protocol | undefined;
}

export interface ProtocolServiceGetStatsRequest {
  /** The org id for private protocols or versions. */
  orgId?: string | undefined;
  /** Get stats for some protocol. */
  protocolId?: string | undefined;
  /** Get stats for some protocol version. */
  protocolVersionId?: string | undefined;
  /** Get stats for all protocols; */
  allProtocols?: Empty | undefined;
  /** Get stats for all protocol versions; */
  allVersions?: Empty | undefined;
}

export interface ProtocolServiceGetStatsResponse {
  /** Map from protocol_id to stats for that protocol; */
  protocolStats: { [key: string]: NodeStats };
  /** Map from protocol_version_id to stats for that version; */
  versionStats: { [key: string]: NodeStats };
}

export interface ProtocolServiceGetStatsResponse_ProtocolStatsEntry {
  key: string;
  value: NodeStats | undefined;
}

export interface ProtocolServiceGetStatsResponse_VersionStatsEntry {
  key: string;
  value: NodeStats | undefined;
}

export interface NodeStats {
  total: number;
  starting: number;
  running: number;
  upgrading: number;
  failed: number;
}

export interface ProtocolServiceListProtocolsRequest {
  /** List public protocols, plus any belonging to these orgs. */
  orgIds: string[];
  /** The number of results to skip. */
  offset: number;
  /** Limit the number of results. */
  limit: number;
  /** Search these parameters. */
  search?: ProtocolSearch | undefined;
  /** Sort the results in this order. */
  sort: ProtocolSort[];
}

export interface ProtocolSearch {
  operator: SearchOperator;
  protocolId?: string | undefined;
  name?: string | undefined;
}

export interface ProtocolSort {
  field: ProtocolSortField;
  order: SortOrder;
}

export interface ProtocolServiceListProtocolsResponse {
  protocols: Protocol[];
  total: number;
}

export interface ProtocolServiceListVariantsRequest {
  /** The protocol id to list the variants of. */
  protocolId: string;
  /** The org id for private protocols or versions. */
  orgId?: string | undefined;
}

export interface ProtocolServiceListVariantsResponse {
  variantKeys: string[];
}

export interface ProtocolServiceListVersionsRequest {
  /** The version key to list the versions of. */
  versionKey: ProtocolVersionKey | undefined;
  /** The org id for private protocols or versions. */
  orgId?: string | undefined;
}

export interface ProtocolServiceListVersionsResponse {
  protocolVersions: ProtocolVersion[];
}

export interface ProtocolServiceUpdateProtocolRequest {
  /** The protocol id to update. */
  protocolId: string;
  /** Update the name. */
  name?: string | undefined;
  /** Update the description. */
  description?: string | undefined;
  /** Update the visibility. */
  visibility?: Visibility | undefined;
}

export interface ProtocolServiceUpdateProtocolResponse {
  protocol: Protocol | undefined;
}

export interface ProtocolServiceUpdateVersionRequest {
  /** The protocol version id to update. */
  protocolVersionId: string;
  /** Update the SKU code. */
  skuCode?: string | undefined;
  /** Update the description. */
  description?: string | undefined;
  /** Update the visibility. */
  visibility?: Visibility | undefined;
}

export interface ProtocolServiceUpdateVersionResponse {
  protocolVersion: ProtocolVersion | undefined;
}

function createBaseProtocol(): Protocol {
  return {
    protocolId: '',
    orgId: undefined,
    key: '',
    name: '',
    description: undefined,
    ticker: undefined,
    visibility: 0,
    createdAt: undefined,
    updatedAt: undefined,
    versions: [],
  };
}

export const Protocol = {
  encode(
    message: Protocol,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolId !== '') {
      writer.uint32(10).string(message.protocolId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.key !== '') {
      writer.uint32(26).string(message.key);
    }
    if (message.name !== '') {
      writer.uint32(34).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(42).string(message.description);
    }
    if (message.ticker !== undefined) {
      writer.uint32(50).string(message.ticker);
    }
    if (message.visibility !== 0) {
      writer.uint32(56).int32(message.visibility);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(66).fork(),
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(74).fork(),
      ).ldelim();
    }
    for (const v of message.versions) {
      ProtocolVersion.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Protocol {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolId = reader.string();
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

          message.key = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ticker = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.visibility = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.versions.push(
            ProtocolVersion.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Protocol>): Protocol {
    return Protocol.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Protocol>): Protocol {
    const message = createBaseProtocol();
    message.protocolId = object.protocolId ?? '';
    message.orgId = object.orgId ?? undefined;
    message.key = object.key ?? '';
    message.name = object.name ?? '';
    message.description = object.description ?? undefined;
    message.ticker = object.ticker ?? undefined;
    message.visibility = object.visibility ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.versions =
      object.versions?.map((e) => ProtocolVersion.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProtocolVersion(): ProtocolVersion {
  return {
    protocolVersionId: '',
    orgId: undefined,
    protocolId: '',
    versionKey: undefined,
    semanticVersion: '',
    skuCode: '',
    description: undefined,
    visibility: 0,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const ProtocolVersion = {
  encode(
    message: ProtocolVersion,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolVersionId !== '') {
      writer.uint32(10).string(message.protocolVersionId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.protocolId !== '') {
      writer.uint32(26).string(message.protocolId);
    }
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(
        message.versionKey,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    if (message.semanticVersion !== '') {
      writer.uint32(42).string(message.semanticVersion);
    }
    if (message.skuCode !== '') {
      writer.uint32(50).string(message.skuCode);
    }
    if (message.description !== undefined) {
      writer.uint32(58).string(message.description);
    }
    if (message.visibility !== 0) {
      writer.uint32(64).int32(message.visibility);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(74).fork(),
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(82).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolVersion {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolVersion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolVersionId = reader.string();
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

          message.protocolId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.versionKey = ProtocolVersionKey.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.semanticVersion = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.skuCode = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.description = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.visibility = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32()),
          );
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ProtocolVersion>): ProtocolVersion {
    return ProtocolVersion.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProtocolVersion>): ProtocolVersion {
    const message = createBaseProtocolVersion();
    message.protocolVersionId = object.protocolVersionId ?? '';
    message.orgId = object.orgId ?? undefined;
    message.protocolId = object.protocolId ?? '';
    message.versionKey =
      object.versionKey !== undefined && object.versionKey !== null
        ? ProtocolVersionKey.fromPartial(object.versionKey)
        : undefined;
    message.semanticVersion = object.semanticVersion ?? '';
    message.skuCode = object.skuCode ?? '';
    message.description = object.description ?? undefined;
    message.visibility = object.visibility ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceAddProtocolRequest(): ProtocolServiceAddProtocolRequest {
  return {
    orgId: undefined,
    key: '',
    name: '',
    description: undefined,
    ticker: undefined,
  };
}

export const ProtocolServiceAddProtocolRequest = {
  encode(
    message: ProtocolServiceAddProtocolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.key !== '') {
      writer.uint32(18).string(message.key);
    }
    if (message.name !== '') {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(34).string(message.description);
    }
    if (message.ticker !== undefined) {
      writer.uint32(42).string(message.ticker);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceAddProtocolRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceAddProtocolRequest();
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

          message.key = reader.string();
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

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ticker = reader.string();
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
    base?: DeepPartial<ProtocolServiceAddProtocolRequest>,
  ): ProtocolServiceAddProtocolRequest {
    return ProtocolServiceAddProtocolRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceAddProtocolRequest>,
  ): ProtocolServiceAddProtocolRequest {
    const message = createBaseProtocolServiceAddProtocolRequest();
    message.orgId = object.orgId ?? undefined;
    message.key = object.key ?? '';
    message.name = object.name ?? '';
    message.description = object.description ?? undefined;
    message.ticker = object.ticker ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceAddProtocolResponse(): ProtocolServiceAddProtocolResponse {
  return { protocol: undefined };
}

export const ProtocolServiceAddProtocolResponse = {
  encode(
    message: ProtocolServiceAddProtocolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocol !== undefined) {
      Protocol.encode(message.protocol, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceAddProtocolResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceAddProtocolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocol = Protocol.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceAddProtocolResponse>,
  ): ProtocolServiceAddProtocolResponse {
    return ProtocolServiceAddProtocolResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceAddProtocolResponse>,
  ): ProtocolServiceAddProtocolResponse {
    const message = createBaseProtocolServiceAddProtocolResponse();
    message.protocol =
      object.protocol !== undefined && object.protocol !== null
        ? Protocol.fromPartial(object.protocol)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceAddVersionRequest(): ProtocolServiceAddVersionRequest {
  return {
    orgId: undefined,
    versionKey: undefined,
    semanticVersion: '',
    skuCode: '',
    description: undefined,
  };
}

export const ProtocolServiceAddVersionRequest = {
  encode(
    message: ProtocolServiceAddVersionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(
        message.versionKey,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    if (message.semanticVersion !== '') {
      writer.uint32(26).string(message.semanticVersion);
    }
    if (message.skuCode !== '') {
      writer.uint32(34).string(message.skuCode);
    }
    if (message.description !== undefined) {
      writer.uint32(42).string(message.description);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceAddVersionRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceAddVersionRequest();
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

          message.versionKey = ProtocolVersionKey.decode(
            reader,
            reader.uint32(),
          );
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.semanticVersion = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.skuCode = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
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
    base?: DeepPartial<ProtocolServiceAddVersionRequest>,
  ): ProtocolServiceAddVersionRequest {
    return ProtocolServiceAddVersionRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceAddVersionRequest>,
  ): ProtocolServiceAddVersionRequest {
    const message = createBaseProtocolServiceAddVersionRequest();
    message.orgId = object.orgId ?? undefined;
    message.versionKey =
      object.versionKey !== undefined && object.versionKey !== null
        ? ProtocolVersionKey.fromPartial(object.versionKey)
        : undefined;
    message.semanticVersion = object.semanticVersion ?? '';
    message.skuCode = object.skuCode ?? '';
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceAddVersionResponse(): ProtocolServiceAddVersionResponse {
  return { version: undefined };
}

export const ProtocolServiceAddVersionResponse = {
  encode(
    message: ProtocolServiceAddVersionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.version !== undefined) {
      ProtocolVersion.encode(
        message.version,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceAddVersionResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceAddVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = ProtocolVersion.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceAddVersionResponse>,
  ): ProtocolServiceAddVersionResponse {
    return ProtocolServiceAddVersionResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceAddVersionResponse>,
  ): ProtocolServiceAddVersionResponse {
    const message = createBaseProtocolServiceAddVersionResponse();
    message.version =
      object.version !== undefined && object.version !== null
        ? ProtocolVersion.fromPartial(object.version)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceGetLatestRequest(): ProtocolServiceGetLatestRequest {
  return { versionKey: undefined, orgId: undefined };
}

export const ProtocolServiceGetLatestRequest = {
  encode(
    message: ProtocolServiceGetLatestRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(
        message.versionKey,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetLatestRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetLatestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.versionKey = ProtocolVersionKey.decode(
            reader,
            reader.uint32(),
          );
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
    base?: DeepPartial<ProtocolServiceGetLatestRequest>,
  ): ProtocolServiceGetLatestRequest {
    return ProtocolServiceGetLatestRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetLatestRequest>,
  ): ProtocolServiceGetLatestRequest {
    const message = createBaseProtocolServiceGetLatestRequest();
    message.versionKey =
      object.versionKey !== undefined && object.versionKey !== null
        ? ProtocolVersionKey.fromPartial(object.versionKey)
        : undefined;
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceGetLatestResponse(): ProtocolServiceGetLatestResponse {
  return { protocolVersion: undefined };
}

export const ProtocolServiceGetLatestResponse = {
  encode(
    message: ProtocolServiceGetLatestResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolVersion !== undefined) {
      ProtocolVersion.encode(
        message.protocolVersion,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetLatestResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetLatestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolVersion = ProtocolVersion.decode(
            reader,
            reader.uint32(),
          );
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
    base?: DeepPartial<ProtocolServiceGetLatestResponse>,
  ): ProtocolServiceGetLatestResponse {
    return ProtocolServiceGetLatestResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetLatestResponse>,
  ): ProtocolServiceGetLatestResponse {
    const message = createBaseProtocolServiceGetLatestResponse();
    message.protocolVersion =
      object.protocolVersion !== undefined && object.protocolVersion !== null
        ? ProtocolVersion.fromPartial(object.protocolVersion)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceGetPricingRequest(): ProtocolServiceGetPricingRequest {
  return { versionKey: undefined, orgId: undefined, region: '' };
}

export const ProtocolServiceGetPricingRequest = {
  encode(
    message: ProtocolServiceGetPricingRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(
        message.versionKey,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.region !== '') {
      writer.uint32(26).string(message.region);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetPricingRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetPricingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.versionKey = ProtocolVersionKey.decode(
            reader,
            reader.uint32(),
          );
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

          message.regionId = reader.string();
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
    base?: DeepPartial<ProtocolServiceGetPricingRequest>,
  ): ProtocolServiceGetPricingRequest {
    return ProtocolServiceGetPricingRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetPricingRequest>,
  ): ProtocolServiceGetPricingRequest {
    const message = createBaseProtocolServiceGetPricingRequest();
    message.versionKey =
      object.versionKey !== undefined && object.versionKey !== null
        ? ProtocolVersionKey.fromPartial(object.versionKey)
        : undefined;
    message.orgId = object.orgId ?? undefined;
    message.region = object.region ?? '';
    return message;
  },
};

function createBaseProtocolServiceGetPricingResponse(): ProtocolServiceGetPricingResponse {
  return { billingAmount: undefined };
}

export const ProtocolServiceGetPricingResponse = {
  encode(
    message: ProtocolServiceGetPricingResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.billingAmount !== undefined) {
      BillingAmount.encode(
        message.billingAmount,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetPricingResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetPricingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.billingAmount = BillingAmount.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceGetPricingResponse>,
  ): ProtocolServiceGetPricingResponse {
    return ProtocolServiceGetPricingResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetPricingResponse>,
  ): ProtocolServiceGetPricingResponse {
    const message = createBaseProtocolServiceGetPricingResponse();
    message.billingAmount =
      object.billingAmount !== undefined && object.billingAmount !== null
        ? BillingAmount.fromPartial(object.billingAmount)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceGetProtocolRequest(): ProtocolServiceGetProtocolRequest {
  return { protocolId: undefined, protocolKey: undefined, orgId: undefined };
}

export const ProtocolServiceGetProtocolRequest = {
  encode(
    message: ProtocolServiceGetProtocolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolId !== undefined) {
      writer.uint32(10).string(message.protocolId);
    }
    if (message.protocolKey !== undefined) {
      writer.uint32(18).string(message.protocolKey);
    }
    if (message.orgId !== undefined) {
      writer.uint32(26).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetProtocolRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetProtocolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.protocolKey = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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
    base?: DeepPartial<ProtocolServiceGetProtocolRequest>,
  ): ProtocolServiceGetProtocolRequest {
    return ProtocolServiceGetProtocolRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetProtocolRequest>,
  ): ProtocolServiceGetProtocolRequest {
    const message = createBaseProtocolServiceGetProtocolRequest();
    message.protocolId = object.protocolId ?? undefined;
    message.protocolKey = object.protocolKey ?? undefined;
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceGetProtocolResponse(): ProtocolServiceGetProtocolResponse {
  return { protocol: undefined };
}

export const ProtocolServiceGetProtocolResponse = {
  encode(
    message: ProtocolServiceGetProtocolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocol !== undefined) {
      Protocol.encode(message.protocol, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetProtocolResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetProtocolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocol = Protocol.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceGetProtocolResponse>,
  ): ProtocolServiceGetProtocolResponse {
    return ProtocolServiceGetProtocolResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetProtocolResponse>,
  ): ProtocolServiceGetProtocolResponse {
    const message = createBaseProtocolServiceGetProtocolResponse();
    message.protocol =
      object.protocol !== undefined && object.protocol !== null
        ? Protocol.fromPartial(object.protocol)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceGetStatsRequest(): ProtocolServiceGetStatsRequest {
  return {
    orgId: undefined,
    protocolId: undefined,
    protocolVersionId: undefined,
    allProtocols: undefined,
    allVersions: undefined,
  };
}

export const ProtocolServiceGetStatsRequest = {
  encode(
    message: ProtocolServiceGetStatsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.protocolId !== undefined) {
      writer.uint32(18).string(message.protocolId);
    }
    if (message.protocolVersionId !== undefined) {
      writer.uint32(26).string(message.protocolVersionId);
    }
    if (message.allProtocols !== undefined) {
      Empty.encode(message.allProtocols, writer.uint32(34).fork()).ldelim();
    }
    if (message.allVersions !== undefined) {
      Empty.encode(message.allVersions, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetStatsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetStatsRequest();
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

          message.protocolId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.protocolVersionId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.allProtocols = Empty.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.allVersions = Empty.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceGetStatsRequest>,
  ): ProtocolServiceGetStatsRequest {
    return ProtocolServiceGetStatsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetStatsRequest>,
  ): ProtocolServiceGetStatsRequest {
    const message = createBaseProtocolServiceGetStatsRequest();
    message.orgId = object.orgId ?? undefined;
    message.protocolId = object.protocolId ?? undefined;
    message.protocolVersionId = object.protocolVersionId ?? undefined;
    message.allProtocols =
      object.allProtocols !== undefined && object.allProtocols !== null
        ? Empty.fromPartial(object.allProtocols)
        : undefined;
    message.allVersions =
      object.allVersions !== undefined && object.allVersions !== null
        ? Empty.fromPartial(object.allVersions)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceGetStatsResponse(): ProtocolServiceGetStatsResponse {
  return { protocolStats: {}, versionStats: {} };
}

export const ProtocolServiceGetStatsResponse = {
  encode(
    message: ProtocolServiceGetStatsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    Object.entries(message.protocolStats).forEach(([key, value]) => {
      ProtocolServiceGetStatsResponse_ProtocolStatsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork(),
      ).ldelim();
    });
    Object.entries(message.versionStats).forEach(([key, value]) => {
      ProtocolServiceGetStatsResponse_VersionStatsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork(),
      ).ldelim();
    });
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetStatsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceGetStatsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 =
            ProtocolServiceGetStatsResponse_ProtocolStatsEntry.decode(
              reader,
              reader.uint32(),
            );
          if (entry1.value !== undefined) {
            message.protocolStats[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 =
            ProtocolServiceGetStatsResponse_VersionStatsEntry.decode(
              reader,
              reader.uint32(),
            );
          if (entry2.value !== undefined) {
            message.versionStats[entry2.key] = entry2.value;
          }
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
    base?: DeepPartial<ProtocolServiceGetStatsResponse>,
  ): ProtocolServiceGetStatsResponse {
    return ProtocolServiceGetStatsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetStatsResponse>,
  ): ProtocolServiceGetStatsResponse {
    const message = createBaseProtocolServiceGetStatsResponse();
    message.protocolStats = Object.entries(object.protocolStats ?? {}).reduce<{
      [key: string]: NodeStats;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = NodeStats.fromPartial(value);
      }
      return acc;
    }, {});
    message.versionStats = Object.entries(object.versionStats ?? {}).reduce<{
      [key: string]: NodeStats;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = NodeStats.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseProtocolServiceGetStatsResponse_ProtocolStatsEntry(): ProtocolServiceGetStatsResponse_ProtocolStatsEntry {
  return { key: '', value: undefined };
}

export const ProtocolServiceGetStatsResponse_ProtocolStatsEntry = {
  encode(
    message: ProtocolServiceGetStatsResponse_ProtocolStatsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      NodeStats.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetStatsResponse_ProtocolStatsEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseProtocolServiceGetStatsResponse_ProtocolStatsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = NodeStats.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceGetStatsResponse_ProtocolStatsEntry>,
  ): ProtocolServiceGetStatsResponse_ProtocolStatsEntry {
    return ProtocolServiceGetStatsResponse_ProtocolStatsEntry.fromPartial(
      base ?? {},
    );
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetStatsResponse_ProtocolStatsEntry>,
  ): ProtocolServiceGetStatsResponse_ProtocolStatsEntry {
    const message =
      createBaseProtocolServiceGetStatsResponse_ProtocolStatsEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? NodeStats.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceGetStatsResponse_VersionStatsEntry(): ProtocolServiceGetStatsResponse_VersionStatsEntry {
  return { key: '', value: undefined };
}

export const ProtocolServiceGetStatsResponse_VersionStatsEntry = {
  encode(
    message: ProtocolServiceGetStatsResponse_VersionStatsEntry,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      NodeStats.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceGetStatsResponse_VersionStatsEntry {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message =
      createBaseProtocolServiceGetStatsResponse_VersionStatsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = NodeStats.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceGetStatsResponse_VersionStatsEntry>,
  ): ProtocolServiceGetStatsResponse_VersionStatsEntry {
    return ProtocolServiceGetStatsResponse_VersionStatsEntry.fromPartial(
      base ?? {},
    );
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceGetStatsResponse_VersionStatsEntry>,
  ): ProtocolServiceGetStatsResponse_VersionStatsEntry {
    const message =
      createBaseProtocolServiceGetStatsResponse_VersionStatsEntry();
    message.key = object.key ?? '';
    message.value =
      object.value !== undefined && object.value !== null
        ? NodeStats.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseNodeStats(): NodeStats {
  return { total: 0, starting: 0, running: 0, upgrading: 0, failed: 0 };
}

export const NodeStats = {
  encode(
    message: NodeStats,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint64(message.total);
    }
    if (message.starting !== 0) {
      writer.uint32(16).uint64(message.starting);
    }
    if (message.running !== 0) {
      writer.uint32(24).uint64(message.running);
    }
    if (message.upgrading !== 0) {
      writer.uint32(32).uint64(message.upgrading);
    }
    if (message.failed !== 0) {
      writer.uint32(40).uint64(message.failed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStats {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStats();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.starting = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.running = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.upgrading = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.failed = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeStats>): NodeStats {
    return NodeStats.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeStats>): NodeStats {
    const message = createBaseNodeStats();
    message.total = object.total ?? 0;
    message.starting = object.starting ?? 0;
    message.running = object.running ?? 0;
    message.upgrading = object.upgrading ?? 0;
    message.failed = object.failed ?? 0;
    return message;
  },
};

function createBaseProtocolServiceListProtocolsRequest(): ProtocolServiceListProtocolsRequest {
  return { orgIds: [], offset: 0, limit: 0, search: undefined, sort: [] };
}

export const ProtocolServiceListProtocolsRequest = {
  encode(
    message: ProtocolServiceListProtocolsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.orgIds) {
      writer.uint32(10).string(v!);
    }
    if (message.offset !== 0) {
      writer.uint32(16).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(24).uint64(message.limit);
    }
    if (message.search !== undefined) {
      ProtocolSearch.encode(message.search, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.sort) {
      ProtocolSort.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceListProtocolsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceListProtocolsRequest();
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
        case 8:
          if (tag !== 66) {
            break;
          }

          message.search = ProtocolSearch.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.sort.push(ProtocolSort.decode(reader, reader.uint32()));
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
    base?: DeepPartial<ProtocolServiceListProtocolsRequest>,
  ): ProtocolServiceListProtocolsRequest {
    return ProtocolServiceListProtocolsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceListProtocolsRequest>,
  ): ProtocolServiceListProtocolsRequest {
    const message = createBaseProtocolServiceListProtocolsRequest();
    message.orgIds = object.orgIds?.map((e) => e) || [];
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.search =
      object.search !== undefined && object.search !== null
        ? ProtocolSearch.fromPartial(object.search)
        : undefined;
    message.sort = object.sort?.map((e) => ProtocolSort.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProtocolSearch(): ProtocolSearch {
  return { operator: 0, protocolId: undefined, name: undefined };
}

export const ProtocolSearch = {
  encode(
    message: ProtocolSearch,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.protocolId !== undefined) {
      writer.uint32(18).string(message.protocolId);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolSearch {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolSearch();
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

          message.protocolId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ProtocolSearch>): ProtocolSearch {
    return ProtocolSearch.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProtocolSearch>): ProtocolSearch {
    const message = createBaseProtocolSearch();
    message.operator = object.operator ?? 0;
    message.protocolId = object.protocolId ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseProtocolSort(): ProtocolSort {
  return { field: 0, order: 0 };
}

export const ProtocolSort = {
  encode(
    message: ProtocolSort,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolSort {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolSort();
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

  create(base?: DeepPartial<ProtocolSort>): ProtocolSort {
    return ProtocolSort.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProtocolSort>): ProtocolSort {
    const message = createBaseProtocolSort();
    message.field = object.field ?? 0;
    message.order = object.order ?? 0;
    return message;
  },
};

function createBaseProtocolServiceListProtocolsResponse(): ProtocolServiceListProtocolsResponse {
  return { protocols: [], total: 0 };
}

export const ProtocolServiceListProtocolsResponse = {
  encode(
    message: ProtocolServiceListProtocolsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.protocols) {
      Protocol.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== 0) {
      writer.uint32(16).uint64(message.total);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceListProtocolsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceListProtocolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocols.push(Protocol.decode(reader, reader.uint32()));
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
    base?: DeepPartial<ProtocolServiceListProtocolsResponse>,
  ): ProtocolServiceListProtocolsResponse {
    return ProtocolServiceListProtocolsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceListProtocolsResponse>,
  ): ProtocolServiceListProtocolsResponse {
    const message = createBaseProtocolServiceListProtocolsResponse();
    message.protocols =
      object.protocols?.map((e) => Protocol.fromPartial(e)) || [];
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseProtocolServiceListVariantsRequest(): ProtocolServiceListVariantsRequest {
  return { protocolId: '', orgId: undefined };
}

export const ProtocolServiceListVariantsRequest = {
  encode(
    message: ProtocolServiceListVariantsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolId !== '') {
      writer.uint32(10).string(message.protocolId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceListVariantsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceListVariantsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolId = reader.string();
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
    base?: DeepPartial<ProtocolServiceListVariantsRequest>,
  ): ProtocolServiceListVariantsRequest {
    return ProtocolServiceListVariantsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceListVariantsRequest>,
  ): ProtocolServiceListVariantsRequest {
    const message = createBaseProtocolServiceListVariantsRequest();
    message.protocolId = object.protocolId ?? '';
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceListVariantsResponse(): ProtocolServiceListVariantsResponse {
  return { variantKeys: [] };
}

export const ProtocolServiceListVariantsResponse = {
  encode(
    message: ProtocolServiceListVariantsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.variantKeys) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceListVariantsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceListVariantsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.variantKeys.push(reader.string());
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
    base?: DeepPartial<ProtocolServiceListVariantsResponse>,
  ): ProtocolServiceListVariantsResponse {
    return ProtocolServiceListVariantsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceListVariantsResponse>,
  ): ProtocolServiceListVariantsResponse {
    const message = createBaseProtocolServiceListVariantsResponse();
    message.variantKeys = object.variantKeys?.map((e) => e) || [];
    return message;
  },
};

function createBaseProtocolServiceListVersionsRequest(): ProtocolServiceListVersionsRequest {
  return { versionKey: undefined, orgId: undefined };
}

export const ProtocolServiceListVersionsRequest = {
  encode(
    message: ProtocolServiceListVersionsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(
        message.versionKey,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceListVersionsRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceListVersionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.versionKey = ProtocolVersionKey.decode(
            reader,
            reader.uint32(),
          );
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
    base?: DeepPartial<ProtocolServiceListVersionsRequest>,
  ): ProtocolServiceListVersionsRequest {
    return ProtocolServiceListVersionsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceListVersionsRequest>,
  ): ProtocolServiceListVersionsRequest {
    const message = createBaseProtocolServiceListVersionsRequest();
    message.versionKey =
      object.versionKey !== undefined && object.versionKey !== null
        ? ProtocolVersionKey.fromPartial(object.versionKey)
        : undefined;
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceListVersionsResponse(): ProtocolServiceListVersionsResponse {
  return { protocolVersions: [] };
}

export const ProtocolServiceListVersionsResponse = {
  encode(
    message: ProtocolServiceListVersionsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.protocolVersions) {
      ProtocolVersion.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceListVersionsResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceListVersionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolVersions.push(
            ProtocolVersion.decode(reader, reader.uint32()),
          );
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
    base?: DeepPartial<ProtocolServiceListVersionsResponse>,
  ): ProtocolServiceListVersionsResponse {
    return ProtocolServiceListVersionsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceListVersionsResponse>,
  ): ProtocolServiceListVersionsResponse {
    const message = createBaseProtocolServiceListVersionsResponse();
    message.protocolVersions =
      object.protocolVersions?.map((e) => ProtocolVersion.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProtocolServiceUpdateProtocolRequest(): ProtocolServiceUpdateProtocolRequest {
  return {
    protocolId: '',
    name: undefined,
    description: undefined,
    visibility: undefined,
  };
}

export const ProtocolServiceUpdateProtocolRequest = {
  encode(
    message: ProtocolServiceUpdateProtocolRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolId !== '') {
      writer.uint32(10).string(message.protocolId);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.visibility !== undefined) {
      writer.uint32(32).int32(message.visibility);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceUpdateProtocolRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceUpdateProtocolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolId = reader.string();
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

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.visibility = reader.int32() as any;
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
    base?: DeepPartial<ProtocolServiceUpdateProtocolRequest>,
  ): ProtocolServiceUpdateProtocolRequest {
    return ProtocolServiceUpdateProtocolRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceUpdateProtocolRequest>,
  ): ProtocolServiceUpdateProtocolRequest {
    const message = createBaseProtocolServiceUpdateProtocolRequest();
    message.protocolId = object.protocolId ?? '';
    message.name = object.name ?? undefined;
    message.description = object.description ?? undefined;
    message.visibility = object.visibility ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceUpdateProtocolResponse(): ProtocolServiceUpdateProtocolResponse {
  return { protocol: undefined };
}

export const ProtocolServiceUpdateProtocolResponse = {
  encode(
    message: ProtocolServiceUpdateProtocolResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocol !== undefined) {
      Protocol.encode(message.protocol, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceUpdateProtocolResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceUpdateProtocolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocol = Protocol.decode(reader, reader.uint32());
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
    base?: DeepPartial<ProtocolServiceUpdateProtocolResponse>,
  ): ProtocolServiceUpdateProtocolResponse {
    return ProtocolServiceUpdateProtocolResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceUpdateProtocolResponse>,
  ): ProtocolServiceUpdateProtocolResponse {
    const message = createBaseProtocolServiceUpdateProtocolResponse();
    message.protocol =
      object.protocol !== undefined && object.protocol !== null
        ? Protocol.fromPartial(object.protocol)
        : undefined;
    return message;
  },
};

function createBaseProtocolServiceUpdateVersionRequest(): ProtocolServiceUpdateVersionRequest {
  return {
    protocolVersionId: '',
    skuCode: undefined,
    description: undefined,
    visibility: undefined,
  };
}

export const ProtocolServiceUpdateVersionRequest = {
  encode(
    message: ProtocolServiceUpdateVersionRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolVersionId !== '') {
      writer.uint32(10).string(message.protocolVersionId);
    }
    if (message.skuCode !== undefined) {
      writer.uint32(18).string(message.skuCode);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.visibility !== undefined) {
      writer.uint32(32).int32(message.visibility);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceUpdateVersionRequest {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceUpdateVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolVersionId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.skuCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.visibility = reader.int32() as any;
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
    base?: DeepPartial<ProtocolServiceUpdateVersionRequest>,
  ): ProtocolServiceUpdateVersionRequest {
    return ProtocolServiceUpdateVersionRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceUpdateVersionRequest>,
  ): ProtocolServiceUpdateVersionRequest {
    const message = createBaseProtocolServiceUpdateVersionRequest();
    message.protocolVersionId = object.protocolVersionId ?? '';
    message.skuCode = object.skuCode ?? undefined;
    message.description = object.description ?? undefined;
    message.visibility = object.visibility ?? undefined;
    return message;
  },
};

function createBaseProtocolServiceUpdateVersionResponse(): ProtocolServiceUpdateVersionResponse {
  return { protocolVersion: undefined };
}

export const ProtocolServiceUpdateVersionResponse = {
  encode(
    message: ProtocolServiceUpdateVersionResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.protocolVersion !== undefined) {
      ProtocolVersion.encode(
        message.protocolVersion,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ProtocolServiceUpdateVersionResponse {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolServiceUpdateVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolVersion = ProtocolVersion.decode(
            reader,
            reader.uint32(),
          );
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
    base?: DeepPartial<ProtocolServiceUpdateVersionResponse>,
  ): ProtocolServiceUpdateVersionResponse {
    return ProtocolServiceUpdateVersionResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<ProtocolServiceUpdateVersionResponse>,
  ): ProtocolServiceUpdateVersionResponse {
    const message = createBaseProtocolServiceUpdateVersionResponse();
    message.protocolVersion =
      object.protocolVersion !== undefined && object.protocolVersion !== null
        ? ProtocolVersion.fromPartial(object.protocolVersion)
        : undefined;
    return message;
  },
};

/** Service for managing deployable protocols. */
export type ProtocolServiceDefinition = typeof ProtocolServiceDefinition;
export const ProtocolServiceDefinition = {
  name: 'ProtocolService',
  fullName: 'blockjoy.v1.ProtocolService',
  methods: {
    /** Add new deployable protocol. */
    addProtocol: {
      name: 'AddProtocol',
      requestType: ProtocolServiceAddProtocolRequest,
      requestStream: false,
      responseType: ProtocolServiceAddProtocolResponse,
      responseStream: false,
      options: {},
    },
    /** Add a new version to existing protocol. */
    addVersion: {
      name: 'AddVersion',
      requestType: ProtocolServiceAddVersionRequest,
      requestStream: false,
      responseType: ProtocolServiceAddVersionResponse,
      responseStream: false,
      options: {},
    },
    /** Get the latest protocol version. */
    getLatest: {
      name: 'GetLatest',
      requestType: ProtocolServiceGetLatestRequest,
      requestStream: false,
      responseType: ProtocolServiceGetLatestResponse,
      responseStream: false,
      options: {},
    },
    /** Get the instance pricing for some protocol. */
    getPricing: {
      name: 'GetPricing',
      requestType: ProtocolServiceGetPricingRequest,
      requestStream: false,
      responseType: ProtocolServiceGetPricingResponse,
      responseStream: false,
      options: {},
    },
    /** Get info about some protocol. */
    getProtocol: {
      name: 'GetProtocol',
      requestType: ProtocolServiceGetProtocolRequest,
      requestStream: false,
      responseType: ProtocolServiceGetProtocolResponse,
      responseStream: false,
      options: {},
    },
    /** Get stats for some protocol. */
    getStats: {
      name: 'GetStats',
      requestType: ProtocolServiceGetStatsRequest,
      requestStream: false,
      responseType: ProtocolServiceGetStatsResponse,
      responseStream: false,
      options: {},
    },
    /** List all deployable protocols. */
    listProtocols: {
      name: 'ListProtocols',
      requestType: ProtocolServiceListProtocolsRequest,
      requestStream: false,
      responseType: ProtocolServiceListProtocolsResponse,
      responseStream: false,
      options: {},
    },
    /** List the different variants for some protocol. */
    listVariants: {
      name: 'ListVariants',
      requestType: ProtocolServiceListVariantsRequest,
      requestStream: false,
      responseType: ProtocolServiceListVariantsResponse,
      responseStream: false,
      options: {},
    },
    /** List all versions for some version key. */
    listVersions: {
      name: 'ListVersions',
      requestType: ProtocolServiceListVersionsRequest,
      requestStream: false,
      responseType: ProtocolServiceListVersionsResponse,
      responseStream: false,
      options: {},
    },
    /** Update existing protocol metadata. */
    updateProtocol: {
      name: 'UpdateProtocol',
      requestType: ProtocolServiceUpdateProtocolRequest,
      requestStream: false,
      responseType: ProtocolServiceUpdateProtocolResponse,
      responseStream: false,
      options: {},
    },
    /** Update existing protocol version metadata. */
    updateVersion: {
      name: 'UpdateVersion',
      requestType: ProtocolServiceUpdateVersionRequest,
      requestStream: false,
      responseType: ProtocolServiceUpdateVersionResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ProtocolServiceImplementation<CallContextExt = {}> {
  /** Add new deployable protocol. */
  addProtocol(
    request: ProtocolServiceAddProtocolRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceAddProtocolResponse>>;
  /** Add a new version to existing protocol. */
  addVersion(
    request: ProtocolServiceAddVersionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceAddVersionResponse>>;
  /** Get the latest protocol version. */
  getLatest(
    request: ProtocolServiceGetLatestRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceGetLatestResponse>>;
  /** Get the instance pricing for some protocol. */
  getPricing(
    request: ProtocolServiceGetPricingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceGetPricingResponse>>;
  /** Get info about some protocol. */
  getProtocol(
    request: ProtocolServiceGetProtocolRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceGetProtocolResponse>>;
  /** Get stats for some protocol. */
  getStats(
    request: ProtocolServiceGetStatsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceGetStatsResponse>>;
  /** List all deployable protocols. */
  listProtocols(
    request: ProtocolServiceListProtocolsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceListProtocolsResponse>>;
  /** List the different variants for some protocol. */
  listVariants(
    request: ProtocolServiceListVariantsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceListVariantsResponse>>;
  /** List all versions for some version key. */
  listVersions(
    request: ProtocolServiceListVersionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceListVersionsResponse>>;
  /** Update existing protocol metadata. */
  updateProtocol(
    request: ProtocolServiceUpdateProtocolRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceUpdateProtocolResponse>>;
  /** Update existing protocol version metadata. */
  updateVersion(
    request: ProtocolServiceUpdateVersionRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ProtocolServiceUpdateVersionResponse>>;
}

export interface ProtocolServiceClient<CallOptionsExt = {}> {
  /** Add new deployable protocol. */
  addProtocol(
    request: DeepPartial<ProtocolServiceAddProtocolRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceAddProtocolResponse>;
  /** Add a new version to existing protocol. */
  addVersion(
    request: DeepPartial<ProtocolServiceAddVersionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceAddVersionResponse>;
  /** Get the latest protocol version. */
  getLatest(
    request: DeepPartial<ProtocolServiceGetLatestRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceGetLatestResponse>;
  /** Get the instance pricing for some protocol. */
  getPricing(
    request: DeepPartial<ProtocolServiceGetPricingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceGetPricingResponse>;
  /** Get info about some protocol. */
  getProtocol(
    request: DeepPartial<ProtocolServiceGetProtocolRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceGetProtocolResponse>;
  /** Get stats for some protocol. */
  getStats(
    request: DeepPartial<ProtocolServiceGetStatsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceGetStatsResponse>;
  /** List all deployable protocols. */
  listProtocols(
    request: DeepPartial<ProtocolServiceListProtocolsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceListProtocolsResponse>;
  /** List the different variants for some protocol. */
  listVariants(
    request: DeepPartial<ProtocolServiceListVariantsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceListVariantsResponse>;
  /** List all versions for some version key. */
  listVersions(
    request: DeepPartial<ProtocolServiceListVersionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceListVersionsResponse>;
  /** Update existing protocol metadata. */
  updateProtocol(
    request: DeepPartial<ProtocolServiceUpdateProtocolRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceUpdateProtocolResponse>;
  /** Update existing protocol version metadata. */
  updateVersion(
    request: DeepPartial<ProtocolServiceUpdateVersionRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ProtocolServiceUpdateVersionResponse>;
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
