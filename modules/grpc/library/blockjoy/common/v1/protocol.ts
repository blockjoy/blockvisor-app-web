/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** The type of field to display in the UI. */
export enum UiType {
  UI_TYPE_UNSPECIFIED = 0,
  /** UI_TYPE_SWITCH - A checkbox in the UI (type: boolean) */
  UI_TYPE_SWITCH = 1,
  /** UI_TYPE_TEXT - A text field in the UI (type: utf-8 string). */
  UI_TYPE_TEXT = 2,
  /** UI_TYPE_PASSWORD - A text field with hidden content in the UI (type: utf-8 string). */
  UI_TYPE_PASSWORD = 3,
  /** UI_TYPE_ENUM - A set of allowed values (type: enum). */
  UI_TYPE_ENUM = 4,
  UNRECOGNIZED = -1,
}

/** The visibility of some protocol, version or image. */
export enum Visibility {
  VISIBILITY_UNSPECIFIED = 0,
  VISIBILITY_PUBLIC = 1,
  VISIBILITY_PRIVATE = 2,
  VISIBILITY_DEVELOPMENT = 3,
  UNRECOGNIZED = -1,
}

/**
 * A key identifier to some protocol version.
 *
 * The string representation is: "{protocol_key}/{variant_key}"
 */
export interface ProtocolVersionKey {
  /** The key identifier to the protocol (in lower-kebab-case). */
  protocolKey: string;
  /** The key identifier to the protocol variant (in lower-kebab-case). */
  variantKey: string;
}

function createBaseProtocolVersionKey(): ProtocolVersionKey {
  return { protocolKey: "", variantKey: "" };
}

export const ProtocolVersionKey = {
  encode(message: ProtocolVersionKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocolKey !== "") {
      writer.uint32(10).string(message.protocolKey);
    }
    if (message.variantKey !== "") {
      writer.uint32(18).string(message.variantKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolVersionKey {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolVersionKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.protocolKey = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.variantKey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ProtocolVersionKey>): ProtocolVersionKey {
    return ProtocolVersionKey.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ProtocolVersionKey>): ProtocolVersionKey {
    const message = createBaseProtocolVersionKey();
    message.protocolKey = object.protocolKey ?? "";
    message.variantKey = object.variantKey ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
