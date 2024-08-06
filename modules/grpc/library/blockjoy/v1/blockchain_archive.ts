/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { ImageIdentifier } from "../common/v1/image";

export const protobufPackage = "blockjoy.v1";

export interface BlockchainArchiveServiceHasBlockchainArchiveRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
}

export interface BlockchainArchiveServiceHasBlockchainArchiveResponse {
  available: boolean;
}

export interface BlockchainArchiveServiceGetDownloadManifestRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
}

export interface BlockchainArchiveServiceGetDownloadManifestResponse {
  manifest: DownloadManifest | undefined;
}

/** Pre-signed upload URL slots for the blockchain archive data chunks. */
export interface BlockchainArchiveServiceGetUploadManifestRequest {
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
  /** Requested number of upload URL slots. */
  slots: number;
  /** Expiry duration of an upload URL (in seconds). */
  urlExpires?: number | undefined;
}

export interface BlockchainArchiveServiceGetUploadManifestResponse {
  manifest: UploadManifest | undefined;
}

export interface BlockchainArchiveServicePutDownloadManifestRequest {
  /** The archive image identifier. */
  id:
    | ImageIdentifier
    | undefined;
  /** The network name (e.g. "main", "testnet"). */
  network: string;
  /** The download manifest to store. */
  manifest: DownloadManifest | undefined;
}

export interface BlockchainArchiveServicePutDownloadManifestResponse {
}

/** Download manifest with metadata and pointers to archive data chunks. */
export interface DownloadManifest {
  /** Total size of uncompressed data */
  totalSize: number;
  /** Chunk compression type or none */
  compression?:
    | Compression
    | undefined;
  /** Full list of chunks */
  chunks: ArchiveChunk[];
}

