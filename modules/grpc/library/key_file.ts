/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "v1";

/** A single keyfile representation */
export interface Keyfile {
  name: string;
  content: Uint8Array;
}

export interface GetKeyFilesRequest {
  nodeId: string;
}

export interface GetKeyFilesResponse {
  keyFiles: Keyfile[];
}

export interface CreateKeyFilesRequest {
  nodeId: string;
  keyFiles: Keyfile[];
}

export interface CreateKeyFilesResponse {
}

function createBaseKeyfile(): Keyfile {
  return { name: "", content: new Uint8Array() };
}

export const Keyfile = {
  encode(message: Keyfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.content.length !== 0) {
      writer.uint32(18).bytes(message.content);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Keyfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Keyfile>): Keyfile {
    return Keyfile.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Keyfile>): Keyfile {
    const message = createBaseKeyfile();
    message.name = object.name ?? "";
    message.content = object.content ?? new Uint8Array();
    return message;
  },
};

function createBaseGetKeyFilesRequest(): GetKeyFilesRequest {
  return { nodeId: "" };
}

export const GetKeyFilesRequest = {
  encode(message: GetKeyFilesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetKeyFilesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetKeyFilesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetKeyFilesRequest>): GetKeyFilesRequest {
    return GetKeyFilesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetKeyFilesRequest>): GetKeyFilesRequest {
    const message = createBaseGetKeyFilesRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseGetKeyFilesResponse(): GetKeyFilesResponse {
  return { keyFiles: [] };
}

export const GetKeyFilesResponse = {
  encode(message: GetKeyFilesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.keyFiles) {
      Keyfile.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetKeyFilesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetKeyFilesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.keyFiles.push(Keyfile.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetKeyFilesResponse>): GetKeyFilesResponse {
    return GetKeyFilesResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetKeyFilesResponse>): GetKeyFilesResponse {
    const message = createBaseGetKeyFilesResponse();
    message.keyFiles = object.keyFiles?.map((e) => Keyfile.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateKeyFilesRequest(): CreateKeyFilesRequest {
  return { nodeId: "", keyFiles: [] };
}

export const CreateKeyFilesRequest = {
  encode(message: CreateKeyFilesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    for (const v of message.keyFiles) {
      Keyfile.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateKeyFilesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateKeyFilesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.keyFiles.push(Keyfile.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateKeyFilesRequest>): CreateKeyFilesRequest {
    return CreateKeyFilesRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateKeyFilesRequest>): CreateKeyFilesRequest {
    const message = createBaseCreateKeyFilesRequest();
    message.nodeId = object.nodeId ?? "";
    message.keyFiles = object.keyFiles?.map((e) => Keyfile.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateKeyFilesResponse(): CreateKeyFilesResponse {
  return {};
}

export const CreateKeyFilesResponse = {
  encode(_: CreateKeyFilesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateKeyFilesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateKeyFilesResponse();
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

  create(base?: DeepPartial<CreateKeyFilesResponse>): CreateKeyFilesResponse {
    return CreateKeyFilesResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<CreateKeyFilesResponse>): CreateKeyFilesResponse {
    const message = createBaseCreateKeyFilesResponse();
    return message;
  },
};

export type KeyFilesDefinition = typeof KeyFilesDefinition;
export const KeyFilesDefinition = {
  name: "KeyFiles",
  fullName: "v1.KeyFiles",
  methods: {
    /** Save key files for given node ID */
    create: {
      name: "Create",
      requestType: CreateKeyFilesRequest,
      requestStream: false,
      responseType: CreateKeyFilesResponse,
      responseStream: false,
      options: {},
    },
    /** Return all available key files for given node ID */
    get: {
      name: "Get",
      requestType: GetKeyFilesRequest,
      requestStream: false,
      responseType: GetKeyFilesResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface KeyFilesServiceImplementation<CallContextExt = {}> {
  /** Save key files for given node ID */
  create(
    request: CreateKeyFilesRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CreateKeyFilesResponse>>;
  /** Return all available key files for given node ID */
  get(request: GetKeyFilesRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetKeyFilesResponse>>;
}

export interface KeyFilesClient<CallOptionsExt = {}> {
  /** Save key files for given node ID */
  create(
    request: DeepPartial<CreateKeyFilesRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CreateKeyFilesResponse>;
  /** Return all available key files for given node ID */
  get(request: DeepPartial<GetKeyFilesRequest>, options?: CallOptions & CallOptionsExt): Promise<GetKeyFilesResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
