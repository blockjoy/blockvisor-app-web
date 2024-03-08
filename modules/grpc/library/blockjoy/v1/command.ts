/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { FirewallRule } from "../common/v1/firewall";
import { ImageIdentifier } from "../common/v1/image";
import { NodeType } from "../common/v1/node";

export const protobufPackage = "blockjoy.v1";

/** Exit code type after executing a command. */
export enum CommandExitCode {
  COMMAND_EXIT_CODE_UNSPECIFIED = 0,
  COMMAND_EXIT_CODE_OK = 1,
  COMMAND_EXIT_CODE_INTERNAL_ERROR = 2,
  COMMAND_EXIT_CODE_NODE_NOT_FOUND = 3,
  COMMAND_EXIT_CODE_BLOCKING_JOB_RUNNING = 4,
  COMMAND_EXIT_CODE_SERVICE_NOT_READY = 5,
  COMMAND_EXIT_CODE_SERVICE_BROKEN = 6,
  COMMAND_EXIT_CODE_NOT_SUPPORTED = 7,
  UNRECOGNIZED = -1,
}

export interface Command {
  /** A unique command identifier. */
  id: string;
  /** A command may have an exit code. */
  exitCode?:
    | CommandExitCode
    | undefined;
  /** A command may have an outcome message. */
  exitMessage?:
    | string
    | undefined;
  /** A command may exit with a transient error and time to retry. */
  retryHintSeconds?:
    | number
    | undefined;
  /** The time the command was created. */
  createdAt:
    | Date
    | undefined;
  /** The time the client acknowledged receipt (even if not yet processed). */
  ackedAt: Date | undefined;
  node?: NodeCommand | undefined;
  host?: HostCommand | undefined;
}

export interface CommandServiceListRequest {
  nodeId?: string | undefined;
  hostId?: string | undefined;
  exitCode?: CommandExitCode | undefined;
}

export interface CommandServiceListResponse {
  commands: Command[];
}

export interface CommandServiceUpdateRequest {
  id: string;
  exitCode?: CommandExitCode | undefined;
  exitMessage?: string | undefined;
  retryHintSeconds?: number | undefined;
}

export interface CommandServiceUpdateResponse {
  command: Command | undefined;
}

export interface CommandServiceAckRequest {
  id: string;
}

export interface CommandServiceAckResponse {
}

export interface CommandServicePendingRequest {
  hostId: string;
  filterType?: string | undefined;
}

export interface CommandServicePendingResponse {
  commands: Command[];
}

export interface HostCommand {
  hostId: string;
  start?: HostStart | undefined;
  stop?: HostStop | undefined;
  restart?: HostRestart | undefined;
  pending?: HostPending | undefined;
}

export interface HostStart {
}

export interface HostStop {
}

export interface HostRestart {
}

export interface HostPending {
}

export interface NodeCommand {
  nodeId: string;
  hostId: string;
  create?: NodeCreate | undefined;
  start?: NodeStart | undefined;
  stop?: NodeStop | undefined;
  restart?: NodeRestart | undefined;
  upgrade?: NodeUpgrade | undefined;
  update?: NodeUpdate | undefined;
  delete?: NodeDelete | undefined;
}

export interface NodeStart {
}

export interface NodeStop {
}

export interface NodeRestart {
}

/** Upgrade a node to a new image. */
export interface NodeUpgrade {
  image: ImageIdentifier | undefined;
}

export interface NodeUpdate {
  rules: FirewallRule[];
  orgId: string;
}

export interface NodeCreate {
  name: string;
  blockchain: string;
  image: ImageIdentifier | undefined;
  nodeType: NodeType;
  ip: string;
  gateway: string;
  properties: Parameter[];
  rules: FirewallRule[];
  network: string;
  orgId: string;
}

export interface Parameter {
  name: string;
  value: string;
}

export interface NodeDelete {
}

