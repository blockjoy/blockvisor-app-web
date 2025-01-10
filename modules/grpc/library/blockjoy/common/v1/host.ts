/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.common.v1";

/** The connection status of a host. */
export enum HostConnectionStatus {
  HOST_CONNECTION_STATUS_UNSPECIFIED = 0,
  HOST_CONNECTION_STATUS_ONLINE = 1,
  HOST_CONNECTION_STATUS_OFFLINE = 2,
  UNRECOGNIZED = -1,
}

/** When to schedule nodes to a host. */
export enum ScheduleType {
  SCHEDULE_TYPE_UNSPECIFIED = 0,
  SCHEDULE_TYPE_AUTOMATIC = 1,
  SCHEDULE_TYPE_MANUAL = 2,
  UNRECOGNIZED = -1,
}

export interface HostIpAddress {
  /** The ip address. */
  ip: string;
  /** Whether the ip address is in use by a node. */
  assigned: boolean;
}

/** Used to indicate a change in the host status. */
export interface HostStatus {
  hostId: string;
  connectionStatus?: HostConnectionStatus | undefined;
}

function createBaseHostIpAddress(): HostIpAddress {
  return { ip: "", assigned: false };
}

export const HostIpAddress = {
  encode(message: HostIpAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ip !== "") {
      writer.uint32(10).string(message.ip);
    }
    if (message.assigned === true) {
      writer.uint32(16).bool(message.assigned);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostIpAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostIpAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ip = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.assigned = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostIpAddress>): HostIpAddress {
    return HostIpAddress.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostIpAddress>): HostIpAddress {
    const message = createBaseHostIpAddress();
    message.ip = object.ip ?? "";
    message.assigned = object.assigned ?? false;
    return message;
  },
};

function createBaseHostStatus(): HostStatus {
  return { hostId: "", connectionStatus: undefined };
}

export const HostStatus = {
  encode(message: HostStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.hostId !== "") {
      writer.uint32(10).string(message.hostId);
    }
    if (message.connectionStatus !== undefined) {
      writer.uint32(16).int32(message.connectionStatus);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HostStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostStatus();
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
          if (tag !== 16) {
            break;
          }

          message.connectionStatus = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<HostStatus>): HostStatus {
    return HostStatus.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<HostStatus>): HostStatus {
    const message = createBaseHostStatus();
    message.hostId = object.hostId ?? "";
    message.connectionStatus = object.connectionStatus ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
