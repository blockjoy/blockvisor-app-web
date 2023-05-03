/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Host } from "./host";
import { Node } from "./node";
import { Org } from "./org";

export const protobufPackage = "blockjoy.v1";

/** A message about an event that happened to a node. */
export interface NodeMessage {
  created?: NodeCreated | undefined;
  updated?: NodeUpdated | undefined;
  deleted?: NodeDeleted | undefined;
}

export interface NodeCreated {
  node:
    | Node
    | undefined;
  /** The id of the person that updated the node */
  createdBy: string;
  createdByName: string;
  createdByEmail: string;
}

export interface NodeUpdated {
  node:
    | Node
    | undefined;
  /** The id of the person that updated the node */
  updatedBy: string;
  updatedByName: string;
  updatedByEmail: string;
}

export interface NodeDeleted {
  nodeId: string;
  hostId: string;
  orgId: string;
  /** The id of the persona that deleted the node */
  deletedBy: string;
  deletedByName: string;
  deletedByEmail: string;
}

export interface OrgMessage {
  created?: OrgCreated | undefined;
  updated?: OrgUpdated | undefined;
  deleted?: OrgDeleted | undefined;
}

export interface OrgCreated {
  org: Org | undefined;
  createdBy: string;
  createdByName: string;
  createdByEmail: string;
}

export interface OrgUpdated {
  org: Org | undefined;
  updatedBy: string;
  updatedByName: string;
  updatedByEmail: string;
}

export interface OrgDeleted {
  orgId: string;
  deletedBy: string;
  deletedByName: string;
  deletedByEmail: string;
}

export interface HostMessage {
  created?: HostCreated | undefined;
  updated?: HostUpdated | undefined;
  deleted?: HostDeleted | undefined;
}

export interface HostCreated {
  host: Host | undefined;
  createdBy: string;
  createdByName: string;
  createdByEmail: string;
}

export interface HostUpdated {
  host: Host | undefined;
  updatedBy: string;
  updatedByName: string;
  updatedByEmail: string;
}

export interface HostDeleted {
  hostId: string;
  deletedBy: string;
  deletedByName: string;
  deletedByEmail: string;
}

function createBaseNodeMessage(): NodeMessage {
  return { created: undefined, updated: undefined, deleted: undefined };
}

