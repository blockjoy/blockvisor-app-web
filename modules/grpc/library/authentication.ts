/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "v1";

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  token: string;
}

export interface RefreshTokenRequest {
}

export interface RefreshTokenResponse {
  token: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
}

export interface UpdatePasswordRequest {
  password: string;
}

export interface UpdatePasswordResponse {
  token: string;
}

export interface UpdateUIPasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUIPasswordResponse {
  token: string;
}

export interface ConfirmRegistrationRequest {
}

export interface ConfirmRegistrationResponse {
  token: string;
}

export interface SwitchOrgRequest {
  orgId: string;
}

function createBaseLoginUserRequest(): LoginUserRequest {
  return { email: "", password: "" };
}

export const LoginUserRequest = {
  encode(message: LoginUserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginUserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginUserRequest();
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

  create(base?: DeepPartial<LoginUserRequest>): LoginUserRequest {
    return LoginUserRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LoginUserRequest>): LoginUserRequest {
    const message = createBaseLoginUserRequest();
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseLoginUserResponse(): LoginUserResponse {
  return { token: "" };
}

export const LoginUserResponse = {
  encode(message: LoginUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<LoginUserResponse>): LoginUserResponse {
    return LoginUserResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<LoginUserResponse>): LoginUserResponse {
    const message = createBaseLoginUserResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseRefreshTokenRequest(): RefreshTokenRequest {
  return {};
}

export const RefreshTokenRequest = {
  encode(_: RefreshTokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshTokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshTokenRequest();
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

  create(base?: DeepPartial<RefreshTokenRequest>): RefreshTokenRequest {
    return RefreshTokenRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<RefreshTokenRequest>): RefreshTokenRequest {
    const message = createBaseRefreshTokenRequest();
    return message;
  },
};

function createBaseRefreshTokenResponse(): RefreshTokenResponse {
  return { token: "" };
}

export const RefreshTokenResponse = {
  encode(message: RefreshTokenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RefreshTokenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefreshTokenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<RefreshTokenResponse>): RefreshTokenResponse {
    return RefreshTokenResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<RefreshTokenResponse>): RefreshTokenResponse {
    const message = createBaseRefreshTokenResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseResetPasswordRequest(): ResetPasswordRequest {
  return { email: "" };
}

export const ResetPasswordRequest = {
  encode(message: ResetPasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResetPasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResetPasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
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

  create(base?: DeepPartial<ResetPasswordRequest>): ResetPasswordRequest {
    return ResetPasswordRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ResetPasswordRequest>): ResetPasswordRequest {
    const message = createBaseResetPasswordRequest();
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseResetPasswordResponse(): ResetPasswordResponse {
  return {};
}

export const ResetPasswordResponse = {
  encode(_: ResetPasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResetPasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResetPasswordResponse();
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

  create(base?: DeepPartial<ResetPasswordResponse>): ResetPasswordResponse {
    return ResetPasswordResponse.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<ResetPasswordResponse>): ResetPasswordResponse {
    const message = createBaseResetPasswordResponse();
    return message;
  },
};

function createBaseUpdatePasswordRequest(): UpdatePasswordRequest {
  return { password: "" };
}

export const UpdatePasswordRequest = {
  encode(message: UpdatePasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.password !== "") {
      writer.uint32(10).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
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

  create(base?: DeepPartial<UpdatePasswordRequest>): UpdatePasswordRequest {
    return UpdatePasswordRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdatePasswordRequest>): UpdatePasswordRequest {
    const message = createBaseUpdatePasswordRequest();
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseUpdatePasswordResponse(): UpdatePasswordResponse {
  return { token: "" };
}

export const UpdatePasswordResponse = {
  encode(message: UpdatePasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdatePasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdatePasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdatePasswordResponse>): UpdatePasswordResponse {
    return UpdatePasswordResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdatePasswordResponse>): UpdatePasswordResponse {
    const message = createBaseUpdatePasswordResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseUpdateUIPasswordRequest(): UpdateUIPasswordRequest {
  return { oldPassword: "", newPassword: "" };
}

export const UpdateUIPasswordRequest = {
  encode(message: UpdateUIPasswordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.oldPassword !== "") {
      writer.uint32(10).string(message.oldPassword);
    }
    if (message.newPassword !== "") {
      writer.uint32(18).string(message.newPassword);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUIPasswordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUIPasswordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.oldPassword = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.newPassword = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateUIPasswordRequest>): UpdateUIPasswordRequest {
    return UpdateUIPasswordRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateUIPasswordRequest>): UpdateUIPasswordRequest {
    const message = createBaseUpdateUIPasswordRequest();
    message.oldPassword = object.oldPassword ?? "";
    message.newPassword = object.newPassword ?? "";
    return message;
  },
};

function createBaseUpdateUIPasswordResponse(): UpdateUIPasswordResponse {
  return { token: "" };
}

export const UpdateUIPasswordResponse = {
  encode(message: UpdateUIPasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateUIPasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateUIPasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<UpdateUIPasswordResponse>): UpdateUIPasswordResponse {
    return UpdateUIPasswordResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<UpdateUIPasswordResponse>): UpdateUIPasswordResponse {
    const message = createBaseUpdateUIPasswordResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseConfirmRegistrationRequest(): ConfirmRegistrationRequest {
  return {};
}

export const ConfirmRegistrationRequest = {
  encode(_: ConfirmRegistrationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfirmRegistrationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfirmRegistrationRequest();
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

  create(base?: DeepPartial<ConfirmRegistrationRequest>): ConfirmRegistrationRequest {
    return ConfirmRegistrationRequest.fromPartial(base ?? {});
  },

  fromPartial(_: DeepPartial<ConfirmRegistrationRequest>): ConfirmRegistrationRequest {
    const message = createBaseConfirmRegistrationRequest();
    return message;
  },
};

function createBaseConfirmRegistrationResponse(): ConfirmRegistrationResponse {
  return { token: "" };
}

export const ConfirmRegistrationResponse = {
  encode(message: ConfirmRegistrationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConfirmRegistrationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfirmRegistrationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<ConfirmRegistrationResponse>): ConfirmRegistrationResponse {
    return ConfirmRegistrationResponse.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<ConfirmRegistrationResponse>): ConfirmRegistrationResponse {
    const message = createBaseConfirmRegistrationResponse();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseSwitchOrgRequest(): SwitchOrgRequest {
  return { orgId: "" };
}

export const SwitchOrgRequest = {
  encode(message: SwitchOrgRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orgId !== "") {
      writer.uint32(10).string(message.orgId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SwitchOrgRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSwitchOrgRequest();
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

  create(base?: DeepPartial<SwitchOrgRequest>): SwitchOrgRequest {
    return SwitchOrgRequest.fromPartial(base ?? {});
  },

  fromPartial(object: DeepPartial<SwitchOrgRequest>): SwitchOrgRequest {
    const message = createBaseSwitchOrgRequest();
    message.orgId = object.orgId ?? "";
    return message;
  },
};

/** Retrieve and refresh API token */
export type AuthenticationDefinition = typeof AuthenticationDefinition;
export const AuthenticationDefinition = {
  name: "Authentication",
  fullName: "v1.Authentication",
  methods: {
    /** Login user, i.e. retrieve token */
    login: {
      name: "Login",
      requestType: LoginUserRequest,
      requestStream: false,
      responseType: LoginUserResponse,
      responseStream: false,
      options: {},
    },
    /** Confirm user registration */
    confirm: {
      name: "Confirm",
      requestType: ConfirmRegistrationRequest,
      requestStream: false,
      responseType: ConfirmRegistrationResponse,
      responseStream: false,
      options: {},
    },
    /** Refresh API token. */
    refresh: {
      name: "Refresh",
      requestType: RefreshTokenRequest,
      requestStream: false,
      responseType: RefreshTokenResponse,
      responseStream: false,
      options: {},
    },
    /**
     * Send the reset password email out to this user. Intentionally returns
     * nothing to hide whether the user was registered or not.
     */
    resetPassword: {
      name: "ResetPassword",
      requestType: ResetPasswordRequest,
      requestStream: false,
      responseType: ResetPasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Update the user's password to a new value */
    updatePassword: {
      name: "UpdatePassword",
      requestType: UpdatePasswordRequest,
      requestStream: false,
      responseType: UpdatePasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Update the user's password via profile UI */
    updateUIPassword: {
      name: "UpdateUIPassword",
      requestType: UpdateUIPasswordRequest,
      requestStream: false,
      responseType: UpdateUIPasswordResponse,
      responseStream: false,
      options: {},
    },
    /** Switch active organization */
    switchOrganization: {
      name: "SwitchOrganization",
      requestType: SwitchOrgRequest,
      requestStream: false,
      responseType: LoginUserResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface AuthenticationServiceImplementation<CallContextExt = {}> {
  /** Login user, i.e. retrieve token */
  login(request: LoginUserRequest, context: CallContext & CallContextExt): Promise<DeepPartial<LoginUserResponse>>;
  /** Confirm user registration */
  confirm(
    request: ConfirmRegistrationRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ConfirmRegistrationResponse>>;
  /** Refresh API token. */
  refresh(
    request: RefreshTokenRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<RefreshTokenResponse>>;
  /**
   * Send the reset password email out to this user. Intentionally returns
   * nothing to hide whether the user was registered or not.
   */
  resetPassword(
    request: ResetPasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<ResetPasswordResponse>>;
  /** Update the user's password to a new value */
  updatePassword(
    request: UpdatePasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UpdatePasswordResponse>>;
  /** Update the user's password via profile UI */
  updateUIPassword(
    request: UpdateUIPasswordRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<UpdateUIPasswordResponse>>;
  /** Switch active organization */
  switchOrganization(
    request: SwitchOrgRequest,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<LoginUserResponse>>;
}

export interface AuthenticationClient<CallOptionsExt = {}> {
  /** Login user, i.e. retrieve token */
  login(request: DeepPartial<LoginUserRequest>, options?: CallOptions & CallOptionsExt): Promise<LoginUserResponse>;
  /** Confirm user registration */
  confirm(
    request: DeepPartial<ConfirmRegistrationRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ConfirmRegistrationResponse>;
  /** Refresh API token. */
  refresh(
    request: DeepPartial<RefreshTokenRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<RefreshTokenResponse>;
  /**
   * Send the reset password email out to this user. Intentionally returns
   * nothing to hide whether the user was registered or not.
   */
  resetPassword(
    request: DeepPartial<ResetPasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<ResetPasswordResponse>;
  /** Update the user's password to a new value */
  updatePassword(
    request: DeepPartial<UpdatePasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UpdatePasswordResponse>;
  /** Update the user's password via profile UI */
  updateUIPassword(
    request: DeepPartial<UpdateUIPasswordRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<UpdateUIPasswordResponse>;
  /** Switch active organization */
  switchOrganization(
    request: DeepPartial<SwitchOrgRequest>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<LoginUserResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
