/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { NodeType } from "./node";

export const protobufPackage = "blockjoy.v1";

export enum Action {
  ACTION_UNSPECIFIED = 0,
  ACTION_ALLOW = 1,
  ACTION_DENY = 2,
  ACTION_REJECT = 3,
  UNRECOGNIZED = -1,
}

export enum Direction {
  DIRECTION_UNSPECIFIED = 0,
  DIRECTION_OUT = 1,
  DIRECTION_IN = 2,
  UNRECOGNIZED = -1,
}

export enum Protocol {
  PROTOCOL_UNSPECIFIED = 0,
  PROTOCOL_TCP = 1,
  PROTOCOL_UDP = 2,
  PROTOCOL_BOTH = 3,
  UNRECOGNIZED = -1,
}

export interface Command {
  /** Each command has a unique id that identifies it. */
  id: string;
  /** A command may have an outcome message. */
  response?:
    | string
    | undefined;
  /** A command may have an exit code. */
  exitCode?: number | undefined;
  node?: NodeCommand | undefined;
  host?: HostCommand | undefined;
}

/**
 * This request is used to create new commands. They will be stored in the
 * database and then emitted over MQTT to the clients that have subscribed.
 */
export interface CommandServiceCreateRequest {
  /** This variant will cause a new `StartNodeCommand` to be created. */
  startNode?:
    | StartNodeCommand
    | undefined;
  /** This variant will cause a new `StopNodeCommand` to be created. */
  stopNode?:
    | StopNodeCommand
    | undefined;
  /** This variant will cause a new `RestartNodeCommand` to be created. */
  restartNode?:
    | RestartNodeCommand
    | undefined;
  /** This variant will cause a new `StartHostCommand` to be created. */
  startHost?:
    | StartHostCommand
    | undefined;
  /** This variant will cause a new `StopHostCommand` to be created. */
  stopHost?:
    | StopHostCommand
    | undefined;
  /** This variant will cause a new `RestartHostCommand` to be created. */
  restartHost?: RestartHostCommand | undefined;
}

export interface CommandServiceCreateResponse {
  command: Command | undefined;
}

export interface CommandServiceGetRequest {
  id: string;
}

export interface CommandServiceGetResponse {
  command: Command | undefined;
}

export interface CommandServiceUpdateRequest {
  id: string;
  response?: string | undefined;
  exitCode?: number | undefined;
}

export interface CommandServiceUpdateResponse {
  command: Command | undefined;
}

export interface CommandServicePendingRequest {
  hostId: string;
  filterType?: string | undefined;
}

export interface CommandServicePendingResponse {
  commands: Command[];
}

export interface NodeCommand {
  nodeId: string;
  hostId: string;
  apiCommandId: string;
  createdAt: Date | undefined;
  start?: NodeStart | undefined;
  stop?: NodeStop | undefined;
  restart?: NodeRestart | undefined;
  upgrade?: NodeUpgrade | undefined;
  update?: NodeUpdate | undefined;
  infoGet?: NodeGet | undefined;
  create?: NodeCreate | undefined;
  delete?: NodeDelete | undefined;
}

export interface NodeStart {
}

export interface NodeStop {
}

export interface NodeRestart {
}

/** Updates a node to use a new OS-image */
export interface NodeUpgrade {
  image: ContainerImage | undefined;
}

export interface NodeUpdate {
  selfUpdate?: boolean | undefined;
  rules: Rule[];
}

export interface NodeGet {
}

export interface NodeCreate {
  name: string;
  blockchain: string;
  image: ContainerImage | undefined;
  nodeType: NodeType;
  ip: string;
  gateway: string;
  selfUpdate: boolean;
  properties: Parameter[];
  rules: Rule[];
  network: string;
}

export interface NodeDelete {
}

export interface Parameter {
  name: string;
  value: string;
}

export interface ContainerImage {
  /** snake_cased name of the blockchain */
  protocol: string;
  /** snake_cased name of the node type */
  nodeType: NodeType;
  /** semantic version string of the node type version */
  nodeVersion: string;
}

export interface Rule {
  name: string;
  action: Action;
  direction: Direction;
  protocol: Protocol;
  ips?: string | undefined;
  ports: number[];
}

export interface HostCommand {
  /** We don't do this yet, but it is here for forwards compatibility. */
  hostId: string;
}

/**
 * Implies that the node identified by `node_id` should be started. If the node
 * is already running, this message should be ignored.
 */
export interface StartNodeCommand {
  /** The node to be started. */
  nodeId: string;
}

