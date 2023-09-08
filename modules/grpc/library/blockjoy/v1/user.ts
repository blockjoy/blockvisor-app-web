/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

export enum UserRole {
  USER_ROLE_UNSPECIFIED = 0,
  /** USER_ROLE_UNPRIVILEGED - This user has normal privileges. */
  USER_ROLE_UNPRIVILEGED = 1,
  /**
   * USER_ROLE_BLOCKJOY_ADMIN - This user is allowed to administer organizations that they are not a member
   * of.
   */
  USER_ROLE_BLOCKJOY_ADMIN = 2,
  UNRECOGNIZED = -1,
}

/** User representation. */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /**
   * Each users has a specific role within an organization, but they may also
   * posses a global role. For most users this will be `Unprivileged`, but there
   * are accounts that have the settings `Blockjoy Admin`. This means that  they
   * are allowed to do administrative tasks for other users.
   */
  role: UserRole;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface UserServiceGetRequest {
  id: string;
}

export interface UserServiceGetResponse {
  user: User | undefined;
}

export interface UserServiceFilterRequest {
  /**
   * Return only users from this org. This is required for users that do not
   * have access to the entire system (i.e. blockjoy's admins).
   */
  orgId?:
    | string
    | undefined;
  /**
   * Return only users whose email has the provided pattern as a substring. Note
   * that this search is not case sensitive. The wildcard symbol here is `'%'`.
   * For example, a query for all users whose email starts with `baremetal`
   * would look like `"baremetal%"`.
   */
  emailLike?: string | undefined;
}

export interface UserServiceFilterResponse {
  users: User[];
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
  role?: UserRole | undefined;
}

export interface UserServiceUpdateResponse {
  user: User | undefined;
}

export interface UserServiceDeleteRequest {
  id: string;
}

export interface UserServiceDeleteResponse {
}

export interface UserServiceGetBillingRequest {
  userId: string;
}

export interface UserServiceGetBillingResponse {
  billingId?: string | undefined;
}

export interface UserServiceUpdateBillingRequest {
  userId: string;
  billingId?: string | undefined;
}

export interface UserServiceUpdateBillingResponse {
  billingId?: string | undefined;
}

export interface UserServiceDeleteBillingRequest {
  userId: string;
}

export interface UserServiceDeleteBillingResponse {
}

