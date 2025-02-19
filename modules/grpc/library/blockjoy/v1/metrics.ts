/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { NodeJob, NodeStatus } from "../common/v1/node";

export const protobufPackage = "blockjoy.v1";

/** Send metrics for a host. */
export interface MetricsServiceHostRequest {
  metrics: HostMetrics | undefined;
}

/** The metrics of a single host. */
export interface HostMetrics {
  /** The host id of the metrics. */
  hostId: string;
  /** The amount of CPU in use (in hundreths of a core). */
  usedCpuHundreths?:
    | number
    | undefined;
  /** The amount of memory in use (in bytes). */
  usedMemoryBytes?:
    | number
    | undefined;
  /** The amount of disk space used (in bytes). */
  usedDiskBytes?:
    | number
    | undefined;
  /** The load during the last minute (in percent). */
  loadOnePercent?:
    | number
    | undefined;
  /** The load during the last five minutes (in percent). */
  loadFivePercent?:
    | number
    | undefined;
  /** The load during the last fifteen minutes (in percent). */
  loadFifteenPercent?:
    | number
    | undefined;
  /** The amount of network data received since the host was started (in bytes). */
  networkReceivedBytes?:
    | number
    | undefined;
  /** The amount of network data sent since the host was started (in bytes). */
  networkSentBytes?:
    | number
    | undefined;
  /** The time since the host started (in seconds). */
  uptimeSeconds?:
    | number
    | undefined;
  /** A list of IPs in use by the host. */
  usedIps: string[];
}

export interface MetricsServiceHostResponse {
}

/** Send metrics for a set of nodes. */
export interface MetricsServiceNodeRequest {
  metrics: NodeMetrics[];
}

/** The metrics of a single node. */
export interface NodeMetrics {
  /** The node id of the metrics. */
  nodeId: string;
  /** The current status of the node. */
  nodeStatus?:
    | NodeStatus
    | undefined;
  /** The current height of the blockchain. */
  height?:
    | number
    | undefined;
  /** The age of the most recent block (in seconds). */
  blockAge?:
    | number
    | undefined;
  /** Whether the blockchain is in consensus. */
  consensus?:
    | boolean
    | undefined;
  /** A list of jobs running on the node. */
  jobs: NodeJob[];
}

export interface MetricsServiceNodeResponse {
}

function createBaseMetricsServiceHostRequest(): MetricsServiceHostRequest {
  return { metrics: undefined };
}

export const MetricsServiceHostRequest = {
  encode(message: MetricsServiceHostRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metrics !== undefined) {
      HostMetrics.encode(message.metrics, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetricsServiceHostRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetricsServiceHostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metrics = HostMetrics.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<MetricsServiceHostRequest>): MetricsServiceHostRequest {
    return MetricsServiceHostRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<MetricsServiceHostRequest>): MetricsServiceHostRequest {
    const message = createBaseMetricsServiceHostRequest();
    message.metrics = (object.metrics !== undefined && object.metrics !== null)
      ? HostMetrics.fromPartial(object.metrics)
      : undefined;
    return message;
  },
};

function createBaseHostMetrics(): HostMetrics {
  return {
    hostId: "",
    usedCpuHundreths: undefined,
    usedMemoryBytes: undefined,
    usedDiskBytes: undefined,
    loadOnePercent: undefined,
    loadFivePercent: undefined,
    loadFifteenPercent: undefined,
    networkReceivedBytes: undefined,
    networkSentBytes: undefined,
    uptimeSeconds: undefined,
    usedIps: [],
  };
}

export const HostMetrics = {
  encode(message: HostMetrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.usedCpuHundreths !== undefined) {
      writer.uint32(16).uint64(message.usedCpuHundreths);
    }
    if (message.usedMemoryBytes !== undefined) {
      writer.uint32(24).uint64(message.usedMemoryBytes);
    }
    if (message.usedDiskBytes !== undefined) {
      writer.uint32(32).uint64(message.usedDiskBytes);
    }
    if (message.loadOnePercent !== undefined) {
      writer.uint32(41).double(message.loadOnePercent);
    }
    if (message.loadFivePercent !== undefined) {
      writer.uint32(49).double(message.loadFivePercent);
    }
    if (message.loadFifteenPercent !== undefined) {
      writer.uint32(57).double(message.loadFifteenPercent);
    }
    if (message.networkReceivedBytes !== undefined) {
      writer.uint32(64).uint64(message.networkReceivedBytes);
    }
    if (message.networkSentBytes !== undefined) {
      writer.uint32(72).uint64(message.networkSentBytes);
    }
    if (message.uptimeSeconds !== undefined) {
      writer.uint32(80).uint64(message.uptimeSeconds);
    }
    for (const v of message.usedIps) {
      writer.uint32(90).string(v!);
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
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.usedCpuHundreths = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.usedMemoryBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.usedDiskBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 41) {
            break;
          }

          message.loadOnePercent = reader.double();
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.loadFivePercent = reader.double();
          continue;
        case 7:
          if (tag !== 57) {
            break;
          }

          message.loadFifteenPercent = reader.double();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.networkReceivedBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.networkSentBytes = longToNumber(reader.uint64() as Long);
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.uptimeSeconds = longToNumber(reader.uint64() as Long);
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.usedIps.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    message.hostId = object.hostId ?? "";
    message.usedCpuHundreths = object.usedCpuHundreths ?? undefined;
    message.usedMemoryBytes = object.usedMemoryBytes ?? undefined;
    message.usedDiskBytes = object.usedDiskBytes ?? undefined;
    message.loadOnePercent = object.loadOnePercent ?? undefined;
    message.loadFivePercent = object.loadFivePercent ?? undefined;
    message.loadFifteenPercent = object.loadFifteenPercent ?? undefined;
    message.networkReceivedBytes = object.networkReceivedBytes ?? undefined;
    message.networkSentBytes = object.networkSentBytes ?? undefined;
    message.uptimeSeconds = object.uptimeSeconds ?? undefined;
    message.usedIps = object.usedIps?.map((e) => e) || [];
    return message;
  },
};

