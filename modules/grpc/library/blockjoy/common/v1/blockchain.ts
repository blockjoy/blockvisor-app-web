/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { FirewallConfig } from "./firewall";
import { ImageIdentifier } from "./image";

export const protobufPackage = "blockjoy.common.v1";

/** The blockchain network type. */
export enum NetType {
  NET_TYPE_UNSPECIFIED = 0,
  NET_TYPE_DEV = 1,
  NET_TYPE_TEST = 2,
  NET_TYPE_MAIN = 3,
  UNRECOGNIZED = -1,
}

export interface BlockchainMetadata {
  /** Blockchain image identifier. */
  image:
    | ImageIdentifier
    | undefined;
  /** The Linux kernel version used in VM. */
  kernel: string;
  /** A description of the image. */
  description?:
    | string
    | undefined;
  /** Blockchain hardware requirements. */
  requirements:
    | HardwareRequirements
    | undefined;
  /** Supported blockchain networks. */
  networks: { [key: string]: NetworkConfig };
  /** The minimum semver of the babel program that a script is compatible with. */
  minBabelVersion: string;
  /** Babel agent configuration. */
  babelConfig:
    | BabelConfig
    | undefined;
  /** Node firewall configuration. */
  firewall: FirewallConfig | undefined;
}

export interface BlockchainMetadata_NetworksEntry {
  key: string;
  value: NetworkConfig | undefined;
}

export interface HardwareRequirements {
  /** Number of virtual cores in the VM. */
  vcpuCount: number;
  /** RAM allocated to VM (in MB). */
  memSizeMb: number;
  /** Size of data drive for storing blockchain data (in GB). */
  diskSizeGb: number;
}

export interface NetworkConfig {
  /** The name of this network config. */
  name: string;
  /** Url for given blockchain network. */
  url: string;
  /** Blockchain network type. */
  netType: NetType;
  /** Custom network metadata. */
  metadata: { [key: string]: string };
}

export interface NetworkConfig_MetadataEntry {
  key: string;
  value: string;
}

export interface BabelConfig {
  /** Path to mount data drive to. */
  dataDirectoryMountPoint: string;
  /** Log buffer capacity in lines. */
  logBufferLines?:
    | number
    | undefined;
  /** Size of swap file created on the node (in MB). */
  swapSizeMb?:
    | number
    | undefined;
  /** Location of swap file. */
  swapFileLocation?:
    | string
    | undefined;
  /** RAM disks configuration. */
  ramdisks: RamdiskConfig[];
}

export interface RamdiskConfig {
  /** Path to mount RAM disk to. */
  ramDiskMountPoint: string;
  /** RAM disk size (in MB). */
  ramDiskSizeMb: number;
}

function createBaseBlockchainMetadata(): BlockchainMetadata {
  return {
    image: undefined,
    kernel: "",
    description: undefined,
    requirements: undefined,
    networks: {},
    minBabelVersion: "",
    babelConfig: undefined,
    firewall: undefined,
  };
}

