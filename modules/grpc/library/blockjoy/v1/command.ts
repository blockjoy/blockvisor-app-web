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
  exitCode?:
    | number
    | undefined;
  /**
   * A client may acknowledge that they have received a command, even if they
   * have not finished processing it.
   */
  ackedAt?: Date | undefined;
  node?: NodeCommand | undefined;
  host?: HostCommand | undefined;
}

export interface CommandServiceUpdateRequest {
  id: string;
  response?: string | undefined;
  exitCode?: number | undefined;
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

function createBaseCommand(): Command {
  return { id: "", response: undefined, exitCode: undefined, ackedAt: undefined, node: undefined, host: undefined };
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
    if (message.ackedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.ackedAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.node !== undefined) {
      NodeCommand.encode(message.node, writer.uint32(42).fork()).ldelim();
    }
    if (message.host !== undefined) {
      HostCommand.encode(message.host, writer.uint32(50).fork()).ldelim();
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

          message.ackedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.node = NodeCommand.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
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
  return { rules: [] };
}

export const NodeUpdate = {
  encode(message: NodeUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.rules) {
      Rule.encode(v!, writer.uint32(10).fork()).ldelim();
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
    for (const v of message.properties) {
      Parameter.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.rules) {
      Rule.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.network !== "") {
      writer.uint32(74).string(message.network);
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
          if (tag !== 58) {
            break;
          }

          message.properties.push(Parameter.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.rules.push(Rule.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
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

/** Service providing commands to be executed on a Host */
export type CommandServiceDefinition = typeof CommandServiceDefinition;
export const CommandServiceDefinition = {
  name: "CommandService",
  fullName: "blockjoy.v1.CommandService",
  methods: {
    /**
     * Update a single command status.
     * This shall be used only by host.
     */
    update: {
      name: "Update",
      requestType: CommandServiceUpdateRequest,
      requestStream: false,
      responseType: CommandServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Use this method to acknowledge that you have received an command and either
     * already started processing it, or will soon start processing it.
     */
    ack: {
      name: "Ack",
      requestType: CommandServiceAckRequest,
      requestStream: false,
      responseType: CommandServiceAckResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Get pending commands for host. Pending is means that their execution has
     * not completed, be that successfully or unsuccessfully. This is defined as
     * commands that do not have an `exit_code`. To mark a command as no longer
     * pending, use the `Update` method and provide an `exit_code`.
     * This can be used by anyone, but primarily by host.
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
   * Update a single command status.
   * This shall be used only by host.
   */
  update(
    request: CommandServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceUpdateResponse>>;
  /**
   * Use this method to acknowledge that you have received an command and either
   * already started processing it, or will soon start processing it.
   */
  ack(
    request: CommandServiceAckRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServiceAckResponse>>;
  /**
   * Get pending commands for host. Pending is means that their execution has
   * not completed, be that successfully or unsuccessfully. This is defined as
   * commands that do not have an `exit_code`. To mark a command as no longer
   * pending, use the `Update` method and provide an `exit_code`.
   * This can be used by anyone, but primarily by host.
   */
  pending(
    request: CommandServicePendingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CommandServicePendingResponse>>;
}

export interface CommandServiceClient<CallOptionsExt = {}> {
  /**
   * Update a single command status.
   * This shall be used only by host.
   */
  update(
    request: DeepPartial<CommandServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceUpdateResponse>;
  /**
   * Use this method to acknowledge that you have received an command and either
   * already started processing it, or will soon start processing it.
   */
  ack(
    request: DeepPartial<CommandServiceAckRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CommandServiceAckResponse>;
  /**
   * Get pending commands for host. Pending is means that their execution has
   * not completed, be that successfully or unsuccessfully. This is defined as
   * commands that do not have an `exit_code`. To mark a command as no longer
   * pending, use the `Update` method and provide an `exit_code`.
   * This can be used by anyone, but primarily by host.
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
