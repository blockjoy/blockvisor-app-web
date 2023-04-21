/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Node_NodeStatus, Node_StakingStatus, Node_SyncStatus } from "./node";

export const protobufPackage = "v1";

/** This message is used to store the metrics for a given set of nodes. */
export interface NodeMetricsRequest {
  /** This field maps the id of the node to the metrics that apply to that node. */
  metrics: { [key: string]: NodeMetrics };
}

export interface NodeMetricsRequest_MetricsEntry {
  key: string;
  value: NodeMetrics | undefined;
}

/**
 * The metrics for a single `Node`. Note that there is no node id in this
 * message, because it is embedded in the `NodeMetricsRequest`, where the key
 * of the map already is the id of the node.
 */
export interface NodeMetrics {
  /** This is the current height of the blockchain. */
  height?:
    | number
    | undefined;
  /** This is the age of the most recent block, measured in seconds. */
  blockAge?:
    | number
    | undefined;
  /** This is the current staking status of the node. */
  stakingStatus?:
    | Node_StakingStatus
    | undefined;
  /** Iff the blockchain is in consensus, this field is `true`. */
  consensus?:
    | boolean
    | undefined;
  /**
   * This field represents the current status of the blockchain node
   * application.
   */
  applicationStatus?:
    | Node_NodeStatus
    | undefined;
  /**
   * The status of the node with respect to the rest of the network, i.e.
   * whether it is in sync with the other nodes.
   */
  syncStatus?: Node_SyncStatus | undefined;
}

/** This message is used to store the metrics for a given set of hosts. */
export interface HostMetricsRequest {
  /** This field maps the id of the host to the metrics that apply to that host. */
  metrics: { [key: string]: HostMetrics };
}

export interface HostMetricsRequest_MetricsEntry {
  key: string;
  value: HostMetrics | undefined;
}

/**
 * The metrics for a single `Host`. Note that there is no host id in this
 * message, because it is embedded in the `HostMetricsRequest`, where the key of
 * the map already is the id of the host.
 */
export interface HostMetrics {
  /**
   * The amount of CPU that is currently in use. This is given as the sum of
   * percentages of each core that is used. Example: if there are 4 cores, and
   * each is at 78% usage, the number sent will be 312.
   */
  usedCpu?:
    | number
    | undefined;
  /** This is the amount of memory used, given in bytes. */
  usedMemory?:
    | number
    | undefined;
  /** This is the amount of disk used, given in bytes. */
  usedDiskSpace?:
    | number
    | undefined;
  /**
   * This is the load during the last minute, given as a percentage. Example: if
   * the load given by top is `2.73, 2.96, 2.53`, then the value sent here will
   * be 2.73.
   */
  loadOne?:
    | number
    | undefined;
  /**
   * This is the load during the last five minutes, given as a percentage.
   * Example: if the load given by top is `2.73, 2.96, 2.53`, then the value
   * sent here will be 2.96.
   */
  loadFive?:
    | number
    | undefined;
  /**
   * This is the load during the last five minutes, given as a percentage.
   * Example: if the load given by top is `2.73, 2.96, 2.53`, then the value
   * sent here will be 2.53.
   */
  loadFifteen?:
    | number
    | undefined;
  /**
   * This is the number of bytes (not bits) received over the network since the
   * start of the host. This means that this value is going to increase
   * monotonically when the host starts.
   */
  networkReceived?:
    | number
    | undefined;
  /**
   * This is the number of bytes (not bits) sent over the network since the
   * start of the host. This means that this value is going to increase
   * monotonically when the host starts.
   */
  networkSent?:
    | number
    | undefined;
  /** This is the number of seconds that has elapsed since the host has started. */
  uptime?: number | undefined;
}

function createBaseNodeMetricsRequest(): NodeMetricsRequest {
  return { metrics: {} };
}

