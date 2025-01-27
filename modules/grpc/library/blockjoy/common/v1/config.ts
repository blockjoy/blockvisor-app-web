/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** The packet protocol type for firewall rules. */
export enum FirewallProtocol {
  FIREWALL_PROTOCOL_UNSPECIFIED = 0,
  FIREWALL_PROTOCOL_TCP = 1,
  FIREWALL_PROTOCOL_UDP = 2,
  FIREWALL_PROTOCOL_BOTH = 3,
  UNRECOGNIZED = -1,
}

/** The direction of packets for firewall rules. */
export enum FirewallDirection {
  FIREWALL_DIRECTION_UNSPECIFIED = 0,
  FIREWALL_DIRECTION_INBOUND = 1,
  FIREWALL_DIRECTION_OUTBOUND = 2,
  UNRECOGNIZED = -1,
}

/** The firewall action to apply to matching packets. */
export enum FirewallAction {
  FIREWALL_ACTION_UNSPECIFIED = 0,
  /** FIREWALL_ACTION_ALLOW - Allow matching packets. */
  FIREWALL_ACTION_ALLOW = 1,
  /** FIREWALL_ACTION_DROP - Drop matching packets without a response. */
  FIREWALL_ACTION_DROP = 2,
  /** FIREWALL_ACTION_REJECT - Reject matching packets with a response. */
  FIREWALL_ACTION_REJECT = 3,
  UNRECOGNIZED = -1,
}

/** The top-level message encapsulating all node config. */
export interface NodeConfig {
  vm: VmConfig | undefined;
  image: ImageConfig | undefined;
  firewall: FirewallConfig | undefined;
}

/** The configuration of the VM. */
export interface VmConfig {
  /** Number of CPU cores. */
  cpuCores: number;
  /** Memory allocated to the VM (in bytes). */
  memoryBytes: number;
  /** Disk allocated to the VM (in bytes). */
  diskBytes: number;
  /** A list of ramdisks attached to the VM. */
  ramdisks: RamdiskConfig[];
}

/** The configuration of a VM ramdisk. */
export interface RamdiskConfig {
  /** The mount point of the ramdisk on a VM. */
  mount: string;
  /** The size of the ramdisk (in bytes). */
  sizeBytes: number;
}

/** The configuration of the image. */
export interface ImageConfig {
  /** The image id of this config. */
  imageId: string;
  /** An identifier to where the image is stored. */
  imageUri: string;
  /** The archive id for this image config. */
  archiveId: string;
  /** The store key pointing to external archive data. */
  storeKey: string;
  /** The configured image property values. */
  values: PropertyValueConfig[];
  /** The minimum semantic babel version to run this image. */
  minBabelVersion: string;
}

/** A configured image property. */
export interface PropertyValueConfig {
  /** The key of the image property. */
  key: string;
  /** The group key for switches and enums. */
  keyGroup?:
    | string
    | undefined;
  /** The configured value of the image property. */
  value: string;
}

/** The firewall config of a node. */
export interface FirewallConfig {
  /** Fallback action for inbound traffic not matching any rule. */
  defaultIn: FirewallAction;
  /** Fallback action for outbound traffic not matching any rule. */
  defaultOut: FirewallAction;
  /** Set of firewall rules to be applied. */
  rules: FirewallRule[];
}

/** A single firewall rule. */
export interface FirewallRule {
  /** The lookup key of this firewall rule. */
  key: string;
  /** A user-readable description of this rule. */
  description?:
    | string
    | undefined;
  /** The protocol type of packets. */
  protocol: FirewallProtocol;
  /** The direction of traffic for which this rule applies. */
  direction: FirewallDirection;
  /** Action applied on packets that match this rule. */
  action: FirewallAction;
  /** Applicable IPs (or empty for all). */
  ips: IpName[];
  /** Applicable ports (or empty for all). */
  ports: PortName[];
}

/** An IP address or range with an optional description. */
export interface IpName {
  /** The ip address (in CIDR notation). */
  ip: string;
  /** A user-readable description of this address. */
  name?: string | undefined;
}

