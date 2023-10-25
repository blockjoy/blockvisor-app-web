/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { EntityUpdate } from "../common/v1/resource";

export const protobufPackage = "blockjoy.v1";

/** The status of an invitation. */
export enum InvitationStatus {
  INVITATION_STATUS_UNSPECIFIED = 0,
  /**
   * INVITATION_STATUS_OPEN - This invitation has not been used yet. The user may still accept or decline
   * it.
   */
  INVITATION_STATUS_OPEN = 1,
  /**
   * INVITATION_STATUS_ACCEPTED - This invitation has been accepted. The user is now a member of the
   * specified organization and this invitation is not useful anymore.
   */
  INVITATION_STATUS_ACCEPTED = 2,
  /**
   * INVITATION_STATUS_DECLINED - This invitation has been declined. This means that the user can no longer
   * use this invitation anymore to join the organization.
   */
  INVITATION_STATUS_DECLINED = 3,
  UNRECOGNIZED = -1,
}

/** The invitation resource. This invites users into organization */
export interface Invitation {
  /** A uuid that uniquely determines the invitation. */
  id: string;
  /** The id of the organization the invitee is being invited to. */
  orgId: string;
  /**
   * This is the name of the organization that this invitation has been created
   * for.
   */
  orgName: string;
  /**
   * The id of the person that is being invited here. Note that this is not the
   * uuid of some user, because the person that is being invited might not have
   * an account (yet).
   */
  inviteeEmail: string;
  /**
   * The status of the invitation, indicating what user action has been taken
   * with this invitation.
   */
  status: InvitationStatus;
  /** The resource that created this invitation. */
  invitedBy:
    | EntityUpdate
    | undefined;
  /** The timestamp when this invitation was created. */
  createdAt:
    | Date
    | undefined;
  /**
   * If this invitation has been accepted, this field is set to the moment of
   * acceptance.
   */
  acceptedAt?:
    | Date
    | undefined;
  /**
   * If this invitation has been declined, this field is set to the moment of
   * declination.
   */
  declinedAt?: Date | undefined;
}

/** Use this message to create a new invitation. */
export interface InvitationServiceCreateRequest {
  /**
   * The id of the person that is being invited here. Note that this is not the
   * uuid of some user, because the person that is being invited might not have
   * an account (yet).
   */
  inviteeEmail: string;
  /** The id of the organization that the user is being invited to. */
  orgId: string;
}

export interface InvitationServiceCreateResponse {
  invitation: Invitation | undefined;
}

export interface InvitationServiceListRequest {
  orgId?: string | undefined;
  inviteeEmail?: string | undefined;
  invitedBy: EntityUpdate | undefined;
  status: InvitationStatus;
}

export interface InvitationServiceListResponse {
  invitations: Invitation[];
}

export interface InvitationServiceAcceptRequest {
  invitationId: string;
}

export interface InvitationServiceAcceptResponse {
}

export interface InvitationServiceDeclineRequest {
  invitationId: string;
}

export interface InvitationServiceDeclineResponse {
}

export interface InvitationServiceRevokeRequest {
  invitationId: string;
}

export interface InvitationServiceRevokeResponse {
}

function createBaseInvitation(): Invitation {
  return {
    id: "",
    orgId: "",
    orgName: "",
    inviteeEmail: "",
    status: 0,
    invitedBy: undefined,
    createdAt: undefined,
    acceptedAt: undefined,
    declinedAt: undefined,
  };
}

export const Invitation = {
  encode(message: Invitation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.orgName !== "") {
      writer.uint32(26).string(message.orgName);
    }
    if (message.inviteeEmail !== "") {
      writer.uint32(34).string(message.inviteeEmail);
    }
    if (message.status !== 0) {
      writer.uint32(40).int32(message.status);
    }
    if (message.invitedBy !== undefined) {
      EntityUpdate.encode(message.invitedBy, writer.uint32(50).fork()).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(58).fork()).ldelim();
    }
    if (message.acceptedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.acceptedAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.declinedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.declinedAt), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Invitation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitation();
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

          message.orgId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.inviteeEmail = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.invitedBy = EntityUpdate.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.acceptedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.declinedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Invitation>): Invitation {
    return Invitation.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<Invitation>): Invitation {
    const message = createBaseInvitation();
    message.id = object.id ?? "";
    message.orgId = object.orgId ?? "";
    message.orgName = object.orgName ?? "";
    message.inviteeEmail = object.inviteeEmail ?? "";
    message.status = object.status ?? 0;
    message.invitedBy = (object.invitedBy !== undefined && object.invitedBy !== null)
      ? EntityUpdate.fromPartial(object.invitedBy)
      : undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.acceptedAt = object.acceptedAt ?? undefined;
    message.declinedAt = object.declinedAt ?? undefined;
    return message;
  },
};

function createBaseInvitationServiceCreateRequest(): InvitationServiceCreateRequest {
  return { inviteeEmail: "", orgId: "" };
}

