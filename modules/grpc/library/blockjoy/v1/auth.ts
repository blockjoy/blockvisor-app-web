/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

export interface AuthServiceLoginRequest {
  /** The email of the user logging in. */
  email: string;
  /** The password of the user logging in. */
  password: string;
}

export interface AuthServiceLoginResponse {
  /** A bearer token for client requests. */
  token: string;
  /** The refresh token for refreshing the bearer token. */
  refresh: string;
}

export interface AuthServiceRefreshRequest {
  /** The previous bearer token (which may be expired). */
  token: string;
  /** The refresh token (or read from the request headers if omitted). */
  refresh?: string | undefined;
}

export interface AuthServiceRefreshResponse {
  /** A new bearer token for client requests. */
  token: string;
  /** A new refresh token for refreshing the bearer token. */
  refresh: string;
}

export interface AuthServiceConfirmRequest {
}

export interface AuthServiceConfirmResponse {
  /** A new bearer token for subsequent client requests. */
  token: string;
  /** A new refresh token for subsequent refresh requests. */
  refresh: string;
}

export interface AuthServiceResetPasswordRequest {
  /** The email of the user resetting their password. */
  email: string;
}

export interface AuthServiceResetPasswordResponse {
}

export interface AuthServiceUpdatePasswordRequest {
  /** The new password following a reset request. */
  password: string;
}

export interface AuthServiceUpdatePasswordResponse {
}

export interface AuthServiceUpdateUIPasswordRequest {
  /** The user updating their password. */
  userId: string;
  /** The existing password for the user. */
  oldPassword: string;
  /** The new password for the user. */
  newPassword: string;
}

export interface AuthServiceUpdateUIPasswordResponse {
}

export interface AuthServiceListPermissionsRequest {
  /** The user to list permissions for. */
  userId: string;
  /** The org the user is acting on behalf of. */
  orgId: string;
  /** Whether to include permissions from the token in the response. */
  includeToken?: boolean | undefined;
}

export interface AuthServiceListPermissionsResponse {
  permissions: string[];
}

function createBaseAuthServiceLoginRequest(): AuthServiceLoginRequest {
  return { email: "", password: "" };
}

