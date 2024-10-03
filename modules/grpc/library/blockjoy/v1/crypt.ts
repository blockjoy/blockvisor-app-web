/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Resource } from "../common/v1/resource";

export const protobufPackage = "blockjoy.v1";

export interface CryptServiceGetSecretRequest {
  /** The resource type requesting this secret. */
  resource: Resource;
  /** The resource id requesting this secret. */
  resourceId: string;
  /** The secret name to read. */
  name: string;
}

export interface CryptServiceGetSecretResponse {
  /** The decrypted secret bytes. */
  value: Uint8Array;
}

export interface CryptServicePutSecretRequest {
  /** The resource type writing this secret. */
  resource: Resource;
  /** The resource id writing this secret. */
  resourceId: string;
  /** The secret name to write. */
  name: string;
  /** The secret bytes to encrypt. */
  value: Uint8Array;
}

export interface CryptServicePutSecretResponse {
}

function createBaseCryptServiceGetSecretRequest(): CryptServiceGetSecretRequest {
  return { resource: 0, resourceId: "", name: "" };
}

export const CryptServiceGetSecretRequest = {
  encode(message: CryptServiceGetSecretRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== 0) {
      writer.uint32(8).int32(message.resource);
    }
    if (message.resourceId !== "") {
      writer.uint32(18).string(message.resourceId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
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
          if (tag !== 8) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resourceId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
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
    message.resource = object.resource ?? 0;
    message.resourceId = object.resourceId ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCryptServiceGetSecretResponse(): CryptServiceGetSecretResponse {
  return { value: new Uint8Array() };
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
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseCryptServicePutSecretRequest(): CryptServicePutSecretRequest {
  return { resource: 0, resourceId: "", name: "", value: new Uint8Array() };
}

export const CryptServicePutSecretRequest = {
  encode(message: CryptServicePutSecretRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== 0) {
      writer.uint32(8).int32(message.resource);
    }
    if (message.resourceId !== "") {
      writer.uint32(18).string(message.resourceId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.value.length !== 0) {
      writer.uint32(34).bytes(message.value);
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
          if (tag !== 8) {
            break;
          }

          message.resource = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.resourceId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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
    message.resource = object.resource ?? 0;
    message.resourceId = object.resourceId ?? "";
    message.name = object.name ?? "";
    message.value = object.value ?? new Uint8Array();
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
