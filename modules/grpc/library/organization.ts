/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { User } from "./user";

export const protobufPackage = "v1";

/** Organization representation */
export interface Org {
  /** The UUID of a the organization. */
  id: string;
  /** The name of this organization. */
  name: string;
  /**
   * If this field is set to true, this organization is a personal
   * organization. A personal organization is the default organzation for a
   * user that contains only them.
   */
  personal: boolean;
  /** The number of users in this organization. */
  memberCount: number;
  /** The moment which this organization was created. */
  createdAt:
    | Date
    | undefined;
  /** The moment which this organization was last updated. */
  updatedAt:
    | Date
    | undefined;
  /** This field contains the users of this organization. */
  members: OrgUser[];
}

export interface OrgUser {
  userId: string;
  orgId: string;
  role: OrgUser_OrgRole;
  name: string;
  email: string;
}

export enum OrgUser_OrgRole {
  ORG_ROLE_UNSPECIFIED = 0,
  ORG_ROLE_MEMBER = 1,
  ORG_ROLE_OWNER = 2,
  ORG_ROLE_ADMIN = 3,
  UNRECOGNIZED = -1,
}

export interface GetOrgRequest {
  orgId: string;
}

export interface GetOrgResponse {
  org: Org | undefined;
}

export interface ListOrgsRequest {
  memberId?: string | undefined;
}

export interface ListOrgsResponse {
  orgs: Org[];
}

export interface CreateOrgRequest {
  name: string;
}

export interface CreateOrgResponse {
  org: Org | undefined;
}

export interface UpdateOrgRequest {
  /** The id of the organization to be updated. */
  id: string;
  /**
   * If this value is provided, the name of the organization will be set to the
   * provided value.
   */
  name?: string | undefined;
}

export interface UpdateOrgResponse {
}

export interface DeleteOrgRequest {
  id: string;
}

export interface DeleteOrgResponse {
}

export interface OrgMembersRequest {
  id: string;
}

export interface OrgMembersResponse {
  users: User[];
}

export interface RestoreOrgRequest {
  id: string;
}

export interface RestoreOrgResponse {
  org: Org | undefined;
}

export interface RemoveMemberRequest {
  userId: string;
  orgId: string;
}

export interface LeaveOrgRequest {
  orgId: string;
}

function createBaseOrg(): Org {
  return { id: "", name: "", personal: false, memberCount: 0, createdAt: undefined, updatedAt: undefined, members: [] };
}

