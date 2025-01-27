/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Resource } from "./resource";

export const protobufPackage = "blockjoy.common.v1";

/** The reported state of a node. */
export enum NodeState {
  NODE_STATE_UNSPECIFIED = 0,
  /** NODE_STATE_STARTING - The node is in the process of starting. */
  NODE_STATE_STARTING = 1,
  /** NODE_STATE_RUNNING - All processes are running on the node. */
  NODE_STATE_RUNNING = 2,
  /** NODE_STATE_STOPPED - The node has stopped cleanly. */
  NODE_STATE_STOPPED = 3,
  /** NODE_STATE_FAILED - The node has stopped with an error. */
  NODE_STATE_FAILED = 4,
  /** NODE_STATE_UPGRADING - The node is currently being upgraded. */
  NODE_STATE_UPGRADING = 5,
  /** NODE_STATE_DELETING - The node is currently being deleted. */
  NODE_STATE_DELETING = 6,
  /** NODE_STATE_DELETED - The node was deleted. */
  NODE_STATE_DELETED = 7,
  UNRECOGNIZED = -1,
}

/** The requested state for a node to transition to. */
export enum NextState {
  NEXT_STATE_UNSPECIFIED = 0,
  /** NEXT_STATE_STOPPING - A message was sent to stop the node. */
  NEXT_STATE_STOPPING = 1,
  /** NEXT_STATE_DELETING - A message was sent to delete the node. */
  NEXT_STATE_DELETING = 2,
  /** NEXT_STATE_UPGRADING - A message was sent to upgrade the node. */
  NEXT_STATE_UPGRADING = 3,
  UNRECOGNIZED = -1,
}

/** The current health of a node. */
export enum NodeHealth {
  NODE_HEALTH_UNSPECIFIED = 0,
  NODE_HEALTH_HEALTHY = 1,
  NODE_HEALTH_NEUTRAL = 2,
  NODE_HEALTH_UNHEALTHY = 3,
  UNRECOGNIZED = -1,
}

/** Whether nodes will be scheduled on the most or least heavily utilized hosts. */
export enum ResourceAffinity {
  RESOURCE_AFFINITY_UNSPECIFIED = 0,
  /** RESOURCE_AFFINITY_MOST_RESOURCES - Prefer to utilize full hosts first. */
  RESOURCE_AFFINITY_MOST_RESOURCES = 1,
  /** RESOURCE_AFFINITY_LEAST_RESOURCES - Prefer to utilize empty hosts first. */
  RESOURCE_AFFINITY_LEAST_RESOURCES = 2,
  UNRECOGNIZED = -1,
}

/** Whether similar nodes will be placed on the same host or spread over many. */
export enum SimilarNodeAffinity {
  SIMILAR_NODE_AFFINITY_UNSPECIFIED = 0,
  /** SIMILAR_NODE_AFFINITY_CLUSTER - Schedule similar nodes on the same cluster (e.g. for low latency). */
  SIMILAR_NODE_AFFINITY_CLUSTER = 1,
  /** SIMILAR_NODE_AFFINITY_SPREAD - Avoid scheduling on hosts running similar nodes (e.g. for redundancy). */
  SIMILAR_NODE_AFFINITY_SPREAD = 2,
  UNRECOGNIZED = -1,
}

/** Flags describing a job possible states. */
export enum NodeJobStatus {
  NODE_JOB_STATUS_UNSPECIFIED = 0,
  /** NODE_JOB_STATUS_PENDING - The job has not started yet. */
  NODE_JOB_STATUS_PENDING = 1,
  /** NODE_JOB_STATUS_RUNNING - The job is current being executed. */
  NODE_JOB_STATUS_RUNNING = 2,
  /** NODE_JOB_STATUS_FINISHED - The job has successfully finished. */
  NODE_JOB_STATUS_FINISHED = 3,
  /** NODE_JOB_STATUS_FAILED - The job has unsuccessfully finished. */
  NODE_JOB_STATUS_FAILED = 4,
  /** NODE_JOB_STATUS_STOPPED - The job was interrupted. */
  NODE_JOB_STATUS_STOPPED = 5,
  UNRECOGNIZED = -1,
}

/** The current status of a node. */
export interface NodeStatus {
  state: NodeState;
  next?: NextState | undefined;
  protocol?: ProtocolStatus | undefined;
}

/** A protocol-specific status. */
export interface ProtocolStatus {
  state: string;
  health: NodeHealth;
}

/** Determines how and where nodes are created. */
export interface NodeLauncher {
  /** Create nodes on these hosts. */
  byHost?:
    | ByHost
    | undefined;
  /** Create nodes in these regions. */
  byRegion?: ByRegion | undefined;
}

