/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "v1";

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
  /** The id of the user that created this invitation. */
  createdBy: string;
  /** The full name of the user that created this invitation. */
  createdByName: string;
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
  /** The moment this invitation was created. */
  createdAt:
    | Date
    | undefined;
  /**
   * The status of the invitation, indicating what user action has been taken
   * with this invitation.
   */
  status: InvitationStatus;
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
export interface CreateInvitationRequest {
  /**
   * The id of the person that is being invited here. Note that this is not the
   * uuid of some user, because the person that is being invited might not have
   * an account (yet).
   */
  inviteeEmail: string;
  /** The id of the organization that the user is being invited to. */
  orgId: string;
}

export interface CreateInvitationResponse {
}

export interface ListPendingInvitationRequest {
  orgId: string;
}

export interface ListReceivedInvitationRequest {
  userId: string;
}

export interface InvitationsResponse {
  invitations: Invitation[];
}

export interface AcceptInvitationRequest {
  invitationId: string;
}

export interface AcceptInvitationResponse {
}

export interface DeclineInvitationRequest {
  invitationId: string;
}

export interface DeclineInvitationResponse {
}

export interface RevokeInvitationRequest {
  invitationId: string;
}

export interface RevokeInvitationResponse {
}

function createBaseInvitation(): Invitation {
  return {
    id: "",
    createdBy: "",
    createdByName: "",
    orgId: "",
    orgName: "",
    inviteeEmail: "",
    createdAt: undefined,
    status: 0,
    acceptedAt: undefined,
    declinedAt: undefined,
  };
}

export const Invitation = {
  encode(message: Invitation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.createdBy !== "") {
      writer.uint32(18).string(message.createdBy);
    }
    if (message.createdByName !== "") {
      writer.uint32(26).string(message.createdByName);
    }
    if (message.orgId !== "") {
      writer.uint32(34).string(message.orgId);
    }
    if (message.orgName !== "") {
      writer.uint32(42).string(message.orgName);
    }
    if (message.inviteeEmail !== "") {
      writer.uint32(50).string(message.inviteeEmail);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(58).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
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
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.createdBy = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.createdByName = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.orgId = reader.string();
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.orgName = reader.string();
          continue;
        case 6:
          if (tag != 50) {
            break;
          }

          message.inviteeEmail = reader.string();
          continue;
        case 7:
          if (tag != 58) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag != 64) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 9:
          if (tag != 74) {
            break;
          }

          message.acceptedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag != 82) {
            break;
          }

          message.declinedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
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
    message.createdBy = object.createdBy ?? "";
    message.createdByName = object.createdByName ?? "";
    message.orgId = object.orgId ?? "";
    message.orgName = object.orgName ?? "";
    message.inviteeEmail = object.inviteeEmail ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.status = object.status ?? 0;
    message.acceptedAt = object.acceptedAt ?? undefined;
    message.declinedAt = object.declinedAt ?? undefined;
    return message;
  },
};

function createBaseCreateInvitationRequest(): CreateInvitationRequest {
  return { inviteeEmail: "", orgId: "" };
}

