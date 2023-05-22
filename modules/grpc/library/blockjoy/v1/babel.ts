/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

/** Message to send when a new configuration in cookbook is created */
export interface BabelConfig {
  /** snake_cased name of the blockchain */
  protocol: string;
  /** snake_cased name of the node type */
  nodeType: string;
  /** semantic version string of the node type version */
  nodeVersion: string;
}

/** Message to send when a new version of node image is released */
export interface BabelServiceNotifyRequest {
  /** UUID of the version request */
  uuid: string;
  /** Configuration of the node */
  config: BabelConfig | undefined;
}

export interface BabelServiceNotifyResponse {
  nodeIds: string[];
}

function createBaseBabelConfig(): BabelConfig {
  return { protocol: "", nodeType: "", nodeVersion: "" };
}

export const BabelConfig = {
  encode(message: BabelConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.protocol !== "") {
      writer.uint32(10).string(message.protocol);
    }
    if (message.nodeType !== "") {
      writer.uint32(18).string(message.nodeType);
    }
    if (message.nodeVersion !== "") {
      writer.uint32(26).string(message.nodeVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BabelConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBabelConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.protocol = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.nodeType = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.nodeVersion = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BabelConfig>): BabelConfig {
    return BabelConfig.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BabelConfig>): BabelConfig {
    const message = createBaseBabelConfig();
    message.protocol = object.protocol ?? "";
    message.nodeType = object.nodeType ?? "";
    message.nodeVersion = object.nodeVersion ?? "";
    return message;
  },
};

function createBaseBabelServiceNotifyRequest(): BabelServiceNotifyRequest {
  return { uuid: "", config: undefined };
}

export const BabelServiceNotifyRequest = {
  encode(message: BabelServiceNotifyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.config !== undefined) {
      BabelConfig.encode(message.config, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BabelServiceNotifyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBabelServiceNotifyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.uuid = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.config = BabelConfig.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BabelServiceNotifyRequest>): BabelServiceNotifyRequest {
    return BabelServiceNotifyRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BabelServiceNotifyRequest>): BabelServiceNotifyRequest {
    const message = createBaseBabelServiceNotifyRequest();
    message.uuid = object.uuid ?? "";
    message.config = (object.config !== undefined && object.config !== null)
      ? BabelConfig.fromPartial(object.config)
      : undefined;
    return message;
  },
};

function createBaseBabelServiceNotifyResponse(): BabelServiceNotifyResponse {
  return { nodeIds: [] };
}

export const BabelServiceNotifyResponse = {
  encode(message: BabelServiceNotifyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nodeIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BabelServiceNotifyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBabelServiceNotifyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.nodeIds.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BabelServiceNotifyResponse>): BabelServiceNotifyResponse {
    return BabelServiceNotifyResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BabelServiceNotifyResponse>): BabelServiceNotifyResponse {
    const message = createBaseBabelServiceNotifyResponse();
    message.nodeIds = object.nodeIds?.map((e) => e) || [];
    return message;
  },
};

/** Babel related service. */
export type BabelServiceDefinition = typeof BabelServiceDefinition;
export const BabelServiceDefinition = {
  name: "BabelService",
  fullName: "blockjoy.v1.BabelService",
  methods: {
    /** Notify about a new version of node image */
    notify: {
      name: "Notify",
      requestType: BabelServiceNotifyRequest,
      requestStream: false,
      responseType: BabelServiceNotifyResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface BabelServiceImplementation<CallContextExt = {}> {
  /** Notify about a new version of node image */
  notify(
    request: BabelServiceNotifyRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<BabelServiceNotifyResponse>>;
}

export interface BabelServiceClient<CallOptionsExt = {}> {
  /** Notify about a new version of node image */
  notify(
    request: DeepPartial<BabelServiceNotifyRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<BabelServiceNotifyResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
