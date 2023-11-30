/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { NodeType } from "./node";

export const protobufPackage = "blockjoy.common.v1";

/** A blockchain image identifier. */
export interface ImageIdentifier {
  /** The snake_case name of the blockchain. */
  protocol: string;
  /** The image node type. */
  nodeType: NodeType;
  /** The semantic version of the node type. */
  nodeVersion: string;
}

/** A URL pointing to archive data. */
export interface ArchiveLocation {
  url: string;
}

/** An RHAI script plugin. */
export interface RhaiPlugin {
  identifier:
    | ImageIdentifier
    | undefined;
  /** RHAI script contents. */
  rhaiContent: Uint8Array;
}

function createBaseImageIdentifier(): ImageIdentifier {
  return { protocol: "", nodeType: 0, nodeVersion: "" };
}

export const ImageIdentifier = {
  encode(message: ImageIdentifier, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ImageIdentifier {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImageIdentifier();
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

  create(base?: DeepPartial<ImageIdentifier>): ImageIdentifier {
    return ImageIdentifier.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ImageIdentifier>): ImageIdentifier {
    const message = createBaseImageIdentifier();
    message.protocol = object.protocol ?? "";
    message.nodeType = object.nodeType ?? 0;
    message.nodeVersion = object.nodeVersion ?? "";
    return message;
  },
};

function createBaseArchiveLocation(): ArchiveLocation {
  return { url: "" };
}

export const ArchiveLocation = {
  encode(message: ArchiveLocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArchiveLocation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchiveLocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ArchiveLocation>): ArchiveLocation {
    return ArchiveLocation.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ArchiveLocation>): ArchiveLocation {
    const message = createBaseArchiveLocation();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseRhaiPlugin(): RhaiPlugin {
  return { identifier: undefined, rhaiContent: new Uint8Array(0) };
}

export const RhaiPlugin = {
  encode(message: RhaiPlugin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== undefined) {
      ImageIdentifier.encode(message.identifier, writer.uint32(10).fork()).ldelim();
    }
    if (message.rhaiContent.length !== 0) {
      writer.uint32(18).bytes(message.rhaiContent);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RhaiPlugin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRhaiPlugin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifier = ImageIdentifier.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rhaiContent = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RhaiPlugin>): RhaiPlugin {
    return RhaiPlugin.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RhaiPlugin>): RhaiPlugin {
    const message = createBaseRhaiPlugin();
    message.identifier = (object.identifier !== undefined && object.identifier !== null)
      ? ImageIdentifier.fromPartial(object.identifier)
      : undefined;
    message.rhaiContent = object.rhaiContent ?? new Uint8Array(0);
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
