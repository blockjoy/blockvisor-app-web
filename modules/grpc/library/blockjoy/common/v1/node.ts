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

/** Determines the placement of a new node. */
export interface NodePlacement {
  /** Find a suitable host. */
  scheduler?:
    | NodeScheduler
    | undefined;
  /** Create a node on this host. */
  hostId?:
    | string
    | undefined;
  /** Create multiple nodes on these hosts. */
  multiple?: MultipleNodes | undefined;
}

/** Controls how a suitable host is found for a node. */
export interface NodeScheduler {
  /** Affinity to scheduling on the most or least heavily utilized hosts. */
  resource: ResourceAffinity;
  /** Affinity to similar nodes on a host. This takes precedence over `resource`. */
  similarity?:
    | SimilarNodeAffinity
    | undefined;
  /** The region for the node. This takes precedence over `similarity`. */
  region?: string | undefined;
}

export interface MultipleNodes {
  nodeCounts: NodeCount[];
}

export interface NodeCount {
  hostId: string;
  nodeCount: number;
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

function createBaseNodePlacement(): NodePlacement {
  return { scheduler: undefined, hostId: undefined, multiple: undefined };
}

export const NodePlacement = {
  encode(message: NodePlacement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.scheduler !== undefined) {
      NodeScheduler.encode(message.scheduler, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostId !== undefined) {
      writer.uint32(18).string(message.hostId);
    }
    if (message.multiple !== undefined) {
      MultipleNodes.encode(message.multiple, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodePlacement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodePlacement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.scheduler = NodeScheduler.decode(reader, reader.uint32());
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

          message.multiple = MultipleNodes.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodePlacement>): NodePlacement {
    return NodePlacement.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodePlacement>): NodePlacement {
    const message = createBaseNodePlacement();
    message.scheduler = (object.scheduler !== undefined && object.scheduler !== null)
      ? NodeScheduler.fromPartial(object.scheduler)
      : undefined;
    message.hostId = object.hostId ?? undefined;
    message.multiple = (object.multiple !== undefined && object.multiple !== null)
      ? MultipleNodes.fromPartial(object.multiple)
      : undefined;
    return message;
  },
};

function createBaseNodeScheduler(): NodeScheduler {
  return { resource: 0, similarity: undefined, region: undefined };
}

export const NodeScheduler = {
  encode(message: NodeScheduler, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== 0) {
      writer.uint32(8).int32(message.resource);
    }
    if (message.similarity !== undefined) {
      writer.uint32(16).int32(message.similarity);
    }
    if (message.region !== undefined) {
      writer.uint32(26).string(message.region);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeScheduler {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeScheduler();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.similarity = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.region = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeScheduler>): NodeScheduler {
    return NodeScheduler.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeScheduler>): NodeScheduler {
    const message = createBaseNodeScheduler();
    message.resource = object.resource ?? 0;
    message.similarity = object.similarity ?? undefined;
    message.region = object.region ?? undefined;
    return message;
  },
};

function createBaseMultipleNodes(): MultipleNodes {
  return { nodeCounts: [] };
}

export const MultipleNodes = {
  encode(message: MultipleNodes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nodeCounts) {
      NodeCount.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MultipleNodes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultipleNodes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeCounts.push(NodeCount.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<MultipleNodes>): MultipleNodes {
    return MultipleNodes.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<MultipleNodes>): MultipleNodes {
    const message = createBaseMultipleNodes();
    message.nodeCounts = object.nodeCounts?.map((e) => NodeCount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeCount(): NodeCount {
  return { hostId: "", nodeCount: 0 };
}

export const NodeCount = {
  encode(message: NodeCount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.nodeCount !== 0) {
      writer.uint32(16).uint32(message.nodeCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCount();
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

  create(base?: DeepPartial<NodeCount>): NodeCount {
    return NodeCount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeCount>): NodeCount {
    const message = createBaseNodeCount();
    message.hostId = object.hostId ?? "";
    message.nodeCount = object.nodeCount ?? 0;
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