export const InvitationServiceCreateRequest = {
  encode(message: InvitationServiceCreateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inviteeEmail !== "") {
      writer.uint32(10).string(message.inviteeEmail);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceCreateRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.inviteeEmail = reader.string();
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

  create(base?: DeepPartial<InvitationServiceCreateRequest>): InvitationServiceCreateRequest {
    return InvitationServiceCreateRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceCreateRequest>): InvitationServiceCreateRequest {
    const message = createBaseInvitationServiceCreateRequest();
    message.inviteeEmail = object.inviteeEmail ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseInvitationServiceCreateResponse(): InvitationServiceCreateResponse {
  return { invitation: undefined };
}

export const InvitationServiceCreateResponse = {
  encode(message: InvitationServiceCreateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitation !== undefined) {
      Invitation.encode(message.invitation, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceCreateResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invitation = Invitation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationServiceCreateResponse>): InvitationServiceCreateResponse {
    return InvitationServiceCreateResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceCreateResponse>): InvitationServiceCreateResponse {
    const message = createBaseInvitationServiceCreateResponse();
    message.invitation = (object.invitation !== undefined && object.invitation !== null)
      ? Invitation.fromPartial(object.invitation)
      : undefined;
    return message;
  },
};

function createBaseInvitationServiceListRequest(): InvitationServiceListRequest {
  return { orgId: undefined, inviteeEmail: undefined, invitedBy: undefined, status: 0 };
}

export const InvitationServiceListRequest = {
  encode(message: InvitationServiceListRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== undefined) {
      writer.uint32(10).string(message.orgId);
    }
    if (message.inviteeEmail !== undefined) {
      writer.uint32(18).string(message.inviteeEmail);
    }
    if (message.invitedBy !== undefined) {
      EntityUpdate.encode(message.invitedBy, writer.uint32(26).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(32).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceListRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceListRequest();
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

          message.inviteeEmail = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.invitedBy = EntityUpdate.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationServiceListRequest>): InvitationServiceListRequest {
    return InvitationServiceListRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceListRequest>): InvitationServiceListRequest {
    const message = createBaseInvitationServiceListRequest();
    message.orgId = object.orgId ?? undefined;
    message.inviteeEmail = object.inviteeEmail ?? undefined;
    message.invitedBy = (object.invitedBy !== undefined && object.invitedBy !== null)
      ? EntityUpdate.fromPartial(object.invitedBy)
      : undefined;
    message.status = object.status ?? 0;
    return message;
  },
};

function createBaseInvitationServiceListResponse(): InvitationServiceListResponse {
  return { invitations: [] };
}

export const InvitationServiceListResponse = {
  encode(message: InvitationServiceListResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.invitations) {
      Invitation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceListResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invitations.push(Invitation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationServiceListResponse>): InvitationServiceListResponse {
    return InvitationServiceListResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceListResponse>): InvitationServiceListResponse {
    const message = createBaseInvitationServiceListResponse();
    message.invitations = object.invitations?.map((e) => Invitation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInvitationServiceAcceptRequest(): InvitationServiceAcceptRequest {
  return { invitationId: "" };
}

export const InvitationServiceAcceptRequest = {
  encode(message: InvitationServiceAcceptRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitationId !== "") {
      writer.uint32(10).string(message.invitationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceAcceptRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceAcceptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invitationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationServiceAcceptRequest>): InvitationServiceAcceptRequest {
    return InvitationServiceAcceptRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceAcceptRequest>): InvitationServiceAcceptRequest {
    const message = createBaseInvitationServiceAcceptRequest();
    message.invitationId = object.invitationId ?? "";
    return message;
  },
};

function createBaseInvitationServiceAcceptResponse(): InvitationServiceAcceptResponse {
  return {};
}

export const InvitationServiceAcceptResponse = {
  encode(_: InvitationServiceAcceptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceAcceptResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceAcceptResponse();
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

  create(base?: DeepPartial<InvitationServiceAcceptResponse>): InvitationServiceAcceptResponse {
    return InvitationServiceAcceptResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<InvitationServiceAcceptResponse>): InvitationServiceAcceptResponse {
    const message = createBaseInvitationServiceAcceptResponse();
    return message;
  },
};

function createBaseInvitationServiceDeclineRequest(): InvitationServiceDeclineRequest {
  return { invitationId: "" };
}

export const InvitationServiceDeclineRequest = {
  encode(message: InvitationServiceDeclineRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitationId !== "") {
      writer.uint32(10).string(message.invitationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceDeclineRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceDeclineRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invitationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationServiceDeclineRequest>): InvitationServiceDeclineRequest {
    return InvitationServiceDeclineRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceDeclineRequest>): InvitationServiceDeclineRequest {
    const message = createBaseInvitationServiceDeclineRequest();
    message.invitationId = object.invitationId ?? "";
    return message;
  },
};

function createBaseInvitationServiceDeclineResponse(): InvitationServiceDeclineResponse {
  return {};
}

export const InvitationServiceDeclineResponse = {
  encode(_: InvitationServiceDeclineResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceDeclineResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceDeclineResponse();
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

  create(base?: DeepPartial<InvitationServiceDeclineResponse>): InvitationServiceDeclineResponse {
    return InvitationServiceDeclineResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<InvitationServiceDeclineResponse>): InvitationServiceDeclineResponse {
    const message = createBaseInvitationServiceDeclineResponse();
    return message;
  },
};

function createBaseInvitationServiceRevokeRequest(): InvitationServiceRevokeRequest {
  return { invitationId: "" };
}

export const InvitationServiceRevokeRequest = {
  encode(message: InvitationServiceRevokeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitationId !== "") {
      writer.uint32(10).string(message.invitationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceRevokeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceRevokeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.invitationId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationServiceRevokeRequest>): InvitationServiceRevokeRequest {
    return InvitationServiceRevokeRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationServiceRevokeRequest>): InvitationServiceRevokeRequest {
    const message = createBaseInvitationServiceRevokeRequest();
    message.invitationId = object.invitationId ?? "";
    return message;
  },
};

function createBaseInvitationServiceRevokeResponse(): InvitationServiceRevokeResponse {
  return {};
}

export const InvitationServiceRevokeResponse = {
  encode(_: InvitationServiceRevokeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationServiceRevokeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationServiceRevokeResponse();
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

  create(base?: DeepPartial<InvitationServiceRevokeResponse>): InvitationServiceRevokeResponse {
    return InvitationServiceRevokeResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<InvitationServiceRevokeResponse>): InvitationServiceRevokeResponse {
    const message = createBaseInvitationServiceRevokeResponse();
    return message;
  },
};

/** Manage invitations */
export type InvitationServiceDefinition = typeof InvitationServiceDefinition;
export const InvitationServiceDefinition = {
  name: "InvitationService",
  fullName: "blockjoy.v1.InvitationService",
  methods: {
    /** Invite a user into an organization. */
    create: {
      name: "Create",
      requestType: InvitationServiceCreateRequest,
      requestStream: false,
      responseType: InvitationServiceCreateResponse,
      responseStream: false,
      options: {},
    },
    /** List pending invitations for given org. */
    list: {
      name: "List",
      requestType: InvitationServiceListRequest,
      requestStream: false,
      responseType: InvitationServiceListResponse,
      responseStream: false,
      options: {},
    },
    /** Accept an invitation and become member of specified organization. */
    accept: {
      name: "Accept",
      requestType: InvitationServiceAcceptRequest,
      requestStream: false,
      responseType: InvitationServiceAcceptResponse,
      responseStream: false,
      options: {},
    },
    /** Decline an invitation. */
    decline: {
      name: "Decline",
      requestType: InvitationServiceDeclineRequest,
      requestStream: false,
      responseType: InvitationServiceDeclineResponse,
      responseStream: false,
      options: {},
    },
    /** Revoke a pending invitation. */
    revoke: {
      name: "Revoke",
      requestType: InvitationServiceRevokeRequest,
      requestStream: false,
      responseType: InvitationServiceRevokeResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface InvitationServiceImplementation<CallContextExt = {}> {
  /** Invite a user into an organization. */
  create(
    request: InvitationServiceCreateRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationServiceCreateResponse>>;
  /** List pending invitations for given org. */
  list(
    request: InvitationServiceListRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationServiceListResponse>>;
  /** Accept an invitation and become member of specified organization. */
  accept(
    request: InvitationServiceAcceptRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationServiceAcceptResponse>>;
  /** Decline an invitation. */
  decline(
    request: InvitationServiceDeclineRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationServiceDeclineResponse>>;
  /** Revoke a pending invitation. */
  revoke(
    request: InvitationServiceRevokeRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationServiceRevokeResponse>>;
}

export interface InvitationServiceClient<CallOptionsExt = {}> {
  /** Invite a user into an organization. */
  create(
    request: DeepPartial<InvitationServiceCreateRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationServiceCreateResponse>;
  /** List pending invitations for given org. */
  list(
    request: DeepPartial<InvitationServiceListRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationServiceListResponse>;
  /** Accept an invitation and become member of specified organization. */
  accept(
    request: DeepPartial<InvitationServiceAcceptRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationServiceAcceptResponse>;
  /** Decline an invitation. */
  decline(
    request: DeepPartial<InvitationServiceDeclineRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationServiceDeclineResponse>;
  /** Revoke a pending invitation. */
  revoke(
    request: DeepPartial<InvitationServiceRevokeRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationServiceRevokeResponse>;
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
