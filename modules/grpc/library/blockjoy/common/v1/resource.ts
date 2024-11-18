/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** All supported resource types. */
export enum ResourceType {
  RESOURCE_TYPE_UNSPECIFIED = 0,
  RESOURCE_TYPE_USER = 1,
  RESOURCE_TYPE_ORG = 2,
  RESOURCE_TYPE_HOST = 3,
  RESOURCE_TYPE_NODE = 4,
  UNRECOGNIZED = -1,
}

/** A resource type and id. */
export interface Resource {
  /** The resource type. */
  resourceType: ResourceType;
  /** The uuid of the resource. */
  resourceId: string;
}

function createBaseResource(): Resource {
  return { resourceType: 0, resourceId: "" };
}

export const Resource = {
  encode(message: Resource, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resourceType !== 0) {
      writer.uint32(8).int32(message.resourceType);
    }
    if (message.resourceId !== "") {
      writer.uint32(18).string(message.resourceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Resource {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.resourceType = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resourceId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Resource>): Resource {
    return Resource.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Resource>): Resource {
    const message = createBaseResource();
    message.resourceType = object.resourceType ?? 0;
    message.resourceId = object.resourceId ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
