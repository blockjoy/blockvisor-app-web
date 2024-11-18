/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { ImageIdentifier } from "../common/v1/image";

export const protobufPackage = "blockjoy.v1";

export interface BlockchainArchiveServiceGetDownloadMetadataRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
  /** The data version (or latest if none). */
  dataVersion?: number | undefined;
}

export interface BlockchainArchiveServiceGetDownloadMetadataResponse {
  /** The data version of the download manifest. */
  dataVersion: number;
  /** The total size (in bytes) of the uncompressed data. */
  totalSize: number;
  /** The chunk compression type. */
  compression?:
    | Compression
    | undefined;
  /** The total number of download manifest chunks. */
  chunks: number;
}

export interface BlockchainArchiveServiceGetDownloadChunksRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
  /** The data version for the download manifest. */
  dataVersion: number;
  /** The set of chunk indexes to generate download URLs for. */
  chunkIndexes: number[];
}

export interface BlockchainArchiveServiceGetDownloadChunksResponse {
  /** Presigned URLs for the requested download manifest chunk indexes. */
  chunks: ArchiveChunk[];
}

export interface BlockchainArchiveServiceGetUploadSlotsRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
  /** The data version. If not set, will increment the last data version. */
  dataVersion?:
    | number
    | undefined;
  /** Expiry duration of an upload URL (in seconds). */
  urlExpires?:
    | number
    | undefined;
  /** The requested data slot indexes to generate upload URLs for. */
  slotIndexes: number[];
}

export interface BlockchainArchiveServiceGetUploadSlotsResponse {
  /** The data version of the upload slots. */
  dataVersion: number;
  /** A list of slots for uploading archive chunks. */
  slots: UploadSlot[];
}

/** An upload slot for a chunk of data. */
export interface UploadSlot {
  /** The index of this upload slot. */
  index: number;
  /** The persistent key to an archive chunk. */
  key: string;
  /** A temporary, pre-signed upload url for the data. */
  url: string;
}

export interface BlockchainArchiveServicePutDownloadManifestRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
  /** The data version to save. */
  dataVersion: number;
  /** The total size (in bytes) of the uncompressed data. */
  totalSize: number;
  /** The chunk compression type. */
  compression?:
    | Compression
    | undefined;
  /** Metadata for each archive data chunk. */
  chunks: ArchiveChunk[];
}

export interface BlockchainArchiveServicePutDownloadManifestResponse {
}

/** Metadata describing an archive chunk URL and file mapping. */
export interface ArchiveChunk {
  /** The index of this archive chunk. */
  index: number;
  /** The persistent chunk key. */
  key: string;
  /** A temporary pre-signed download url (or none for a blueprint). */
  url?:
    | string
    | undefined;
  /** The checksum of the chunk data. */
  checksum:
    | Checksum
    | undefined;
  /** The chunk data size (in bytes). */
  size: number;
  /** Mappings from chunks to file paths. */
  destinations: ChunkTarget[];
}

/** The target file for a decompressed data chunk. */
export interface ChunkTarget {
  /** The relative file path. */
  path: string;
  /** The start position of the data bytes in the target file. */
  positionBytes: number;
  /** The size of the uncompressed chunk data. */
  sizeBytes: number;
}

/** A checksum consisting of a type and value. */
export interface Checksum {
  sha1?: Uint8Array | undefined;
  sha256?: Uint8Array | undefined;
  blake3?: Uint8Array | undefined;
}

/** Type of compression used on chunk data. */
export interface Compression {
  /** ZStandard compression, where the value is the compression level. */
  zstd?: number | undefined;
}

function createBaseBlockchainArchiveServiceGetDownloadMetadataRequest(): BlockchainArchiveServiceGetDownloadMetadataRequest {
  return { id: undefined, network: "", dataVersion: undefined };
}

