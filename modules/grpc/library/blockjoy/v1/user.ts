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

/** User representation. */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date | undefined;
}

export interface UserServiceGetRequest {
  id: string;
}

export interface UserServiceGetResponse {
  user: User | undefined;
}

export interface UserServiceListRequest {
  /**
   * Return only users from this org. This is required for users that do not
   * have access to the entire system (i.e. blockjoy's admins).
   */
  orgId?:
    | string
    | undefined;
  /** The number of items to be skipped over. */
  offset: number;
  /**
   * The number of items that will be returned. Together with offset, you can
   * use this to get pagination.
   */
  limit: number;
  /** Search params. */
  search?:
    | UserSearch
    | undefined;
  /** The field sorting order of results. */
  sort: UserSort[];
}

/**
 * This message contains fields used to search organizations as opposed to just
 * filtering them.
 */
export interface UserSearch {
  /** The way the search parameters should be combined. */
  operator: SearchOperator;
  /** Search only the id. */
  id?:
    | string
    | undefined;
  /**
   * Return only users whose email has the provided pattern as a substring. Note
   * that this search is not case sensitive. The wildcard symbol here is `'%'`.
   * For example, a query for all users whose email starts with `baremetal`
   * would look like `"baremetal%"`.
   */
  email?:
    | string
    | undefined;
  /** Search only the full name. */
  name?: string | undefined;
}

export interface UserSort {
  field: UserSortField;
  order: SortOrder;
}

