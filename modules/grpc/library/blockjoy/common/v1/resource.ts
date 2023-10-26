/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** All supported resource types. */
export enum Resource {
  RESOURCE_UNSPECIFIED = 0,
  RESOURCE_USER = 1,
  RESOURCE_ORG = 2,
  RESOURCE_HOST = 3,
  RESOURCE_NODE = 4,
  UNRECOGNIZED = -1,
}

/** Details around the resource that updated some entity. */
export interface EntityUpdate {
  /** The resource type that updated an entity. */
  resource: Resource;
  /** The uuid of the resource that updated an entity. */
  resourceId?:
    | string
    | undefined;
  /** The name of the updator (if updated by a user resource). */
  name?:
    | string
    | undefined;
  /** The email of the updator (if updated by a user resource). */
  email?: string | undefined;
}

function createBaseEntityUpdate(): EntityUpdate {
  return { resource: 0, resourceId: undefined, name: undefined, email: undefined };
}

export const EntityUpdate = {
  encode(message: EntityUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== 0) {
      writer.uint32(8).int32(message.resource);
    }
    if (message.resourceId !== undefined) {
      writer.uint32(18).string(message.resourceId);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    if (message.email !== undefined) {
      writer.uint32(34).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EntityUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntityUpdate();
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
          if (tag !== 18) {
            break;
          }

          message.resourceId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<EntityUpdate>): EntityUpdate {
    return EntityUpdate.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<EntityUpdate>): EntityUpdate {
    const message = createBaseEntityUpdate();
    message.resource = object.resource ?? 0;
    message.resourceId = object.resourceId ?? undefined;
    message.name = object.name ?? undefined;
    message.email = object.email ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