export const Org = {
  encode(message: Org, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.personal === true) {
      writer.uint32(24).bool(message.personal);
    }
    if (message.memberCount !== 0) {
      writer.uint32(32).uint64(message.memberCount);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(106).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.members) {
      OrgUser.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Org {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrg();
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

          message.name = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.personal = reader.bool();
          continue;
        case 4:
          if (tag != 32) {
            break;
          }

          message.memberCount = longToNumber(reader.uint64() as Long);
          continue;
        case 13:
          if (tag != 106) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag != 114) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag != 122) {
            break;
          }

          message.members.push(OrgUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Org>): Org {
    return Org.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Org>): Org {
    const message = createBaseOrg();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.personal = object.personal ?? false;
    message.memberCount = object.memberCount ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    message.members = object.members?.map((e) => OrgUser.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrgUser(): OrgUser {
  return { userId: "", orgId: "", role: 0, name: "", email: "" };
}

export const OrgUser = {
  encode(message: OrgUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.role !== 0) {
      writer.uint32(24).int32(message.role);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    if (message.email !== "") {
      writer.uint32(42).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag != 24) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgUser>): OrgUser {
    return OrgUser.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgUser>): OrgUser {
    const message = createBaseOrgUser();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    message.role = object.role ?? 0;
    message.name = object.name ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseGetOrgRequest(): GetOrgRequest {
  return { orgId: "" };
}

export const GetOrgRequest = {
  encode(message: GetOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOrgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetOrgRequest>): GetOrgRequest {
    return GetOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetOrgRequest>): GetOrgRequest {
    const message = createBaseGetOrgRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseGetOrgResponse(): GetOrgResponse {
  return { org: undefined };
}

export const GetOrgResponse = {
  encode(message: GetOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOrgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetOrgResponse>): GetOrgResponse {
    return GetOrgResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<GetOrgResponse>): GetOrgResponse {
    const message = createBaseGetOrgResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseListOrgsRequest(): ListOrgsRequest {
  return { memberId: undefined };
}

export const ListOrgsRequest = {
  encode(message: ListOrgsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.memberId !== undefined) {
      writer.uint32(10).string(message.memberId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOrgsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOrgsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.memberId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListOrgsRequest>): ListOrgsRequest {
    return ListOrgsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListOrgsRequest>): ListOrgsRequest {
    const message = createBaseListOrgsRequest();
    message.memberId = object.memberId ?? undefined;
    return message;
  },
};

function createBaseListOrgsResponse(): ListOrgsResponse {
  return { orgs: [] };
}

export const ListOrgsResponse = {
  encode(message: ListOrgsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orgs) {
      Org.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListOrgsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListOrgsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.orgs.push(Org.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListOrgsResponse>): ListOrgsResponse {
    return ListOrgsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListOrgsResponse>): ListOrgsResponse {
    const message = createBaseListOrgsResponse();
    message.orgs = object.orgs?.map((e) => Org.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateOrgRequest(): CreateOrgRequest {
  return { name: "" };
}

export const CreateOrgRequest = {
  encode(message: CreateOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateOrgRequest>): CreateOrgRequest {
    return CreateOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateOrgRequest>): CreateOrgRequest {
    const message = createBaseCreateOrgRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseCreateOrgResponse(): CreateOrgResponse {
  return { org: undefined };
}

export const CreateOrgResponse = {
  encode(message: CreateOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOrgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<CreateOrgResponse>): CreateOrgResponse {
    return CreateOrgResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateOrgResponse>): CreateOrgResponse {
    const message = createBaseCreateOrgResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseUpdateOrgRequest(): UpdateOrgRequest {
  return { id: "", name: undefined };
}

export const UpdateOrgRequest = {
  encode(message: UpdateOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOrgRequest();
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

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateOrgRequest>): UpdateOrgRequest {
    return UpdateOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateOrgRequest>): UpdateOrgRequest {
    const message = createBaseUpdateOrgRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseUpdateOrgResponse(): UpdateOrgResponse {
  return {};
}

export const UpdateOrgResponse = {
  encode(_: UpdateOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOrgResponse();
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

  create(base?: DeepPartial<UpdateOrgResponse>): UpdateOrgResponse {
    return UpdateOrgResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<UpdateOrgResponse>): UpdateOrgResponse {
    const message = createBaseUpdateOrgResponse();
    return message;
  },
};

function createBaseDeleteOrgRequest(): DeleteOrgRequest {
  return { id: "" };
}

export const DeleteOrgRequest = {
  encode(message: DeleteOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrgRequest();
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

  create(base?: DeepPartial<DeleteOrgRequest>): DeleteOrgRequest {
    return DeleteOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DeleteOrgRequest>): DeleteOrgRequest {
    const message = createBaseDeleteOrgRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDeleteOrgResponse(): DeleteOrgResponse {
  return {};
}

export const DeleteOrgResponse = {
  encode(_: DeleteOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteOrgResponse();
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

  create(base?: DeepPartial<DeleteOrgResponse>): DeleteOrgResponse {
    return DeleteOrgResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DeleteOrgResponse>): DeleteOrgResponse {
    const message = createBaseDeleteOrgResponse();
    return message;
  },
};

function createBaseOrgMembersRequest(): OrgMembersRequest {
  return { id: "" };
}

export const OrgMembersRequest = {
  encode(message: OrgMembersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgMembersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgMembersRequest();
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

  create(base?: DeepPartial<OrgMembersRequest>): OrgMembersRequest {
    return OrgMembersRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgMembersRequest>): OrgMembersRequest {
    const message = createBaseOrgMembersRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrgMembersResponse(): OrgMembersResponse {
  return { users: [] };
}

export const OrgMembersResponse = {
  encode(message: OrgMembersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgMembersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgMembersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgMembersResponse>): OrgMembersResponse {
    return OrgMembersResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgMembersResponse>): OrgMembersResponse {
    const message = createBaseOrgMembersResponse();
    message.users = object.users?.map((e) => User.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRestoreOrgRequest(): RestoreOrgRequest {
  return { id: "" };
}

export const RestoreOrgRequest = {
  encode(message: RestoreOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestoreOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestoreOrgRequest();
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

  create(base?: DeepPartial<RestoreOrgRequest>): RestoreOrgRequest {
    return RestoreOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RestoreOrgRequest>): RestoreOrgRequest {
    const message = createBaseRestoreOrgRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseRestoreOrgResponse(): RestoreOrgResponse {
  return { org: undefined };
}

export const RestoreOrgResponse = {
  encode(message: RestoreOrgResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RestoreOrgResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRestoreOrgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RestoreOrgResponse>): RestoreOrgResponse {
    return RestoreOrgResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RestoreOrgResponse>): RestoreOrgResponse {
    const message = createBaseRestoreOrgResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseRemoveMemberRequest(): RemoveMemberRequest {
  return { userId: "", orgId: "" };
}

export const RemoveMemberRequest = {
  encode(message: RemoveMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveMemberRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RemoveMemberRequest>): RemoveMemberRequest {
    return RemoveMemberRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RemoveMemberRequest>): RemoveMemberRequest {
    const message = createBaseRemoveMemberRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseLeaveOrgRequest(): LeaveOrgRequest {
  return { orgId: "" };
}

export const LeaveOrgRequest = {
  encode(message: LeaveOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeaveOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeaveOrgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<LeaveOrgRequest>): LeaveOrgRequest {
    return LeaveOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LeaveOrgRequest>): LeaveOrgRequest {
    const message = createBaseLeaveOrgRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

/** Manage organizations */
export type OrgsDefinition = typeof OrgsDefinition;
export const OrgsDefinition = {
  name: "Orgs",
  fullName: "v1.Orgs",
  methods: {
    /**
     * Get all the organizations for a user. All users automatically get a private
     * (internal) organization.
     */
    get: {
      name: "Get",
      requestType: GetOrgRequest,
      requestStream: false,
      responseType: GetOrgResponse,
      responseStream: false,
      options: {},
    },
    list: {
      name: "List",
      requestType: ListOrgsRequest,
      requestStream: false,
      responseType: ListOrgsResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single organization */
    create: {
      name: "Create",
      requestType: CreateOrgRequest,
      requestStream: false,
      responseType: CreateOrgResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single organization */
    update: {
      name: "Update",
      requestType: UpdateOrgRequest,
      requestStream: false,
      responseType: UpdateOrgResponse,
      responseStream: false,
      options: {},
    },
    /** Mark a single organization as deleted */
    delete: {
      name: "Delete",
      requestType: DeleteOrgRequest,
      requestStream: false,
      responseType: DeleteOrgResponse,
      responseStream: false,
      options: {},
    },
    /** Restore a previously deleted organization */
    restore: {
      name: "Restore",
      requestType: RestoreOrgRequest,
      requestStream: false,
      responseType: RestoreOrgResponse,
      responseStream: false,
      options: {},
    },
    /** Retrieve organization members */
    members: {
      name: "Members",
      requestType: OrgMembersRequest,
      requestStream: false,
      responseType: OrgMembersResponse,
      responseStream: false,
      options: {},
    },
    /** Remove organization member */
    removeMember: {
      name: "RemoveMember",
      requestType: RemoveMemberRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    /** Leave an organization the user is member of */
    leave: {
      name: "Leave",
      requestType: LeaveOrgRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface OrgsServiceImplementation<CallContextExt = {}> {
  /**
   * Get all the organizations for a user. All users automatically get a private
   * (internal) organization.
   */
  get(request: GetOrgRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetOrgResponse>>;
  list(request: ListOrgsRequest, context: CallContext & CallContextExt): Promise<DeepPartial<ListOrgsResponse>>;
  /** Create a single organization */
  create(request: CreateOrgRequest, context: CallContext & CallContextExt): Promise<DeepPartial<CreateOrgResponse>>;
  /** Update a single organization */
  update(request: UpdateOrgRequest, context: CallContext & CallContextExt): Promise<DeepPartial<UpdateOrgResponse>>;
  /** Mark a single organization as deleted */
  delete(request: DeleteOrgRequest, context: CallContext & CallContextExt): Promise<DeepPartial<DeleteOrgResponse>>;
  /** Restore a previously deleted organization */
  restore(request: RestoreOrgRequest, context: CallContext & CallContextExt): Promise<DeepPartial<RestoreOrgResponse>>;
  /** Retrieve organization members */
  members(request: OrgMembersRequest, context: CallContext & CallContextExt): Promise<DeepPartial<OrgMembersResponse>>;
  /** Remove organization member */
  removeMember(request: RemoveMemberRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
  /** Leave an organization the user is member of */
  leave(request: LeaveOrgRequest, context: CallContext & CallContextExt): Promise<DeepPartial<Empty>>;
}

export interface OrgsClient<CallOptionsExt = {}> {
  /**
   * Get all the organizations for a user. All users automatically get a private
   * (internal) organization.
   */
  get(request: DeepPartial<GetOrgRequest>, options?: CallOptions & CallOptionsExt): Promise<GetOrgResponse>;
  list(request: DeepPartial<ListOrgsRequest>, options?: CallOptions & CallOptionsExt): Promise<ListOrgsResponse>;
  /** Create a single organization */
  create(request: DeepPartial<CreateOrgRequest>, options?: CallOptions & CallOptionsExt): Promise<CreateOrgResponse>;
  /** Update a single organization */
  update(request: DeepPartial<UpdateOrgRequest>, options?: CallOptions & CallOptionsExt): Promise<UpdateOrgResponse>;
  /** Mark a single organization as deleted */
  delete(request: DeepPartial<DeleteOrgRequest>, options?: CallOptions & CallOptionsExt): Promise<DeleteOrgResponse>;
  /** Restore a previously deleted organization */
  restore(request: DeepPartial<RestoreOrgRequest>, options?: CallOptions & CallOptionsExt): Promise<RestoreOrgResponse>;
  /** Retrieve organization members */
  members(request: DeepPartial<OrgMembersRequest>, options?: CallOptions & CallOptionsExt): Promise<OrgMembersResponse>;
  /** Remove organization member */
  removeMember(request: DeepPartial<RemoveMemberRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
  /** Leave an organization the user is member of */
  leave(request: DeepPartial<LeaveOrgRequest>, options?: CallOptions & CallOptionsExt): Promise<Empty>;
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
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
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
