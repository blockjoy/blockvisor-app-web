/* eslint-disable */
import Long from "long";
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "blockjoy.v1";

export enum OrgRole {
  ORG_ROLE_UNSPECIFIED = 0,
  ORG_ROLE_MEMBER = 1,
  ORG_ROLE_OWNER = 2,
  ORG_ROLE_ADMIN = 3,
  UNRECOGNIZED = -1,
}

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
  /** The number of nodes that this organization has. */
  nodeCount: number;
}

export interface OrgServiceGetRequest {
  id: string;
}

export interface OrgServiceGetResponse {
  org: Org | undefined;
}

export interface OrgServiceListRequest {
  memberId?: string | undefined;
}

export interface OrgServiceListResponse {
  orgs: Org[];
}

export interface OrgServiceCreateRequest {
  name: string;
}

export interface OrgServiceCreateResponse {
  org: Org | undefined;
}

export interface OrgServiceUpdateRequest {
  /** The id of the organization to be updated. */
  id: string;
  /**
   * If this value is provided, the name of the organization will be set to the
   * provided value.
   */
  name?: string | undefined;
}

export interface OrgServiceUpdateResponse {
}

export interface OrgServiceDeleteRequest {
  id: string;
}

export interface OrgServiceDeleteResponse {
}

export interface OrgServiceRemoveMemberRequest {
  userId: string;
  orgId: string;
}

export interface OrgServiceRemoveMemberResponse {
}

export interface OrgServiceGetProvisionTokenRequest {
  userId: string;
  orgId: string;
}

export interface OrgServiceGetProvisionTokenResponse {
  token: string;
}

export interface OrgServiceResetProvisionTokenRequest {
  userId: string;
  orgId: string;
}

export interface OrgServiceResetProvisionTokenResponse {
  token: string;
}

export interface OrgUser {
  userId: string;
  orgId: string;
  role: OrgRole;
  name: string;
  email: string;
}

function createBaseOrg(): Org {
  return {
    id: "",
    name: "",
    personal: false,
    memberCount: 0,
    createdAt: undefined,
    updatedAt: undefined,
    members: [],
    nodeCount: 0,
  };
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
    if (message.nodeCount !== 0) {
      writer.uint32(128).uint64(message.nodeCount);
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
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.personal = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.memberCount = longToNumber(reader.uint64() as Long);
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.members.push(OrgUser.decode(reader, reader.uint32()));
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.nodeCount = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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
    message.nodeCount = object.nodeCount ?? 0;
    return message;
  },
};

function createBaseOrgServiceGetRequest(): OrgServiceGetRequest {
  return { id: "" };
}

