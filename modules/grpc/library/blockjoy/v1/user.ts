/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { SearchOperator, SortOrder } from "../common/v1/search";

export const protobufPackage = "blockjoy.v1";

export enum UserSortField {
  USER_SORT_FIELD_UNSPECIFIED = 0,
  USER_SORT_FIELD_EMAIL = 1,
  USER_SORT_FIELD_FIRST_NAME = 2,
  USER_SORT_FIELD_LAST_NAME = 3,
  USER_SORT_FIELD_CREATED_AT = 4,
  UNRECOGNIZED = -1,
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date | undefined;
}

export interface UserServiceGetRequest {
  userId: string;
}

export interface UserServiceGetResponse {
  user: User | undefined;
}

export interface UserServiceListRequest {
  /** If non-empty, list user details for these user ids. */
  userIds: string[];
  /** If non-empty, list users from these org ids. */
  orgIds: string[];
  /** The number of results to skip. */
  offset: number;
  /** Limit the number of results. */
  limit: number;
  /** Search these parameters. */
  search?:
    | UserSearch
    | undefined;
  /** Sort the results in this order. */
  sort: UserSort[];
}

/** Search users by these fields. */
export interface UserSearch {
  /** How to combine the parameters. */
  operator: SearchOperator;
  /** Search for matching emails (case-insensitive and '%' is a wildcard). */
  email?:
    | string
    | undefined;
  /** Search for this full name. */
  name?: string | undefined;
}

export interface UserSort {
  field: UserSortField;
  order: SortOrder;
}

export interface UserServiceListResponse {
  users: User[];
  total: number;
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
  userId: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
}

export interface UserServiceUpdateResponse {
  user: User | undefined;
}

export interface UserServiceDeleteRequest {
  userId: string;
}

export interface UserServiceDeleteResponse {
}

export interface UserServiceGetSettingsRequest {
  userId: string;
}

export interface UserServiceGetSettingsResponse {
  settings: { [key: string]: Uint8Array };
}

export interface UserServiceGetSettingsResponse_SettingsEntry {
  key: string;
  value: Uint8Array;
}

export interface UserServiceUpdateSettingsRequest {
  userId: string;
  key: string;
  value: Uint8Array;
}

export interface UserServiceUpdateSettingsResponse {
  key: string;
  value: Uint8Array;
}

export interface UserServiceDeleteSettingsRequest {
  userId: string;
  key: string;
}

export interface UserServiceDeleteSettingsResponse {
}

