/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "blockjoy.v1";

export interface AuthServiceLoginRequest {
  email: string;
  password: string;
}

export interface AuthServiceLoginResponse {
  /**
   * This is the auth token that you will include with each request. It is a
   * Json Web Token, and therefore it may be decoded and inspected by the client
   * to seen the allowed permissions.
   */
  token: string;
  /**
   * The `refresh token` is used to obtain a new token without having to provide
   * the email and password again. Note that if you are a browser client, this
   * field can be ignored, because we also include a HTTP-Only, Set-Cookie
   * header. This means that this token does not have to be stored in
   * localStorage.
   */
  refresh: string;
}

export interface AuthServiceRefreshRequest {
  /** This is your old token. It is allowed that this token is expired. */
  token: string;
  /**
   * This is the refresh token that was sent to you on login. It is optional
   * here, because if it is not provided, the value from the metadata is used as
   * a fallback. This means that if you are a browser client, you do not have to
   * provide this field, as it was set by the call to AuthService/Login, or by
   * the previous call to this endpoint.
   */
  refresh?: string | undefined;
}

export interface AuthServiceRefreshResponse {
  /** A newly minted Json Web Token. */
  token: string;
  /**
   * The new refresh token. Just as with the call to AuthService/Login, this
   * value is duplicated in the metadata, so a cookie can be set for the browser
   * client.
   */
  refresh: string;
}

export interface AuthServiceResetPasswordRequest {
  email: string;
}

export interface AuthServiceResetPasswordResponse {
}

export interface AuthServiceUpdatePasswordRequest {
  password: string;
}

export interface AuthServiceUpdatePasswordResponse {
}

export interface AuthServiceUpdateUIPasswordRequest {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface AuthServiceUpdateUIPasswordResponse {
}

export interface AuthServiceConfirmRequest {
}

export interface AuthServiceConfirmResponse {
  token: string;
  refresh: string;
}

export interface AuthServiceSwitchOrgRequest {
  orgId: string;
}

export interface AuthServiceListPermissionsRequest {
  userId: string;
  orgId: string;
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

function createBaseAuthServiceSwitchOrgRequest(): AuthServiceSwitchOrgRequest {
  return { orgId: "" };
}

export const AuthServiceSwitchOrgRequest = {
  encode(message: AuthServiceSwitchOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthServiceSwitchOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServiceSwitchOrgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  create(base?: DeepPartial<AuthServiceSwitchOrgRequest>): AuthServiceSwitchOrgRequest {
    return AuthServiceSwitchOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<AuthServiceSwitchOrgRequest>): AuthServiceSwitchOrgRequest {
    const message = createBaseAuthServiceSwitchOrgRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

function createBaseAuthServiceListPermissionsRequest(): AuthServiceListPermissionsRequest {
  return { userId: "", orgId: "" };
}

export const AuthServiceListPermissionsRequest = {
  encode(message: AuthServiceListPermissionsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.orgId !== "") {
      writer.uint32(18).string(message.orgId);
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

/** Retrieve and refresh API token */
export type AuthServiceDefinition = typeof AuthServiceDefinition;
export const AuthServiceDefinition = {
  name: "AuthService",
  fullName: "blockjoy.v1.AuthService",
  methods: {
    /** Login user, i.e. retrieve token */
    login: {
      name: "Login",
      requestType: AuthServiceLoginRequest,
      requestStream: false,
      responseType: AuthServiceLoginResponse,
      responseStream: false,
      options: {},
    },
    /** Confirm user registration */
    confirm: {
      name: "Confirm",
      requestType: AuthServiceConfirmRequest,
      requestStream: false,
      responseType: AuthServiceConfirmResponse,
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
    /**
     * Send the reset password email out to this user. Intentionally returns
     * nothing to hide whether the user was registered or not.
     */
    resetPassword: {
      name: "ResetPassword",
      requestType: AuthServiceResetPasswordRequest,
      requestStream: false,
      responseType: AuthServiceResetPasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Update the user's password to a new value */
    updatePassword: {
      name: "UpdatePassword",
      requestType: AuthServiceUpdatePasswordRequest,
      requestStream: false,
      responseType: AuthServiceUpdatePasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Update the user's password via profile UI */
    updateUIPassword: {
      name: "UpdateUIPassword",
      requestType: AuthServiceUpdateUIPasswordRequest,
      requestStream: false,
      responseType: AuthServiceUpdateUIPasswordResponse,
      responseStream: false,
      options: {},
    },
    /** List the permissions available for a user and org. */
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
  /** Login user, i.e. retrieve token */
  login(
    request: AuthServiceLoginRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceLoginResponse>>;
  /** Confirm user registration */
  confirm(
    request: AuthServiceConfirmRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceConfirmResponse>>;
  /** Refresh API token. */
  refresh(
    request: AuthServiceRefreshRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceRefreshResponse>>;
  /**
   * Send the reset password email out to this user. Intentionally returns
   * nothing to hide whether the user was registered or not.
   */
  resetPassword(
    request: AuthServiceResetPasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceResetPasswordResponse>>;
  /** Update the user's password to a new value */
  updatePassword(
    request: AuthServiceUpdatePasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceUpdatePasswordResponse>>;
  /** Update the user's password via profile UI */
  updateUIPassword(
    request: AuthServiceUpdateUIPasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceUpdateUIPasswordResponse>>;
  /** List the permissions available for a user and org. */
  listPermissions(
    request: AuthServiceListPermissionsRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<AuthServiceListPermissionsResponse>>;
}

export interface AuthServiceClient<CallOptionsExt = {}> {
  /** Login user, i.e. retrieve token */
  login(
    request: DeepPartial<AuthServiceLoginRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceLoginResponse>;
  /** Confirm user registration */
  confirm(
    request: DeepPartial<AuthServiceConfirmRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceConfirmResponse>;
  /** Refresh API token. */
  refresh(
    request: DeepPartial<AuthServiceRefreshRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceRefreshResponse>;
  /**
   * Send the reset password email out to this user. Intentionally returns
   * nothing to hide whether the user was registered or not.
   */
  resetPassword(
    request: DeepPartial<AuthServiceResetPasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceResetPasswordResponse>;
  /** Update the user's password to a new value */
  updatePassword(
    request: DeepPartial<AuthServiceUpdatePasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceUpdatePasswordResponse>;
  /** Update the user's password via profile UI */
  updateUIPassword(
    request: DeepPartial<AuthServiceUpdateUIPasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<AuthServiceUpdateUIPasswordResponse>;
  /** List the permissions available for a user and org. */
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