/** Create nodes across multiple hosts. */
export interface ByHost {
  hostCounts: HostCount[];
}

/** Create nodes on this host. */
export interface HostCount {
  hostId: string;
  nodeCount: number;
}

/** Create nodes across multiple regions. */
export interface ByRegion {
  regionCounts: RegionCount[];
}

/** Create nodes in this region. */
export interface RegionCount {
  regionId: string;
  nodeCount: number;
  resource?: ResourceAffinity | undefined;
  similarity?: SimilarNodeAffinity | undefined;
}

/** A job is an auxiliary process for a running node. */
export interface NodeJob {
  /** A name to identify this job by. */
  name: string;
  /** The current status of this job. */
  status: NodeJobStatus;
  /** The exit code of a stopped process. */
  exitCode?:
    | number
    | undefined;
  /** A readable message to manually inspect the state of the job. */
  message?:
    | string
    | undefined;
  /** A list of log lines with information about the current job. */
  logs: string[];
  /** The number of job restarts since the last reset. */
  restarts: number;
  /** Additional info around the completion progress of this job. */
  progress?: NodeJobProgress | undefined;
}

/** The progress a job has made towards completion. */
export interface NodeJobProgress {
  /** The total units of progress to complete. */
  total?:
    | number
    | undefined;
  /** The units of progress currently completed. */
  current?:
    | number
    | undefined;
  /** Additional info on the job progress. */
  message?: string | undefined;
}

export interface NodeReport {
  reportId: string;
  /** The problem description. */
  message: string;
  /** The entity that created the report. */
  createdBy:
    | Resource
    | undefined;
  /** The moment the issue was raised. */
  createdAt: Date | undefined;
}

function createBaseNodeStatus(): NodeStatus {
  return { state: 0, next: undefined, protocol: undefined };
}