export const BlockchainArchiveServiceGetDownloadMetadataRequest = {
  encode(
    message: BlockchainArchiveServiceGetDownloadMetadataRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.dataVersion !== undefined) {
      writer.uint32(24).uint64(message.dataVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetDownloadMetadataRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetDownloadMetadataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.network = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dataVersion = longToNumber(reader.uint64() as Long);
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
    base?: DeepPartial<BlockchainArchiveServiceGetDownloadMetadataRequest>,
  ): BlockchainArchiveServiceGetDownloadMetadataRequest {
    return BlockchainArchiveServiceGetDownloadMetadataRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetDownloadMetadataRequest>,
  ): BlockchainArchiveServiceGetDownloadMetadataRequest {
    const message = createBaseBlockchainArchiveServiceGetDownloadMetadataRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    message.dataVersion = object.dataVersion ?? undefined;
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetDownloadMetadataResponse(): BlockchainArchiveServiceGetDownloadMetadataResponse {
  return { dataVersion: 0, totalSize: 0, compression: undefined, chunks: 0 };
}

export const BlockchainArchiveServiceGetDownloadMetadataResponse = {
  encode(
    message: BlockchainArchiveServiceGetDownloadMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.dataVersion !== 0) {
      writer.uint32(8).uint64(message.dataVersion);
    }
    if (message.totalSize !== 0) {
      writer.uint32(16).uint64(message.totalSize);
    }
    if (message.compression !== undefined) {
      Compression.encode(message.compression, writer.uint32(26).fork()).ldelim();
    }
    if (message.chunks !== 0) {
      writer.uint32(32).uint32(message.chunks);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetDownloadMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetDownloadMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dataVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalSize = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.compression = Compression.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.chunks = reader.uint32();
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
    base?: DeepPartial<BlockchainArchiveServiceGetDownloadMetadataResponse>,
  ): BlockchainArchiveServiceGetDownloadMetadataResponse {
    return BlockchainArchiveServiceGetDownloadMetadataResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetDownloadMetadataResponse>,
  ): BlockchainArchiveServiceGetDownloadMetadataResponse {
    const message = createBaseBlockchainArchiveServiceGetDownloadMetadataResponse();
    message.dataVersion = object.dataVersion ?? 0;
    message.totalSize = object.totalSize ?? 0;
    message.compression = (object.compression !== undefined && object.compression !== null)
      ? Compression.fromPartial(object.compression)
      : undefined;
    message.chunks = object.chunks ?? 0;
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetDownloadChunksRequest(): BlockchainArchiveServiceGetDownloadChunksRequest {
  return { id: undefined, network: "", dataVersion: 0, chunkIndexes: [] };
}

export const BlockchainArchiveServiceGetDownloadChunksRequest = {
  encode(
    message: BlockchainArchiveServiceGetDownloadChunksRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.dataVersion !== 0) {
      writer.uint32(24).uint64(message.dataVersion);
    }
    writer.uint32(34).fork();
    for (const v of message.chunkIndexes) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetDownloadChunksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetDownloadChunksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.network = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dataVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag === 32) {
            message.chunkIndexes.push(reader.uint32());

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.chunkIndexes.push(reader.uint32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<BlockchainArchiveServiceGetDownloadChunksRequest>,
  ): BlockchainArchiveServiceGetDownloadChunksRequest {
    return BlockchainArchiveServiceGetDownloadChunksRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetDownloadChunksRequest>,
  ): BlockchainArchiveServiceGetDownloadChunksRequest {
    const message = createBaseBlockchainArchiveServiceGetDownloadChunksRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    message.dataVersion = object.dataVersion ?? 0;
    message.chunkIndexes = object.chunkIndexes?.map((e) => e) || [];
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetDownloadChunksResponse(): BlockchainArchiveServiceGetDownloadChunksResponse {
  return { chunks: [] };
}

export const BlockchainArchiveServiceGetDownloadChunksResponse = {
  encode(
    message: BlockchainArchiveServiceGetDownloadChunksResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.chunks) {
      ArchiveChunk.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetDownloadChunksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetDownloadChunksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chunks.push(ArchiveChunk.decode(reader, reader.uint32()));
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
    base?: DeepPartial<BlockchainArchiveServiceGetDownloadChunksResponse>,
  ): BlockchainArchiveServiceGetDownloadChunksResponse {
    return BlockchainArchiveServiceGetDownloadChunksResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetDownloadChunksResponse>,
  ): BlockchainArchiveServiceGetDownloadChunksResponse {
    const message = createBaseBlockchainArchiveServiceGetDownloadChunksResponse();
    message.chunks = object.chunks?.map((e) => ArchiveChunk.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetUploadSlotsRequest(): BlockchainArchiveServiceGetUploadSlotsRequest {
  return { id: undefined, network: "", dataVersion: undefined, urlExpires: undefined, slotIndexes: [] };
}

export const BlockchainArchiveServiceGetUploadSlotsRequest = {
  encode(message: BlockchainArchiveServiceGetUploadSlotsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.dataVersion !== undefined) {
      writer.uint32(24).uint64(message.dataVersion);
    }
    if (message.urlExpires !== undefined) {
      writer.uint32(32).uint32(message.urlExpires);
    }
    writer.uint32(42).fork();
    for (const v of message.slotIndexes) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetUploadSlotsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetUploadSlotsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.network = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dataVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.urlExpires = reader.uint32();
          continue;
        case 5:
          if (tag === 40) {
            message.slotIndexes.push(reader.uint32());

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.slotIndexes.push(reader.uint32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<BlockchainArchiveServiceGetUploadSlotsRequest>,
  ): BlockchainArchiveServiceGetUploadSlotsRequest {
    return BlockchainArchiveServiceGetUploadSlotsRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetUploadSlotsRequest>,
  ): BlockchainArchiveServiceGetUploadSlotsRequest {
    const message = createBaseBlockchainArchiveServiceGetUploadSlotsRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    message.dataVersion = object.dataVersion ?? undefined;
    message.urlExpires = object.urlExpires ?? undefined;
    message.slotIndexes = object.slotIndexes?.map((e) => e) || [];
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetUploadSlotsResponse(): BlockchainArchiveServiceGetUploadSlotsResponse {
  return { dataVersion: 0, slots: [] };
}

export const BlockchainArchiveServiceGetUploadSlotsResponse = {
  encode(
    message: BlockchainArchiveServiceGetUploadSlotsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.dataVersion !== 0) {
      writer.uint32(8).uint64(message.dataVersion);
    }
    for (const v of message.slots) {
      UploadSlot.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetUploadSlotsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetUploadSlotsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.dataVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.slots.push(UploadSlot.decode(reader, reader.uint32()));
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
    base?: DeepPartial<BlockchainArchiveServiceGetUploadSlotsResponse>,
  ): BlockchainArchiveServiceGetUploadSlotsResponse {
    return BlockchainArchiveServiceGetUploadSlotsResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetUploadSlotsResponse>,
  ): BlockchainArchiveServiceGetUploadSlotsResponse {
    const message = createBaseBlockchainArchiveServiceGetUploadSlotsResponse();
    message.dataVersion = object.dataVersion ?? 0;
    message.slots = object.slots?.map((e) => UploadSlot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUploadSlot(): UploadSlot {
  return { index: 0, key: "", url: "" };
}

export const UploadSlot = {
  encode(message: UploadSlot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadSlot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadSlot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.uint32();
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

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UploadSlot>): UploadSlot {
    return UploadSlot.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UploadSlot>): UploadSlot {
    const message = createBaseUploadSlot();
    message.index = object.index ?? 0;
    message.key = object.key ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseBlockchainArchiveServicePutDownloadManifestRequest(): BlockchainArchiveServicePutDownloadManifestRequest {
  return { id: undefined, network: "", dataVersion: 0, totalSize: 0, compression: undefined, chunks: [] };
}

export const BlockchainArchiveServicePutDownloadManifestRequest = {
  encode(
    message: BlockchainArchiveServicePutDownloadManifestRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    if (message.dataVersion !== 0) {
      writer.uint32(24).uint64(message.dataVersion);
    }
    if (message.totalSize !== 0) {
      writer.uint32(32).uint64(message.totalSize);
    }
    if (message.compression !== undefined) {
      Compression.encode(message.compression, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.chunks) {
      ArchiveChunk.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServicePutDownloadManifestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServicePutDownloadManifestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.network = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.dataVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.totalSize = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.compression = Compression.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.chunks.push(ArchiveChunk.decode(reader, reader.uint32()));
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
    base?: DeepPartial<BlockchainArchiveServicePutDownloadManifestRequest>,
  ): BlockchainArchiveServicePutDownloadManifestRequest {
    return BlockchainArchiveServicePutDownloadManifestRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServicePutDownloadManifestRequest>,
  ): BlockchainArchiveServicePutDownloadManifestRequest {
    const message = createBaseBlockchainArchiveServicePutDownloadManifestRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    message.dataVersion = object.dataVersion ?? 0;
    message.totalSize = object.totalSize ?? 0;
    message.compression = (object.compression !== undefined && object.compression !== null)
      ? Compression.fromPartial(object.compression)
      : undefined;
    message.chunks = object.chunks?.map((e) => ArchiveChunk.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockchainArchiveServicePutDownloadManifestResponse(): BlockchainArchiveServicePutDownloadManifestResponse {
  return {};
}

export const BlockchainArchiveServicePutDownloadManifestResponse = {
  encode(_: BlockchainArchiveServicePutDownloadManifestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServicePutDownloadManifestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServicePutDownloadManifestResponse();
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
    base?: DeepPartial<BlockchainArchiveServicePutDownloadManifestResponse>,
  ): BlockchainArchiveServicePutDownloadManifestResponse {
    return BlockchainArchiveServicePutDownloadManifestResponse.fromPartial(base ?? {});
  },

  fromPartial(
    _: DeepPartial<BlockchainArchiveServicePutDownloadManifestResponse>,
  ): BlockchainArchiveServicePutDownloadManifestResponse {
    const message = createBaseBlockchainArchiveServicePutDownloadManifestResponse();
    return message;
  },
};

function createBaseArchiveChunk(): ArchiveChunk {
  return { index: 0, key: "", url: undefined, checksum: undefined, size: 0, destinations: [] };
}

export const ArchiveChunk = {
  encode(message: ArchiveChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.url !== undefined) {
      writer.uint32(26).string(message.url);
    }
    if (message.checksum !== undefined) {
      Checksum.encode(message.checksum, writer.uint32(34).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(40).uint64(message.size);
    }
    for (const v of message.destinations) {
      ChunkTarget.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArchiveChunk {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchiveChunk();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.index = reader.uint32();
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

          message.url = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.checksum = Checksum.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.size = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.destinations.push(ChunkTarget.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ArchiveChunk>): ArchiveChunk {
    return ArchiveChunk.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ArchiveChunk>): ArchiveChunk {
    const message = createBaseArchiveChunk();
    message.index = object.index ?? 0;
    message.key = object.key ?? "";
    message.url = object.url ?? undefined;
    message.checksum = (object.checksum !== undefined && object.checksum !== null)
      ? Checksum.fromPartial(object.checksum)
      : undefined;
    message.size = object.size ?? 0;
    message.destinations = object.destinations?.map((e) => ChunkTarget.fromPartial(e)) || [];
    return message;
  },
};

function createBaseChunkTarget(): ChunkTarget {
  return { path: "", positionBytes: 0, sizeBytes: 0 };
}

export const ChunkTarget = {
  encode(message: ChunkTarget, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.positionBytes !== 0) {
      writer.uint32(16).uint64(message.positionBytes);
    }
    if (message.sizeBytes !== 0) {
      writer.uint32(24).uint64(message.sizeBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChunkTarget {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChunkTarget();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.path = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.positionBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sizeBytes = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ChunkTarget>): ChunkTarget {
    return ChunkTarget.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ChunkTarget>): ChunkTarget {
    const message = createBaseChunkTarget();
    message.path = object.path ?? "";
    message.positionBytes = object.positionBytes ?? 0;
    message.sizeBytes = object.sizeBytes ?? 0;
    return message;
  },
};

function createBaseChecksum(): Checksum {
  return { sha1: undefined, sha256: undefined, blake3: undefined };
}

export const Checksum = {
  encode(message: Checksum, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sha1 !== undefined) {
      writer.uint32(10).bytes(message.sha1);
    }
    if (message.sha256 !== undefined) {
      writer.uint32(18).bytes(message.sha256);
    }
    if (message.blake3 !== undefined) {
      writer.uint32(26).bytes(message.blake3);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Checksum {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChecksum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sha1 = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sha256 = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.blake3 = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Checksum>): Checksum {
    return Checksum.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Checksum>): Checksum {
    const message = createBaseChecksum();
    message.sha1 = object.sha1 ?? undefined;
    message.sha256 = object.sha256 ?? undefined;
    message.blake3 = object.blake3 ?? undefined;
    return message;
  },
};

function createBaseCompression(): Compression {
  return { zstd: undefined };
}

export const Compression = {
  encode(message: Compression, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.zstd !== undefined) {
      writer.uint32(8).int32(message.zstd);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Compression {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompression();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.zstd = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Compression>): Compression {
    return Compression.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Compression>): Compression {
    const message = createBaseCompression();
    message.zstd = object.zstd ?? undefined;
    return message;
  },
};

/** Manage blockchain data archives. */
export type BlockchainArchiveServiceDefinition = typeof BlockchainArchiveServiceDefinition;
export const BlockchainArchiveServiceDefinition = {
  name: "BlockchainArchiveService",
  fullName: "blockjoy.v1.BlockchainArchiveService",
  methods: {
    /** Get the download manifest metadata for a specific image and blockchain network. */
    getDownloadMetadata: {
      name: "GetDownloadMetadata",
      requestType: BlockchainArchiveServiceGetDownloadMetadataRequest,
      requestStream: false,
      responseType: BlockchainArchiveServiceGetDownloadMetadataResponse,
      responseStream: false,
      options: {},
    },
    /** Get presigned download URLs for download manifest data chunks. */
    getDownloadChunks: {
      name: "GetDownloadChunks",
      requestType: BlockchainArchiveServiceGetDownloadChunksRequest,
      requestStream: false,
      responseType: BlockchainArchiveServiceGetDownloadChunksResponse,
      responseStream: false,
      options: {},
    },
    /** Get presigned upload URLs for blockchain archive data chunks. */
    getUploadSlots: {
      name: "GetUploadSlots",
      requestType: BlockchainArchiveServiceGetUploadSlotsRequest,
      requestStream: false,
      responseType: BlockchainArchiveServiceGetUploadSlotsResponse,
      responseStream: false,
      options: {},
    },
    /** Put a new download manifest for retrieval with `GetDownloadManifest`. */
    putDownloadManifest: {
      name: "PutDownloadManifest",
      requestType: BlockchainArchiveServicePutDownloadManifestRequest,
      requestStream: false,
      responseType: BlockchainArchiveServicePutDownloadManifestResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface BlockchainArchiveServiceImplementation<CallContextExt = {}> {
  /** Get the download manifest metadata for a specific image and blockchain network. */
  getDownloadMetadata(
    request: BlockchainArchiveServiceGetDownloadMetadataRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServiceGetDownloadMetadataResponse>>;
  /** Get presigned download URLs for download manifest data chunks. */
  getDownloadChunks(
    request: BlockchainArchiveServiceGetDownloadChunksRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServiceGetDownloadChunksResponse>>;
  /** Get presigned upload URLs for blockchain archive data chunks. */
  getUploadSlots(
    request: BlockchainArchiveServiceGetUploadSlotsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServiceGetUploadSlotsResponse>>;
  /** Put a new download manifest for retrieval with `GetDownloadManifest`. */
  putDownloadManifest(
    request: BlockchainArchiveServicePutDownloadManifestRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServicePutDownloadManifestResponse>>;
}

export interface BlockchainArchiveServiceClient<CallOptionsExt = {}> {
  /** Get the download manifest metadata for a specific image and blockchain network. */
  getDownloadMetadata(
    request: DeepPartial<BlockchainArchiveServiceGetDownloadMetadataRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServiceGetDownloadMetadataResponse>;
  /** Get presigned download URLs for download manifest data chunks. */
  getDownloadChunks(
    request: DeepPartial<BlockchainArchiveServiceGetDownloadChunksRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServiceGetDownloadChunksResponse>;
  /** Get presigned upload URLs for blockchain archive data chunks. */
  getUploadSlots(
    request: DeepPartial<BlockchainArchiveServiceGetUploadSlotsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServiceGetUploadSlotsResponse>;
  /** Put a new download manifest for retrieval with `GetDownloadManifest`. */
  putDownloadManifest(
    request: DeepPartial<BlockchainArchiveServicePutDownloadManifestRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServicePutDownloadManifestResponse>;
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
