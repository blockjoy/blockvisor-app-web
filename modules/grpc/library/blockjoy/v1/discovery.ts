/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

export interface DiscoveryServiceServicesRequest {
}

export interface DiscoveryServiceServicesResponse {
  /** The address of the MQTT server. */
  notificationUrl: string;
}

function createBaseDiscoveryServiceServicesRequest(): DiscoveryServiceServicesRequest {
  return {};
}

export const DiscoveryServiceServicesRequest = {
  encode(_: DiscoveryServiceServicesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DiscoveryServiceServicesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDiscoveryServiceServicesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<DiscoveryServiceServicesRequest>): DiscoveryServiceServicesRequest {
    return DiscoveryServiceServicesRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DiscoveryServiceServicesRequest>): DiscoveryServiceServicesRequest {
    const message = createBaseDiscoveryServiceServicesRequest();
    return message;
  },
};

function createBaseDiscoveryServiceServicesResponse(): DiscoveryServiceServicesResponse {
  return { notificationUrl: "" };
}

export const DiscoveryServiceServicesResponse = {
  encode(message: DiscoveryServiceServicesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.notificationUrl !== "") {
      writer.uint32(10).string(message.notificationUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DiscoveryServiceServicesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDiscoveryServiceServicesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.notificationUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<DiscoveryServiceServicesResponse>): DiscoveryServiceServicesResponse {
    return DiscoveryServiceServicesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DiscoveryServiceServicesResponse>): DiscoveryServiceServicesResponse {
    const message = createBaseDiscoveryServiceServicesResponse();
    message.notificationUrl = object.notificationUrl ?? "";
    return message;
  },
};

/** Service discovery endpoints. */
export type DiscoveryServiceDefinition = typeof DiscoveryServiceDefinition;
export const DiscoveryServiceDefinition = {
  name: "DiscoveryService",
  fullName: "blockjoy.v1.DiscoveryService",
  methods: {
    /** List available services. */
    services: {
      name: "Services",
      requestType: DiscoveryServiceServicesRequest,
      requestStream: false,
      responseType: DiscoveryServiceServicesResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface DiscoveryServiceImplementation<CallContextExt = {}> {
  /** List available services. */
  services(
    request: DiscoveryServiceServicesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DiscoveryServiceServicesResponse>>;
}

export interface DiscoveryServiceClient<CallOptionsExt = {}> {
  /** List available services. */
  services(
    request: DeepPartial<DiscoveryServiceServicesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DiscoveryServiceServicesResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
