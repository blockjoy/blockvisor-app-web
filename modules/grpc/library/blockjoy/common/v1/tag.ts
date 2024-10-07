/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

export interface Tags {
  tags: Tag[];
}

export interface Tag {
  name: string;
}

export interface UpdateTags {
  /** Overwrite the tag list and set it to the provided value. */
  overwriteTags?:
    | Tags
    | undefined;
  /** Add a single tag to the existing tag list. */
  addTag?: Tag | undefined;
}

function createBaseTags(): Tags {
  return { tags: [] };
}

export const Tags = {
  encode(message: Tags, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.tags) {
      Tag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tags {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTags();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tags.push(Tag.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Tags>): Tags {
    return Tags.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Tags>): Tags {
    const message = createBaseTags();
    message.tags = object.tags?.map((e) => Tag.fromPartial(e)) || [];
    return message;
  },
};

function createBaseTag(): Tag {
  return { name: "" };
}

export const Tag = {
  encode(message: Tag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tag {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Tag>): Tag {
    return Tag.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Tag>): Tag {
    const message = createBaseTag();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseUpdateTags(): UpdateTags {
  return { overwriteTags: undefined, addTag: undefined };
}

export const UpdateTags = {
  encode(message: UpdateTags, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.overwriteTags !== undefined) {
      Tags.encode(message.overwriteTags, writer.uint32(10).fork()).ldelim();
    }
    if (message.addTag !== undefined) {
      Tag.encode(message.addTag, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateTags {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateTags();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.overwriteTags = Tags.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.addTag = Tag.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateTags>): UpdateTags {
    return UpdateTags.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateTags>): UpdateTags {
    const message = createBaseUpdateTags();
    message.overwriteTags = (object.overwriteTags !== undefined && object.overwriteTags !== null)
      ? Tags.fromPartial(object.overwriteTags)
      : undefined;
    message.addTag = (object.addTag !== undefined && object.addTag !== null)
      ? Tag.fromPartial(object.addTag)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
