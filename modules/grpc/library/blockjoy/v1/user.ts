/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

/** User representation. */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface UserServiceGetRequest {
  id: string;
}

export interface UserServiceGetResponse {
  user: User | undefined;
}

export interface UserServiceCreateRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UserServiceCreateResponse {
  user: User | undefined;
}

export interface UserServiceUpdateRequest {
  /** The id of the user to be updated. */
  id: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface UserServiceUpdateResponse {
  user: User | undefined;
}

/** Users can only delete themselves, so no need for any further params */
export interface UserServiceDeleteRequest {
}

export interface UserServiceDeleteResponse {
}

function createBaseUser(): User {
  return { id: "", email: "", firstName: "", lastName: "", createdAt: undefined, updatedAt: undefined };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.firstName !== "") {
      writer.uint32(26).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(34).string(message.lastName);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<User>): User {
    return User.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<User>): User {
    const message = createBaseUser();
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseUserServiceGetRequest(): UserServiceGetRequest {
  return { id: "" };
}

export const UserServiceGetRequest = {
  encode(message: UserServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceGetRequest>): UserServiceGetRequest {
    return UserServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetRequest>): UserServiceGetRequest {
    const message = createBaseUserServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseUserServiceGetResponse(): UserServiceGetResponse {
  return { user: undefined };
}

export const UserServiceGetResponse = {
  encode(message: UserServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceGetResponse>): UserServiceGetResponse {
    return UserServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetResponse>): UserServiceGetResponse {
    const message = createBaseUserServiceGetResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseUserServiceCreateRequest(): UserServiceCreateRequest {
  return { email: "", firstName: "", lastName: "", password: "" };
}

export const UserServiceCreateRequest = {
  encode(message: UserServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.firstName !== "") {
      writer.uint32(18).string(message.firstName);
    }
    if (message.lastName !== "") {
      writer.uint32(26).string(message.lastName);
    }
    if (message.password !== "") {
      writer.uint32(34).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceCreateRequest>): UserServiceCreateRequest {
    return UserServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceCreateRequest>): UserServiceCreateRequest {
    const message = createBaseUserServiceCreateRequest();
    message.email = object.email ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUserServiceCreateResponse(): UserServiceCreateResponse {
  return { user: undefined };
}

export const UserServiceCreateResponse = {
  encode(message: UserServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceCreateResponse>): UserServiceCreateResponse {
    return UserServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceCreateResponse>): UserServiceCreateResponse {
    const message = createBaseUserServiceCreateResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseUserServiceUpdateRequest(): UserServiceUpdateRequest {
  return { id: "", firstName: undefined, lastName: undefined };
}

export const UserServiceUpdateRequest = {
  encode(message: UserServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.firstName !== undefined) {
      writer.uint32(18).string(message.firstName);
    }
    if (message.lastName !== undefined) {
      writer.uint32(26).string(message.lastName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.lastName = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceUpdateRequest>): UserServiceUpdateRequest {
    return UserServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateRequest>): UserServiceUpdateRequest {
    const message = createBaseUserServiceUpdateRequest();
    message.id = object.id ?? "";
    message.firstName = object.firstName ?? undefined;
    message.lastName = object.lastName ?? undefined;
    return message;
  },
};

function createBaseUserServiceUpdateResponse(): UserServiceUpdateResponse {
  return { user: undefined };
}

export const UserServiceUpdateResponse = {
  encode(message: UserServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceUpdateResponse>): UserServiceUpdateResponse {
    return UserServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateResponse>): UserServiceUpdateResponse {
    const message = createBaseUserServiceUpdateResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseUserServiceDeleteRequest(): UserServiceDeleteRequest {
  return {};
}

export const UserServiceDeleteRequest = {
  encode(_: UserServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteRequest();
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

  create(base?: DeepPartial<UserServiceDeleteRequest>): UserServiceDeleteRequest {
    return UserServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UserServiceDeleteRequest>): UserServiceDeleteRequest {
    const message = createBaseUserServiceDeleteRequest();
    return message;
  },
};

function createBaseUserServiceDeleteResponse(): UserServiceDeleteResponse {
  return {};
}

export const UserServiceDeleteResponse = {
  encode(_: UserServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteResponse();
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

  create(base?: DeepPartial<UserServiceDeleteResponse>): UserServiceDeleteResponse {
    return UserServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UserServiceDeleteResponse>): UserServiceDeleteResponse {
    const message = createBaseUserServiceDeleteResponse();
    return message;
  },
};

/** User related services. */
export type UserServiceDefinition = typeof UserServiceDefinition;
export const UserServiceDefinition = {
  name: "UserService",
  fullName: "blockjoy.v1.UserService",
  methods: {
    /** Retrieve a single user. */
    get: {
      name: "Get",
      requestType: UserServiceGetRequest,
      requestStream: false,
      responseType: UserServiceGetResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single user. */
    create: {
      name: "Create",
      requestType: UserServiceCreateRequest,
      requestStream: false,
      responseType: UserServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single user. */
    update: {
      name: "Update",
      requestType: UserServiceUpdateRequest,
      requestStream: false,
      responseType: UserServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single user. */
    delete: {
      name: "Delete",
      requestType: UserServiceDeleteRequest,
      requestStream: false,
      responseType: UserServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface UserServiceImplementation<CallContextExt = {}> {
  /** Retrieve a single user. */
  get(
    request: UserServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceGetResponse>>;
  /** Create a single user. */
  create(
    request: UserServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceCreateResponse>>;
  /** Update a single user. */
  update(
    request: UserServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceUpdateResponse>>;
  /** Delete a single user. */
  delete(
    request: UserServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceDeleteResponse>>;
}

export interface UserServiceClient<CallOptionsExt = {}> {
  /** Retrieve a single user. */
  get(
    request: DeepPartial<UserServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceGetResponse>;
  /** Create a single user. */
  create(
    request: DeepPartial<UserServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceCreateResponse>;
  /** Update a single user. */
  update(
    request: DeepPartial<UserServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceUpdateResponse>;
  /** Delete a single user. */
  delete(
    request: DeepPartial<UserServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceDeleteResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}