/** A port number with an optional description. */
export interface PortName {
  /** The port (in u16). */
  port: number;
  /** A user-readable description of this port. */
  name?: string | undefined;
}

function createBaseNodeConfig(): NodeConfig {
  return { vm: undefined, image: undefined, firewall: undefined };
}

export const NodeConfig = {
  encode(message: NodeConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vm !== undefined) {
      VmConfig.encode(message.vm, writer.uint32(10).fork()).ldelim();
    }
    if (message.image !== undefined) {
      ImageConfig.encode(message.image, writer.uint32(18).fork()).ldelim();
    }
    if (message.firewall !== undefined) {
      FirewallConfig.encode(message.firewall, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vm = VmConfig.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.image = ImageConfig.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
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

  create(base?: DeepPartial<NodeConfig>): NodeConfig {
    return NodeConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeConfig>): NodeConfig {
    const message = createBaseNodeConfig();
    message.vm = (object.vm !== undefined && object.vm !== null) ? VmConfig.fromPartial(object.vm) : undefined;
    message.image = (object.image !== undefined && object.image !== null)
      ? ImageConfig.fromPartial(object.image)
      : undefined;
    message.firewall = (object.firewall !== undefined && object.firewall !== null)
      ? FirewallConfig.fromPartial(object.firewall)
      : undefined;
    return message;
  },
};

function createBaseVmConfig(): VmConfig {
  return { cpuCores: 0, memoryBytes: 0, diskBytes: 0, ramdisks: [] };
}

export const VmConfig = {
  encode(message: VmConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpuCores !== 0) {
      writer.uint32(8).uint64(message.cpuCores);
    }
    if (message.memoryBytes !== 0) {
      writer.uint32(16).uint64(message.memoryBytes);
    }
    if (message.diskBytes !== 0) {
      writer.uint32(24).uint64(message.diskBytes);
    }
    for (const v of message.ramdisks) {
      RamdiskConfig.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VmConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVmConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.cpuCores = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.memoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.diskBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
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

  create(base?: DeepPartial<VmConfig>): VmConfig {
    return VmConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<VmConfig>): VmConfig {
    const message = createBaseVmConfig();
    message.cpuCores = object.cpuCores ?? 0;
    message.memoryBytes = object.memoryBytes ?? 0;
    message.diskBytes = object.diskBytes ?? 0;
    message.ramdisks = object.ramdisks?.map((e) => RamdiskConfig.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRamdiskConfig(): RamdiskConfig {
  return { mount: "", sizeBytes: 0 };
}

export const RamdiskConfig = {
  encode(message: RamdiskConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mount !== "") {
      writer.uint32(10).string(message.mount);
    }
    if (message.sizeBytes !== 0) {
      writer.uint32(16).uint64(message.sizeBytes);
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

          message.mount = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
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

  create(base?: DeepPartial<RamdiskConfig>): RamdiskConfig {
    return RamdiskConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RamdiskConfig>): RamdiskConfig {
    const message = createBaseRamdiskConfig();
    message.mount = object.mount ?? "";
    message.sizeBytes = object.sizeBytes ?? 0;
    return message;
  },
};

function createBaseImageConfig(): ImageConfig {
  return { imageId: "", imageUri: "", archiveId: "", storeKey: "", values: [], minBabelVersion: "" };
}

export const ImageConfig = {
  encode(message: ImageConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.imageId !== "") {
      writer.uint32(10).string(message.imageId);
    }
    if (message.imageUri !== "") {
      writer.uint32(18).string(message.imageUri);
    }
    if (message.archiveId !== "") {
      writer.uint32(26).string(message.archiveId);
    }
    if (message.storeKey !== "") {
      writer.uint32(34).string(message.storeKey);
    }
    for (const v of message.values) {
      PropertyValueConfig.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.minBabelVersion !== "") {
      writer.uint32(50).string(message.minBabelVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageConfig();
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

          message.imageUri = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.archiveId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.storeKey = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.values.push(PropertyValueConfig.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.minBabelVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ImageConfig>): ImageConfig {
    return ImageConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageConfig>): ImageConfig {
    const message = createBaseImageConfig();
    message.imageId = object.imageId ?? "";
    message.imageUri = object.imageUri ?? "";
    message.archiveId = object.archiveId ?? "";
    message.storeKey = object.storeKey ?? "";
    message.values = object.values?.map((e) => PropertyValueConfig.fromPartial(e)) || [];
    message.minBabelVersion = object.minBabelVersion ?? "";
    return message;
  },
};

function createBasePropertyValueConfig(): PropertyValueConfig {
  return { key: "", keyGroup: undefined, value: "" };
}

export const PropertyValueConfig = {
  encode(message: PropertyValueConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.keyGroup !== undefined) {
      writer.uint32(18).string(message.keyGroup);
    }
    if (message.value !== "") {
      writer.uint32(26).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PropertyValueConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePropertyValueConfig();
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
          if (tag !== 26) {
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

  create(base?: DeepPartial<PropertyValueConfig>): PropertyValueConfig {
    return PropertyValueConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<PropertyValueConfig>): PropertyValueConfig {
    const message = createBasePropertyValueConfig();
    message.key = object.key ?? "";
    message.keyGroup = object.keyGroup ?? undefined;
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseFirewallConfig(): FirewallConfig {
  return { defaultIn: 0, defaultOut: 0, rules: [] };
}

export const FirewallConfig = {
  encode(message: FirewallConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.defaultIn !== 0) {
      writer.uint32(8).int32(message.defaultIn);
    }
    if (message.defaultOut !== 0) {
      writer.uint32(16).int32(message.defaultOut);
    }
    for (const v of message.rules) {
      FirewallRule.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FirewallConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFirewallConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.defaultIn = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.defaultOut = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rules.push(FirewallRule.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<FirewallConfig>): FirewallConfig {
    return FirewallConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<FirewallConfig>): FirewallConfig {
    const message = createBaseFirewallConfig();
    message.defaultIn = object.defaultIn ?? 0;
    message.defaultOut = object.defaultOut ?? 0;
    message.rules = object.rules?.map((e) => FirewallRule.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFirewallRule(): FirewallRule {
  return { key: "", description: undefined, protocol: 0, direction: 0, action: 0, ips: [], ports: [] };
}

export const FirewallRule = {
  encode(message: FirewallRule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.description !== undefined) {
      writer.uint32(18).string(message.description);
    }
    if (message.protocol !== 0) {
      writer.uint32(24).int32(message.protocol);
    }
    if (message.direction !== 0) {
      writer.uint32(32).int32(message.direction);
    }
    if (message.action !== 0) {
      writer.uint32(40).int32(message.action);
    }
    for (const v of message.ips) {
      IpName.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.ports) {
      PortName.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FirewallRule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFirewallRule();
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

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.protocol = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.direction = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.action = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ips.push(IpName.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.ports.push(PortName.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<FirewallRule>): FirewallRule {
    return FirewallRule.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<FirewallRule>): FirewallRule {
    const message = createBaseFirewallRule();
    message.key = object.key ?? "";
    message.description = object.description ?? undefined;
    message.protocol = object.protocol ?? 0;
    message.direction = object.direction ?? 0;
    message.action = object.action ?? 0;
    message.ips = object.ips?.map((e) => IpName.fromPartial(e)) || [];
    message.ports = object.ports?.map((e) => PortName.fromPartial(e)) || [];
    return message;
  },
};

function createBaseIpName(): IpName {
  return { ip: "", name: undefined };
}

export const IpName = {
  encode(message: IpName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IpName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIpName();
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
          if (tag !== 18) {
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

  create(base?: DeepPartial<IpName>): IpName {
    return IpName.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<IpName>): IpName {
    const message = createBaseIpName();
    message.ip = object.ip ?? "";
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBasePortName(): PortName {
  return { port: 0, name: undefined };
}

export const PortName = {
  encode(message: PortName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port !== 0) {
      writer.uint32(8).uint32(message.port);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PortName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePortName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.port = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
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

  create(base?: DeepPartial<PortName>): PortName {
    return PortName.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<PortName>): PortName {
    const message = createBasePortName();
    message.port = object.port ?? 0;
    message.name = object.name ?? undefined;
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