export const NodeStatus = {
  encode(message: NodeStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.next !== undefined) {
      writer.uint32(16).int32(message.next);
    }
    if (message.protocol !== undefined) {
      ProtocolStatus.encode(message.protocol, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.next = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.protocol = ProtocolStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeStatus>): NodeStatus {
    return NodeStatus.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeStatus>): NodeStatus {
    const message = createBaseNodeStatus();
    message.state = object.state ?? 0;
    message.next = object.next ?? undefined;
    message.protocol = (object.protocol !== undefined && object.protocol !== null)
      ? ProtocolStatus.fromPartial(object.protocol)
      : undefined;
    return message;
  },
};

function createBaseProtocolStatus(): ProtocolStatus {
  return { state: "", health: 0 };
}

export const ProtocolStatus = {
  encode(message: ProtocolStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== "") {
      writer.uint32(10).string(message.state);
    }
    if (message.health !== 0) {
      writer.uint32(16).int32(message.health);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.state = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.health = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ProtocolStatus>): ProtocolStatus {
    return ProtocolStatus.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProtocolStatus>): ProtocolStatus {
    const message = createBaseProtocolStatus();
    message.state = object.state ?? "";
    message.health = object.health ?? 0;
    return message;
  },
};

function createBaseNodeLauncher(): NodeLauncher {
  return { byHost: undefined, byRegion: undefined };
}

export const NodeLauncher = {
  encode(message: NodeLauncher, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byHost !== undefined) {
      ByHost.encode(message.byHost, writer.uint32(10).fork()).ldelim();
    }
    if (message.byRegion !== undefined) {
      ByRegion.encode(message.byRegion, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeLauncher {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeLauncher();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.byHost = ByHost.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.byRegion = ByRegion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeLauncher>): NodeLauncher {
    return NodeLauncher.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeLauncher>): NodeLauncher {
    const message = createBaseNodeLauncher();
    message.byHost = (object.byHost !== undefined && object.byHost !== null)
      ? ByHost.fromPartial(object.byHost)
      : undefined;
    message.byRegion = (object.byRegion !== undefined && object.byRegion !== null)
      ? ByRegion.fromPartial(object.byRegion)
      : undefined;
    return message;
  },
};

function createBaseByHost(): ByHost {
  return { hostCounts: [] };
}

export const ByHost = {
  encode(message: ByHost, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.hostCounts) {
      HostCount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ByHost {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseByHost();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostCounts.push(HostCount.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ByHost>): ByHost {
    return ByHost.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ByHost>): ByHost {
    const message = createBaseByHost();
    message.hostCounts = object.hostCounts?.map((e) => HostCount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostCount(): HostCount {
  return { hostId: "", nodeCount: 0 };
}

export const HostCount = {
  encode(message: HostCount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.nodeCount !== 0) {
      writer.uint32(16).uint32(message.nodeCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostCount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostCount();
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

          message.nodeCount = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostCount>): HostCount {
    return HostCount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostCount>): HostCount {
    const message = createBaseHostCount();
    message.hostId = object.hostId ?? "";
    message.nodeCount = object.nodeCount ?? 0;
    return message;
  },
};

function createBaseByRegion(): ByRegion {
  return { regionCounts: [] };
}

export const ByRegion = {
  encode(message: ByRegion, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.regionCounts) {
      RegionCount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ByRegion {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseByRegion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.regionCounts.push(RegionCount.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ByRegion>): ByRegion {
    return ByRegion.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ByRegion>): ByRegion {
    const message = createBaseByRegion();
    message.regionCounts = object.regionCounts?.map((e) => RegionCount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRegionCount(): RegionCount {
  return { regionId: "", nodeCount: 0, resource: undefined, similarity: undefined };
}

export const RegionCount = {
  encode(message: RegionCount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.regionId !== "") {
      writer.uint32(10).string(message.regionId);
    }
    if (message.nodeCount !== 0) {
      writer.uint32(16).uint32(message.nodeCount);
    }
    if (message.resource !== undefined) {
      writer.uint32(24).int32(message.resource);
    }
    if (message.similarity !== undefined) {
      writer.uint32(32).int32(message.similarity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegionCount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegionCount();
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
          if (tag !== 16) {
            break;
          }

          message.nodeCount = reader.uint32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.similarity = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RegionCount>): RegionCount {
    return RegionCount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RegionCount>): RegionCount {
    const message = createBaseRegionCount();
    message.regionId = object.regionId ?? "";
    message.nodeCount = object.nodeCount ?? 0;
    message.resource = object.resource ?? undefined;
    message.similarity = object.similarity ?? undefined;
    return message;
  },
};

function createBaseNodeJob(): NodeJob {
  return { name: "", status: 0, exitCode: undefined, message: undefined, logs: [], restarts: 0, progress: undefined };
}

export const NodeJob = {
  encode(message: NodeJob, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.exitCode !== undefined) {
      writer.uint32(24).int32(message.exitCode);
    }
    if (message.message !== undefined) {
      writer.uint32(34).string(message.message);
    }
    for (const v of message.logs) {
      writer.uint32(42).string(v!);
    }
    if (message.restarts !== 0) {
      writer.uint32(48).uint64(message.restarts);
    }
    if (message.progress !== undefined) {
      NodeJobProgress.encode(message.progress, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeJob {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeJob();
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
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.exitCode = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.logs.push(reader.string());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.restarts = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.progress = NodeJobProgress.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeJob>): NodeJob {
    return NodeJob.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeJob>): NodeJob {
    const message = createBaseNodeJob();
    message.name = object.name ?? "";
    message.status = object.status ?? 0;
    message.exitCode = object.exitCode ?? undefined;
    message.message = object.message ?? undefined;
    message.logs = object.logs?.map((e) => e) || [];
    message.restarts = object.restarts ?? 0;
    message.progress = (object.progress !== undefined && object.progress !== null)
      ? NodeJobProgress.fromPartial(object.progress)
      : undefined;
    return message;
  },
};

function createBaseNodeJobProgress(): NodeJobProgress {
  return { total: undefined, current: undefined, message: undefined };
}

export const NodeJobProgress = {
  encode(message: NodeJobProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== undefined) {
      writer.uint32(8).uint32(message.total);
    }
    if (message.current !== undefined) {
      writer.uint32(16).uint32(message.current);
    }
    if (message.message !== undefined) {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeJobProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeJobProgress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.current = reader.uint32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeJobProgress>): NodeJobProgress {
    return NodeJobProgress.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeJobProgress>): NodeJobProgress {
    const message = createBaseNodeJobProgress();
    message.total = object.total ?? undefined;
    message.current = object.current ?? undefined;
    message.message = object.message ?? undefined;
    return message;
  },
};

function createBaseNodeReport(): NodeReport {
  return { reportId: "", message: "", createdBy: undefined, createdAt: undefined };
}

export const NodeReport = {
  encode(message: NodeReport, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reportId !== "") {
      writer.uint32(10).string(message.reportId);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.createdBy !== undefined) {
      Resource.encode(message.createdBy, writer.uint32(26).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeReport {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeReport();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.reportId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.createdBy = Resource.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeReport>): NodeReport {
    return NodeReport.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeReport>): NodeReport {
    const message = createBaseNodeReport();
    message.reportId = object.reportId ?? "";
    message.message = object.message ?? "";
    message.createdBy = (object.createdBy !== undefined && object.createdBy !== null)
      ? Resource.fromPartial(object.createdBy)
      : undefined;
    message.createdAt = object.createdAt ?? undefined;
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