export const BlockchainMetadata = {
  encode(message: BlockchainMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      ImageIdentifier.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    if (message.kernel !== "") {
      writer.uint32(18).string(message.kernel);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.requirements !== undefined) {
      HardwareRequirements.encode(message.requirements, writer.uint32(34).fork()).ldelim();
    }
    Object.entries(message.networks).forEach(([key, value]) => {
      BlockchainMetadata_NetworksEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    if (message.minBabelVersion !== "") {
      writer.uint32(50).string(message.minBabelVersion);
    }
    if (message.babelConfig !== undefined) {
      BabelConfig.encode(message.babelConfig, writer.uint32(58).fork()).ldelim();
    }
    if (message.firewall !== undefined) {
      FirewallConfig.encode(message.firewall, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.kernel = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.requirements = HardwareRequirements.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = BlockchainMetadata_NetworksEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.networks[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.minBabelVersion = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.babelConfig = BabelConfig.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.firewall = FirewallConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainMetadata>): BlockchainMetadata {
    return BlockchainMetadata.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainMetadata>): BlockchainMetadata {
    const message = createBaseBlockchainMetadata();
    message.image = (object.image !== undefined && object.image !== null)
      ? ImageIdentifier.fromPartial(object.image)
      : undefined;
    message.kernel = object.kernel ?? "";
    message.description = object.description ?? undefined;
    message.requirements = (object.requirements !== undefined && object.requirements !== null)
      ? HardwareRequirements.fromPartial(object.requirements)
      : undefined;
    message.networks = Object.entries(object.networks ?? {}).reduce<{ [key: string]: NetworkConfig }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = NetworkConfig.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.minBabelVersion = object.minBabelVersion ?? "";
    message.babelConfig = (object.babelConfig !== undefined && object.babelConfig !== null)
      ? BabelConfig.fromPartial(object.babelConfig)
      : undefined;
    message.firewall = (object.firewall !== undefined && object.firewall !== null)
      ? FirewallConfig.fromPartial(object.firewall)
      : undefined;
    return message;
  },
};

function createBaseBlockchainMetadata_NetworksEntry(): BlockchainMetadata_NetworksEntry {
  return { key: "", value: undefined };
}

export const BlockchainMetadata_NetworksEntry = {
  encode(message: BlockchainMetadata_NetworksEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      NetworkConfig.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockchainMetadata_NetworksEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockchainMetadata_NetworksEntry();
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

          message.value = NetworkConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BlockchainMetadata_NetworksEntry>): BlockchainMetadata_NetworksEntry {
    return BlockchainMetadata_NetworksEntry.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BlockchainMetadata_NetworksEntry>): BlockchainMetadata_NetworksEntry {
    const message = createBaseBlockchainMetadata_NetworksEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? NetworkConfig.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseHardwareRequirements(): HardwareRequirements {
  return { vcpuCount: 0, memSizeMb: 0, diskSizeGb: 0 };
}

export const HardwareRequirements = {
  encode(message: HardwareRequirements, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vcpuCount !== 0) {
      writer.uint32(8).uint32(message.vcpuCount);
    }
    if (message.memSizeMb !== 0) {
      writer.uint32(16).uint64(message.memSizeMb);
    }
    if (message.diskSizeGb !== 0) {
      writer.uint32(24).uint64(message.diskSizeGb);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HardwareRequirements {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHardwareRequirements();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.vcpuCount = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.memSizeMb = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.diskSizeGb = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HardwareRequirements>): HardwareRequirements {
    return HardwareRequirements.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HardwareRequirements>): HardwareRequirements {
    const message = createBaseHardwareRequirements();
    message.vcpuCount = object.vcpuCount ?? 0;
    message.memSizeMb = object.memSizeMb ?? 0;
    message.diskSizeGb = object.diskSizeGb ?? 0;
    return message;
  },
};

function createBaseNetworkConfig(): NetworkConfig {
  return { name: "", url: "", netType: 0, metadata: {} };
}

export const NetworkConfig = {
  encode(message: NetworkConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.netType !== 0) {
      writer.uint32(24).int32(message.netType);
    }
    Object.entries(message.metadata).forEach(([key, value]) => {
      NetworkConfig_MetadataEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkConfig();
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

          message.url = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.netType = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = NetworkConfig_MetadataEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.metadata[entry4.key] = entry4.value;
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

  create(base?: DeepPartial<NetworkConfig>): NetworkConfig {
    return NetworkConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NetworkConfig>): NetworkConfig {
    const message = createBaseNetworkConfig();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    message.netType = object.netType ?? 0;
    message.metadata = Object.entries(object.metadata ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseNetworkConfig_MetadataEntry(): NetworkConfig_MetadataEntry {
  return { key: "", value: "" };
}

export const NetworkConfig_MetadataEntry = {
  encode(message: NetworkConfig_MetadataEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetworkConfig_MetadataEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetworkConfig_MetadataEntry();
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NetworkConfig_MetadataEntry>): NetworkConfig_MetadataEntry {
    return NetworkConfig_MetadataEntry.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NetworkConfig_MetadataEntry>): NetworkConfig_MetadataEntry {
    const message = createBaseNetworkConfig_MetadataEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseBabelConfig(): BabelConfig {
  return {
    dataDirectoryMountPoint: "",
    logBufferLines: undefined,
    swapSizeMb: undefined,
    swapFileLocation: undefined,
    ramdisks: [],
  };
}

export const BabelConfig = {
  encode(message: BabelConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.dataDirectoryMountPoint !== "") {
      writer.uint32(10).string(message.dataDirectoryMountPoint);
    }
    if (message.logBufferLines !== undefined) {
      writer.uint32(16).uint64(message.logBufferLines);
    }
    if (message.swapSizeMb !== undefined) {
      writer.uint32(24).uint64(message.swapSizeMb);
    }
    if (message.swapFileLocation !== undefined) {
      writer.uint32(34).string(message.swapFileLocation);
    }
    for (const v of message.ramdisks) {
      RamdiskConfig.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BabelConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBabelConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dataDirectoryMountPoint = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.logBufferLines = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.swapSizeMb = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.swapFileLocation = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ramdisks.push(RamdiskConfig.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BabelConfig>): BabelConfig {
    return BabelConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BabelConfig>): BabelConfig {
    const message = createBaseBabelConfig();
    message.dataDirectoryMountPoint = object.dataDirectoryMountPoint ?? "";
    message.logBufferLines = object.logBufferLines ?? undefined;
    message.swapSizeMb = object.swapSizeMb ?? undefined;
    message.swapFileLocation = object.swapFileLocation ?? undefined;
    message.ramdisks = object.ramdisks?.map((e) => RamdiskConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRamdiskConfig(): RamdiskConfig {
  return { ramDiskMountPoint: "", ramDiskSizeMb: 0 };
}

export const RamdiskConfig = {
  encode(message: RamdiskConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ramDiskMountPoint !== "") {
      writer.uint32(10).string(message.ramDiskMountPoint);
    }
    if (message.ramDiskSizeMb !== 0) {
      writer.uint32(16).uint64(message.ramDiskSizeMb);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RamdiskConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRamdiskConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ramDiskMountPoint = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.ramDiskSizeMb = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RamdiskConfig>): RamdiskConfig {
    return RamdiskConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RamdiskConfig>): RamdiskConfig {
    const message = createBaseRamdiskConfig();
    message.ramDiskMountPoint = object.ramDiskMountPoint ?? "";
    message.ramDiskSizeMb = object.ramDiskSizeMb ?? 0;
    return message;
  },
};

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