export const NodeMetricsRequest = {
  encode(message: NodeMetricsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.metrics).forEach(([key, value]) => {
      NodeMetricsRequest_MetricsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeMetricsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeMetricsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          const entry1 = NodeMetricsRequest_MetricsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.metrics[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeMetricsRequest>): NodeMetricsRequest {
    return NodeMetricsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeMetricsRequest>): NodeMetricsRequest {
    const message = createBaseNodeMetricsRequest();
    message.metrics = Object.entries(object.metrics ?? {}).reduce<{ [key: string]: NodeMetrics }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = NodeMetrics.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseNodeMetricsRequest_MetricsEntry(): NodeMetricsRequest_MetricsEntry {
  return { key: "", value: undefined };
}

export const NodeMetricsRequest_MetricsEntry = {
  encode(message: NodeMetricsRequest_MetricsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      NodeMetrics.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeMetricsRequest_MetricsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeMetricsRequest_MetricsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.value = NodeMetrics.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeMetricsRequest_MetricsEntry>): NodeMetricsRequest_MetricsEntry {
    return NodeMetricsRequest_MetricsEntry.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeMetricsRequest_MetricsEntry>): NodeMetricsRequest_MetricsEntry {
    const message = createBaseNodeMetricsRequest_MetricsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? NodeMetrics.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseNodeMetrics(): NodeMetrics {
  return {
    height: undefined,
    blockAge: undefined,
    stakingStatus: undefined,
    consensus: undefined,
    applicationStatus: undefined,
    syncStatus: undefined,
  };
}

export const NodeMetrics = {
  encode(message: NodeMetrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== undefined) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.blockAge !== undefined) {
      writer.uint32(16).uint64(message.blockAge);
    }
    if (message.stakingStatus !== undefined) {
      writer.uint32(24).int32(message.stakingStatus);
    }
    if (message.consensus !== undefined) {
      writer.uint32(32).bool(message.consensus);
    }
    if (message.applicationStatus !== undefined) {
      writer.uint32(40).int32(message.applicationStatus);
    }
    if (message.syncStatus !== undefined) {
      writer.uint32(48).int32(message.syncStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeMetrics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.height = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.blockAge = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.stakingStatus = reader.int32() as any;
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.consensus = reader.bool();
          continue;
        case 5:
          if (tag != 40) {
            break;
          }

          message.applicationStatus = reader.int32() as any;
          continue;
        case 6:
          if (tag != 48) {
            break;
          }

          message.syncStatus = reader.int32() as any;
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeMetrics>): NodeMetrics {
    return NodeMetrics.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeMetrics>): NodeMetrics {
    const message = createBaseNodeMetrics();
    message.height = object.height ?? undefined;
    message.blockAge = object.blockAge ?? undefined;
    message.stakingStatus = object.stakingStatus ?? undefined;
    message.consensus = object.consensus ?? undefined;
    message.applicationStatus = object.applicationStatus ?? undefined;
    message.syncStatus = object.syncStatus ?? undefined;
    return message;
  },
};

function createBaseHostMetricsRequest(): HostMetricsRequest {
  return { metrics: {} };
}

export const HostMetricsRequest = {
  encode(message: HostMetricsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.metrics).forEach(([key, value]) => {
      HostMetricsRequest_MetricsEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostMetricsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostMetricsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          const entry1 = HostMetricsRequest_MetricsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.metrics[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostMetricsRequest>): HostMetricsRequest {
    return HostMetricsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostMetricsRequest>): HostMetricsRequest {
    const message = createBaseHostMetricsRequest();
    message.metrics = Object.entries(object.metrics ?? {}).reduce<{ [key: string]: HostMetrics }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = HostMetrics.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseHostMetricsRequest_MetricsEntry(): HostMetricsRequest_MetricsEntry {
  return { key: "", value: undefined };
}

export const HostMetricsRequest_MetricsEntry = {
  encode(message: HostMetricsRequest_MetricsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      HostMetrics.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostMetricsRequest_MetricsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostMetricsRequest_MetricsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.value = HostMetrics.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostMetricsRequest_MetricsEntry>): HostMetricsRequest_MetricsEntry {
    return HostMetricsRequest_MetricsEntry.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostMetricsRequest_MetricsEntry>): HostMetricsRequest_MetricsEntry {
    const message = createBaseHostMetricsRequest_MetricsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? HostMetrics.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseHostMetrics(): HostMetrics {
  return {
    usedCpu: undefined,
    usedMemory: undefined,
    usedDiskSpace: undefined,
    loadOne: undefined,
    loadFive: undefined,
    loadFifteen: undefined,
    networkReceived: undefined,
    networkSent: undefined,
    uptime: undefined,
  };
}

export const HostMetrics = {
  encode(message: HostMetrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.usedCpu !== undefined) {
      writer.uint32(8).uint32(message.usedCpu);
    }
    if (message.usedMemory !== undefined) {
      writer.uint32(16).uint64(message.usedMemory);
    }
    if (message.usedDiskSpace !== undefined) {
      writer.uint32(24).uint64(message.usedDiskSpace);
    }
    if (message.loadOne !== undefined) {
      writer.uint32(33).double(message.loadOne);
    }
    if (message.loadFive !== undefined) {
      writer.uint32(41).double(message.loadFive);
    }
    if (message.loadFifteen !== undefined) {
      writer.uint32(49).double(message.loadFifteen);
    }
    if (message.networkReceived !== undefined) {
      writer.uint32(56).uint64(message.networkReceived);
    }
    if (message.networkSent !== undefined) {
      writer.uint32(64).uint64(message.networkSent);
    }
    if (message.uptime !== undefined) {
      writer.uint32(72).uint64(message.uptime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostMetrics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 8) {
            break;
          }

          message.usedCpu = reader.uint32();
          continue;
        case 2:
          if (tag != 16) {
            break;
          }

          message.usedMemory = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.usedDiskSpace = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag != 33) {
            break;
          }

          message.loadOne = reader.double();
          continue;
        case 5:
          if (tag != 41) {
            break;
          }

          message.loadFive = reader.double();
          continue;
        case 6:
          if (tag != 49) {
            break;
          }

          message.loadFifteen = reader.double();
          continue;
        case 7:
          if (tag != 56) {
            break;
          }

          message.networkReceived = longToNumber(reader.uint64() as Long);
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.networkSent = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag != 72) {
            break;
          }

          message.uptime = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostMetrics>): HostMetrics {
    return HostMetrics.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostMetrics>): HostMetrics {
    const message = createBaseHostMetrics();
    message.usedCpu = object.usedCpu ?? undefined;
    message.usedMemory = object.usedMemory ?? undefined;
    message.usedDiskSpace = object.usedDiskSpace ?? undefined;
    message.loadOne = object.loadOne ?? undefined;
    message.loadFive = object.loadFive ?? undefined;
    message.loadFifteen = object.loadFifteen ?? undefined;
    message.networkReceived = object.networkReceived ?? undefined;
    message.networkSent = object.networkSent ?? undefined;
    message.uptime = object.uptime ?? undefined;
    return message;
  },
};

export type MetricsDefinition = typeof MetricsDefinition;
export const MetricsDefinition = {
  name: "Metrics",
  fullName: "v1.Metrics",
  methods: {
    /** Overwrite the metrics for the given nodes. */
    node: {
      name: "Node",
      requestType: NodeMetricsRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Overwrite the metrics for the given hosts. */
    host: {
      name: "Host",
      requestType: HostMetricsRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface MetricsServiceImplementation<CallContextExt = {}> {
  /** Overwrite the metrics for the given nodes. */
  node(request: NodeMetricsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  /** Overwrite the metrics for the given hosts. */
  host(request: HostMetricsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
}

export interface MetricsClient<CallOptionsExt = {}> {
  /** Overwrite the metrics for the given nodes. */
  node(request: DeepPartial<NodeMetricsRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Overwrite the metrics for the given hosts. */
  host(request: DeepPartial<HostMetricsRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