function createBaseUser(): User {
  return { id: "", email: "", firstName: "", lastName: "", role: 0, createdAt: undefined, updatedAt: undefined };
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
    if (message.role !== 0) {
      writer.uint32(56).int32(message.role);
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
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    message.role = object.role ?? 0;
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
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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

function createBaseUserServiceFilterRequest(): UserServiceFilterRequest {
  return { orgId: undefined, emailLike: undefined };
}

export const UserServiceFilterRequest = {
  encode(message: UserServiceFilterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.emailLike !== undefined) {
      writer.uint32(18).string(message.emailLike);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceFilterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceFilterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.emailLike = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceFilterRequest>): UserServiceFilterRequest {
    return UserServiceFilterRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceFilterRequest>): UserServiceFilterRequest {
    const message = createBaseUserServiceFilterRequest();
    message.orgId = object.orgId ?? undefined;
    message.emailLike = object.emailLike ?? undefined;
    return message;
  },
};

function createBaseUserServiceFilterResponse(): UserServiceFilterResponse {
  return { users: [] };
}

export const UserServiceFilterResponse = {
  encode(message: UserServiceFilterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceFilterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceFilterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceFilterResponse>): UserServiceFilterResponse {
    return UserServiceFilterResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceFilterResponse>): UserServiceFilterResponse {
    const message = createBaseUserServiceFilterResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
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
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
  return { id: "", firstName: undefined, lastName: undefined, role: undefined };
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
    if (message.role !== undefined) {
      writer.uint32(32).int32(message.role);
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
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.firstName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lastName = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    message.role = object.role ?? undefined;
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
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
  return { id: "" };
}

export const UserServiceDeleteRequest = {
  encode(message: UserServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceDeleteRequest>): UserServiceDeleteRequest {
    return UserServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceDeleteRequest>): UserServiceDeleteRequest {
    const message = createBaseUserServiceDeleteRequest();
    message.id = object.id ?? "";
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
      if ((tag & 7) === 4 || tag === 0) {
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

function createBaseUserServiceGetBillingRequest(): UserServiceGetBillingRequest {
  return { userId: "" };
}

export const UserServiceGetBillingRequest = {
  encode(message: UserServiceGetBillingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetBillingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetBillingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceGetBillingRequest>): UserServiceGetBillingRequest {
    return UserServiceGetBillingRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetBillingRequest>): UserServiceGetBillingRequest {
    const message = createBaseUserServiceGetBillingRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserServiceGetBillingResponse(): UserServiceGetBillingResponse {
  return { billingId: undefined };
}

export const UserServiceGetBillingResponse = {
  encode(message: UserServiceGetBillingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.billingId !== undefined) {
      writer.uint32(10).string(message.billingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetBillingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetBillingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.billingId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceGetBillingResponse>): UserServiceGetBillingResponse {
    return UserServiceGetBillingResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetBillingResponse>): UserServiceGetBillingResponse {
    const message = createBaseUserServiceGetBillingResponse();
    message.billingId = object.billingId ?? undefined;
    return message;
  },
};

function createBaseUserServiceUpdateBillingRequest(): UserServiceUpdateBillingRequest {
  return { userId: "", billingId: undefined };
}

export const UserServiceUpdateBillingRequest = {
  encode(message: UserServiceUpdateBillingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.billingId !== undefined) {
      writer.uint32(18).string(message.billingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceUpdateBillingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceUpdateBillingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.billingId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceUpdateBillingRequest>): UserServiceUpdateBillingRequest {
    return UserServiceUpdateBillingRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateBillingRequest>): UserServiceUpdateBillingRequest {
    const message = createBaseUserServiceUpdateBillingRequest();
    message.userId = object.userId ?? "";
    message.billingId = object.billingId ?? undefined;
    return message;
  },
};

function createBaseUserServiceUpdateBillingResponse(): UserServiceUpdateBillingResponse {
  return { billingId: undefined };
}

export const UserServiceUpdateBillingResponse = {
  encode(message: UserServiceUpdateBillingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.billingId !== undefined) {
      writer.uint32(10).string(message.billingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceUpdateBillingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceUpdateBillingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.billingId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceUpdateBillingResponse>): UserServiceUpdateBillingResponse {
    return UserServiceUpdateBillingResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateBillingResponse>): UserServiceUpdateBillingResponse {
    const message = createBaseUserServiceUpdateBillingResponse();
    message.billingId = object.billingId ?? undefined;
    return message;
  },
};

function createBaseUserServiceDeleteBillingRequest(): UserServiceDeleteBillingRequest {
  return { userId: "" };
}

export const UserServiceDeleteBillingRequest = {
  encode(message: UserServiceDeleteBillingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteBillingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteBillingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceDeleteBillingRequest>): UserServiceDeleteBillingRequest {
    return UserServiceDeleteBillingRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceDeleteBillingRequest>): UserServiceDeleteBillingRequest {
    const message = createBaseUserServiceDeleteBillingRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserServiceDeleteBillingResponse(): UserServiceDeleteBillingResponse {
  return {};
}

export const UserServiceDeleteBillingResponse = {
  encode(_: UserServiceDeleteBillingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteBillingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteBillingResponse();
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

  create(base?: DeepPartial<UserServiceDeleteBillingResponse>): UserServiceDeleteBillingResponse {
    return UserServiceDeleteBillingResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UserServiceDeleteBillingResponse>): UserServiceDeleteBillingResponse {
    const message = createBaseUserServiceDeleteBillingResponse();
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
    /** Retrieve multiple users my means of a filter. */
    filter: {
      name: "Filter",
      requestType: UserServiceFilterRequest,
      requestStream: false,
      responseType: UserServiceFilterResponse,
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
    /** Retrieve the billing details of this user. */
    getBilling: {
      name: "GetBilling",
      requestType: UserServiceGetBillingRequest,
      requestStream: false,
      responseType: UserServiceGetBillingResponse,
      responseStream: false,
      options: {},
    },
    /** Overwrite the billing details of this user. */
    updateBilling: {
      name: "UpdateBilling",
      requestType: UserServiceUpdateBillingRequest,
      requestStream: false,
      responseType: UserServiceUpdateBillingResponse,
      responseStream: false,
      options: {},
    },
    /** Remove the billing details of this user. */
    deleteBilling: {
      name: "DeleteBilling",
      requestType: UserServiceDeleteBillingRequest,
      requestStream: false,
      responseType: UserServiceDeleteBillingResponse,
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
  /** Retrieve multiple users my means of a filter. */
  filter(
    request: UserServiceFilterRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceFilterResponse>>;
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
  /** Retrieve the billing details of this user. */
  getBilling(
    request: UserServiceGetBillingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceGetBillingResponse>>;
  /** Overwrite the billing details of this user. */
  updateBilling(
    request: UserServiceUpdateBillingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceUpdateBillingResponse>>;
  /** Remove the billing details of this user. */
  deleteBilling(
    request: UserServiceDeleteBillingRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceDeleteBillingResponse>>;
}

export interface UserServiceClient<CallOptionsExt = {}> {
  /** Retrieve a single user. */
  get(
    request: DeepPartial<UserServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceGetResponse>;
  /** Retrieve multiple users my means of a filter. */
  filter(
    request: DeepPartial<UserServiceFilterRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceFilterResponse>;
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
  /** Retrieve the billing details of this user. */
  getBilling(
    request: DeepPartial<UserServiceGetBillingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceGetBillingResponse>;
  /** Overwrite the billing details of this user. */
  updateBilling(
    request: DeepPartial<UserServiceUpdateBillingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceUpdateBillingResponse>;
  /** Remove the billing details of this user. */
  deleteBilling(
    request: DeepPartial<UserServiceDeleteBillingRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceDeleteBillingResponse>;
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
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new Date(millis);
}