function createBaseCommand(): Command {
  return {
    id: "",
    exitCode: undefined,
    exitMessage: undefined,
    retryHintSeconds: undefined,
    createdAt: undefined,
    ackedAt: undefined,
    node: undefined,
    host: undefined,
  };
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.exitCode !== undefined) {
      writer.uint32(16).int32(message.exitCode);
    }
    if (message.exitMessage !== undefined) {
      writer.uint32(26).string(message.exitMessage);
    }
    if (message.retryHintSeconds !== undefined) {
      writer.uint32(32).uint64(message.retryHintSeconds);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.ackedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.ackedAt), writer.uint32(50).fork()).ldelim();
    }
    if (message.node !== undefined) {
      NodeCommand.encode(message.node, writer.uint32(58).fork()).ldelim();
    }
    if (message.host !== undefined) {
      HostCommand.encode(message.host, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exitCode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.exitMessage = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.retryHintSeconds = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.ackedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.node = NodeCommand.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.host = HostCommand.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Command>): Command {
    return Command.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Command>): Command {
    const message = createBaseCommand();
    message.id = object.id ?? "";
    message.exitCode = object.exitCode ?? undefined;
    message.exitMessage = object.exitMessage ?? undefined;
    message.retryHintSeconds = object.retryHintSeconds ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.ackedAt = object.ackedAt ?? undefined;
    message.node = (object.node !== undefined && object.node !== null)
      ? NodeCommand.fromPartial(object.node)
      : undefined;
    message.host = (object.host !== undefined && object.host !== null)
      ? HostCommand.fromPartial(object.host)
      : undefined;
    return message;
  },
};

function createBaseCommandServiceListRequest(): CommandServiceListRequest {
  return { nodeId: undefined, hostId: undefined, exitCode: undefined };
}