/** Metadata describing an archive chunk URL and file mapping. */
export interface ArchiveChunk {
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

/** Upload manifest with slots for uploading archive data chunks. */
export interface UploadManifest {
  /** A list of slots for uploading archive chunks. */
  slots: UploadSlot[];
}

/** An upload slot for a chunk of data. */
export interface UploadSlot {
  /** The persistent key to an archive chunk. */
  key: string;
  /** A temporary, pre-signed upload url for the data. */
  url: string;
}

function createBaseBlockchainArchiveServiceHasBlockchainArchiveRequest(): BlockchainArchiveServiceHasBlockchainArchiveRequest {
  return { id: undefined, network: "" };
}

export const BlockchainArchiveServiceHasBlockchainArchiveRequest = {
  encode(
    message: BlockchainArchiveServiceHasBlockchainArchiveRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceHasBlockchainArchiveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceHasBlockchainArchiveRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<BlockchainArchiveServiceHasBlockchainArchiveRequest>,
  ): BlockchainArchiveServiceHasBlockchainArchiveRequest {
    return BlockchainArchiveServiceHasBlockchainArchiveRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceHasBlockchainArchiveRequest>,
  ): BlockchainArchiveServiceHasBlockchainArchiveRequest {
    const message = createBaseBlockchainArchiveServiceHasBlockchainArchiveRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    return message;
  },
};

function createBaseBlockchainArchiveServiceHasBlockchainArchiveResponse(): BlockchainArchiveServiceHasBlockchainArchiveResponse {
  return { available: false };
}

export const BlockchainArchiveServiceHasBlockchainArchiveResponse = {
  encode(
    message: BlockchainArchiveServiceHasBlockchainArchiveResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.available === true) {
      writer.uint32(8).bool(message.available);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceHasBlockchainArchiveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceHasBlockchainArchiveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.available = reader.bool();
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
    base?: DeepPartial<BlockchainArchiveServiceHasBlockchainArchiveResponse>,
  ): BlockchainArchiveServiceHasBlockchainArchiveResponse {
    return BlockchainArchiveServiceHasBlockchainArchiveResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceHasBlockchainArchiveResponse>,
  ): BlockchainArchiveServiceHasBlockchainArchiveResponse {
    const message = createBaseBlockchainArchiveServiceHasBlockchainArchiveResponse();
    message.available = object.available ?? false;
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetDownloadManifestRequest(): BlockchainArchiveServiceGetDownloadManifestRequest {
  return { id: undefined, network: "" };
}

export const BlockchainArchiveServiceGetDownloadManifestRequest = {
  encode(
    message: BlockchainArchiveServiceGetDownloadManifestRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined) {
      ImageIdentifier.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(18).string(message.network);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetDownloadManifestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetDownloadManifestRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(
    base?: DeepPartial<BlockchainArchiveServiceGetDownloadManifestRequest>,
  ): BlockchainArchiveServiceGetDownloadManifestRequest {
    return BlockchainArchiveServiceGetDownloadManifestRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetDownloadManifestRequest>,
  ): BlockchainArchiveServiceGetDownloadManifestRequest {
    const message = createBaseBlockchainArchiveServiceGetDownloadManifestRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetDownloadManifestResponse(): BlockchainArchiveServiceGetDownloadManifestResponse {
  return { manifest: undefined };
}

export const BlockchainArchiveServiceGetDownloadManifestResponse = {
  encode(
    message: BlockchainArchiveServiceGetDownloadManifestResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.manifest !== undefined) {
      DownloadManifest.encode(message.manifest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetDownloadManifestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetDownloadManifestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.manifest = DownloadManifest.decode(reader, reader.uint32());
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
    base?: DeepPartial<BlockchainArchiveServiceGetDownloadManifestResponse>,
  ): BlockchainArchiveServiceGetDownloadManifestResponse {
    return BlockchainArchiveServiceGetDownloadManifestResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetDownloadManifestResponse>,
  ): BlockchainArchiveServiceGetDownloadManifestResponse {
    const message = createBaseBlockchainArchiveServiceGetDownloadManifestResponse();
    message.manifest = (object.manifest !== undefined && object.manifest !== null)
      ? DownloadManifest.fromPartial(object.manifest)
      : undefined;
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetUploadManifestRequest(): BlockchainArchiveServiceGetUploadManifestRequest {
  return { id: undefined, network: "", dataVersion: undefined, slots: 0, urlExpires: undefined };
}

export const BlockchainArchiveServiceGetUploadManifestRequest = {
  encode(
    message: BlockchainArchiveServiceGetUploadManifestRequest,
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
    if (message.slots !== 0) {
      writer.uint32(32).uint32(message.slots);
    }
    if (message.urlExpires !== undefined) {
      writer.uint32(40).uint32(message.urlExpires);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetUploadManifestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetUploadManifestRequest();
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

          message.slots = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.urlExpires = reader.uint32();
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
    base?: DeepPartial<BlockchainArchiveServiceGetUploadManifestRequest>,
  ): BlockchainArchiveServiceGetUploadManifestRequest {
    return BlockchainArchiveServiceGetUploadManifestRequest.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetUploadManifestRequest>,
  ): BlockchainArchiveServiceGetUploadManifestRequest {
    const message = createBaseBlockchainArchiveServiceGetUploadManifestRequest();
    message.id = (object.id !== undefined && object.id !== null) ? ImageIdentifier.fromPartial(object.id) : undefined;
    message.network = object.network ?? "";
    message.dataVersion = object.dataVersion ?? undefined;
    message.slots = object.slots ?? 0;
    message.urlExpires = object.urlExpires ?? undefined;
    return message;
  },
};

function createBaseBlockchainArchiveServiceGetUploadManifestResponse(): BlockchainArchiveServiceGetUploadManifestResponse {
  return { manifest: undefined };
}

export const BlockchainArchiveServiceGetUploadManifestResponse = {
  encode(
    message: BlockchainArchiveServiceGetUploadManifestResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.manifest !== undefined) {
      UploadManifest.encode(message.manifest, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainArchiveServiceGetUploadManifestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainArchiveServiceGetUploadManifestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.manifest = UploadManifest.decode(reader, reader.uint32());
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
    base?: DeepPartial<BlockchainArchiveServiceGetUploadManifestResponse>,
  ): BlockchainArchiveServiceGetUploadManifestResponse {
    return BlockchainArchiveServiceGetUploadManifestResponse.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<BlockchainArchiveServiceGetUploadManifestResponse>,
  ): BlockchainArchiveServiceGetUploadManifestResponse {
    const message = createBaseBlockchainArchiveServiceGetUploadManifestResponse();
    message.manifest = (object.manifest !== undefined && object.manifest !== null)
      ? UploadManifest.fromPartial(object.manifest)
      : undefined;
    return message;
  },
};

function createBaseBlockchainArchiveServicePutDownloadManifestRequest(): BlockchainArchiveServicePutDownloadManifestRequest {
  return { id: undefined, network: "", manifest: undefined };
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
    if (message.manifest !== undefined) {
      DownloadManifest.encode(message.manifest, writer.uint32(26).fork()).ldelim();
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
          if (tag !== 26) {
            break;
          }

          message.manifest = DownloadManifest.decode(reader, reader.uint32());
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
    message.manifest = (object.manifest !== undefined && object.manifest !== null)
      ? DownloadManifest.fromPartial(object.manifest)
      : undefined;
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

function createBaseDownloadManifest(): DownloadManifest {
  return { totalSize: 0, compression: undefined, chunks: [] };
}

export const DownloadManifest = {
  encode(message: DownloadManifest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalSize !== 0) {
      writer.uint32(8).uint64(message.totalSize);
    }
    if (message.compression !== undefined) {
      Compression.encode(message.compression, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.chunks) {
      ArchiveChunk.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DownloadManifest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadManifest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalSize = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.compression = Compression.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  create(base?: DeepPartial<DownloadManifest>): DownloadManifest {
    return DownloadManifest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DownloadManifest>): DownloadManifest {
    const message = createBaseDownloadManifest();
    message.totalSize = object.totalSize ?? 0;
    message.compression = (object.compression !== undefined && object.compression !== null)
      ? Compression.fromPartial(object.compression)
      : undefined;
    message.chunks = object.chunks?.map((e) => ArchiveChunk.fromPartial(e)) || [];
    return message;
  },
};

function createBaseArchiveChunk(): ArchiveChunk {
  return { key: "", url: undefined, checksum: undefined, size: 0, destinations: [] };
}

export const ArchiveChunk = {
  encode(message: ArchiveChunk, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.url !== undefined) {
      writer.uint32(18).string(message.url);
    }
    if (message.checksum !== undefined) {
      Checksum.encode(message.checksum, writer.uint32(26).fork()).ldelim();
    }
    if (message.size !== 0) {
      writer.uint32(32).uint64(message.size);
    }
    for (const v of message.destinations) {
      ChunkTarget.encode(v!, writer.uint32(42).fork()).ldelim();
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
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.checksum = Checksum.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.size = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
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

function createBaseUploadManifest(): UploadManifest {
  return { slots: [] };
}

export const UploadManifest = {
  encode(message: UploadManifest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.slots) {
      UploadSlot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UploadManifest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUploadManifest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  create(base?: DeepPartial<UploadManifest>): UploadManifest {
    return UploadManifest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UploadManifest>): UploadManifest {
    const message = createBaseUploadManifest();
    message.slots = object.slots?.map((e) => UploadSlot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUploadSlot(): UploadSlot {
  return { key: "", url: "" };
}

export const UploadSlot = {
  encode(message: UploadSlot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
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
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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
    message.key = object.key ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

/** Manage blockchain data archives. */
export type BlockchainArchiveServiceDefinition = typeof BlockchainArchiveServiceDefinition;
export const BlockchainArchiveServiceDefinition = {
  name: "BlockchainArchiveService",
  fullName: "blockjoy.v1.BlockchainArchiveService",
  methods: {
    /** Get the download manifest for a specific image and blockchain network. */
    hasBlockchainArchive: {
      name: "HasBlockchainArchive",
      requestType: BlockchainArchiveServiceHasBlockchainArchiveRequest,
      requestStream: false,
      responseType: BlockchainArchiveServiceHasBlockchainArchiveResponse,
      responseStream: false,
      options: {},
    },
    /** Get the download manifest for a specific image and blockchain network. */
    getDownloadManifest: {
      name: "GetDownloadManifest",
      requestType: BlockchainArchiveServiceGetDownloadManifestRequest,
      requestStream: false,
      responseType: BlockchainArchiveServiceGetDownloadManifestResponse,
      responseStream: false,
      options: {},
    },
    /** Get an upload manifest for a specific image and blockchain network. */
    getUploadManifest: {
      name: "GetUploadManifest",
      requestType: BlockchainArchiveServiceGetUploadManifestRequest,
      requestStream: false,
      responseType: BlockchainArchiveServiceGetUploadManifestResponse,
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
  /** Get the download manifest for a specific image and blockchain network. */
  hasBlockchainArchive(
    request: BlockchainArchiveServiceHasBlockchainArchiveRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServiceHasBlockchainArchiveResponse>>;
  /** Get the download manifest for a specific image and blockchain network. */
  getDownloadManifest(
    request: BlockchainArchiveServiceGetDownloadManifestRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServiceGetDownloadManifestResponse>>;
  /** Get an upload manifest for a specific image and blockchain network. */
  getUploadManifest(
    request: BlockchainArchiveServiceGetUploadManifestRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServiceGetUploadManifestResponse>>;
  /** Put a new download manifest for retrieval with `GetDownloadManifest`. */
  putDownloadManifest(
    request: BlockchainArchiveServicePutDownloadManifestRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BlockchainArchiveServicePutDownloadManifestResponse>>;
}

export interface BlockchainArchiveServiceClient<CallOptionsExt = {}> {
  /** Get the download manifest for a specific image and blockchain network. */
  hasBlockchainArchive(
    request: DeepPartial<BlockchainArchiveServiceHasBlockchainArchiveRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServiceHasBlockchainArchiveResponse>;
  /** Get the download manifest for a specific image and blockchain network. */
  getDownloadManifest(
    request: DeepPartial<BlockchainArchiveServiceGetDownloadManifestRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServiceGetDownloadManifestResponse>;
  /** Get an upload manifest for a specific image and blockchain network. */
  getUploadManifest(
    request: DeepPartial<BlockchainArchiveServiceGetUploadManifestRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServiceGetUploadManifestResponse>;
  /** Put a new download manifest for retrieval with `GetDownloadManifest`. */
  putDownloadManifest(
    request: DeepPartial<BlockchainArchiveServicePutDownloadManifestRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BlockchainArchiveServicePutDownloadManifestResponse>;
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