export const CreateInvitationRequest = {
  encode(message: CreateInvitationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.inviteeEmail !== "") {
      writer.uint32(10).string(message.inviteeEmail);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInvitationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInvitationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.inviteeEmail = reader.string();
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

  create(base?: DeepPartial<CreateInvitationRequest>): CreateInvitationRequest {
    return CreateInvitationRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<CreateInvitationRequest>): CreateInvitationRequest {
    const message = createBaseCreateInvitationRequest();
    message.inviteeEmail = object.inviteeEmail ?? "";
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseCreateInvitationResponse(): CreateInvitationResponse {
  return {};
}

export const CreateInvitationResponse = {
  encode(_: CreateInvitationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateInvitationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateInvitationResponse();
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

  create(base?: DeepPartial<CreateInvitationResponse>): CreateInvitationResponse {
    return CreateInvitationResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<CreateInvitationResponse>): CreateInvitationResponse {
    const message = createBaseCreateInvitationResponse();
    return message;
  },
};

function createBaseListPendingInvitationRequest(): ListPendingInvitationRequest {
  return { orgId: "" };
}

export const ListPendingInvitationRequest = {
  encode(message: ListPendingInvitationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListPendingInvitationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListPendingInvitationRequest();
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

  create(base?: DeepPartial<ListPendingInvitationRequest>): ListPendingInvitationRequest {
    return ListPendingInvitationRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListPendingInvitationRequest>): ListPendingInvitationRequest {
    const message = createBaseListPendingInvitationRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseListReceivedInvitationRequest(): ListReceivedInvitationRequest {
  return { userId: "" };
}

export const ListReceivedInvitationRequest = {
  encode(message: ListReceivedInvitationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListReceivedInvitationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListReceivedInvitationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.userId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ListReceivedInvitationRequest>): ListReceivedInvitationRequest {
    return ListReceivedInvitationRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ListReceivedInvitationRequest>): ListReceivedInvitationRequest {
    const message = createBaseListReceivedInvitationRequest();
    message.userId = object.userId ?? "";
    return message;
  },
};

function createBaseInvitationsResponse(): InvitationsResponse {
  return { invitations: [] };
}

export const InvitationsResponse = {
  encode(message: InvitationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.invitations) {
      Invitation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InvitationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInvitationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.invitations.push(Invitation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<InvitationsResponse>): InvitationsResponse {
    return InvitationsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<InvitationsResponse>): InvitationsResponse {
    const message = createBaseInvitationsResponse();
    message.invitations = object.invitations?.map((e) => Invitation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAcceptInvitationRequest(): AcceptInvitationRequest {
  return { invitationId: "" };
}

export const AcceptInvitationRequest = {
  encode(message: AcceptInvitationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitationId !== "") {
      writer.uint32(10).string(message.invitationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcceptInvitationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcceptInvitationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.invitationId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AcceptInvitationRequest>): AcceptInvitationRequest {
    return AcceptInvitationRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AcceptInvitationRequest>): AcceptInvitationRequest {
    const message = createBaseAcceptInvitationRequest();
    message.invitationId = object.invitationId ?? "";
    return message;
  },
};

function createBaseAcceptInvitationResponse(): AcceptInvitationResponse {
  return {};
}

export const AcceptInvitationResponse = {
  encode(_: AcceptInvitationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AcceptInvitationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAcceptInvitationResponse();
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

  create(base?: DeepPartial<AcceptInvitationResponse>): AcceptInvitationResponse {
    return AcceptInvitationResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<AcceptInvitationResponse>): AcceptInvitationResponse {
    const message = createBaseAcceptInvitationResponse();
    return message;
  },
};

function createBaseDeclineInvitationRequest(): DeclineInvitationRequest {
  return { invitationId: "" };
}

export const DeclineInvitationRequest = {
  encode(message: DeclineInvitationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitationId !== "") {
      writer.uint32(10).string(message.invitationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeclineInvitationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeclineInvitationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.invitationId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<DeclineInvitationRequest>): DeclineInvitationRequest {
    return DeclineInvitationRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<DeclineInvitationRequest>): DeclineInvitationRequest {
    const message = createBaseDeclineInvitationRequest();
    message.invitationId = object.invitationId ?? "";
    return message;
  },
};

function createBaseDeclineInvitationResponse(): DeclineInvitationResponse {
  return {};
}

export const DeclineInvitationResponse = {
  encode(_: DeclineInvitationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeclineInvitationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeclineInvitationResponse();
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

  create(base?: DeepPartial<DeclineInvitationResponse>): DeclineInvitationResponse {
    return DeclineInvitationResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<DeclineInvitationResponse>): DeclineInvitationResponse {
    const message = createBaseDeclineInvitationResponse();
    return message;
  },
};

function createBaseRevokeInvitationRequest(): RevokeInvitationRequest {
  return { invitationId: "" };
}

export const RevokeInvitationRequest = {
  encode(message: RevokeInvitationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.invitationId !== "") {
      writer.uint32(10).string(message.invitationId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeInvitationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeInvitationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.invitationId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RevokeInvitationRequest>): RevokeInvitationRequest {
    return RevokeInvitationRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RevokeInvitationRequest>): RevokeInvitationRequest {
    const message = createBaseRevokeInvitationRequest();
    message.invitationId = object.invitationId ?? "";
    return message;
  },
};

function createBaseRevokeInvitationResponse(): RevokeInvitationResponse {
  return {};
}

export const RevokeInvitationResponse = {
  encode(_: RevokeInvitationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RevokeInvitationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevokeInvitationResponse();
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

  create(base?: DeepPartial<RevokeInvitationResponse>): RevokeInvitationResponse {
    return RevokeInvitationResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<RevokeInvitationResponse>): RevokeInvitationResponse {
    const message = createBaseRevokeInvitationResponse();
    return message;
  },
};

/** Manage invitations */
export type InvitationsDefinition = typeof InvitationsDefinition;
export const InvitationsDefinition = {
  name: "Invitations",
  fullName: "v1.Invitations",
  methods: {
    /** Invite a user into an organization. */
    create: {
      name: "Create",
      requestType: CreateInvitationRequest,
      requestStream: false,
      responseType: CreateInvitationResponse,
      responseStream: false,
      options: {},
    },
    /** List pending invitations for given org. */
    listPending: {
      name: "ListPending",
      requestType: ListPendingInvitationRequest,
      requestStream: false,
      responseType: InvitationsResponse,
      responseStream: false,
      options: {},
    },
    /** List received invitations for given user. */
    listReceived: {
      name: "ListReceived",
      requestType: ListReceivedInvitationRequest,
      requestStream: false,
      responseType: InvitationsResponse,
      responseStream: false,
      options: {},
    },
    /** Accept an invitation and become member of specified organization. */
    accept: {
      name: "Accept",
      requestType: AcceptInvitationRequest,
      requestStream: false,
      responseType: AcceptInvitationResponse,
      responseStream: false,
      options: {},
    },
    /** Decline an invitation. */
    decline: {
      name: "Decline",
      requestType: DeclineInvitationRequest,
      requestStream: false,
      responseType: DeclineInvitationResponse,
      responseStream: false,
      options: {},
    },
    /** Revoke a pending invitation. */
    revoke: {
      name: "Revoke",
      requestType: RevokeInvitationRequest,
      requestStream: false,
      responseType: RevokeInvitationResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface InvitationsServiceImplementation<CallContextExt = {}> {
  /** Invite a user into an organization. */
  create(
    request: CreateInvitationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<CreateInvitationResponse>>;
  /** List pending invitations for given org. */
  listPending(
    request: ListPendingInvitationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationsResponse>>;
  /** List received invitations for given user. */
  listReceived(
    request: ListReceivedInvitationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<InvitationsResponse>>;
  /** Accept an invitation and become member of specified organization. */
  accept(
    request: AcceptInvitationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AcceptInvitationResponse>>;
  /** Decline an invitation. */
  decline(
    request: DeclineInvitationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<DeclineInvitationResponse>>;
  /** Revoke a pending invitation. */
  revoke(
    request: RevokeInvitationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<RevokeInvitationResponse>>;
}

export interface InvitationsClient<CallOptionsExt = {}> {
  /** Invite a user into an organization. */
  create(
    request: DeepPartial<CreateInvitationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<CreateInvitationResponse>;
  /** List pending invitations for given org. */
  listPending(
    request: DeepPartial<ListPendingInvitationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationsResponse>;
  /** List received invitations for given user. */
  listReceived(
    request: DeepPartial<ListReceivedInvitationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<InvitationsResponse>;
  /** Accept an invitation and become member of specified organization. */
  accept(
    request: DeepPartial<AcceptInvitationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AcceptInvitationResponse>;
  /** Decline an invitation. */
  decline(
    request: DeepPartial<DeclineInvitationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<DeclineInvitationResponse>;
  /** Revoke a pending invitation. */
  revoke(
    request: DeepPartial<RevokeInvitationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<RevokeInvitationResponse>;
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
