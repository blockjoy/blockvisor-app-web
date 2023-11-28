/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** The firewall action to apply to matching packets. */
export enum FirewallAction {
  FIREWALL_ACTION_UNSPECIFIED = 0,
  /** FIREWALL_ACTION_ALLOW - Allow matching packets. */
  FIREWALL_ACTION_ALLOW = 1,
  /** FIREWALL_ACTION_DENY - Deny matching packets without a response. */
  FIREWALL_ACTION_DENY = 2,
  /** FIREWALL_ACTION_REJECT - Reject matching packets with a response. */
  FIREWALL_ACTION_REJECT = 3,
  UNRECOGNIZED = -1,
}

/** The direction of packets for firewall rules. */
export enum FirewallDirection {
  FIREWALL_DIRECTION_UNSPECIFIED = 0,
  FIREWALL_DIRECTION_OUTBOUND = 1,
  FIREWALL_DIRECTION_INBOUND = 2,
  UNRECOGNIZED = -1,
}

/** The packet protocol type for firewall rules. */
export enum FirewallProtocol {
  FIREWALL_PROTOCOL_UNSPECIFIED = 0,
  FIREWALL_PROTOCOL_TCP = 1,
  FIREWALL_PROTOCOL_UDP = 2,
  FIREWALL_PROTOCOL_BOTH = 3,
  UNRECOGNIZED = -1,
}

/** Firewall configuration applied on node start. */
export interface FirewallConfig {
  /** Fallback action for inbound traffic not matching any rule. */
  defaultIn: FirewallAction;
  /** Fallback action for outbound traffic not matching any rule. */
  defaultOut: FirewallAction;
  /** Set of firewall rules to be applied. */
  rules: FirewallRule[];
}

/** A single firewall rule. */
export interface FirewallRule {
  /** The name of this firewall rule. */
  name: string;
  /** Action applied on packets that match this rule. */
  action: FirewallAction;
  /** The direction of traffic for which this rule applies. */
  direction: FirewallDirection;
  /** The protocol type (or `FIREWALL_PROTOCOL_BOTH` by default). */
  protocol?:
    | FirewallProtocol
    | undefined;
  /** Applicable IPs (in CIDR notation). */
  ips?:
    | string
    | undefined;
  /** Applicable ports (or empty for all). */
  ports: number[];
}

function createBaseFirewallConfig(): FirewallConfig {
  return { defaultIn: 0, defaultOut: 0, rules: [] };
}

export const FirewallConfig = {
  encode(message: FirewallConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.defaultIn !== 0) {
      writer.uint32(8).int32(message.defaultIn);
    }
    if (message.defaultOut !== 0) {
      writer.uint32(16).int32(message.defaultOut);
    }
    for (const v of message.rules) {
      FirewallRule.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FirewallConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFirewallConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.defaultIn = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.defaultOut = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.rules.push(FirewallRule.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<FirewallConfig>): FirewallConfig {
    return FirewallConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<FirewallConfig>): FirewallConfig {
    const message = createBaseFirewallConfig();
    message.defaultIn = object.defaultIn ?? 0;
    message.defaultOut = object.defaultOut ?? 0;
    message.rules = object.rules?.map((e) => FirewallRule.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFirewallRule(): FirewallRule {
  return { name: "", action: 0, direction: 0, protocol: undefined, ips: undefined, ports: [] };
}

export const FirewallRule = {
  encode(message: FirewallRule, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    if (message.direction !== 0) {
      writer.uint32(24).int32(message.direction);
    }
    if (message.protocol !== undefined) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): FirewallRule {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFirewallRule();
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

  create(base?: DeepPartial<FirewallRule>): FirewallRule {
    return FirewallRule.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<FirewallRule>): FirewallRule {
    const message = createBaseFirewallRule();
    message.name = object.name ?? "";
    message.action = object.action ?? 0;
    message.direction = object.direction ?? 0;
    message.protocol = object.protocol ?? undefined;
    message.ips = object.ips ?? undefined;
    message.ports = object.ports?.map((e) => e) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