export const NodeMessage = {
  encode(message: NodeMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created !== undefined) {
      NodeCreated.encode(message.created, writer.uint32(10).fork()).ldelim();
    }
    if (message.updated !== undefined) {
      NodeUpdated.encode(message.updated, writer.uint32(18).fork()).ldelim();
    }
    if (message.deleted !== undefined) {
      NodeDeleted.encode(message.deleted, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.created = NodeCreated.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updated = NodeUpdated.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.deleted = NodeDeleted.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeMessage>): NodeMessage {
    return NodeMessage.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeMessage>): NodeMessage {
    const message = createBaseNodeMessage();
    message.created = (object.created !== undefined && object.created !== null)
      ? NodeCreated.fromPartial(object.created)
      : undefined;
    message.updated = (object.updated !== undefined && object.updated !== null)
      ? NodeUpdated.fromPartial(object.updated)
      : undefined;
    message.deleted = (object.deleted !== undefined && object.deleted !== null)
      ? NodeDeleted.fromPartial(object.deleted)
      : undefined;
    return message;
  },
};

function createBaseNodeCreated(): NodeCreated {
  return { node: undefined, createdBy: "", createdByName: "", createdByEmail: "" };
}

export const NodeCreated = {
  encode(message: NodeCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    if (message.createdBy !== "") {
      writer.uint32(18).string(message.createdBy);
    }
    if (message.createdByName !== "") {
      writer.uint32(26).string(message.createdByName);
    }
    if (message.createdByEmail !== "") {
      writer.uint32(34).string(message.createdByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeCreated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.node = Node.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.createdByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.createdByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeCreated>): NodeCreated {
    return NodeCreated.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeCreated>): NodeCreated {
    const message = createBaseNodeCreated();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    message.createdBy = object.createdBy ?? "";
    message.createdByName = object.createdByName ?? "";
    message.createdByEmail = object.createdByEmail ?? "";
    return message;
  },
};

function createBaseNodeUpdated(): NodeUpdated {
  return { node: undefined, updatedBy: "", updatedByName: "", updatedByEmail: "" };
}

export const NodeUpdated = {
  encode(message: NodeUpdated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.node !== undefined) {
      Node.encode(message.node, writer.uint32(10).fork()).ldelim();
    }
    if (message.updatedBy !== "") {
      writer.uint32(18).string(message.updatedBy);
    }
    if (message.updatedByName !== "") {
      writer.uint32(26).string(message.updatedByName);
    }
    if (message.updatedByEmail !== "") {
      writer.uint32(34).string(message.updatedByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeUpdated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.node = Node.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updatedBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.updatedByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.updatedByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeUpdated>): NodeUpdated {
    return NodeUpdated.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeUpdated>): NodeUpdated {
    const message = createBaseNodeUpdated();
    message.node = (object.node !== undefined && object.node !== null) ? Node.fromPartial(object.node) : undefined;
    message.updatedBy = object.updatedBy ?? "";
    message.updatedByName = object.updatedByName ?? "";
    message.updatedByEmail = object.updatedByEmail ?? "";
    return message;
  },
};

function createBaseNodeDeleted(): NodeDeleted {
  return { nodeId: "", hostId: "", orgId: "", deletedBy: "", deletedByName: "", deletedByEmail: "" };
}

export const NodeDeleted = {
  encode(message: NodeDeleted, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    if (message.hostId !== "") {
      writer.uint32(18).string(message.hostId);
    }
    if (message.orgId !== "") {
      writer.uint32(26).string(message.orgId);
    }
    if (message.deletedBy !== "") {
      writer.uint32(34).string(message.deletedBy);
    }
    if (message.deletedByName !== "") {
      writer.uint32(42).string(message.deletedByName);
    }
    if (message.deletedByEmail !== "") {
      writer.uint32(50).string(message.deletedByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NodeDeleted {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNodeDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.deletedBy = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.deletedByName = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.deletedByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<NodeDeleted>): NodeDeleted {
    return NodeDeleted.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<NodeDeleted>): NodeDeleted {
    const message = createBaseNodeDeleted();
    message.nodeId = object.nodeId ?? "";
    message.hostId = object.hostId ?? "";
    message.orgId = object.orgId ?? "";
    message.deletedBy = object.deletedBy ?? "";
    message.deletedByName = object.deletedByName ?? "";
    message.deletedByEmail = object.deletedByEmail ?? "";
    return message;
  },
};

function createBaseOrgMessage(): OrgMessage {
  return { created: undefined, updated: undefined, deleted: undefined };
}

export const OrgMessage = {
  encode(message: OrgMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created !== undefined) {
      OrgCreated.encode(message.created, writer.uint32(10).fork()).ldelim();
    }
    if (message.updated !== undefined) {
      OrgUpdated.encode(message.updated, writer.uint32(18).fork()).ldelim();
    }
    if (message.deleted !== undefined) {
      OrgDeleted.encode(message.deleted, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.created = OrgCreated.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updated = OrgUpdated.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.deleted = OrgDeleted.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgMessage>): OrgMessage {
    return OrgMessage.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgMessage>): OrgMessage {
    const message = createBaseOrgMessage();
    message.created = (object.created !== undefined && object.created !== null)
      ? OrgCreated.fromPartial(object.created)
      : undefined;
    message.updated = (object.updated !== undefined && object.updated !== null)
      ? OrgUpdated.fromPartial(object.updated)
      : undefined;
    message.deleted = (object.deleted !== undefined && object.deleted !== null)
      ? OrgDeleted.fromPartial(object.deleted)
      : undefined;
    return message;
  },
};

function createBaseOrgCreated(): OrgCreated {
  return { org: undefined, createdBy: "", createdByName: "", createdByEmail: "" };
}

export const OrgCreated = {
  encode(message: OrgCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    if (message.createdBy !== "") {
      writer.uint32(18).string(message.createdBy);
    }
    if (message.createdByName !== "") {
      writer.uint32(26).string(message.createdByName);
    }
    if (message.createdByEmail !== "") {
      writer.uint32(34).string(message.createdByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgCreated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.createdByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.createdByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgCreated>): OrgCreated {
    return OrgCreated.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgCreated>): OrgCreated {
    const message = createBaseOrgCreated();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    message.createdBy = object.createdBy ?? "";
    message.createdByName = object.createdByName ?? "";
    message.createdByEmail = object.createdByEmail ?? "";
    return message;
  },
};

function createBaseOrgUpdated(): OrgUpdated {
  return { org: undefined, updatedBy: "", updatedByName: "", updatedByEmail: "" };
}

export const OrgUpdated = {
  encode(message: OrgUpdated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    if (message.updatedBy !== "") {
      writer.uint32(18).string(message.updatedBy);
    }
    if (message.updatedByName !== "") {
      writer.uint32(26).string(message.updatedByName);
    }
    if (message.updatedByEmail !== "") {
      writer.uint32(34).string(message.updatedByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgUpdated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updatedBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.updatedByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.updatedByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgUpdated>): OrgUpdated {
    return OrgUpdated.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgUpdated>): OrgUpdated {
    const message = createBaseOrgUpdated();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    message.updatedBy = object.updatedBy ?? "";
    message.updatedByName = object.updatedByName ?? "";
    message.updatedByEmail = object.updatedByEmail ?? "";
    return message;
  },
};

function createBaseOrgDeleted(): OrgDeleted {
  return { orgId: "", deletedBy: "", deletedByName: "", deletedByEmail: "" };
}

export const OrgDeleted = {
  encode(message: OrgDeleted, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    if (message.deletedBy !== "") {
      writer.uint32(18).string(message.deletedBy);
    }
    if (message.deletedByName !== "") {
      writer.uint32(26).string(message.deletedByName);
    }
    if (message.deletedByEmail !== "") {
      writer.uint32(34).string(message.deletedByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgDeleted {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.deletedBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.deletedByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.deletedByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgDeleted>): OrgDeleted {
    return OrgDeleted.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgDeleted>): OrgDeleted {
    const message = createBaseOrgDeleted();
    message.orgId = object.orgId ?? "";
    message.deletedBy = object.deletedBy ?? "";
    message.deletedByName = object.deletedByName ?? "";
    message.deletedByEmail = object.deletedByEmail ?? "";
    return message;
  },
};

function createBaseHostMessage(): HostMessage {
  return { created: undefined, updated: undefined, deleted: undefined };
}

export const HostMessage = {
  encode(message: HostMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created !== undefined) {
      HostCreated.encode(message.created, writer.uint32(10).fork()).ldelim();
    }
    if (message.updated !== undefined) {
      HostUpdated.encode(message.updated, writer.uint32(18).fork()).ldelim();
    }
    if (message.deleted !== undefined) {
      HostDeleted.encode(message.deleted, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.created = HostCreated.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updated = HostUpdated.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.deleted = HostDeleted.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostMessage>): HostMessage {
    return HostMessage.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostMessage>): HostMessage {
    const message = createBaseHostMessage();
    message.created = (object.created !== undefined && object.created !== null)
      ? HostCreated.fromPartial(object.created)
      : undefined;
    message.updated = (object.updated !== undefined && object.updated !== null)
      ? HostUpdated.fromPartial(object.updated)
      : undefined;
    message.deleted = (object.deleted !== undefined && object.deleted !== null)
      ? HostDeleted.fromPartial(object.deleted)
      : undefined;
    return message;
  },
};

function createBaseHostCreated(): HostCreated {
  return { host: undefined, createdBy: "", createdByName: "", createdByEmail: "" };
}

export const HostCreated = {
  encode(message: HostCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    if (message.createdBy !== "") {
      writer.uint32(18).string(message.createdBy);
    }
    if (message.createdByName !== "") {
      writer.uint32(26).string(message.createdByName);
    }
    if (message.createdByEmail !== "") {
      writer.uint32(34).string(message.createdByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostCreated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostCreated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.host = Host.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.createdByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.createdByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostCreated>): HostCreated {
    return HostCreated.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostCreated>): HostCreated {
    const message = createBaseHostCreated();
    message.host = (object.host !== undefined && object.host !== null) ? Host.fromPartial(object.host) : undefined;
    message.createdBy = object.createdBy ?? "";
    message.createdByName = object.createdByName ?? "";
    message.createdByEmail = object.createdByEmail ?? "";
    return message;
  },
};

function createBaseHostUpdated(): HostUpdated {
  return { host: undefined, updatedBy: "", updatedByName: "", updatedByEmail: "" };
}

export const HostUpdated = {
  encode(message: HostUpdated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.host !== undefined) {
      Host.encode(message.host, writer.uint32(10).fork()).ldelim();
    }
    if (message.updatedBy !== "") {
      writer.uint32(18).string(message.updatedBy);
    }
    if (message.updatedByName !== "") {
      writer.uint32(26).string(message.updatedByName);
    }
    if (message.updatedByEmail !== "") {
      writer.uint32(34).string(message.updatedByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostUpdated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostUpdated();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.host = Host.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.updatedBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.updatedByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.updatedByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostUpdated>): HostUpdated {
    return HostUpdated.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostUpdated>): HostUpdated {
    const message = createBaseHostUpdated();
    message.host = (object.host !== undefined && object.host !== null) ? Host.fromPartial(object.host) : undefined;
    message.updatedBy = object.updatedBy ?? "";
    message.updatedByName = object.updatedByName ?? "";
    message.updatedByEmail = object.updatedByEmail ?? "";
    return message;
  },
};

function createBaseHostDeleted(): HostDeleted {
  return { hostId: "", deletedBy: "", deletedByName: "", deletedByEmail: "" };
}

export const HostDeleted = {
  encode(message: HostDeleted, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.deletedBy !== "") {
      writer.uint32(18).string(message.deletedBy);
    }
    if (message.deletedByName !== "") {
      writer.uint32(26).string(message.deletedByName);
    }
    if (message.deletedByEmail !== "") {
      writer.uint32(34).string(message.deletedByEmail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostDeleted {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostDeleted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.hostId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.deletedBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.deletedByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.deletedByEmail = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostDeleted>): HostDeleted {
    return HostDeleted.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostDeleted>): HostDeleted {
    const message = createBaseHostDeleted();
    message.hostId = object.hostId ?? "";
    message.deletedBy = object.deletedBy ?? "";
    message.deletedByName = object.deletedByName ?? "";
    message.deletedByEmail = object.deletedByEmail ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
