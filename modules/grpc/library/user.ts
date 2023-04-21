/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "v1";

/** User representation. */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface GetUserRequest {
}

export interface GetUserResponse {
  user: User | undefined;
}

export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateUserResponse {
  user: User | undefined;
}

export interface UpdateUserRequest {
  /** The id of the user to be updated. */
  id: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface UpdateUserResponse {
  user: User | undefined;
}

/** Users can only delete themselves, so no need for any further params */
export interface DeleteUserRequest {
}

export interface DeleteUserResponse {
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

function createBaseGetUserRequest(): GetUserRequest {
  return {};
}

export const GetUserRequest = {
  encode(_: GetUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserRequest();
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

  create(base?: DeepPartial<GetUserRequest>): GetUserRequest {
    return GetUserRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<GetUserRequest>): GetUserRequest {
    const message = createBaseGetUserRequest();
    return message;
  },
};

function createBaseGetUserResponse(): GetUserResponse {
  return { user: undefined };
}

export const GetUserResponse = {
  encode(message: GetUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserResponse();
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

  create(base?: DeepPartial<GetUserResponse>): GetUserResponse {
    return GetUserResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetUserResponse>): GetUserResponse {
    const message = createBaseGetUserResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseCreateUserRequest(): CreateUserRequest {
  return { email: "", firstName: "", lastName: "", password: "" };
}

export const CreateUserRequest = {
  encode(message: CreateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserRequest();
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

  create(base?: DeepPartial<CreateUserRequest>): CreateUserRequest {
    return CreateUserRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateUserRequest>): CreateUserRequest {
    const message = createBaseCreateUserRequest();
    message.email = object.email ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseCreateUserResponse(): CreateUserResponse {
  return { user: undefined };
}

export const CreateUserResponse = {
  encode(message: CreateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateUserResponse();
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

  create(base?: DeepPartial<CreateUserResponse>): CreateUserResponse {
    return CreateUserResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateUserResponse>): CreateUserResponse {
    const message = createBaseCreateUserResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseUpdateUserRequest(): UpdateUserRequest {
  return { id: "", firstName: undefined, lastName: undefined };
}

export const UpdateUserRequest = {
  encode(message: UpdateUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserRequest();
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

  create(base?: DeepPartial<UpdateUserRequest>): UpdateUserRequest {
    return UpdateUserRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateUserRequest>): UpdateUserRequest {
    const message = createBaseUpdateUserRequest();
    message.id = object.id ?? "";
    message.firstName = object.firstName ?? undefined;
    message.lastName = object.lastName ?? undefined;
    return message;
  },
};

function createBaseUpdateUserResponse(): UpdateUserResponse {
  return { user: undefined };
}

export const UpdateUserResponse = {
  encode(message: UpdateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserResponse();
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

  create(base?: DeepPartial<UpdateUserResponse>): UpdateUserResponse {
    return UpdateUserResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateUserResponse>): UpdateUserResponse {
    const message = createBaseUpdateUserResponse();
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

function createBaseDeleteUserRequest(): DeleteUserRequest {
  return {};
}

export const DeleteUserRequest = {
  encode(_: DeleteUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUserRequest();
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

  create(base?: DeepPartial<DeleteUserRequest>): DeleteUserRequest {
    return DeleteUserRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DeleteUserRequest>): DeleteUserRequest {
    const message = createBaseDeleteUserRequest();
    return message;
  },
};

function createBaseDeleteUserResponse(): DeleteUserResponse {
  return {};
}

export const DeleteUserResponse = {
  encode(_: DeleteUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteUserResponse();
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

  create(base?: DeepPartial<DeleteUserResponse>): DeleteUserResponse {
    return DeleteUserResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DeleteUserResponse>): DeleteUserResponse {
    const message = createBaseDeleteUserResponse();
    return message;
  },
};

/** User related services. */
export type UsersDefinition = typeof UsersDefinition;
export const UsersDefinition = {
  name: "Users",
  fullName: "v1.Users",
  methods: {
    /** Retrieve a single user. */
    get: {
      name: "Get",
      requestType: GetUserRequest,
      requestStream: false,
      responseType: GetUserResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single user. */
    create: {
      name: "Create",
      requestType: CreateUserRequest,
      requestStream: false,
      responseType: CreateUserResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single user. */
    update: {
      name: "Update",
      requestType: UpdateUserRequest,
      requestStream: false,
      responseType: UpdateUserResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a single user. */
    delete: {
      name: "Delete",
      requestType: DeleteUserRequest,
      requestStream: false,
      responseType: DeleteUserResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface UsersServiceImplementation<CallContextExt = {}> {
  /** Retrieve a single user. */
  get(request: GetUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetUserResponse>>;
  /** Create a single user. */
  create(request: CreateUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CreateUserResponse>>;
  /** Update a single user. */
  update(request: UpdateUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UpdateUserResponse>>;
  /** Delete a single user. */
  delete(request: DeleteUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DeleteUserResponse>>;
}

export interface UsersClient<CallOptionsExt = {}> {
  /** Retrieve a single user. */
  get(request: DeepPartial<GetUserRequest>, options?: CallOptions & CallOptionsExt): Promise<GetUserResponse>;
  /** Create a single user. */
  create(request: DeepPartial<CreateUserRequest>, options?: CallOptions & CallOptionsExt): Promise<CreateUserResponse>;
  /** Update a single user. */
  update(request: DeepPartial<UpdateUserRequest>, options?: CallOptions & CallOptionsExt): Promise<UpdateUserResponse>;
  /** Delete a single user. */
  delete(request: DeepPartial<DeleteUserRequest>, options?: CallOptions & CallOptionsExt): Promise<DeleteUserResponse>;
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