function createBaseUser(): User {
  return { userId: "", email: "", firstName: "", lastName: "", createdAt: undefined };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
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

          message.userId = reader.string();
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
        case 5:
          if (tag !== 42) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
    message.userId = object.userId ?? "";
    message.email = object.email ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

function createBaseUserServiceGetRequest(): UserServiceGetRequest {
  return { userId: "" };
}

export const UserServiceGetRequest = {
  encode(message: UserServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
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

  create(base?: DeepPartial<UserServiceGetRequest>): UserServiceGetRequest {
    return UserServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetRequest>): UserServiceGetRequest {
    const message = createBaseUserServiceGetRequest();
    message.userId = object.userId ?? "";
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

function createBaseUserServiceListRequest(): UserServiceListRequest {
  return { userIds: [], orgIds: [], offset: 0, limit: 0, search: undefined, sort: [] };
}

export const UserServiceListRequest = {
  encode(message: UserServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.userIds) {
      writer.uint32(10).string(v!);
    }
    for (const v of message.orgIds) {
      writer.uint32(18).string(v!);
    }
    if (message.offset !== 0) {
      writer.uint32(24).uint64(message.offset);
    }
    if (message.limit !== 0) {
      writer.uint32(32).uint64(message.limit);
    }
    if (message.search !== undefined) {
      UserSearch.encode(message.search, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.sort) {
      UserSort.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userIds.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgIds.push(reader.string());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.offset = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.search = UserSearch.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.sort.push(UserSort.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceListRequest>): UserServiceListRequest {
    return UserServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceListRequest>): UserServiceListRequest {
    const message = createBaseUserServiceListRequest();
    message.userIds = object.userIds?.map((e) => e) || [];
    message.orgIds = object.orgIds?.map((e) => e) || [];
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    message.search = (object.search !== undefined && object.search !== null)
      ? UserSearch.fromPartial(object.search)
      : undefined;
    message.sort = object.sort?.map((e) => UserSort.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUserSearch(): UserSearch {
  return { operator: 0, email: undefined, name: undefined };
}

export const UserSearch = {
  encode(message: UserSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.email !== undefined) {
      writer.uint32(18).string(message.email);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserSearch {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserSearch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.operator = reader.int32() as any;
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

  create(base?: DeepPartial<UserSearch>): UserSearch {
    return UserSearch.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserSearch>): UserSearch {
    const message = createBaseUserSearch();
    message.operator = object.operator ?? 0;
    message.email = object.email ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseUserSort(): UserSort {
  return { field: 0, order: 0 };
}

export const UserSort = {
  encode(message: UserSort, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== 0) {
      writer.uint32(8).int32(message.field);
    }
    if (message.order !== 0) {
      writer.uint32(16).int32(message.order);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserSort {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserSort();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.order = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserSort>): UserSort {
    return UserSort.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserSort>): UserSort {
    const message = createBaseUserSort();
    message.field = object.field ?? 0;
    message.order = object.order ?? 0;
    return message;
  },
};

function createBaseUserServiceListResponse(): UserServiceListResponse {
  return { users: [], total: 0 };
}

export const UserServiceListResponse = {
  encode(message: UserServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.total !== 0) {
      writer.uint32(16).uint64(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.total = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceListResponse>): UserServiceListResponse {
    return UserServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceListResponse>): UserServiceListResponse {
    const message = createBaseUserServiceListResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    message.total = object.total ?? 0;
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
  return { userId: "", firstName: undefined, lastName: undefined };
}

export const UserServiceUpdateRequest = {
  encode(message: UserServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
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
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
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
    message.userId = object.userId ?? "";
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
  return { userId: "" };
}

export const UserServiceDeleteRequest = {
  encode(message: UserServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
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

  create(base?: DeepPartial<UserServiceDeleteRequest>): UserServiceDeleteRequest {
    return UserServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceDeleteRequest>): UserServiceDeleteRequest {
    const message = createBaseUserServiceDeleteRequest();
    message.userId = object.userId ?? "";
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

function createBaseUserServiceGetSettingsRequest(): UserServiceGetSettingsRequest {
  return { userId: "" };
}

export const UserServiceGetSettingsRequest = {
  encode(message: UserServiceGetSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetSettingsRequest();
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

  create(base?: DeepPartial<UserServiceGetSettingsRequest>): UserServiceGetSettingsRequest {
    return UserServiceGetSettingsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetSettingsRequest>): UserServiceGetSettingsRequest {
    const message = createBaseUserServiceGetSettingsRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserServiceGetSettingsResponse(): UserServiceGetSettingsResponse {
  return { settings: {} };
}

export const UserServiceGetSettingsResponse = {
  encode(message: UserServiceGetSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.settings).forEach(([key, value]) => {
      UserServiceGetSettingsResponse_SettingsEntry.encode({ key: key as any, value }, writer.uint32(10).fork())
        .ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetSettingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = UserServiceGetSettingsResponse_SettingsEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.settings[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceGetSettingsResponse>): UserServiceGetSettingsResponse {
    return UserServiceGetSettingsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceGetSettingsResponse>): UserServiceGetSettingsResponse {
    const message = createBaseUserServiceGetSettingsResponse();
    message.settings = Object.entries(object.settings ?? {}).reduce<{ [key: string]: Uint8Array }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseUserServiceGetSettingsResponse_SettingsEntry(): UserServiceGetSettingsResponse_SettingsEntry {
  return { key: "", value: new Uint8Array() };
}

export const UserServiceGetSettingsResponse_SettingsEntry = {
  encode(message: UserServiceGetSettingsResponse_SettingsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceGetSettingsResponse_SettingsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceGetSettingsResponse_SettingsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  create(
    base?: DeepPartial<UserServiceGetSettingsResponse_SettingsEntry>,
  ): UserServiceGetSettingsResponse_SettingsEntry {
    return UserServiceGetSettingsResponse_SettingsEntry.fromPartial(base ?? {});
  },

  fromPartial(
    object: DeepPartial<UserServiceGetSettingsResponse_SettingsEntry>,
  ): UserServiceGetSettingsResponse_SettingsEntry {
    const message = createBaseUserServiceGetSettingsResponse_SettingsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseUserServiceUpdateSettingsRequest(): UserServiceUpdateSettingsRequest {
  return { userId: "", key: "", value: new Uint8Array() };
}

export const UserServiceUpdateSettingsRequest = {
  encode(message: UserServiceUpdateSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceUpdateSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceUpdateSettingsRequest();
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

          message.key = reader.string();
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

  create(base?: DeepPartial<UserServiceUpdateSettingsRequest>): UserServiceUpdateSettingsRequest {
    return UserServiceUpdateSettingsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateSettingsRequest>): UserServiceUpdateSettingsRequest {
    const message = createBaseUserServiceUpdateSettingsRequest();
    message.userId = object.userId ?? "";
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseUserServiceUpdateSettingsResponse(): UserServiceUpdateSettingsResponse {
  return { key: "", value: new Uint8Array() };
}

export const UserServiceUpdateSettingsResponse = {
  encode(message: UserServiceUpdateSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceUpdateSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceUpdateSettingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
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

  create(base?: DeepPartial<UserServiceUpdateSettingsResponse>): UserServiceUpdateSettingsResponse {
    return UserServiceUpdateSettingsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateSettingsResponse>): UserServiceUpdateSettingsResponse {
    const message = createBaseUserServiceUpdateSettingsResponse();
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseUserServiceDeleteSettingsRequest(): UserServiceDeleteSettingsRequest {
  return { userId: "", key: "" };
}

export const UserServiceDeleteSettingsRequest = {
  encode(message: UserServiceDeleteSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteSettingsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteSettingsRequest();
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

          message.key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceDeleteSettingsRequest>): UserServiceDeleteSettingsRequest {
    return UserServiceDeleteSettingsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceDeleteSettingsRequest>): UserServiceDeleteSettingsRequest {
    const message = createBaseUserServiceDeleteSettingsRequest();
    message.userId = object.userId ?? "";
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseUserServiceDeleteSettingsResponse(): UserServiceDeleteSettingsResponse {
  return {};
}

export const UserServiceDeleteSettingsResponse = {
  encode(_: UserServiceDeleteSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceDeleteSettingsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceDeleteSettingsResponse();
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

  create(base?: DeepPartial<UserServiceDeleteSettingsResponse>): UserServiceDeleteSettingsResponse {
    return UserServiceDeleteSettingsResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UserServiceDeleteSettingsResponse>): UserServiceDeleteSettingsResponse {
    const message = createBaseUserServiceDeleteSettingsResponse();
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
    list: {
      name: "List",
      requestType: UserServiceListRequest,
      requestStream: false,
      responseType: UserServiceListResponse,
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
    /** Retrieve the settings for a user. */
    getSettings: {
      name: "GetSettings",
      requestType: UserServiceGetSettingsRequest,
      requestStream: false,
      responseType: UserServiceGetSettingsResponse,
      responseStream: false,
      options: {},
    },
    /** Modify a setting for a user. */
    updateSettings: {
      name: "UpdateSettings",
      requestType: UserServiceUpdateSettingsRequest,
      requestStream: false,
      responseType: UserServiceUpdateSettingsResponse,
      responseStream: false,
      options: {},
    },
    /** Delete a setting for a user. */
    deleteSettings: {
      name: "DeleteSettings",
      requestType: UserServiceDeleteSettingsRequest,
      requestStream: false,
      responseType: UserServiceDeleteSettingsResponse,
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
  list(
    request: UserServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceListResponse>>;
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
  /** Retrieve the settings for a user. */
  getSettings(
    request: UserServiceGetSettingsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceGetSettingsResponse>>;
  /** Modify a setting for a user. */
  updateSettings(
    request: UserServiceUpdateSettingsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceUpdateSettingsResponse>>;
  /** Delete a setting for a user. */
  deleteSettings(
    request: UserServiceDeleteSettingsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceDeleteSettingsResponse>>;
}

export interface UserServiceClient<CallOptionsExt = {}> {
  /** Retrieve a single user. */
  get(
    request: DeepPartial<UserServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceGetResponse>;
  /** Retrieve multiple users my means of a filter. */
  list(
    request: DeepPartial<UserServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceListResponse>;
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
  /** Retrieve the settings for a user. */
  getSettings(
    request: DeepPartial<UserServiceGetSettingsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceGetSettingsResponse>;
  /** Modify a setting for a user. */
  updateSettings(
    request: DeepPartial<UserServiceUpdateSettingsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceUpdateSettingsResponse>;
  /** Delete a setting for a user. */
  deleteSettings(
    request: DeepPartial<UserServiceDeleteSettingsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceDeleteSettingsResponse>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
