/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

/** A single keyfile representation */
export interface Keyfile {
  name: string;
  content: Uint8Array;
}

export interface KeyFileServiceListRequest {
  nodeId: string;
}

export interface KeyFileServiceListResponse {
  keyFiles: Keyfile[];
}

export interface KeyFileServiceCreateRequest {
  nodeId: string;
  keyFiles: Keyfile[];
}

export interface KeyFileServiceCreateResponse {
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
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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

function createBaseKeyFileServiceListRequest(): KeyFileServiceListRequest {
  return { nodeId: "" };
}

export const KeyFileServiceListRequest = {
  encode(message: KeyFileServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyFileServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyFileServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<KeyFileServiceListRequest>): KeyFileServiceListRequest {
    return KeyFileServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KeyFileServiceListRequest>): KeyFileServiceListRequest {
    const message = createBaseKeyFileServiceListRequest();
    message.nodeId = object.nodeId ?? "";
    return message;
  },
};

function createBaseKeyFileServiceListResponse(): KeyFileServiceListResponse {
  return { keyFiles: [] };
}

export const KeyFileServiceListResponse = {
  encode(message: KeyFileServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.keyFiles) {
      Keyfile.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyFileServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyFileServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.keyFiles.push(Keyfile.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<KeyFileServiceListResponse>): KeyFileServiceListResponse {
    return KeyFileServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KeyFileServiceListResponse>): KeyFileServiceListResponse {
    const message = createBaseKeyFileServiceListResponse();
    message.keyFiles = object.keyFiles?.map((e) => Keyfile.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKeyFileServiceCreateRequest(): KeyFileServiceCreateRequest {
  return { nodeId: "", keyFiles: [] };
}

export const KeyFileServiceCreateRequest = {
  encode(message: KeyFileServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nodeId !== "") {
      writer.uint32(10).string(message.nodeId);
    }
    for (const v of message.keyFiles) {
      Keyfile.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyFileServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyFileServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nodeId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.keyFiles.push(Keyfile.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<KeyFileServiceCreateRequest>): KeyFileServiceCreateRequest {
    return KeyFileServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<KeyFileServiceCreateRequest>): KeyFileServiceCreateRequest {
    const message = createBaseKeyFileServiceCreateRequest();
    message.nodeId = object.nodeId ?? "";
    message.keyFiles = object.keyFiles?.map((e) => Keyfile.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKeyFileServiceCreateResponse(): KeyFileServiceCreateResponse {
  return {};
}

export const KeyFileServiceCreateResponse = {
  encode(_: KeyFileServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyFileServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyFileServiceCreateResponse();
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

  create(base?: DeepPartial<KeyFileServiceCreateResponse>): KeyFileServiceCreateResponse {
    return KeyFileServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<KeyFileServiceCreateResponse>): KeyFileServiceCreateResponse {
    const message = createBaseKeyFileServiceCreateResponse();
    return message;
  },
};

export type KeyFileServiceDefinition = typeof KeyFileServiceDefinition;
export const KeyFileServiceDefinition = {
  name: "KeyFileService",
  fullName: "blockjoy.v1.KeyFileService",
  methods: {
    /** Save key files for given node ID */
    create: {
      name: "Create",
      requestType: KeyFileServiceCreateRequest,
      requestStream: false,
      responseType: KeyFileServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Return all available key files for given node ID */
    list: {
      name: "List",
      requestType: KeyFileServiceListRequest,
      requestStream: false,
      responseType: KeyFileServiceListResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface KeyFileServiceImplementation<CallContextExt = {}> {
  /** Save key files for given node ID */
  create(
    request: KeyFileServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<KeyFileServiceCreateResponse>>;
  /** Return all available key files for given node ID */
  list(
    request: KeyFileServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<KeyFileServiceListResponse>>;
}

export interface KeyFileServiceClient<CallOptionsExt = {}> {
  /** Save key files for given node ID */
  create(
    request: DeepPartial<KeyFileServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<KeyFileServiceCreateResponse>;
  /** Return all available key files for given node ID */
  list(
    request: DeepPartial<KeyFileServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<KeyFileServiceListResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