export const CommandServiceListRequest = {
  encode(message: CommandServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== undefined) {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.hostId !== undefined) {
      writer.uint32(18).string(message.hostId);
    }
    if (message.exitCode !== undefined) {
      writer.uint32(24).int32(message.exitCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceListRequest();
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

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.exitCode = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServiceListRequest>): CommandServiceListRequest {
    return CommandServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceListRequest>): CommandServiceListRequest {
    const message = createBaseCommandServiceListRequest();
    message.nodeId = object.nodeId ?? undefined;
    message.hostId = object.hostId ?? undefined;
    message.exitCode = object.exitCode ?? undefined;
    return message;
  },
};

function createBaseCommandServiceListResponse(): CommandServiceListResponse {
  return { commands: [] };
}

export const CommandServiceListResponse = {
  encode(message: CommandServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.commands) {
      Command.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commands.push(Command.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServiceListResponse>): CommandServiceListResponse {
    return CommandServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceListResponse>): CommandServiceListResponse {
    const message = createBaseCommandServiceListResponse();
    message.commands = object.commands?.map((e) => Command.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCommandServiceUpdateRequest(): CommandServiceUpdateRequest {
  return { id: "", exitCode: undefined, exitMessage: undefined, retryHintSeconds: undefined };
}

export const CommandServiceUpdateRequest = {
  encode(message: CommandServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.exitCode !== undefined) {
      writer.uint32(16).int32(message.exitCode);
    }
    if (message.exitMessage !== undefined) {
      writer.uint32(26).string(message.exitMessage);
    }
    if (message.retryHintSeconds !== undefined) {
      writer.uint32(32).uint64(message.retryHintSeconds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.exitCode = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.exitMessage = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.retryHintSeconds = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServiceUpdateRequest>): CommandServiceUpdateRequest {
    return CommandServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceUpdateRequest>): CommandServiceUpdateRequest {
    const message = createBaseCommandServiceUpdateRequest();
    message.id = object.id ?? "";
    message.exitCode = object.exitCode ?? undefined;
    message.exitMessage = object.exitMessage ?? undefined;
    message.retryHintSeconds = object.retryHintSeconds ?? undefined;
    return message;
  },
};

function createBaseCommandServiceUpdateResponse(): CommandServiceUpdateResponse {
  return { command: undefined };
}

export const CommandServiceUpdateResponse = {
  encode(message: CommandServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.command = Command.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServiceUpdateResponse>): CommandServiceUpdateResponse {
    return CommandServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceUpdateResponse>): CommandServiceUpdateResponse {
    const message = createBaseCommandServiceUpdateResponse();
    message.command = (object.command !== undefined && object.command !== null)
      ? Command.fromPartial(object.command)
      : undefined;
    return message;
  },
};

function createBaseCommandServiceAckRequest(): CommandServiceAckRequest {
  return { id: "" };
}

export const CommandServiceAckRequest = {
  encode(message: CommandServiceAckRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceAckRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceAckRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServiceAckRequest>): CommandServiceAckRequest {
    return CommandServiceAckRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceAckRequest>): CommandServiceAckRequest {
    const message = createBaseCommandServiceAckRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCommandServiceAckResponse(): CommandServiceAckResponse {
  return {};
}

export const CommandServiceAckResponse = {
  encode(_: CommandServiceAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceAckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceAckResponse();
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

  create(base?: DeepPartial<CommandServiceAckResponse>): CommandServiceAckResponse {
    return CommandServiceAckResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<CommandServiceAckResponse>): CommandServiceAckResponse {
    const message = createBaseCommandServiceAckResponse();
    return message;
  },
};

function createBaseCommandServicePendingRequest(): CommandServicePendingRequest {
  return { hostId: "", filterType: undefined };
}

export const CommandServicePendingRequest = {
  encode(message: CommandServicePendingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.filterType !== undefined) {
      writer.uint32(18).string(message.filterType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServicePendingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServicePendingRequest();
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
          if (tag !== 18) {
            break;
          }

          message.filterType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServicePendingRequest>): CommandServicePendingRequest {
    return CommandServicePendingRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServicePendingRequest>): CommandServicePendingRequest {
    const message = createBaseCommandServicePendingRequest();
    message.hostId = object.hostId ?? "";
    message.filterType = object.filterType ?? undefined;
    return message;
  },
};

function createBaseCommandServicePendingResponse(): CommandServicePendingResponse {
  return { commands: [] };
}

export const CommandServicePendingResponse = {
  encode(message: CommandServicePendingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.commands) {
      Command.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServicePendingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServicePendingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.commands.push(Command.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServicePendingResponse>): CommandServicePendingResponse {
    return CommandServicePendingResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServicePendingResponse>): CommandServicePendingResponse {
    const message = createBaseCommandServicePendingResponse();
    message.commands = object.commands?.map((e) => Command.fromPartial(e)) || [];
    return message;
  },
};

function createBaseHostCommand(): HostCommand {
  return { hostId: "", start: undefined, stop: undefined, restart: undefined, pending: undefined };
}

export const HostCommand = {
  encode(message: HostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.start !== undefined) {
      HostStart.encode(message.start, writer.uint32(26).fork()).ldelim();
    }
    if (message.stop !== undefined) {
      HostStop.encode(message.stop, writer.uint32(34).fork()).ldelim();
    }
    if (message.restart !== undefined) {
      HostRestart.encode(message.restart, writer.uint32(42).fork()).ldelim();
    }
    if (message.pending !== undefined) {
      HostPending.encode(message.pending, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.start = HostStart.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.stop = HostStop.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.restart = HostRestart.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.pending = HostPending.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostCommand>): HostCommand {
    return HostCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostCommand>): HostCommand {
    const message = createBaseHostCommand();
    message.hostId = object.hostId ?? "";
    message.start = (object.start !== undefined && object.start !== null)
      ? HostStart.fromPartial(object.start)
      : undefined;
    message.stop = (object.stop !== undefined && object.stop !== null) ? HostStop.fromPartial(object.stop) : undefined;
    message.restart = (object.restart !== undefined && object.restart !== null)
      ? HostRestart.fromPartial(object.restart)
      : undefined;
    message.pending = (object.pending !== undefined && object.pending !== null)
      ? HostPending.fromPartial(object.pending)
      : undefined;
    return message;
  },
};

function createBaseHostStart(): HostStart {
  return {};
}

export const HostStart = {
  encode(_: HostStart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostStart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostStart();
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

  create(base?: DeepPartial<HostStart>): HostStart {
    return HostStart.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostStart>): HostStart {
    const message = createBaseHostStart();
    return message;
  },
};

function createBaseHostStop(): HostStop {
  return {};
}

export const HostStop = {
  encode(_: HostStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostStop {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostStop();
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

  create(base?: DeepPartial<HostStop>): HostStop {
    return HostStop.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostStop>): HostStop {
    const message = createBaseHostStop();
    return message;
  },
};

function createBaseHostRestart(): HostRestart {
  return {};
}

export const HostRestart = {
  encode(_: HostRestart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostRestart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostRestart();
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

  create(base?: DeepPartial<HostRestart>): HostRestart {
    return HostRestart.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostRestart>): HostRestart {
    const message = createBaseHostRestart();
    return message;
  },
};

function createBaseHostPending(): HostPending {
  return {};
}

export const HostPending = {
  encode(_: HostPending, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostPending {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostPending();
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

  create(base?: DeepPartial<HostPending>): HostPending {
    return HostPending.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<HostPending>): HostPending {
    const message = createBaseHostPending();
    return message;
  },
};

function createBaseNodeCommand(): NodeCommand {
  return {
    nodeId: "",
    hostId: "",
    create: undefined,
    start: undefined,
    stop: undefined,
    restart: undefined,
    upgrade: undefined,
    update: undefined,
    delete: undefined,
  };
}

export const NodeCommand = {
  encode(message: NodeCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.hostId !== "") {
      writer.uint32(18).string(message.hostId);
    }
    if (message.create !== undefined) {
      NodeCreate.encode(message.create, writer.uint32(26).fork()).ldelim();
    }
    if (message.start !== undefined) {
      NodeStart.encode(message.start, writer.uint32(34).fork()).ldelim();
    }
    if (message.stop !== undefined) {
      NodeStop.encode(message.stop, writer.uint32(42).fork()).ldelim();
    }
    if (message.restart !== undefined) {
      NodeRestart.encode(message.restart, writer.uint32(50).fork()).ldelim();
    }
    if (message.upgrade !== undefined) {
      NodeUpgrade.encode(message.upgrade, writer.uint32(58).fork()).ldelim();
    }
    if (message.update !== undefined) {
      NodeUpdate.encode(message.update, writer.uint32(66).fork()).ldelim();
    }
    if (message.delete !== undefined) {
      NodeDelete.encode(message.delete, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCommand();
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

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.create = NodeCreate.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.start = NodeStart.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.stop = NodeStop.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.restart = NodeRestart.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.upgrade = NodeUpgrade.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.update = NodeUpdate.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.delete = NodeDelete.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeCommand>): NodeCommand {
    return NodeCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeCommand>): NodeCommand {
    const message = createBaseNodeCommand();
    message.nodeId = object.nodeId ?? "";
    message.hostId = object.hostId ?? "";
    message.create = (object.create !== undefined && object.create !== null)
      ? NodeCreate.fromPartial(object.create)
      : undefined;
    message.start = (object.start !== undefined && object.start !== null)
      ? NodeStart.fromPartial(object.start)
      : undefined;
    message.stop = (object.stop !== undefined && object.stop !== null) ? NodeStop.fromPartial(object.stop) : undefined;
    message.restart = (object.restart !== undefined && object.restart !== null)
      ? NodeRestart.fromPartial(object.restart)
      : undefined;
    message.upgrade = (object.upgrade !== undefined && object.upgrade !== null)
      ? NodeUpgrade.fromPartial(object.upgrade)
      : undefined;
    message.update = (object.update !== undefined && object.update !== null)
      ? NodeUpdate.fromPartial(object.update)
      : undefined;
    message.delete = (object.delete !== undefined && object.delete !== null)
      ? NodeDelete.fromPartial(object.delete)
      : undefined;
    return message;
  },
};

function createBaseNodeStart(): NodeStart {
  return {};
}

export const NodeStart = {
  encode(_: NodeStart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStart();
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

  create(base?: DeepPartial<NodeStart>): NodeStart {
    return NodeStart.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeStart>): NodeStart {
    const message = createBaseNodeStart();
    return message;
  },
};

function createBaseNodeStop(): NodeStop {
  return {};
}

export const NodeStop = {
  encode(_: NodeStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeStop {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeStop();
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

  create(base?: DeepPartial<NodeStop>): NodeStop {
    return NodeStop.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeStop>): NodeStop {
    const message = createBaseNodeStop();
    return message;
  },
};

function createBaseNodeRestart(): NodeRestart {
  return {};
}

export const NodeRestart = {
  encode(_: NodeRestart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeRestart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeRestart();
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

  create(base?: DeepPartial<NodeRestart>): NodeRestart {
    return NodeRestart.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeRestart>): NodeRestart {
    const message = createBaseNodeRestart();
    return message;
  },
};

function createBaseNodeUpgrade(): NodeUpgrade {
  return { image: undefined };
}

export const NodeUpgrade = {
  encode(message: NodeUpgrade, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.image !== undefined) {
      ImageIdentifier.encode(message.image, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUpgrade {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.image = ImageIdentifier.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeUpgrade>): NodeUpgrade {
    return NodeUpgrade.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeUpgrade>): NodeUpgrade {
    const message = createBaseNodeUpgrade();
    message.image = (object.image !== undefined && object.image !== null)
      ? ImageIdentifier.fromPartial(object.image)
      : undefined;
    return message;
  },
};

function createBaseNodeUpdate(): NodeUpdate {
  return { rules: [], orgId: "" };
}

export const NodeUpdate = {
  encode(message: NodeUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rules) {
      FirewallRule.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rules.push(FirewallRule.decode(reader, reader.uint32()));
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

  create(base?: DeepPartial<NodeUpdate>): NodeUpdate {
    return NodeUpdate.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeUpdate>): NodeUpdate {
    const message = createBaseNodeUpdate();
    message.rules = object.rules?.map((e) => FirewallRule.fromPartial(e)) || [];
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseNodeCreate(): NodeCreate {
  return {
    name: "",
    blockchain: "",
    image: undefined,
    nodeType: 0,
    ip: "",
    gateway: "",
    properties: [],
    rules: [],
    network: "",
    orgId: "",
  };
}

export const NodeCreate = {
  encode(message: NodeCreate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.blockchain !== "") {
      writer.uint32(18).string(message.blockchain);
    }
    if (message.image !== undefined) {
      ImageIdentifier.encode(message.image, writer.uint32(26).fork()).ldelim();
    }
    if (message.nodeType !== 0) {
      writer.uint32(32).int32(message.nodeType);
    }
    if (message.ip !== "") {
      writer.uint32(42).string(message.ip);
    }
    if (message.gateway !== "") {
      writer.uint32(50).string(message.gateway);
    }
    for (const v of message.properties) {
      Parameter.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.rules) {
      FirewallRule.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(74).string(message.network);
    }
    if (message.orgId !== "") {
      writer.uint32(82).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCreate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCreate();
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

          message.blockchain = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.image = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.gateway = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.properties.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.rules.push(FirewallRule.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.network = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
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

  create(base?: DeepPartial<NodeCreate>): NodeCreate {
    return NodeCreate.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeCreate>): NodeCreate {
    const message = createBaseNodeCreate();
    message.name = object.name ?? "";
    message.blockchain = object.blockchain ?? "";
    message.image = (object.image !== undefined && object.image !== null)
      ? ImageIdentifier.fromPartial(object.image)
      : undefined;
    message.nodeType = object.nodeType ?? 0;
    message.ip = object.ip ?? "";
    message.gateway = object.gateway ?? "";
    message.properties = object.properties?.map((e) => Parameter.fromPartial(e)) || [];
    message.rules = object.rules?.map((e) => FirewallRule.fromPartial(e)) || [];
    message.network = object.network ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseParameter(): Parameter {
  return { name: "", value: "" };
}

export const Parameter = {
  encode(message: Parameter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Parameter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParameter();
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

  create(base?: DeepPartial<Parameter>): Parameter {
    return Parameter.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Parameter>): Parameter {
    const message = createBaseParameter();
    message.name = object.name ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseNodeDelete(): NodeDelete {
  return {};
}

export const NodeDelete = {
  encode(_: NodeDelete, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeDelete {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeDelete();
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

  create(base?: DeepPartial<NodeDelete>): NodeDelete {
    return NodeDelete.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeDelete>): NodeDelete {
    const message = createBaseNodeDelete();
    return message;
  },
};

/** Commands to be executed on a host. */
export type CommandServiceDefinition = typeof CommandServiceDefinition;
export const CommandServiceDefinition = {
  name: "CommandService",
  fullName: "blockjoy.v1.CommandService",
  methods: {
    /** Allows a user to retrieve a list of commands using a set of filter params. */
    list: {
      name: "List",
      requestType: CommandServiceListRequest,
      requestStream: false,
      responseType: CommandServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Update the status of a command (only used by the host). */
    update: {
      name: "Update",
      requestType: CommandServiceUpdateRequest,
      requestStream: false,
      responseType: CommandServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Acknowledge the reciept of a command. */
    ack: {
      name: "Ack",
      requestType: CommandServiceAckRequest,
      requestStream: false,
      responseType: CommandServiceAckResponse,
      responseStream: false,
      options: {},
    },
    /** Get a list of unacknowledged commands. */
    pending: {
      name: "Pending",
      requestType: CommandServicePendingRequest,
      requestStream: false,
      responseType: CommandServicePendingResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface CommandServiceImplementation<CallContextExt = {}> {
  /** Allows a user to retrieve a list of commands using a set of filter params. */
  list(
    request: CommandServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceListResponse>>;
  /** Update the status of a command (only used by the host). */
  update(
    request: CommandServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceUpdateResponse>>;
  /** Acknowledge the reciept of a command. */
  ack(
    request: CommandServiceAckRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceAckResponse>>;
  /** Get a list of unacknowledged commands. */
  pending(
    request: CommandServicePendingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServicePendingResponse>>;
}

export interface CommandServiceClient<CallOptionsExt = {}> {
  /** Allows a user to retrieve a list of commands using a set of filter params. */
  list(
    request: DeepPartial<CommandServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceListResponse>;
  /** Update the status of a command (only used by the host). */
  update(
    request: DeepPartial<CommandServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceUpdateResponse>;
  /** Acknowledge the reciept of a command. */
  ack(
    request: DeepPartial<CommandServiceAckRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceAckResponse>;
  /** Get a list of unacknowledged commands. */
  pending(
    request: DeepPartial<CommandServicePendingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServicePendingResponse>;
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