export const OrgServiceGetRequest = {
  encode(message: OrgServiceGetRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetRequest();
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

  create(base?: DeepPartial<OrgServiceGetRequest>): OrgServiceGetRequest {
    return OrgServiceGetRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetRequest>): OrgServiceGetRequest {
    const message = createBaseOrgServiceGetRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrgServiceGetResponse(): OrgServiceGetResponse {
  return { org: undefined };
}

export const OrgServiceGetResponse = {
  encode(message: OrgServiceGetResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetResponse>): OrgServiceGetResponse {
    return OrgServiceGetResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetResponse>): OrgServiceGetResponse {
    const message = createBaseOrgServiceGetResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseOrgServiceListRequest(): OrgServiceListRequest {
  return { memberId: undefined };
}

export const OrgServiceListRequest = {
  encode(message: OrgServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.memberId !== undefined) {
      writer.uint32(10).string(message.memberId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.memberId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceListRequest>): OrgServiceListRequest {
    return OrgServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceListRequest>): OrgServiceListRequest {
    const message = createBaseOrgServiceListRequest();
    message.memberId = object.memberId ?? undefined;
    return message;
  },
};

function createBaseOrgServiceListResponse(): OrgServiceListResponse {
  return { orgs: [] };
}

export const OrgServiceListResponse = {
  encode(message: OrgServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.orgs) {
      Org.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.orgs.push(Org.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceListResponse>): OrgServiceListResponse {
    return OrgServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceListResponse>): OrgServiceListResponse {
    const message = createBaseOrgServiceListResponse();
    message.orgs = object.orgs?.map((e) => Org.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOrgServiceCreateRequest(): OrgServiceCreateRequest {
  return { name: "" };
}

export const OrgServiceCreateRequest = {
  encode(message: OrgServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  create(base?: DeepPartial<OrgServiceCreateRequest>): OrgServiceCreateRequest {
    return OrgServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceCreateRequest>): OrgServiceCreateRequest {
    const message = createBaseOrgServiceCreateRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseOrgServiceCreateResponse(): OrgServiceCreateResponse {
  return { org: undefined };
}

export const OrgServiceCreateResponse = {
  encode(message: OrgServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.org !== undefined) {
      Org.encode(message.org, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.org = Org.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceCreateResponse>): OrgServiceCreateResponse {
    return OrgServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceCreateResponse>): OrgServiceCreateResponse {
    const message = createBaseOrgServiceCreateResponse();
    message.org = (object.org !== undefined && object.org !== null) ? Org.fromPartial(object.org) : undefined;
    return message;
  },
};

function createBaseOrgServiceUpdateRequest(): OrgServiceUpdateRequest {
  return { id: "", name: undefined };
}

export const OrgServiceUpdateRequest = {
  encode(message: OrgServiceUpdateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== undefined) {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceUpdateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceUpdateRequest();
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

  create(base?: DeepPartial<OrgServiceUpdateRequest>): OrgServiceUpdateRequest {
    return OrgServiceUpdateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceUpdateRequest>): OrgServiceUpdateRequest {
    const message = createBaseOrgServiceUpdateRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? undefined;
    return message;
  },
};

function createBaseOrgServiceUpdateResponse(): OrgServiceUpdateResponse {
  return {};
}

export const OrgServiceUpdateResponse = {
  encode(_: OrgServiceUpdateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceUpdateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceUpdateResponse();
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

  create(base?: DeepPartial<OrgServiceUpdateResponse>): OrgServiceUpdateResponse {
    return OrgServiceUpdateResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceUpdateResponse>): OrgServiceUpdateResponse {
    const message = createBaseOrgServiceUpdateResponse();
    return message;
  },
};

function createBaseOrgServiceDeleteRequest(): OrgServiceDeleteRequest {
  return { id: "" };
}

export const OrgServiceDeleteRequest = {
  encode(message: OrgServiceDeleteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceDeleteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceDeleteRequest();
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

  create(base?: DeepPartial<OrgServiceDeleteRequest>): OrgServiceDeleteRequest {
    return OrgServiceDeleteRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceDeleteRequest>): OrgServiceDeleteRequest {
    const message = createBaseOrgServiceDeleteRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseOrgServiceDeleteResponse(): OrgServiceDeleteResponse {
  return {};
}

export const OrgServiceDeleteResponse = {
  encode(_: OrgServiceDeleteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceDeleteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceDeleteResponse();
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

  create(base?: DeepPartial<OrgServiceDeleteResponse>): OrgServiceDeleteResponse {
    return OrgServiceDeleteResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceDeleteResponse>): OrgServiceDeleteResponse {
    const message = createBaseOrgServiceDeleteResponse();
    return message;
  },
};

function createBaseOrgServiceRemoveMemberRequest(): OrgServiceRemoveMemberRequest {
  return { userId: "", orgId: "" };
}

export const OrgServiceRemoveMemberRequest = {
  encode(message: OrgServiceRemoveMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceRemoveMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceRemoveMemberRequest();
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

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceRemoveMemberRequest>): OrgServiceRemoveMemberRequest {
    return OrgServiceRemoveMemberRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceRemoveMemberRequest>): OrgServiceRemoveMemberRequest {
    const message = createBaseOrgServiceRemoveMemberRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceRemoveMemberResponse(): OrgServiceRemoveMemberResponse {
  return {};
}

export const OrgServiceRemoveMemberResponse = {
  encode(_: OrgServiceRemoveMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceRemoveMemberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceRemoveMemberResponse();
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

  create(base?: DeepPartial<OrgServiceRemoveMemberResponse>): OrgServiceRemoveMemberResponse {
    return OrgServiceRemoveMemberResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<OrgServiceRemoveMemberResponse>): OrgServiceRemoveMemberResponse {
    const message = createBaseOrgServiceRemoveMemberResponse();
    return message;
  },
};

function createBaseOrgServiceGetProvisionTokenRequest(): OrgServiceGetProvisionTokenRequest {
  return { userId: "", orgId: "" };
}

export const OrgServiceGetProvisionTokenRequest = {
  encode(message: OrgServiceGetProvisionTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetProvisionTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetProvisionTokenRequest();
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

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetProvisionTokenRequest>): OrgServiceGetProvisionTokenRequest {
    return OrgServiceGetProvisionTokenRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetProvisionTokenRequest>): OrgServiceGetProvisionTokenRequest {
    const message = createBaseOrgServiceGetProvisionTokenRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceGetProvisionTokenResponse(): OrgServiceGetProvisionTokenResponse {
  return { token: "" };
}

export const OrgServiceGetProvisionTokenResponse = {
  encode(message: OrgServiceGetProvisionTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceGetProvisionTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceGetProvisionTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceGetProvisionTokenResponse>): OrgServiceGetProvisionTokenResponse {
    return OrgServiceGetProvisionTokenResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceGetProvisionTokenResponse>): OrgServiceGetProvisionTokenResponse {
    const message = createBaseOrgServiceGetProvisionTokenResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseOrgServiceResetProvisionTokenRequest(): OrgServiceResetProvisionTokenRequest {
  return { userId: "", orgId: "" };
}

export const OrgServiceResetProvisionTokenRequest = {
  encode(message: OrgServiceResetProvisionTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceResetProvisionTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceResetProvisionTokenRequest();
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

          message.orgId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceResetProvisionTokenRequest>): OrgServiceResetProvisionTokenRequest {
    return OrgServiceResetProvisionTokenRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceResetProvisionTokenRequest>): OrgServiceResetProvisionTokenRequest {
    const message = createBaseOrgServiceResetProvisionTokenRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseOrgServiceResetProvisionTokenResponse(): OrgServiceResetProvisionTokenResponse {
  return { token: "" };
}

export const OrgServiceResetProvisionTokenResponse = {
  encode(message: OrgServiceResetProvisionTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrgServiceResetProvisionTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrgServiceResetProvisionTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<OrgServiceResetProvisionTokenResponse>): OrgServiceResetProvisionTokenResponse {
    return OrgServiceResetProvisionTokenResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<OrgServiceResetProvisionTokenResponse>): OrgServiceResetProvisionTokenResponse {
    const message = createBaseOrgServiceResetProvisionTokenResponse();
    message.token = object.token ?? "";
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
          if (tag !== 10) {
            break;
          }

          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
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

/** Manage organizations */
export type OrgServiceDefinition = typeof OrgServiceDefinition;
export const OrgServiceDefinition = {
  name: "OrgService",
  fullName: "blockjoy.v1.OrgService",
  methods: {
    /**
     * Get all the organizations for a user. All users automatically get a private
     * (internal) organization.
     */
    get: {
      name: "Get",
      requestType: OrgServiceGetRequest,
      requestStream: false,
      responseType: OrgServiceGetResponse,
      responseStream: false,
      options: {},
    },
    list: {
      name: "List",
      requestType: OrgServiceListRequest,
      requestStream: false,
      responseType: OrgServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Create a single organization */
    create: {
      name: "Create",
      requestType: OrgServiceCreateRequest,
      requestStream: false,
      responseType: OrgServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** Update a single organization */
    update: {
      name: "Update",
      requestType: OrgServiceUpdateRequest,
      requestStream: false,
      responseType: OrgServiceUpdateResponse,
      responseStream: false,
      options: {},
    },
    /** Mark a single organization as deleted */
    delete: {
      name: "Delete",
      requestType: OrgServiceDeleteRequest,
      requestStream: false,
      responseType: OrgServiceDeleteResponse,
      responseStream: false,
      options: {},
    },
    /** Remove organization member */
    removeMember: {
      name: "RemoveMember",
      requestType: OrgServiceRemoveMemberRequest,
      requestStream: false,
      responseType: OrgServiceRemoveMemberResponse,
      responseStream: false,
      options: {},
    },
    /** Returns the host provision token for the provided user and organization. */
    getProvisionToken: {
      name: "GetProvisionToken",
      requestType: OrgServiceGetProvisionTokenRequest,
      requestStream: false,
      responseType: OrgServiceGetProvisionTokenResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Regenerates and returns the host provision token for the provided user and
     * organization.
     */
    resetProvisionToken: {
      name: "ResetProvisionToken",
      requestType: OrgServiceResetProvisionTokenRequest,
      requestStream: false,
      responseType: OrgServiceResetProvisionTokenResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface OrgServiceImplementation<CallContextExt = {}> {
  /**
   * Get all the organizations for a user. All users automatically get a private
   * (internal) organization.
   */
  get(
    request: OrgServiceGetRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceGetResponse>>;
  list(
    request: OrgServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceListResponse>>;
  /** Create a single organization */
  create(
    request: OrgServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceCreateResponse>>;
  /** Update a single organization */
  update(
    request: OrgServiceUpdateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceUpdateResponse>>;
  /** Mark a single organization as deleted */
  delete(
    request: OrgServiceDeleteRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceDeleteResponse>>;
  /** Remove organization member */
  removeMember(
    request: OrgServiceRemoveMemberRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceRemoveMemberResponse>>;
  /** Returns the host provision token for the provided user and organization. */
  getProvisionToken(
    request: OrgServiceGetProvisionTokenRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceGetProvisionTokenResponse>>;
  /**
   * Regenerates and returns the host provision token for the provided user and
   * organization.
   */
  resetProvisionToken(
    request: OrgServiceResetProvisionTokenRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<OrgServiceResetProvisionTokenResponse>>;
}

export interface OrgServiceClient<CallOptionsExt = {}> {
  /**
   * Get all the organizations for a user. All users automatically get a private
   * (internal) organization.
   */
  get(
    request: DeepPartial<OrgServiceGetRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceGetResponse>;
  list(
    request: DeepPartial<OrgServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceListResponse>;
  /** Create a single organization */
  create(
    request: DeepPartial<OrgServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceCreateResponse>;
  /** Update a single organization */
  update(
    request: DeepPartial<OrgServiceUpdateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceUpdateResponse>;
  /** Mark a single organization as deleted */
  delete(
    request: DeepPartial<OrgServiceDeleteRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceDeleteResponse>;
  /** Remove organization member */
  removeMember(
    request: DeepPartial<OrgServiceRemoveMemberRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceRemoveMemberResponse>;
  /** Returns the host provision token for the provided user and organization. */
  getProvisionToken(
    request: DeepPartial<OrgServiceGetProvisionTokenRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceGetProvisionTokenResponse>;
  /**
   * Regenerates and returns the host provision token for the provided user and
   * organization.
   */
  resetProvisionToken(
    request: DeepPartial<OrgServiceResetProvisionTokenRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<OrgServiceResetProvisionTokenResponse>;
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
