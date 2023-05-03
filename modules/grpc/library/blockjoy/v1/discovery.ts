/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

/** This is here for forwards compatibility. */
export interface DiscoveryServiceServicesRequest {
}

/** All relevant service URLs */
export interface DiscoveryServiceServicesResponse {
  keyServiceUrl: string;
  registryUrl: string;
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
      if ((tag & 7) == 4 || tag == 0) {
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
  return { keyServiceUrl: "", registryUrl: "", notificationUrl: "" };
}

export const DiscoveryServiceServicesResponse = {
  encode(message: DiscoveryServiceServicesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.keyServiceUrl !== "") {
      writer.uint32(10).string(message.keyServiceUrl);
    }
    if (message.registryUrl !== "") {
      writer.uint32(18).string(message.registryUrl);
    }
    if (message.notificationUrl !== "") {
      writer.uint32(26).string(message.notificationUrl);
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
          if (tag != 10) {
            break;
          }

          message.keyServiceUrl = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.registryUrl = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.notificationUrl = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
    message.keyServiceUrl = object.keyServiceUrl ?? "";
    message.registryUrl = object.registryUrl ?? "";
    message.notificationUrl = object.notificationUrl ?? "";
    return message;
  },
};

export type DiscoveryServiceDefinition = typeof DiscoveryServiceDefinition;
export const DiscoveryServiceDefinition = {
  name: "DiscoveryService",
  fullName: "blockjoy.v1.DiscoveryService",
  methods: {
    /** Return relevant service URLs */
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
  /** Return relevant service URLs */
  services(
    request: DiscoveryServiceServicesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DiscoveryServiceServicesResponse>>;
}

export interface DiscoveryServiceClient<CallOptionsExt = {}> {
  /** Return relevant service URLs */
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