/**
 * Implies that the node identified by `node_id` should be stopped. If the node
 * is already stopped, this message should be ignored.
 */
export interface StopNodeCommand {
  /** The node to be stopped. */
  nodeId: string;
}

/**
 * Implies that the node identified by `node_id` should be restarted. If the
 * node is already stopped, it should just be started.
 */
export interface RestartNodeCommand {
  /** The node to be restarted. */
  nodeId: string;
}

export interface StartHostCommand {
  hostId: string;
}

export interface StopHostCommand {
  hostId: string;
}

export interface RestartHostCommand {
  hostId: string;
}

function createBaseCommand(): Command {
  return { id: "", response: undefined, exitCode: undefined, node: undefined, host: undefined };
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.response !== undefined) {
      writer.uint32(18).string(message.response);
    }
    if (message.exitCode !== undefined) {
      writer.uint32(24).int32(message.exitCode);
    }
    if (message.node !== undefined) {
      NodeCommand.encode(message.node, writer.uint32(34).fork()).ldelim();
    }
    if (message.host !== undefined) {
      HostCommand.encode(message.host, writer.uint32(42).fork()).ldelim();
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
          if (tag !== 18) {
            break;
          }

          message.response = reader.string();
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

          message.node = NodeCommand.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
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
    message.response = object.response ?? undefined;
    message.exitCode = object.exitCode ?? undefined;
    message.node = (object.node !== undefined && object.node !== null)
      ? NodeCommand.fromPartial(object.node)
      : undefined;
    message.host = (object.host !== undefined && object.host !== null)
      ? HostCommand.fromPartial(object.host)
      : undefined;
    return message;
  },
};

function createBaseCommandServiceCreateRequest(): CommandServiceCreateRequest {
  return {
    startNode: undefined,
    stopNode: undefined,
    restartNode: undefined,
    startHost: undefined,
    stopHost: undefined,
    restartHost: undefined,
  };
}

