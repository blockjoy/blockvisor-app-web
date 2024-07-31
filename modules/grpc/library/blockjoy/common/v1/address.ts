/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

export interface Address {
  city?: string | undefined;
  country?: string | undefined;
  line1?: string | undefined;
  line2?: string | undefined;
  postalCode?: string | undefined;
  state?: string | undefined;
}

function createBaseAddress(): Address {
  return {
    city: undefined,
    country: undefined,
    line1: undefined,
    line2: undefined,
    postalCode: undefined,
    state: undefined,
  };
}

export const Address = {
  encode(message: Address, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.city !== undefined) {
      writer.uint32(10).string(message.city);
    }
    if (message.country !== undefined) {
      writer.uint32(18).string(message.country);
    }
    if (message.line1 !== undefined) {
      writer.uint32(26).string(message.line1);
    }
    if (message.line2 !== undefined) {
      writer.uint32(34).string(message.line2);
    }
    if (message.postalCode !== undefined) {
      writer.uint32(42).string(message.postalCode);
    }
    if (message.state !== undefined) {
      writer.uint32(50).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Address {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.city = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.country = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.line1 = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.line2 = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.postalCode = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.state = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Address>): Address {
    return Address.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Address>): Address {
    const message = createBaseAddress();
    message.city = object.city ?? undefined;
    message.country = object.country ?? undefined;
    message.line1 = object.line1 ?? undefined;
    message.line2 = object.line2 ?? undefined;
    message.postalCode = object.postalCode ?? undefined;
    message.state = object.state ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
