/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../google/protobuf/empty";
import { Timestamp } from "../../google/protobuf/timestamp";
import { FirewallConfig, RamdiskConfig } from "../common/v1/config";
import { ProtocolVersionKey, UiType, Visibility } from "../common/v1/protocol";

export const protobufPackage = "blockjoy.v1";

/** An image build for some protocol version. */
export interface Image {
  imageId: string;
  protocolVersionId: string;
  orgId?: string | undefined;
  buildVersion: number;
  imageUri: string;
  description?: string | undefined;
  properties: ImageProperty[];
  firewall: FirewallConfig | undefined;
  minCpuCores: number;
  minMemoryBytes: number;
  minDiskBytes: number;
  ramdisks: RamdiskConfig[];
  visibility: Visibility;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

/** A config property of an image. */
export interface ImageProperty {
  /** The unique identifier to this property. */
  imagePropertyId: string;
  /** The applicable image for this property. */
  imageId: string;
  /** The lookup key for this property. */
  key: string;
  /** A repeated key to group switches and enums. */
  keyGroup?:
    | string
    | undefined;
  /** For repeated key groups, one value must be the default. */
  isGroupDefault?:
    | boolean
    | undefined;
  /** Whether this property requires different archive data. */
  newArchive: boolean;
  /** The default value for this property. */
  defaultValue: string;
  /** Whether the value may change at runtime. */
  dynamicValue: boolean;
  /** How this field should be displayed in the UI. */
  uiType: UiType;
  /** The display name of this property. */
  displayName?:
    | string
    | undefined;
  /** The display name of the property group. */
  displayGroup?:
    | string
    | undefined;
  /** Additional information describing this property. */
  description?:
    | string
    | undefined;
  /** Additional CPU cores needed when using this property. */
  addCpuCores?:
    | number
    | undefined;
  /** Additional memory bytes needed when using this property. */
  addMemoryBytes?:
    | number
    | undefined;
  /** Additional disk bytes needed when using this property. */
  addDiskBytes?: number | undefined;
}

/** An identifier to archive data in external storage. */
export interface Archive {
  archiveId: string;
  imageId: string;
  storeId: string;
  imagePropertyIds: string[];
}

export interface ImageServiceAddImageRequest {
  /** The protocol version id to add this image to. */
  protocolVersionId: string;
  /** Whether this is a public or org-image version. */
  orgId?:
    | string
    | undefined;
  /** An identifier to where the image is stored. */
  imageUri: string;
  /** A readable description of this image. */
  description?:
    | string
    | undefined;
  /** The set of properties for configuring this image. */
  properties: AddImageProperty[];
  /** The firewall config for this image. */
  firewall:
    | FirewallConfig
    | undefined;
  /** The minimum CPU cores nodes for this image will launch with. */
  minCpuCores: number;
  /** The minimum memory nodes for this image will launch with. */
  minMemoryBytes: number;
  /** The minimum disk space nodes for this image will launch with. */
  minDiskBytes: number;
  /** The set of attached ramdisks. */
  ramdisks: RamdiskConfig[];
  /** Point each combination of new_archive properties to the correct data. */
  archivePointers: ArchivePointer[];
}

export interface AddImageProperty {
  /** The lookup key for this property (in lower-kebab-case). */
  key: string;
  /** A repeated key to group switches and enums. */
  keyGroup?:
    | string
    | undefined;
  /** For repeated key groups, one value must be the default. */
  isGroupDefault?:
    | boolean
    | undefined;
  /** Whether this property requires different archive data. */
  newArchive: boolean;
  /** The default value for this property. */
  defaultValue: string;
  /** Whether the value may change at runtime. */
  dynamicValue: boolean;
  /** How this field should be displayed in the UI. */
  uiType: UiType;
  /** The display name of this property. */
  displayName?:
    | string
    | undefined;
  /** The display name of the property group. */
  displayGroup?:
    | string
    | undefined;
  /** Additional information describing this property. */
  description?:
    | string
    | undefined;
  /** Additional CPU cores needed when using this property. */
  addCpuCores?:
    | number
    | undefined;
  /** Additional memory bytes needed when using this property. */
  addMemoryBytes?:
    | number
    | undefined;
  /** Additional disk bytes needed when using this property. */
  addDiskBytes?: number | undefined;
}

export interface ArchivePointer {
  /** The combination of new_archive property keys to lookup an archive. */
  newArchiveKeys: string[];
  /** Use this store id. */
  storeId?:
    | string
    | undefined;
  /** This combination of new_archive properties is disallowed. */
  disallowed?: Empty | undefined;
}

export interface ImageServiceAddImageResponse {
  image: Image | undefined;
  archives: Archive[];
}

export interface ImageServiceGetImageRequest {
  /** The version key to get the latest image of. */
  versionKey:
    | ProtocolVersionKey
    | undefined;
  /** The org id for private protocols, versions or images. */
  orgId?:
    | string
    | undefined;
  /** A semantic protocol version, or none for latest. */
  semanticVersion?:
    | string
    | undefined;
  /** An image build version, or none for latest. */
  buildVersion?: number | undefined;
}

export interface ImageServiceGetImageResponse {
  image: Image | undefined;
}

export interface ImageServiceListArchivesRequest {
  imageId: string;
  orgId?: string | undefined;
}

export interface ImageServiceListArchivesResponse {
  archives: Archive[];
}

export interface ImageServiceUpdateArchiveRequest {
  archiveId: string;
  storeId?: string | undefined;
}

export interface ImageServiceUpdateArchiveResponse {
  archive: Archive | undefined;
}

export interface ImageServiceUpdateImageRequest {
  imageId: string;
  visibility?: Visibility | undefined;
}

export interface ImageServiceUpdateImageResponse {
  image: Image | undefined;
}

function createBaseImage(): Image {
  return {
    imageId: "",
    protocolVersionId: "",
    orgId: undefined,
    buildVersion: 0,
    imageUri: "",
    description: undefined,
    properties: [],
    firewall: undefined,
    minCpuCores: 0,
    minMemoryBytes: 0,
    minDiskBytes: 0,
    ramdisks: [],
    visibility: 0,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Image = {
  encode(message: Image, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imageId !== "") {
      writer.uint32(10).string(message.imageId);
    }
    if (message.protocolVersionId !== "") {
      writer.uint32(18).string(message.protocolVersionId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(26).string(message.orgId);
    }
    if (message.buildVersion !== 0) {
      writer.uint32(32).uint64(message.buildVersion);
    }
    if (message.imageUri !== "") {
      writer.uint32(42).string(message.imageUri);
    }
    if (message.description !== undefined) {
      writer.uint32(50).string(message.description);
    }
    for (const v of message.properties) {
      ImageProperty.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.firewall !== undefined) {
      FirewallConfig.encode(message.firewall, writer.uint32(66).fork()).ldelim();
    }
    if (message.minCpuCores !== 0) {
      writer.uint32(72).uint64(message.minCpuCores);
    }
    if (message.minMemoryBytes !== 0) {
      writer.uint32(80).uint64(message.minMemoryBytes);
    }
    if (message.minDiskBytes !== 0) {
      writer.uint32(88).uint64(message.minDiskBytes);
    }
    for (const v of message.ramdisks) {
      RamdiskConfig.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.visibility !== 0) {
      writer.uint32(104).int32(message.visibility);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(114).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Image {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImage();
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

          message.protocolVersionId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.buildVersion = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.imageUri = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.description = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.properties.push(ImageProperty.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.firewall = FirewallConfig.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.minCpuCores = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.minMemoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.minDiskBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.ramdisks.push(RamdiskConfig.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.visibility = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Image>): Image {
    return Image.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Image>): Image {
    const message = createBaseImage();
    message.imageId = object.imageId ?? "";
    message.protocolVersionId = object.protocolVersionId ?? "";
    message.orgId = object.orgId ?? undefined;
    message.buildVersion = object.buildVersion ?? 0;
    message.imageUri = object.imageUri ?? "";
    message.description = object.description ?? undefined;
    message.properties = object.properties?.map((e) => ImageProperty.fromPartial(e)) || [];
    message.firewall = (object.firewall !== undefined && object.firewall !== null)
      ? FirewallConfig.fromPartial(object.firewall)
      : undefined;
    message.minCpuCores = object.minCpuCores ?? 0;
    message.minMemoryBytes = object.minMemoryBytes ?? 0;
    message.minDiskBytes = object.minDiskBytes ?? 0;
    message.ramdisks = object.ramdisks?.map((e) => RamdiskConfig.fromPartial(e)) || [];
    message.visibility = object.visibility ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseImageProperty(): ImageProperty {
  return {
    imagePropertyId: "",
    imageId: "",
    key: "",
    keyGroup: undefined,
    isGroupDefault: undefined,
    newArchive: false,
    defaultValue: "",
    dynamicValue: false,
    uiType: 0,
    displayName: undefined,
    displayGroup: undefined,
    description: undefined,
    addCpuCores: undefined,
    addMemoryBytes: undefined,
    addDiskBytes: undefined,
  };
}

export const ImageProperty = {
  encode(message: ImageProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imagePropertyId !== "") {
      writer.uint32(10).string(message.imagePropertyId);
    }
    if (message.imageId !== "") {
      writer.uint32(18).string(message.imageId);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.keyGroup !== undefined) {
      writer.uint32(34).string(message.keyGroup);
    }
    if (message.isGroupDefault !== undefined) {
      writer.uint32(40).bool(message.isGroupDefault);
    }
    if (message.newArchive === true) {
      writer.uint32(48).bool(message.newArchive);
    }
    if (message.defaultValue !== "") {
      writer.uint32(58).string(message.defaultValue);
    }
    if (message.dynamicValue === true) {
      writer.uint32(64).bool(message.dynamicValue);
    }
    if (message.uiType !== 0) {
      writer.uint32(72).int32(message.uiType);
    }
    if (message.displayName !== undefined) {
      writer.uint32(82).string(message.displayName);
    }
    if (message.displayGroup !== undefined) {
      writer.uint32(90).string(message.displayGroup);
    }
    if (message.description !== undefined) {
      writer.uint32(98).string(message.description);
    }
    if (message.addCpuCores !== undefined) {
      writer.uint32(104).int64(message.addCpuCores);
    }
    if (message.addMemoryBytes !== undefined) {
      writer.uint32(112).int64(message.addMemoryBytes);
    }
    if (message.addDiskBytes !== undefined) {
      writer.uint32(120).int64(message.addDiskBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageProperty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.imagePropertyId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.imageId = reader.string();
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

          message.keyGroup = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.isGroupDefault = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.newArchive = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.defaultValue = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.dynamicValue = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.uiType = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.displayGroup = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.description = reader.string();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.addCpuCores = longToNumber(reader.int64() as Long);
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.addMemoryBytes = longToNumber(reader.int64() as Long);
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.addDiskBytes = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageProperty>): ImageProperty {
    return ImageProperty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageProperty>): ImageProperty {
    const message = createBaseImageProperty();
    message.imagePropertyId = object.imagePropertyId ?? "";
    message.imageId = object.imageId ?? "";
    message.key = object.key ?? "";
    message.keyGroup = object.keyGroup ?? undefined;
    message.isGroupDefault = object.isGroupDefault ?? undefined;
    message.newArchive = object.newArchive ?? false;
    message.defaultValue = object.defaultValue ?? "";
    message.dynamicValue = object.dynamicValue ?? false;
    message.uiType = object.uiType ?? 0;
    message.displayName = object.displayName ?? undefined;
    message.displayGroup = object.displayGroup ?? undefined;
    message.description = object.description ?? undefined;
    message.addCpuCores = object.addCpuCores ?? undefined;
    message.addMemoryBytes = object.addMemoryBytes ?? undefined;
    message.addDiskBytes = object.addDiskBytes ?? undefined;
    return message;
  },
};

function createBaseArchive(): Archive {
  return { archiveId: "", imageId: "", storeId: "", imagePropertyIds: [] };
}

export const Archive = {
  encode(message: Archive, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.archiveId !== "") {
      writer.uint32(10).string(message.archiveId);
    }
    if (message.imageId !== "") {
      writer.uint32(18).string(message.imageId);
    }
    if (message.storeId !== "") {
      writer.uint32(26).string(message.storeId);
    }
    for (const v of message.imagePropertyIds) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Archive {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.archiveId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.imageId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.storeId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.imagePropertyIds.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Archive>): Archive {
    return Archive.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Archive>): Archive {
    const message = createBaseArchive();
    message.archiveId = object.archiveId ?? "";
    message.imageId = object.imageId ?? "";
    message.storeId = object.storeId ?? "";
    message.imagePropertyIds = object.imagePropertyIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseImageServiceAddImageRequest(): ImageServiceAddImageRequest {
  return {
    protocolVersionId: "",
    orgId: undefined,
    imageUri: "",
    description: undefined,
    properties: [],
    firewall: undefined,
    minCpuCores: 0,
    minMemoryBytes: 0,
    minDiskBytes: 0,
    ramdisks: [],
    archivePointers: [],
  };
}

export const ImageServiceAddImageRequest = {
  encode(message: ImageServiceAddImageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocolVersionId !== "") {
      writer.uint32(10).string(message.protocolVersionId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.imageUri !== "") {
      writer.uint32(26).string(message.imageUri);
    }
    if (message.description !== undefined) {
      writer.uint32(34).string(message.description);
    }
    for (const v of message.properties) {
      AddImageProperty.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.firewall !== undefined) {
      FirewallConfig.encode(message.firewall, writer.uint32(50).fork()).ldelim();
    }
    if (message.minCpuCores !== 0) {
      writer.uint32(56).uint64(message.minCpuCores);
    }
    if (message.minMemoryBytes !== 0) {
      writer.uint32(64).uint64(message.minMemoryBytes);
    }
    if (message.minDiskBytes !== 0) {
      writer.uint32(72).uint64(message.minDiskBytes);
    }
    for (const v of message.ramdisks) {
      RamdiskConfig.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.archivePointers) {
      ArchivePointer.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceAddImageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceAddImageRequest();
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

          message.imageUri = reader.string();
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

          message.properties.push(AddImageProperty.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.firewall = FirewallConfig.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.minCpuCores = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.minMemoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.minDiskBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.ramdisks.push(RamdiskConfig.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.archivePointers.push(ArchivePointer.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceAddImageRequest>): ImageServiceAddImageRequest {
    return ImageServiceAddImageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceAddImageRequest>): ImageServiceAddImageRequest {
    const message = createBaseImageServiceAddImageRequest();
    message.protocolVersionId = object.protocolVersionId ?? "";
    message.orgId = object.orgId ?? undefined;
    message.imageUri = object.imageUri ?? "";
    message.description = object.description ?? undefined;
    message.properties = object.properties?.map((e) => AddImageProperty.fromPartial(e)) || [];
    message.firewall = (object.firewall !== undefined && object.firewall !== null)
      ? FirewallConfig.fromPartial(object.firewall)
      : undefined;
    message.minCpuCores = object.minCpuCores ?? 0;
    message.minMemoryBytes = object.minMemoryBytes ?? 0;
    message.minDiskBytes = object.minDiskBytes ?? 0;
    message.ramdisks = object.ramdisks?.map((e) => RamdiskConfig.fromPartial(e)) || [];
    message.archivePointers = object.archivePointers?.map((e) => ArchivePointer.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAddImageProperty(): AddImageProperty {
  return {
    key: "",
    keyGroup: undefined,
    isGroupDefault: undefined,
    newArchive: false,
    defaultValue: "",
    dynamicValue: false,
    uiType: 0,
    displayName: undefined,
    displayGroup: undefined,
    description: undefined,
    addCpuCores: undefined,
    addMemoryBytes: undefined,
    addDiskBytes: undefined,
  };
}

export const AddImageProperty = {
  encode(message: AddImageProperty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.keyGroup !== undefined) {
      writer.uint32(18).string(message.keyGroup);
    }
    if (message.isGroupDefault !== undefined) {
      writer.uint32(24).bool(message.isGroupDefault);
    }
    if (message.newArchive === true) {
      writer.uint32(32).bool(message.newArchive);
    }
    if (message.defaultValue !== "") {
      writer.uint32(42).string(message.defaultValue);
    }
    if (message.dynamicValue === true) {
      writer.uint32(48).bool(message.dynamicValue);
    }
    if (message.uiType !== 0) {
      writer.uint32(56).int32(message.uiType);
    }
    if (message.displayName !== undefined) {
      writer.uint32(66).string(message.displayName);
    }
    if (message.displayGroup !== undefined) {
      writer.uint32(74).string(message.displayGroup);
    }
    if (message.description !== undefined) {
      writer.uint32(82).string(message.description);
    }
    if (message.addCpuCores !== undefined) {
      writer.uint32(88).int64(message.addCpuCores);
    }
    if (message.addMemoryBytes !== undefined) {
      writer.uint32(96).int64(message.addMemoryBytes);
    }
    if (message.addDiskBytes !== undefined) {
      writer.uint32(104).int64(message.addDiskBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddImageProperty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddImageProperty();
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

          message.keyGroup = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.isGroupDefault = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.newArchive = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.defaultValue = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.dynamicValue = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.uiType = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.displayGroup = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.description = reader.string();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.addCpuCores = longToNumber(reader.int64() as Long);
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.addMemoryBytes = longToNumber(reader.int64() as Long);
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.addDiskBytes = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AddImageProperty>): AddImageProperty {
    return AddImageProperty.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AddImageProperty>): AddImageProperty {
    const message = createBaseAddImageProperty();
    message.key = object.key ?? "";
    message.keyGroup = object.keyGroup ?? undefined;
    message.isGroupDefault = object.isGroupDefault ?? undefined;
    message.newArchive = object.newArchive ?? false;
    message.defaultValue = object.defaultValue ?? "";
    message.dynamicValue = object.dynamicValue ?? false;
    message.uiType = object.uiType ?? 0;
    message.displayName = object.displayName ?? undefined;
    message.displayGroup = object.displayGroup ?? undefined;
    message.description = object.description ?? undefined;
    message.addCpuCores = object.addCpuCores ?? undefined;
    message.addMemoryBytes = object.addMemoryBytes ?? undefined;
    message.addDiskBytes = object.addDiskBytes ?? undefined;
    return message;
  },
};

function createBaseArchivePointer(): ArchivePointer {
  return { newArchiveKeys: [], storeId: undefined, disallowed: undefined };
}

export const ArchivePointer = {
  encode(message: ArchivePointer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.newArchiveKeys) {
      writer.uint32(10).string(v!);
    }
    if (message.storeId !== undefined) {
      writer.uint32(26).string(message.storeId);
    }
    if (message.disallowed !== undefined) {
      Empty.encode(message.disallowed, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArchivePointer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchivePointer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.newArchiveKeys.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.storeId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.disallowed = Empty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ArchivePointer>): ArchivePointer {
    return ArchivePointer.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ArchivePointer>): ArchivePointer {
    const message = createBaseArchivePointer();
    message.newArchiveKeys = object.newArchiveKeys?.map((e) => e) || [];
    message.storeId = object.storeId ?? undefined;
    message.disallowed = (object.disallowed !== undefined && object.disallowed !== null)
      ? Empty.fromPartial(object.disallowed)
      : undefined;
    return message;
  },
};

function createBaseImageServiceAddImageResponse(): ImageServiceAddImageResponse {
  return { image: undefined, archives: [] };
}

export const ImageServiceAddImageResponse = {
  encode(message: ImageServiceAddImageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.archives) {
      Archive.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceAddImageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceAddImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.archives.push(Archive.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceAddImageResponse>): ImageServiceAddImageResponse {
    return ImageServiceAddImageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceAddImageResponse>): ImageServiceAddImageResponse {
    const message = createBaseImageServiceAddImageResponse();
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    message.archives = object.archives?.map((e) => Archive.fromPartial(e)) || [];
    return message;
  },
};

function createBaseImageServiceGetImageRequest(): ImageServiceGetImageRequest {
  return { versionKey: undefined, orgId: undefined, semanticVersion: undefined, buildVersion: undefined };
}

export const ImageServiceGetImageRequest = {
  encode(message: ImageServiceGetImageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.versionKey !== undefined) {
      ProtocolVersionKey.encode(message.versionKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    if (message.semanticVersion !== undefined) {
      writer.uint32(26).string(message.semanticVersion);
    }
    if (message.buildVersion !== undefined) {
      writer.uint32(32).uint64(message.buildVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceGetImageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceGetImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.versionKey = ProtocolVersionKey.decode(reader, reader.uint32());
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

          message.semanticVersion = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.buildVersion = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceGetImageRequest>): ImageServiceGetImageRequest {
    return ImageServiceGetImageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceGetImageRequest>): ImageServiceGetImageRequest {
    const message = createBaseImageServiceGetImageRequest();
    message.versionKey = (object.versionKey !== undefined && object.versionKey !== null)
      ? ProtocolVersionKey.fromPartial(object.versionKey)
      : undefined;
    message.orgId = object.orgId ?? undefined;
    message.semanticVersion = object.semanticVersion ?? undefined;
    message.buildVersion = object.buildVersion ?? undefined;
    return message;
  },
};

function createBaseImageServiceGetImageResponse(): ImageServiceGetImageResponse {
  return { image: undefined };
}

export const ImageServiceGetImageResponse = {
  encode(message: ImageServiceGetImageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceGetImageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceGetImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceGetImageResponse>): ImageServiceGetImageResponse {
    return ImageServiceGetImageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceGetImageResponse>): ImageServiceGetImageResponse {
    const message = createBaseImageServiceGetImageResponse();
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    return message;
  },
};

function createBaseImageServiceListArchivesRequest(): ImageServiceListArchivesRequest {
  return { imageId: "", orgId: undefined };
}

export const ImageServiceListArchivesRequest = {
  encode(message: ImageServiceListArchivesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imageId !== "") {
      writer.uint32(10).string(message.imageId);
    }
    if (message.orgId !== undefined) {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceListArchivesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceListArchivesRequest();
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

  create(base?: DeepPartial<ImageServiceListArchivesRequest>): ImageServiceListArchivesRequest {
    return ImageServiceListArchivesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceListArchivesRequest>): ImageServiceListArchivesRequest {
    const message = createBaseImageServiceListArchivesRequest();
    message.imageId = object.imageId ?? "";
    message.orgId = object.orgId ?? undefined;
    return message;
  },
};

function createBaseImageServiceListArchivesResponse(): ImageServiceListArchivesResponse {
  return { archives: [] };
}

export const ImageServiceListArchivesResponse = {
  encode(message: ImageServiceListArchivesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.archives) {
      Archive.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceListArchivesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceListArchivesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.archives.push(Archive.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceListArchivesResponse>): ImageServiceListArchivesResponse {
    return ImageServiceListArchivesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceListArchivesResponse>): ImageServiceListArchivesResponse {
    const message = createBaseImageServiceListArchivesResponse();
    message.archives = object.archives?.map((e) => Archive.fromPartial(e)) || [];
    return message;
  },
};

function createBaseImageServiceUpdateArchiveRequest(): ImageServiceUpdateArchiveRequest {
  return { archiveId: "", storeId: undefined };
}

export const ImageServiceUpdateArchiveRequest = {
  encode(message: ImageServiceUpdateArchiveRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.archiveId !== "") {
      writer.uint32(10).string(message.archiveId);
    }
    if (message.storeId !== undefined) {
      writer.uint32(18).string(message.storeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceUpdateArchiveRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceUpdateArchiveRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.archiveId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.storeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceUpdateArchiveRequest>): ImageServiceUpdateArchiveRequest {
    return ImageServiceUpdateArchiveRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceUpdateArchiveRequest>): ImageServiceUpdateArchiveRequest {
    const message = createBaseImageServiceUpdateArchiveRequest();
    message.archiveId = object.archiveId ?? "";
    message.storeId = object.storeId ?? undefined;
    return message;
  },
};

function createBaseImageServiceUpdateArchiveResponse(): ImageServiceUpdateArchiveResponse {
  return { archive: undefined };
}

export const ImageServiceUpdateArchiveResponse = {
  encode(message: ImageServiceUpdateArchiveResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.archive !== undefined) {
      Archive.encode(message.archive, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceUpdateArchiveResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceUpdateArchiveResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.archive = Archive.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceUpdateArchiveResponse>): ImageServiceUpdateArchiveResponse {
    return ImageServiceUpdateArchiveResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceUpdateArchiveResponse>): ImageServiceUpdateArchiveResponse {
    const message = createBaseImageServiceUpdateArchiveResponse();
    message.archive = (object.archive !== undefined && object.archive !== null)
      ? Archive.fromPartial(object.archive)
      : undefined;
    return message;
  },
};

function createBaseImageServiceUpdateImageRequest(): ImageServiceUpdateImageRequest {
  return { imageId: "", visibility: undefined };
}

export const ImageServiceUpdateImageRequest = {
  encode(message: ImageServiceUpdateImageRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imageId !== "") {
      writer.uint32(10).string(message.imageId);
    }
    if (message.visibility !== undefined) {
      writer.uint32(16).int32(message.visibility);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceUpdateImageRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceUpdateImageRequest();
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
          if (tag !== 16) {
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

  create(base?: DeepPartial<ImageServiceUpdateImageRequest>): ImageServiceUpdateImageRequest {
    return ImageServiceUpdateImageRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceUpdateImageRequest>): ImageServiceUpdateImageRequest {
    const message = createBaseImageServiceUpdateImageRequest();
    message.imageId = object.imageId ?? "";
    message.visibility = object.visibility ?? undefined;
    return message;
  },
};

function createBaseImageServiceUpdateImageResponse(): ImageServiceUpdateImageResponse {
  return { image: undefined };
}

export const ImageServiceUpdateImageResponse = {
  encode(message: ImageServiceUpdateImageResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      Image.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageServiceUpdateImageResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageServiceUpdateImageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = Image.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageServiceUpdateImageResponse>): ImageServiceUpdateImageResponse {
    return ImageServiceUpdateImageResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageServiceUpdateImageResponse>): ImageServiceUpdateImageResponse {
    const message = createBaseImageServiceUpdateImageResponse();
    message.image = (object.image !== undefined && object.image !== null) ? Image.fromPartial(object.image) : undefined;
    return message;
  },
};

/** Service for managing protocol image builds. */
export type ImageServiceDefinition = typeof ImageServiceDefinition;
export const ImageServiceDefinition = {
  name: "ImageService",
  fullName: "blockjoy.v1.ImageService",
  methods: {
    /** Create a new image and set of properties for a protocol version. */
    addImage: {
      name: "AddImage",
      requestType: ImageServiceAddImageRequest,
      requestStream: false,
      responseType: ImageServiceAddImageResponse,
      responseStream: false,
      options: {},
    },
    /** Get image info for some protocol and node type. */
    getImage: {
      name: "GetImage",
      requestType: ImageServiceGetImageRequest,
      requestStream: false,
      responseType: ImageServiceGetImageResponse,
      responseStream: false,
      options: {},
    },
    /** List all image archives for some image. */
    listArchives: {
      name: "ListArchives",
      requestType: ImageServiceListArchivesRequest,
      requestStream: false,
      responseType: ImageServiceListArchivesResponse,
      responseStream: false,
      options: {},
    },
    /** Update the storage location of an image archive. */
    updateArchive: {
      name: "UpdateArchive",
      requestType: ImageServiceUpdateArchiveRequest,
      requestStream: false,
      responseType: ImageServiceUpdateArchiveResponse,
      responseStream: false,
      options: {},
    },
    /** Update the config of an existing image. */
    updateImage: {
      name: "UpdateImage",
      requestType: ImageServiceUpdateImageRequest,
      requestStream: false,
      responseType: ImageServiceUpdateImageResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface ImageServiceImplementation<CallContextExt = {}> {
  /** Create a new image and set of properties for a protocol version. */
  addImage(
    request: ImageServiceAddImageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ImageServiceAddImageResponse>>;
  /** Get image info for some protocol and node type. */
  getImage(
    request: ImageServiceGetImageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ImageServiceGetImageResponse>>;
  /** List all image archives for some image. */
  listArchives(
    request: ImageServiceListArchivesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ImageServiceListArchivesResponse>>;
  /** Update the storage location of an image archive. */
  updateArchive(
    request: ImageServiceUpdateArchiveRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ImageServiceUpdateArchiveResponse>>;
  /** Update the config of an existing image. */
  updateImage(
    request: ImageServiceUpdateImageRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ImageServiceUpdateImageResponse>>;
}

export interface ImageServiceClient<CallOptionsExt = {}> {
  /** Create a new image and set of properties for a protocol version. */
  addImage(
    request: DeepPartial<ImageServiceAddImageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ImageServiceAddImageResponse>;
  /** Get image info for some protocol and node type. */
  getImage(
    request: DeepPartial<ImageServiceGetImageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ImageServiceGetImageResponse>;
  /** List all image archives for some image. */
  listArchives(
    request: DeepPartial<ImageServiceListArchivesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ImageServiceListArchivesResponse>;
  /** Update the storage location of an image archive. */
  updateArchive(
    request: DeepPartial<ImageServiceUpdateArchiveRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ImageServiceUpdateArchiveResponse>;
  /** Update the config of an existing image. */
  updateImage(
    request: DeepPartial<ImageServiceUpdateImageRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ImageServiceUpdateImageResponse>;
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