export const CommandServiceCreateRequest = {
  encode(message: CommandServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.startNode !== undefined) {
      StartNodeCommand.encode(message.startNode, writer.uint32(10).fork()).ldelim();
    }
    if (message.stopNode !== undefined) {
      StopNodeCommand.encode(message.stopNode, writer.uint32(18).fork()).ldelim();
    }
    if (message.restartNode !== undefined) {
      RestartNodeCommand.encode(message.restartNode, writer.uint32(26).fork()).ldelim();
    }
    if (message.startHost !== undefined) {
      StartHostCommand.encode(message.startHost, writer.uint32(34).fork()).ldelim();
    }
    if (message.stopHost !== undefined) {
      StopHostCommand.encode(message.stopHost, writer.uint32(42).fork()).ldelim();
    }
    if (message.restartHost !== undefined) {
      RestartHostCommand.encode(message.restartHost, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.startNode = StartNodeCommand.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stopNode = StopNodeCommand.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.restartNode = RestartNodeCommand.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.startHost = StartHostCommand.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.stopHost = StopHostCommand.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.restartHost = RestartHostCommand.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CommandServiceCreateRequest>): CommandServiceCreateRequest {
    return CommandServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceCreateRequest>): CommandServiceCreateRequest {
    const message = createBaseCommandServiceCreateRequest();
    message.startNode = (object.startNode !== undefined && object.startNode !== null)
      ? StartNodeCommand.fromPartial(object.startNode)
      : undefined;
    message.stopNode = (object.stopNode !== undefined && object.stopNode !== null)
      ? StopNodeCommand.fromPartial(object.stopNode)
      : undefined;
    message.restartNode = (object.restartNode !== undefined && object.restartNode !== null)
      ? RestartNodeCommand.fromPartial(object.restartNode)
      : undefined;
    message.startHost = (object.startHost !== undefined && object.startHost !== null)
      ? StartHostCommand.fromPartial(object.startHost)
      : undefined;
    message.stopHost = (object.stopHost !== undefined && object.stopHost !== null)
      ? StopHostCommand.fromPartial(object.stopHost)
      : undefined;
    message.restartHost = (object.restartHost !== undefined && object.restartHost !== null)
      ? RestartHostCommand.fromPartial(object.restartHost)
      : undefined;
    return message;
  },
};

function createBaseCommandServiceCreateResponse(): CommandServiceCreateResponse {
  return { command: undefined };
}

export const CommandServiceCreateResponse = {
  encode(message: CommandServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceCreateResponse();
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

  create(base?: DeepPartial<CommandServiceCreateResponse>): CommandServiceCreateResponse {
    return CommandServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceCreateResponse>): CommandServiceCreateResponse {
    const message = createBaseCommandServiceCreateResponse();
    message.command = (object.command !== undefined && object.command !== null)
      ? Command.fromPartial(object.command)
      : undefined;
    return message;
  },
};

function createBaseCommandServiceGetRequest(): CommandServiceGetRequest {
  return { id: "" };
}

export const CommandServiceGetRequest = {
  encode(message: CommandServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceGetRequest();
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

  create(base?: DeepPartial<CommandServiceGetRequest>): CommandServiceGetRequest {
    return CommandServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceGetRequest>): CommandServiceGetRequest {
    const message = createBaseCommandServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCommandServiceGetResponse(): CommandServiceGetResponse {
  return { command: undefined };
}

export const CommandServiceGetResponse = {
  encode(message: CommandServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CommandServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommandServiceGetResponse();
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

  create(base?: DeepPartial<CommandServiceGetResponse>): CommandServiceGetResponse {
    return CommandServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CommandServiceGetResponse>): CommandServiceGetResponse {
    const message = createBaseCommandServiceGetResponse();
    message.command = (object.command !== undefined && object.command !== null)
      ? Command.fromPartial(object.command)
      : undefined;
    return message;
  },
};

function createBaseCommandServiceUpdateRequest(): CommandServiceUpdateRequest {
  return { id: "", response: undefined, exitCode: undefined };
}

export const CommandServiceUpdateRequest = {
  encode(message: CommandServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.response !== undefined) {
      writer.uint32(18).string(message.response);
    }
    if (message.exitCode !== undefined) {
      writer.uint32(24).int32(message.exitCode);
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
          if (tag !== 18) {
            break;
          }

          message.response = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.exitCode = reader.int32();
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
    message.response = object.response ?? undefined;
    message.exitCode = object.exitCode ?? undefined;
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

function createBaseNodeCommand(): NodeCommand {
  return {
    nodeId: "",
    hostId: "",
    apiCommandId: "",
    createdAt: undefined,
    start: undefined,
    stop: undefined,
    restart: undefined,
    upgrade: undefined,
    update: undefined,
    infoGet: undefined,
    create: undefined,
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
    if (message.apiCommandId !== "") {
      writer.uint32(26).string(message.apiCommandId);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.start !== undefined) {
      NodeStart.encode(message.start, writer.uint32(42).fork()).ldelim();
    }
    if (message.stop !== undefined) {
      NodeStop.encode(message.stop, writer.uint32(50).fork()).ldelim();
    }
    if (message.restart !== undefined) {
      NodeRestart.encode(message.restart, writer.uint32(58).fork()).ldelim();
    }
    if (message.upgrade !== undefined) {
      NodeUpgrade.encode(message.upgrade, writer.uint32(66).fork()).ldelim();
    }
    if (message.update !== undefined) {
      NodeUpdate.encode(message.update, writer.uint32(74).fork()).ldelim();
    }
    if (message.infoGet !== undefined) {
      NodeGet.encode(message.infoGet, writer.uint32(82).fork()).ldelim();
    }
    if (message.create !== undefined) {
      NodeCreate.encode(message.create, writer.uint32(90).fork()).ldelim();
    }
    if (message.delete !== undefined) {
      NodeDelete.encode(message.delete, writer.uint32(98).fork()).ldelim();
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

          message.apiCommandId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.start = NodeStart.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.stop = NodeStop.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.restart = NodeRestart.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.upgrade = NodeUpgrade.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.update = NodeUpdate.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.infoGet = NodeGet.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.create = NodeCreate.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
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
    message.apiCommandId = object.apiCommandId ?? "";
    message.createdAt = object.createdAt ?? undefined;
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
    message.infoGet = (object.infoGet !== undefined && object.infoGet !== null)
      ? NodeGet.fromPartial(object.infoGet)
      : undefined;
    message.create = (object.create !== undefined && object.create !== null)
      ? NodeCreate.fromPartial(object.create)
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
      ContainerImage.encode(message.image, writer.uint32(10).fork()).ldelim();
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

          message.image = ContainerImage.decode(reader, reader.uint32());
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
      ? ContainerImage.fromPartial(object.image)
      : undefined;
    return message;
  },
};

function createBaseNodeUpdate(): NodeUpdate {
  return { selfUpdate: undefined, rules: [] };
}

export const NodeUpdate = {
  encode(message: NodeUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.selfUpdate !== undefined) {
      writer.uint32(8).bool(message.selfUpdate);
    }
    for (const v of message.rules) {
      Rule.encode(v!, writer.uint32(18).fork()).ldelim();
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
          if (tag !== 8) {
            break;
          }

          message.selfUpdate = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rules.push(Rule.decode(reader, reader.uint32()));
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
    message.selfUpdate = object.selfUpdate ?? undefined;
    message.rules = object.rules?.map((e) => Rule.fromPartial(e)) || [];
    return message;
  },
};

function createBaseNodeGet(): NodeGet {
  return {};
}

export const NodeGet = {
  encode(_: NodeGet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeGet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeGet();
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

  create(base?: DeepPartial<NodeGet>): NodeGet {
    return NodeGet.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<NodeGet>): NodeGet {
    const message = createBaseNodeGet();
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
    selfUpdate: false,
    properties: [],
    rules: [],
    network: "",
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
      ContainerImage.encode(message.image, writer.uint32(26).fork()).ldelim();
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
    if (message.selfUpdate === true) {
      writer.uint32(56).bool(message.selfUpdate);
    }
    for (const v of message.properties) {
      Parameter.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.rules) {
      Rule.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(82).string(message.network);
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

          message.image = ContainerImage.decode(reader, reader.uint32());
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
          if (tag !== 56) {
            break;
          }

          message.selfUpdate = reader.bool();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.properties.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.rules.push(Rule.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
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

  create(base?: DeepPartial<NodeCreate>): NodeCreate {
    return NodeCreate.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeCreate>): NodeCreate {
    const message = createBaseNodeCreate();
    message.name = object.name ?? "";
    message.blockchain = object.blockchain ?? "";
    message.image = (object.image !== undefined && object.image !== null)
      ? ContainerImage.fromPartial(object.image)
      : undefined;
    message.nodeType = object.nodeType ?? 0;
    message.ip = object.ip ?? "";
    message.gateway = object.gateway ?? "";
    message.selfUpdate = object.selfUpdate ?? false;
    message.properties = object.properties?.map((e) => Parameter.fromPartial(e)) || [];
    message.rules = object.rules?.map((e) => Rule.fromPartial(e)) || [];
    message.network = object.network ?? "";
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

function createBaseContainerImage(): ContainerImage {
  return { protocol: "", nodeType: 0, nodeVersion: "" };
}

export const ContainerImage = {
  encode(message: ContainerImage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocol !== "") {
      writer.uint32(10).string(message.protocol);
    }
    if (message.nodeType !== 0) {
      writer.uint32(16).int32(message.nodeType);
    }
    if (message.nodeVersion !== "") {
      writer.uint32(26).string(message.nodeVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContainerImage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContainerImage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocol = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.nodeType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nodeVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ContainerImage>): ContainerImage {
    return ContainerImage.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ContainerImage>): ContainerImage {
    const message = createBaseContainerImage();
    message.protocol = object.protocol ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.nodeVersion = object.nodeVersion ?? "";
    return message;
  },
};

function createBaseRule(): Rule {
  return { name: "", action: 0, direction: 0, protocol: 0, ips: undefined, ports: [] };
}

export const Rule = {
  encode(message: Rule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    if (message.direction !== 0) {
      writer.uint32(24).int32(message.direction);
    }
    if (message.protocol !== 0) {
      writer.uint32(32).int32(message.protocol);
    }
    if (message.ips !== undefined) {
      writer.uint32(42).string(message.ips);
    }
    writer.uint32(50).fork();
    for (const v of message.ports) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Rule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRule();
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

          message.action = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.direction = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.protocol = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ips = reader.string();
          continue;
        case 6:
          if (tag === 48) {
            message.ports.push(reader.uint32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ports.push(reader.uint32());
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

  create(base?: DeepPartial<Rule>): Rule {
    return Rule.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Rule>): Rule {
    const message = createBaseRule();
    message.name = object.name ?? "";
    message.action = object.action ?? 0;
    message.direction = object.direction ?? 0;
    message.protocol = object.protocol ?? 0;
    message.ips = object.ips ?? undefined;
    message.ports = object.ports?.map((e) => e) || [];
    return message;
  },
};

function createBaseHostCommand(): HostCommand {
  return { hostId: "" };
}

export const HostCommand = {
  encode(message: HostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
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
    return message;
  },
};

function createBaseStartNodeCommand(): StartNodeCommand {
  return { nodeId: "" };
}

export const StartNodeCommand = {
  encode(message: StartNodeCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartNodeCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartNodeCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<StartNodeCommand>): StartNodeCommand {
    return StartNodeCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<StartNodeCommand>): StartNodeCommand {
    const message = createBaseStartNodeCommand();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseStopNodeCommand(): StopNodeCommand {
  return { nodeId: "" };
}

export const StopNodeCommand = {
  encode(message: StopNodeCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopNodeCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopNodeCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<StopNodeCommand>): StopNodeCommand {
    return StopNodeCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<StopNodeCommand>): StopNodeCommand {
    const message = createBaseStopNodeCommand();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseRestartNodeCommand(): RestartNodeCommand {
  return { nodeId: "" };
}

export const RestartNodeCommand = {
  encode(message: RestartNodeCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestartNodeCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestartNodeCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RestartNodeCommand>): RestartNodeCommand {
    return RestartNodeCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RestartNodeCommand>): RestartNodeCommand {
    const message = createBaseRestartNodeCommand();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseStartHostCommand(): StartHostCommand {
  return { hostId: "" };
}

export const StartHostCommand = {
  encode(message: StartHostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StartHostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStartHostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<StartHostCommand>): StartHostCommand {
    return StartHostCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<StartHostCommand>): StartHostCommand {
    const message = createBaseStartHostCommand();
    message.hostId = object.hostId ?? "";
    return message;
  },
};

function createBaseStopHostCommand(): StopHostCommand {
  return { hostId: "" };
}

export const StopHostCommand = {
  encode(message: StopHostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StopHostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStopHostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<StopHostCommand>): StopHostCommand {
    return StopHostCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<StopHostCommand>): StopHostCommand {
    const message = createBaseStopHostCommand();
    message.hostId = object.hostId ?? "";
    return message;
  },
};

function createBaseRestartHostCommand(): RestartHostCommand {
  return { hostId: "" };
}

export const RestartHostCommand = {
  encode(message: RestartHostCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestartHostCommand {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestartHostCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RestartHostCommand>): RestartHostCommand {
    return RestartHostCommand.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RestartHostCommand>): RestartHostCommand {
    const message = createBaseRestartHostCommand();
    message.hostId = object.hostId ?? "";
    return message;
  },
};

/** Service providing commands invoked by the UI */
export type CommandServiceDefinition = typeof CommandServiceDefinition;
export const CommandServiceDefinition = {
  name: "CommandService",
  fullName: "blockjoy.v1.CommandService",
  methods: {
    /**
     * Creates a new command in the database and sends it to the apropriate
     * instance of blockvisor.
     */
    create: {
      name: "Create",
      requestType: CommandServiceCreateRequest,
      requestStream: false,
      responseType: CommandServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Retrieve a single command */
    get: {
      name: "Get",
      requestType: CommandServiceGetRequest,
      requestStream: false,
      responseType: CommandServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single command status */
    update: {
      name: "Update",
      requestType: CommandServiceUpdateRequest,
      requestStream: false,
      responseType: CommandServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Get pending commands for host. Pending is means that their execution has
     * not completed, be that successfully or unsuccessfully. This is defined as
     * commands that do not have an `exit_code`. To mark a command as no longer
     * pending, use the `Update` method and provide an `exit_code`.
     */
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
  /**
   * Creates a new command in the database and sends it to the apropriate
   * instance of blockvisor.
   */
  create(
    request: CommandServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceCreateResponse>>;
  /** Retrieve a single command */
  get(
    request: CommandServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceGetResponse>>;
  /** Update a single command status */
  update(
    request: CommandServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceUpdateResponse>>;
  /**
   * Get pending commands for host. Pending is means that their execution has
   * not completed, be that successfully or unsuccessfully. This is defined as
   * commands that do not have an `exit_code`. To mark a command as no longer
   * pending, use the `Update` method and provide an `exit_code`.
   */
  pending(
    request: CommandServicePendingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServicePendingResponse>>;
}

export interface CommandServiceClient<CallOptionsExt = {}> {
  /**
   * Creates a new command in the database and sends it to the apropriate
   * instance of blockvisor.
   */
  create(
    request: DeepPartial<CommandServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceCreateResponse>;
  /** Retrieve a single command */
  get(
    request: DeepPartial<CommandServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceGetResponse>;
  /** Update a single command status */
  update(
    request: DeepPartial<CommandServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceUpdateResponse>;
  /**
   * Get pending commands for host. Pending is means that their execution has
   * not completed, be that successfully or unsuccessfully. This is defined as
   * commands that do not have an `exit_code`. To mark a command as no longer
   * pending, use the `Update` method and provide an `exit_code`.
   */
  pending(
    request: DeepPartial<CommandServicePendingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServicePendingResponse>;
}

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
