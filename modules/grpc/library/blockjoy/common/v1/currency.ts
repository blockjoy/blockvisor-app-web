/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** The currency code of some `Amount`. */
export enum Currency {
  CURRENCY_UNSPECIFIED = 0,
  CURRENCY_USD = 1,
  UNRECOGNIZED = -1,
}

/** The recurring periodic frequency (e.g. for billing cycles). */
export enum Period {
  PERIOD_UNSPECIFIED = 0,
  PERIOD_MONTHLY = 1,
  UNRECOGNIZED = -1,
}

/**
 * An `Amount` is the `value` of some `currency` at the minor units level.
 *
 * For example, with `CURRENCY_USD` the minor units are to 2 decimal places (as
 * defined by ISO 4217), meaning a `value` of `123` is equal to `$1.23`.
 */
export interface Amount {
  /** The `Currency` type of this `Amount`. */
  currency: Currency;
  /** The minor units value for the `currency` (as defined by ISO 4217). */
  value: number;
}

/** A `BillingAmount` combines an `Amount` with a recurring `Period`. */
export interface BillingAmount {
  amount: Amount | undefined;
  period: Period;
}

function createBaseAmount(): Amount {
  return { currency: 0, value: 0 };
}

export const Amount = {
  encode(message: Amount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currency !== 0) {
      writer.uint32(8).int32(message.currency);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Amount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.currency = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Amount>): Amount {
    return Amount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Amount>): Amount {
    const message = createBaseAmount();
    message.currency = object.currency ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseBillingAmount(): BillingAmount {
  return { amount: undefined, period: 0 };
}

export const BillingAmount = {
  encode(message: BillingAmount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Amount.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.period !== 0) {
      writer.uint32(16).int32(message.period);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BillingAmount {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBillingAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.amount = Amount.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.period = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BillingAmount>): BillingAmount {
    return BillingAmount.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BillingAmount>): BillingAmount {
    const message = createBaseBillingAmount();
    message.amount = (object.amount !== undefined && object.amount !== null)
      ? Amount.fromPartial(object.amount)
      : undefined;
    message.period = object.period ?? 0;
    return message;
  },
};

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
