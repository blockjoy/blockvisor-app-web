/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Resource } from "../common/v1/resource";

export const protobufPackage = "blockjoy.v1";

export interface CryptServiceGetSecretRequest {
  /** The resource requesting this secret. */
  resource:
    | Resource
    | undefined;
  /** The secret name to read. */
  name: string;
}

export interface CryptServiceGetSecretResponse {
  /** The decrypted secret bytes. */
  value: Uint8Array;
}

export interface CryptServicePutSecretRequest {
  /** The resource writing this secret. */
  resource:
    | Resource
    | undefined;
  /** The secret name to write. */
  name: string;
  /** The secret bytes to encrypt. */
  value: Uint8Array;
}

export interface CryptServicePutSecretResponse {
}

function createBaseCryptServiceGetSecretRequest(): CryptServiceGetSecretRequest {
  return { resource: undefined, name: "" };
}

export const CryptServiceGetSecretRequest = {
  encode(message: CryptServiceGetSecretRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CryptServiceGetSecretRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCryptServiceGetSecretRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CryptServiceGetSecretRequest>): CryptServiceGetSecretRequest {
    return CryptServiceGetSecretRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CryptServiceGetSecretRequest>): CryptServiceGetSecretRequest {
    const message = createBaseCryptServiceGetSecretRequest();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCryptServiceGetSecretResponse(): CryptServiceGetSecretResponse {
  return { value: new Uint8Array(0) };
}

export const CryptServiceGetSecretResponse = {
  encode(message: CryptServiceGetSecretResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.value.length !== 0) {
      writer.uint32(10).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CryptServiceGetSecretResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCryptServiceGetSecretResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CryptServiceGetSecretResponse>): CryptServiceGetSecretResponse {
    return CryptServiceGetSecretResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CryptServiceGetSecretResponse>): CryptServiceGetSecretResponse {
    const message = createBaseCryptServiceGetSecretResponse();
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCryptServicePutSecretRequest(): CryptServicePutSecretRequest {
  return { resource: undefined, name: "", value: new Uint8Array(0) };
}

export const CryptServicePutSecretRequest = {
  encode(message: CryptServicePutSecretRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== undefined) {
      Resource.encode(message.resource, writer.uint32(10).fork()).ldelim();
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CryptServicePutSecretRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCryptServicePutSecretRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.resource = Resource.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CryptServicePutSecretRequest>): CryptServicePutSecretRequest {
    return CryptServicePutSecretRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CryptServicePutSecretRequest>): CryptServicePutSecretRequest {
    const message = createBaseCryptServicePutSecretRequest();
    message.resource = (object.resource !== undefined && object.resource !== null)
      ? Resource.fromPartial(object.resource)
      : undefined;
    message.name = object.name ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseCryptServicePutSecretResponse(): CryptServicePutSecretResponse {
  return {};
}

export const CryptServicePutSecretResponse = {
  encode(_: CryptServicePutSecretResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CryptServicePutSecretResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCryptServicePutSecretResponse();
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

  create(base?: DeepPartial<CryptServicePutSecretResponse>): CryptServicePutSecretResponse {
    return CryptServicePutSecretResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<CryptServicePutSecretResponse>): CryptServicePutSecretResponse {
    const message = createBaseCryptServicePutSecretResponse();
    return message;
  },
};

/** Encryption and decryption of resource-specific data. */
export type CryptServiceDefinition = typeof CryptServiceDefinition;
export const CryptServiceDefinition = {
  name: "CryptService",
  fullName: "blockjoy.v1.CryptService",
  methods: {
    /** Returns a decrypted resource secret. */
    getSecret: {
      name: "GetSecret",
      requestType: CryptServiceGetSecretRequest,
      requestStream: false,
      responseType: CryptServiceGetSecretResponse,
      responseStream: false,
      options: {},
    },
    /** Write a secret to encrypted storage. */
    putSecret: {
      name: "PutSecret",
      requestType: CryptServicePutSecretRequest,
      requestStream: false,
      responseType: CryptServicePutSecretResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface CryptServiceImplementation<CallContextExt = {}> {
  /** Returns a decrypted resource secret. */
  getSecret(
    request: CryptServiceGetSecretRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CryptServiceGetSecretResponse>>;
  /** Write a secret to encrypted storage. */
  putSecret(
    request: CryptServicePutSecretRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CryptServicePutSecretResponse>>;
}

export interface CryptServiceClient<CallOptionsExt = {}> {
  /** Returns a decrypted resource secret. */
  getSecret(
    request: DeepPartial<CryptServiceGetSecretRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CryptServiceGetSecretResponse>;
  /** Write a secret to encrypted storage. */
  putSecret(
    request: DeepPartial<CryptServicePutSecretRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CryptServicePutSecretResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