export const AuthServiceLoginRequest = {
  encode(message: AuthServiceLoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceLoginRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceLoginRequest();
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

  create(base?: DeepPartial<AuthServiceLoginRequest>): AuthServiceLoginRequest {
    return AuthServiceLoginRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceLoginRequest>): AuthServiceLoginRequest {
    const message = createBaseAuthServiceLoginRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseAuthServiceLoginResponse(): AuthServiceLoginResponse {
  return { token: "", refresh: "" };
}

export const AuthServiceLoginResponse = {
  encode(message: AuthServiceLoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.refresh !== "") {
      writer.uint32(18).string(message.refresh);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceLoginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refresh = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceLoginResponse>): AuthServiceLoginResponse {
    return AuthServiceLoginResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceLoginResponse>): AuthServiceLoginResponse {
    const message = createBaseAuthServiceLoginResponse();
    message.token = object.token ?? "";
    message.refresh = object.refresh ?? "";
    return message;
  },
};

function createBaseAuthServiceRefreshRequest(): AuthServiceRefreshRequest {
  return { token: "", refresh: undefined };
}

export const AuthServiceRefreshRequest = {
  encode(message: AuthServiceRefreshRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.refresh !== undefined) {
      writer.uint32(18).string(message.refresh);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceRefreshRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceRefreshRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refresh = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceRefreshRequest>): AuthServiceRefreshRequest {
    return AuthServiceRefreshRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceRefreshRequest>): AuthServiceRefreshRequest {
    const message = createBaseAuthServiceRefreshRequest();
    message.token = object.token ?? "";
    message.refresh = object.refresh ?? undefined;
    return message;
  },
};

function createBaseAuthServiceRefreshResponse(): AuthServiceRefreshResponse {
  return { token: "", refresh: "" };
}

export const AuthServiceRefreshResponse = {
  encode(message: AuthServiceRefreshResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.refresh !== "") {
      writer.uint32(18).string(message.refresh);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceRefreshResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceRefreshResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refresh = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceRefreshResponse>): AuthServiceRefreshResponse {
    return AuthServiceRefreshResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceRefreshResponse>): AuthServiceRefreshResponse {
    const message = createBaseAuthServiceRefreshResponse();
    message.token = object.token ?? "";
    message.refresh = object.refresh ?? "";
    return message;
  },
};

function createBaseAuthServiceConfirmRequest(): AuthServiceConfirmRequest {
  return {};
}

export const AuthServiceConfirmRequest = {
  encode(_: AuthServiceConfirmRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceConfirmRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceConfirmRequest();
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

  create(base?: DeepPartial<AuthServiceConfirmRequest>): AuthServiceConfirmRequest {
    return AuthServiceConfirmRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<AuthServiceConfirmRequest>): AuthServiceConfirmRequest {
    const message = createBaseAuthServiceConfirmRequest();
    return message;
  },
};

function createBaseAuthServiceConfirmResponse(): AuthServiceConfirmResponse {
  return { token: "", refresh: "" };
}

export const AuthServiceConfirmResponse = {
  encode(message: AuthServiceConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.refresh !== "") {
      writer.uint32(18).string(message.refresh);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.refresh = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceConfirmResponse>): AuthServiceConfirmResponse {
    return AuthServiceConfirmResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceConfirmResponse>): AuthServiceConfirmResponse {
    const message = createBaseAuthServiceConfirmResponse();
    message.token = object.token ?? "";
    message.refresh = object.refresh ?? "";
    return message;
  },
};

function createBaseAuthServiceResetPasswordRequest(): AuthServiceResetPasswordRequest {
  return { email: "" };
}

export const AuthServiceResetPasswordRequest = {
  encode(message: AuthServiceResetPasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceResetPasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceResetPasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  create(base?: DeepPartial<AuthServiceResetPasswordRequest>): AuthServiceResetPasswordRequest {
    return AuthServiceResetPasswordRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceResetPasswordRequest>): AuthServiceResetPasswordRequest {
    const message = createBaseAuthServiceResetPasswordRequest();
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseAuthServiceResetPasswordResponse(): AuthServiceResetPasswordResponse {
  return {};
}

export const AuthServiceResetPasswordResponse = {
  encode(_: AuthServiceResetPasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceResetPasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceResetPasswordResponse();
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

  create(base?: DeepPartial<AuthServiceResetPasswordResponse>): AuthServiceResetPasswordResponse {
    return AuthServiceResetPasswordResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<AuthServiceResetPasswordResponse>): AuthServiceResetPasswordResponse {
    const message = createBaseAuthServiceResetPasswordResponse();
    return message;
  },
};

function createBaseAuthServiceUpdatePasswordRequest(): AuthServiceUpdatePasswordRequest {
  return { password: "" };
}

export const AuthServiceUpdatePasswordRequest = {
  encode(message: AuthServiceUpdatePasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.password !== "") {
      writer.uint32(10).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceUpdatePasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceUpdatePasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  create(base?: DeepPartial<AuthServiceUpdatePasswordRequest>): AuthServiceUpdatePasswordRequest {
    return AuthServiceUpdatePasswordRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceUpdatePasswordRequest>): AuthServiceUpdatePasswordRequest {
    const message = createBaseAuthServiceUpdatePasswordRequest();
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseAuthServiceUpdatePasswordResponse(): AuthServiceUpdatePasswordResponse {
  return {};
}

export const AuthServiceUpdatePasswordResponse = {
  encode(_: AuthServiceUpdatePasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceUpdatePasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceUpdatePasswordResponse();
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

  create(base?: DeepPartial<AuthServiceUpdatePasswordResponse>): AuthServiceUpdatePasswordResponse {
    return AuthServiceUpdatePasswordResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<AuthServiceUpdatePasswordResponse>): AuthServiceUpdatePasswordResponse {
    const message = createBaseAuthServiceUpdatePasswordResponse();
    return message;
  },
};

function createBaseAuthServiceUpdateUIPasswordRequest(): AuthServiceUpdateUIPasswordRequest {
  return { userId: "", oldPassword: "", newPassword: "" };
}

export const AuthServiceUpdateUIPasswordRequest = {
  encode(message: AuthServiceUpdateUIPasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.oldPassword !== "") {
      writer.uint32(18).string(message.oldPassword);
    }
    if (message.newPassword !== "") {
      writer.uint32(26).string(message.newPassword);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceUpdateUIPasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceUpdateUIPasswordRequest();
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

          message.oldPassword = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newPassword = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceUpdateUIPasswordRequest>): AuthServiceUpdateUIPasswordRequest {
    return AuthServiceUpdateUIPasswordRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceUpdateUIPasswordRequest>): AuthServiceUpdateUIPasswordRequest {
    const message = createBaseAuthServiceUpdateUIPasswordRequest();
    message.userId = object.userId ?? "";
    message.oldPassword = object.oldPassword ?? "";
    message.newPassword = object.newPassword ?? "";
    return message;
  },
};

function createBaseAuthServiceUpdateUIPasswordResponse(): AuthServiceUpdateUIPasswordResponse {
  return {};
}

export const AuthServiceUpdateUIPasswordResponse = {
  encode(_: AuthServiceUpdateUIPasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceUpdateUIPasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceUpdateUIPasswordResponse();
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

  create(base?: DeepPartial<AuthServiceUpdateUIPasswordResponse>): AuthServiceUpdateUIPasswordResponse {
    return AuthServiceUpdateUIPasswordResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<AuthServiceUpdateUIPasswordResponse>): AuthServiceUpdateUIPasswordResponse {
    const message = createBaseAuthServiceUpdateUIPasswordResponse();
    return message;
  },
};

function createBaseAuthServiceListPermissionsRequest(): AuthServiceListPermissionsRequest {
  return { userId: "", orgId: "", includeToken: undefined };
}

export const AuthServiceListPermissionsRequest = {
  encode(message: AuthServiceListPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
    }
    if (message.includeToken !== undefined) {
      writer.uint32(24).bool(message.includeToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceListPermissionsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceListPermissionsRequest();
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

          message.includeToken = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceListPermissionsRequest>): AuthServiceListPermissionsRequest {
    return AuthServiceListPermissionsRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceListPermissionsRequest>): AuthServiceListPermissionsRequest {
    const message = createBaseAuthServiceListPermissionsRequest();
    message.userId = object.userId ?? "";
    message.orgId = object.orgId ?? "";
    message.includeToken = object.includeToken ?? undefined;
    return message;
  },
};

function createBaseAuthServiceListPermissionsResponse(): AuthServiceListPermissionsResponse {
  return { permissions: [] };
}

export const AuthServiceListPermissionsResponse = {
  encode(message: AuthServiceListPermissionsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.permissions) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceListPermissionsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceListPermissionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.permissions.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<AuthServiceListPermissionsResponse>): AuthServiceListPermissionsResponse {
    return AuthServiceListPermissionsResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceListPermissionsResponse>): AuthServiceListPermissionsResponse {
    const message = createBaseAuthServiceListPermissionsResponse();
    message.permissions = object.permissions?.map((e) => e) || [];
    return message;
  },
};

/** Service for authentication and authorization. */
export type AuthServiceDefinition = typeof AuthServiceDefinition;
export const AuthServiceDefinition = {
  name: "AuthService",
  fullName: "blockjoy.v1.AuthService",
  methods: {
    /** Login with an email and password. */
    login: {
      name: "Login",
      requestType: AuthServiceLoginRequest,
      requestStream: false,
      responseType: AuthServiceLoginResponse,
      responseStream: false,
      options: {},
    },
    /** Refresh API token. */
    refresh: {
      name: "Refresh",
      requestType: AuthServiceRefreshRequest,
      requestStream: false,
      responseType: AuthServiceRefreshResponse,
      responseStream: false,
      options: {},
    },
    /** Confirm the registration of a new user. */
    confirm: {
      name: "Confirm",
      requestType: AuthServiceConfirmRequest,
      requestStream: false,
      responseType: AuthServiceConfirmResponse,
      responseStream: false,
      options: {},
    },
    /** Send an email to a user to reset their password. */
    resetPassword: {
      name: "ResetPassword",
      requestType: AuthServiceResetPasswordRequest,
      requestStream: false,
      responseType: AuthServiceResetPasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Update the user's password after a reset password request. */
    updatePassword: {
      name: "UpdatePassword",
      requestType: AuthServiceUpdatePasswordRequest,
      requestStream: false,
      responseType: AuthServiceUpdatePasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Update the user's password after confirming the existing one. */
    updateUIPassword: {
      name: "UpdateUIPassword",
      requestType: AuthServiceUpdateUIPasswordRequest,
      requestStream: false,
      responseType: AuthServiceUpdateUIPasswordResponse,
      responseStream: false,
      options: {},
    },
    /** List the permissions for a user on behalf of some org. */
    listPermissions: {
      name: "ListPermissions",
      requestType: AuthServiceListPermissionsRequest,
      requestStream: false,
      responseType: AuthServiceListPermissionsResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AuthServiceImplementation<CallContextExt = {}> {
  /** Login with an email and password. */
  login(
    request: AuthServiceLoginRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceLoginResponse>>;
  /** Refresh API token. */
  refresh(
    request: AuthServiceRefreshRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceRefreshResponse>>;
  /** Confirm the registration of a new user. */
  confirm(
    request: AuthServiceConfirmRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceConfirmResponse>>;
  /** Send an email to a user to reset their password. */
  resetPassword(
    request: AuthServiceResetPasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceResetPasswordResponse>>;
  /** Update the user's password after a reset password request. */
  updatePassword(
    request: AuthServiceUpdatePasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceUpdatePasswordResponse>>;
  /** Update the user's password after confirming the existing one. */
  updateUIPassword(
    request: AuthServiceUpdateUIPasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceUpdateUIPasswordResponse>>;
  /** List the permissions for a user on behalf of some org. */
  listPermissions(
    request: AuthServiceListPermissionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceListPermissionsResponse>>;
}

export interface AuthServiceClient<CallOptionsExt = {}> {
  /** Login with an email and password. */
  login(
    request: DeepPartial<AuthServiceLoginRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceLoginResponse>;
  /** Refresh API token. */
  refresh(
    request: DeepPartial<AuthServiceRefreshRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceRefreshResponse>;
  /** Confirm the registration of a new user. */
  confirm(
    request: DeepPartial<AuthServiceConfirmRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceConfirmResponse>;
  /** Send an email to a user to reset their password. */
  resetPassword(
    request: DeepPartial<AuthServiceResetPasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceResetPasswordResponse>;
  /** Update the user's password after a reset password request. */
  updatePassword(
    request: DeepPartial<AuthServiceUpdatePasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceUpdatePasswordResponse>;
  /** Update the user's password after confirming the existing one. */
  updateUIPassword(
    request: DeepPartial<AuthServiceUpdateUIPasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceUpdateUIPasswordResponse>;
  /** List the permissions for a user on behalf of some org. */
  listPermissions(
    request: DeepPartial<AuthServiceListPermissionsRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceListPermissionsResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