export interface UserServiceListResponse {
  users: User[];
  /** The total number of users matching your query. */
  userCount: number;
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

export interface UserServiceGetSettingsRequest {
  /** The id of the user for which to return the settings. */
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
  name: string;
  value: Uint8Array;
}

export interface UserServiceUpdateSettingsResponse {
  name: string;
  value: Uint8Array;
}

export interface UserServiceDeleteSettingsRequest {
  userId: string;
  name: string;
}

export interface UserServiceDeleteSettingsResponse {
}

export interface UserServiceInitCardRequest {
  userId: string;
}

export interface UserServiceInitCardResponse {
  clientSecret: string;
}

export interface UserServiceListPaymentMethodsRequest {
  userId: string;
}

export interface UserServiceListPaymentMethodsResponse {
  methods: PaymentMethod[];
}

export interface PaymentMethod {
  id?: string | undefined;
  userId: string;
  details: BillingDetails | undefined;
  createdAt: Date | undefined;
  updatedAt:
    | Date
    | undefined;
  /** This payment method is done through a credit card. */
  card?: Card | undefined;
}

/**
 * Contains data related to billing for a specific user. Note that we store a separate email address
 * here since the billing email may be different from the user email.
 */
export interface BillingDetails {
  address?: Address | undefined;
  email?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
}

export interface Address {
  city?: string | undefined;
  country?: string | undefined;
  line1?: string | undefined;
  line2?: string | undefined;
  postalCode?: string | undefined;
  state?: string | undefined;
}

export interface Card {
  brand: string;
  expMonth: number;
  expYear: number;
  last4: string;
}

function createBaseUser(): User {
  return { id: "", email: "", firstName: "", lastName: "", createdAt: undefined };
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
    message.id = object.id ?? "";
    message.email = object.email ?? "";
    message.firstName = object.firstName ?? "";
    message.lastName = object.lastName ?? "";
    message.createdAt = object.createdAt ?? undefined;
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

function createBaseUserServiceListRequest(): UserServiceListRequest {
  return { orgId: undefined, offset: 0, limit: 0, search: undefined, sort: [] };
}

export const UserServiceListRequest = {
  encode(message: UserServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
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

          message.orgId = reader.string();
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
    message.orgId = object.orgId ?? undefined;
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
  return { operator: 0, id: undefined, email: undefined, name: undefined };
}

export const UserSearch = {
  encode(message: UserSearch, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operator !== 0) {
      writer.uint32(8).int32(message.operator);
    }
    if (message.id !== undefined) {
      writer.uint32(18).string(message.id);
    }
    if (message.email !== undefined) {
      writer.uint32(26).string(message.email);
    }
    if (message.name !== undefined) {
      writer.uint32(34).string(message.name);
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

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
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
    message.id = object.id ?? undefined;
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
  return { users: [], userCount: 0 };
}

export const UserServiceListResponse = {
  encode(message: UserServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.userCount !== 0) {
      writer.uint32(16).uint64(message.userCount);
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

          message.userCount = longToNumber(reader.uint64() as Long);
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
    message.userCount = object.userCount ?? 0;
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
  return { key: "", value: new Uint8Array(0) };
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
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseUserServiceUpdateSettingsRequest(): UserServiceUpdateSettingsRequest {
  return { userId: "", name: "", value: new Uint8Array(0) };
}

export const UserServiceUpdateSettingsRequest = {
  encode(message: UserServiceUpdateSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
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

  create(base?: DeepPartial<UserServiceUpdateSettingsRequest>): UserServiceUpdateSettingsRequest {
    return UserServiceUpdateSettingsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceUpdateSettingsRequest>): UserServiceUpdateSettingsRequest {
    const message = createBaseUserServiceUpdateSettingsRequest();
    message.userId = object.userId ?? "";
    message.name = object.name ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseUserServiceUpdateSettingsResponse(): UserServiceUpdateSettingsResponse {
  return { name: "", value: new Uint8Array(0) };
}

export const UserServiceUpdateSettingsResponse = {
  encode(message: UserServiceUpdateSettingsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
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

          message.name = reader.string();
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
    message.name = object.name ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseUserServiceDeleteSettingsRequest(): UserServiceDeleteSettingsRequest {
  return { userId: "", name: "" };
}

export const UserServiceDeleteSettingsRequest = {
  encode(message: UserServiceDeleteSettingsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
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

  create(base?: DeepPartial<UserServiceDeleteSettingsRequest>): UserServiceDeleteSettingsRequest {
    return UserServiceDeleteSettingsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceDeleteSettingsRequest>): UserServiceDeleteSettingsRequest {
    const message = createBaseUserServiceDeleteSettingsRequest();
    message.userId = object.userId ?? "";
    message.name = object.name ?? "";
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

function createBaseUserServiceInitCardRequest(): UserServiceInitCardRequest {
  return { userId: "" };
}

export const UserServiceInitCardRequest = {
  encode(message: UserServiceInitCardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceInitCardRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceInitCardRequest();
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

  create(base?: DeepPartial<UserServiceInitCardRequest>): UserServiceInitCardRequest {
    return UserServiceInitCardRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceInitCardRequest>): UserServiceInitCardRequest {
    const message = createBaseUserServiceInitCardRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserServiceInitCardResponse(): UserServiceInitCardResponse {
  return { clientSecret: "" };
}

export const UserServiceInitCardResponse = {
  encode(message: UserServiceInitCardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientSecret !== "") {
      writer.uint32(10).string(message.clientSecret);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceInitCardResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceInitCardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientSecret = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceInitCardResponse>): UserServiceInitCardResponse {
    return UserServiceInitCardResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceInitCardResponse>): UserServiceInitCardResponse {
    const message = createBaseUserServiceInitCardResponse();
    message.clientSecret = object.clientSecret ?? "";
    return message;
  },
};

function createBaseUserServiceListPaymentMethodsRequest(): UserServiceListPaymentMethodsRequest {
  return { userId: "" };
}

export const UserServiceListPaymentMethodsRequest = {
  encode(message: UserServiceListPaymentMethodsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceListPaymentMethodsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceListPaymentMethodsRequest();
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

  create(base?: DeepPartial<UserServiceListPaymentMethodsRequest>): UserServiceListPaymentMethodsRequest {
    return UserServiceListPaymentMethodsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceListPaymentMethodsRequest>): UserServiceListPaymentMethodsRequest {
    const message = createBaseUserServiceListPaymentMethodsRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseUserServiceListPaymentMethodsResponse(): UserServiceListPaymentMethodsResponse {
  return { methods: [] };
}

export const UserServiceListPaymentMethodsResponse = {
  encode(message: UserServiceListPaymentMethodsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.methods) {
      PaymentMethod.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserServiceListPaymentMethodsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserServiceListPaymentMethodsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.methods.push(PaymentMethod.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UserServiceListPaymentMethodsResponse>): UserServiceListPaymentMethodsResponse {
    return UserServiceListPaymentMethodsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UserServiceListPaymentMethodsResponse>): UserServiceListPaymentMethodsResponse {
    const message = createBaseUserServiceListPaymentMethodsResponse();
    message.methods = object.methods?.map((e) => PaymentMethod.fromPartial(e)) || [];
    return message;
  },
};

function createBasePaymentMethod(): PaymentMethod {
  return { id: undefined, userId: "", details: undefined, createdAt: undefined, updatedAt: undefined, card: undefined };
}

export const PaymentMethod = {
  encode(message: PaymentMethod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(10).string(message.id);
    }
    if (message.userId !== "") {
      writer.uint32(18).string(message.userId);
    }
    if (message.details !== undefined) {
      BillingDetails.encode(message.details, writer.uint32(26).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    if (message.card !== undefined) {
      Card.encode(message.card, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PaymentMethod {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentMethod();
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

          message.userId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.details = BillingDetails.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.card = Card.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<PaymentMethod>): PaymentMethod {
    return PaymentMethod.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<PaymentMethod>): PaymentMethod {
    const message = createBasePaymentMethod();
    message.id = object.id ?? undefined;
    message.userId = object.userId ?? "";
    message.details = (object.details !== undefined && object.details !== null)
      ? BillingDetails.fromPartial(object.details)
      : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.card = (object.card !== undefined && object.card !== null) ? Card.fromPartial(object.card) : undefined;
    return message;
  },
};

function createBaseBillingDetails(): BillingDetails {
  return { address: undefined, email: undefined, name: undefined, phone: undefined };
}

export const BillingDetails = {
  encode(message: BillingDetails, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(10).fork()).ldelim();
    }
    if (message.email !== undefined) {
      writer.uint32(18).string(message.email);
    }
    if (message.name !== undefined) {
      writer.uint32(26).string(message.name);
    }
    if (message.phone !== undefined) {
      writer.uint32(34).string(message.phone);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BillingDetails {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBillingDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = Address.decode(reader, reader.uint32());
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.phone = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<BillingDetails>): BillingDetails {
    return BillingDetails.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<BillingDetails>): BillingDetails {
    const message = createBaseBillingDetails();
    message.address = (object.address !== undefined && object.address !== null)
      ? Address.fromPartial(object.address)
      : undefined;
    message.email = object.email ?? undefined;
    message.name = object.name ?? undefined;
    message.phone = object.phone ?? undefined;
    return message;
  },
};

function createBaseAddress(): Address {
  return {
    city: undefined,
    country: undefined,
    line1: undefined,
    line2: undefined,
    postalCode: undefined,
    state: undefined,
  };
}

export const Address = {
  encode(message: Address, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.city !== undefined) {
      writer.uint32(10).string(message.city);
    }
    if (message.country !== undefined) {
      writer.uint32(18).string(message.country);
    }
    if (message.line1 !== undefined) {
      writer.uint32(26).string(message.line1);
    }
    if (message.line2 !== undefined) {
      writer.uint32(34).string(message.line2);
    }
    if (message.postalCode !== undefined) {
      writer.uint32(42).string(message.postalCode);
    }
    if (message.state !== undefined) {
      writer.uint32(50).string(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Address {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.city = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.country = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.line1 = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.line2 = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.postalCode = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.state = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Address>): Address {
    return Address.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Address>): Address {
    const message = createBaseAddress();
    message.city = object.city ?? undefined;
    message.country = object.country ?? undefined;
    message.line1 = object.line1 ?? undefined;
    message.line2 = object.line2 ?? undefined;
    message.postalCode = object.postalCode ?? undefined;
    message.state = object.state ?? undefined;
    return message;
  },
};

function createBaseCard(): Card {
  return { brand: "", expMonth: 0, expYear: 0, last4: "" };
}

export const Card = {
  encode(message: Card, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.brand !== "") {
      writer.uint32(10).string(message.brand);
    }
    if (message.expMonth !== 0) {
      writer.uint32(16).int64(message.expMonth);
    }
    if (message.expYear !== 0) {
      writer.uint32(24).int64(message.expYear);
    }
    if (message.last4 !== "") {
      writer.uint32(34).string(message.last4);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Card {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.brand = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expMonth = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.expYear = longToNumber(reader.int64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.last4 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Card>): Card {
    return Card.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Card>): Card {
    const message = createBaseCard();
    message.brand = object.brand ?? "";
    message.expMonth = object.expMonth ?? 0;
    message.expYear = object.expYear ?? 0;
    message.last4 = object.last4 ?? "";
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
    /**
     * Retrieve the `settings` for this user. This is a string -> string map that
     * may be used by frontends to communicate those settings that are not used by
     * the backend in between sessions and devices. This field is free-form and
     * ignored by the backend.
     */
    getSettings: {
      name: "GetSettings",
      requestType: UserServiceGetSettingsRequest,
      requestStream: false,
      responseType: UserServiceGetSettingsResponse,
      responseStream: false,
      options: {},
    },
    /** Modify a setting for this user. */
    updateSettings: {
      name: "UpdateSettings",
      requestType: UserServiceUpdateSettingsRequest,
      requestStream: false,
      responseType: UserServiceUpdateSettingsResponse,
      responseStream: false,
      options: {},
    },
    /** Reset delete a setting for this user. */
    deleteSettings: {
      name: "DeleteSettings",
      requestType: UserServiceDeleteSettingsRequest,
      requestStream: false,
      responseType: UserServiceDeleteSettingsResponse,
      responseStream: false,
      options: {},
    },
    /** Add a new card to this user. */
    initCard: {
      name: "InitCard",
      requestType: UserServiceInitCardRequest,
      requestStream: false,
      responseType: UserServiceInitCardResponse,
      responseStream: false,
      options: {},
    },
    /** List all payment methods */
    listPaymentMethods: {
      name: "ListPaymentMethods",
      requestType: UserServiceListPaymentMethodsRequest,
      requestStream: false,
      responseType: UserServiceListPaymentMethodsResponse,
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
  /**
   * Retrieve the `settings` for this user. This is a string -> string map that
   * may be used by frontends to communicate those settings that are not used by
   * the backend in between sessions and devices. This field is free-form and
   * ignored by the backend.
   */
  getSettings(
    request: UserServiceGetSettingsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceGetSettingsResponse>>;
  /** Modify a setting for this user. */
  updateSettings(
    request: UserServiceUpdateSettingsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceUpdateSettingsResponse>>;
  /** Reset delete a setting for this user. */
  deleteSettings(
    request: UserServiceDeleteSettingsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceDeleteSettingsResponse>>;
  /** Add a new card to this user. */
  initCard(
    request: UserServiceInitCardRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceInitCardResponse>>;
  /** List all payment methods */
  listPaymentMethods(
    request: UserServiceListPaymentMethodsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UserServiceListPaymentMethodsResponse>>;
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
  /**
   * Retrieve the `settings` for this user. This is a string -> string map that
   * may be used by frontends to communicate those settings that are not used by
   * the backend in between sessions and devices. This field is free-form and
   * ignored by the backend.
   */
  getSettings(
    request: DeepPartial<UserServiceGetSettingsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceGetSettingsResponse>;
  /** Modify a setting for this user. */
  updateSettings(
    request: DeepPartial<UserServiceUpdateSettingsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceUpdateSettingsResponse>;
  /** Reset delete a setting for this user. */
  deleteSettings(
    request: DeepPartial<UserServiceDeleteSettingsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceDeleteSettingsResponse>;
  /** Add a new card to this user. */
  initCard(
    request: DeepPartial<UserServiceInitCardRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceInitCardResponse>;
  /** List all payment methods */
  listPaymentMethods(
    request: DeepPartial<UserServiceListPaymentMethodsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UserServiceListPaymentMethodsResponse>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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