function createBaseMetricsServiceHostResponse(): MetricsServiceHostResponse {
  return {};
}

export const MetricsServiceHostResponse = {
  encode(_: MetricsServiceHostResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetricsServiceHostResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetricsServiceHostResponse();
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

  create(base?: DeepPartial<MetricsServiceHostResponse>): MetricsServiceHostResponse {
    return MetricsServiceHostResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<MetricsServiceHostResponse>): MetricsServiceHostResponse {
    const message = createBaseMetricsServiceHostResponse();
    return message;
  },
};

function createBaseMetricsServiceNodeRequest(): MetricsServiceNodeRequest {
  return { metrics: [] };
}

export const MetricsServiceNodeRequest = {
  encode(message: MetricsServiceNodeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.metrics) {
      NodeMetrics.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetricsServiceNodeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetricsServiceNodeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metrics.push(NodeMetrics.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<MetricsServiceNodeRequest>): MetricsServiceNodeRequest {
    return MetricsServiceNodeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<MetricsServiceNodeRequest>): MetricsServiceNodeRequest {
    const message = createBaseMetricsServiceNodeRequest();
    message.metrics = object.metrics?.map((e) => NodeMetrics.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeMetrics(): NodeMetrics {
  return { nodeId: "", nodeStatus: undefined, height: undefined, blockAge: undefined, consensus: undefined, jobs: [] };
}

export const NodeMetrics = {
  encode(message: NodeMetrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.nodeStatus !== undefined) {
      NodeStatus.encode(message.nodeStatus, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== undefined) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.blockAge !== undefined) {
      writer.uint32(32).uint64(message.blockAge);
    }
    if (message.consensus !== undefined) {
      writer.uint32(40).bool(message.consensus);
    }
    for (const v of message.jobs) {
      NodeJob.encode(v!, writer.uint32(50).fork()).ldelim();
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
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nodeStatus = NodeStatus.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.height = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.blockAge = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.consensus = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.jobs.push(NodeJob.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    message.nodeId = object.nodeId ?? "";
    message.nodeStatus = (object.nodeStatus !== undefined && object.nodeStatus !== null)
      ? NodeStatus.fromPartial(object.nodeStatus)
      : undefined;
    message.height = object.height ?? undefined;
    message.blockAge = object.blockAge ?? undefined;
    message.consensus = object.consensus ?? undefined;
    message.jobs = object.jobs?.map((e) => NodeJob.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMetricsServiceNodeResponse(): MetricsServiceNodeResponse {
  return {};
}

export const MetricsServiceNodeResponse = {
  encode(_: MetricsServiceNodeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MetricsServiceNodeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetricsServiceNodeResponse();
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

  create(base?: DeepPartial<MetricsServiceNodeResponse>): MetricsServiceNodeResponse {
    return MetricsServiceNodeResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<MetricsServiceNodeResponse>): MetricsServiceNodeResponse {
    const message = createBaseMetricsServiceNodeResponse();
    return message;
  },
};

/** A service for sending host and node metrics. */
export type MetricsServiceDefinition = typeof MetricsServiceDefinition;
export const MetricsServiceDefinition = {
  name: "MetricsService",
  fullName: "blockjoy.v1.MetricsService",
  methods: {
    /** Send the metrics for a set of hosts. */
    host: {
      name: "Host",
      requestType: MetricsServiceHostRequest,
      requestStream: false,
      responseType: MetricsServiceHostResponse,
      responseStream: false,
      options: {},
    },
    /** Send the metrics for a set of nodes. */
    node: {
      name: "Node",
      requestType: MetricsServiceNodeRequest,
      requestStream: false,
      responseType: MetricsServiceNodeResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface MetricsServiceImplementation<CallContextExt = {}> {
  /** Send the metrics for a set of hosts. */
  host(
    request: MetricsServiceHostRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<MetricsServiceHostResponse>>;
  /** Send the metrics for a set of nodes. */
  node(
    request: MetricsServiceNodeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<MetricsServiceNodeResponse>>;
}

export interface MetricsServiceClient<CallOptionsExt = {}> {
  /** Send the metrics for a set of hosts. */
  host(
    request: DeepPartial<MetricsServiceHostRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<MetricsServiceHostResponse>;
  /** Send the metrics for a set of nodes. */
  node(
    request: DeepPartial<MetricsServiceNodeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<MetricsServiceNodeResponse>;
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
