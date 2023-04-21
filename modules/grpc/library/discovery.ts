/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "v1";

/** This is here for forwards compatibility. */
export interface ServicesRequest {
}

/** All relevant service URLs */
export interface ServicesResponse {
  keyServiceUrl: string;
  registryUrl: string;
  notificationUrl: string;
}

function createBaseServicesRequest(): ServicesRequest {
  return {};
}

export const ServicesRequest = {
  encode(_: ServicesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServicesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServicesRequest();
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

  create(base?: DeepPartial<ServicesRequest>): ServicesRequest {
    return ServicesRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<ServicesRequest>): ServicesRequest {
    const message = createBaseServicesRequest();
    return message;
  },
};

function createBaseServicesResponse(): ServicesResponse {
  return { keyServiceUrl: "", registryUrl: "", notificationUrl: "" };
}

export const ServicesResponse = {
  encode(message: ServicesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ServicesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServicesResponse();
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

  create(base?: DeepPartial<ServicesResponse>): ServicesResponse {
    return ServicesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ServicesResponse>): ServicesResponse {
    const message = createBaseServicesResponse();
    message.keyServiceUrl = object.keyServiceUrl ?? "";
    message.registryUrl = object.registryUrl ?? "";
    message.notificationUrl = object.notificationUrl ?? "";
    return message;
  },
};

export type DiscoveryDefinition = typeof DiscoveryDefinition;
export const DiscoveryDefinition = {
  name: "Discovery",
  fullName: "v1.Discovery",
  methods: {
    /** Return relevant service URLs */
    services: {
      name: "Services",
      requestType: ServicesRequest,
      requestStream: false,
      responseType: ServicesResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface DiscoveryServiceImplementation<CallContextExt = {}> {
  /** Return relevant service URLs */
  services(request: ServicesRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ServicesResponse>>;
}

export interface DiscoveryClient<CallOptionsExt = {}> {
  /** Return relevant service URLs */
  services(request: DeepPartial<ServicesRequest>, options?: CallOptions & CallOptionsExt): Promise<ServicesResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
