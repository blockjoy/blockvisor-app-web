import {
  AuthServiceClient,
  AuthServiceDefinition,
} from '../library/blockjoy/v1/auth';
import {
  createChannel,
  createClient,
  FetchTransport,
  Metadata,
} from 'nice-grpc-web';
import {
  getIdentity,
  getOptions,
  handleError,
  setTokenValue,
} from '@modules/grpc';
import { StatusResponse, StatusResponseFactory } from '../status_response';

export type NewPassword = {
  old_pwd: string;
  new_pwd: string;
  new_pwd_confirmation: string;
};

class AuthClient {
  private client: AuthServiceClient;

  constructor() {
    const channel = createChannel(
      process.env.NEXT_PUBLIC_API_URL!,
      FetchTransport({ credentials: 'include' }),
    );
    this.client = createClient(AuthServiceDefinition, channel);
  }

  async login(
    email: string,
    password: string,
  ): Promise<string | StatusResponse> {
    try {
      const response = await this.client.login({
        email,
        password,
      });
      setTokenValue(response.token);
      return response.token;
    } catch (err) {
      return StatusResponseFactory.loginResponse(err, 'grpcClient');
    }
  }

  async registrationConfirmation(token: string): Promise<string> {
    const authHeader = {
      metadata: Metadata({
        authorization: `Bearer ${token}`,
      }),
    };
    try {
      const response = await this.client.confirm({}, authHeader);
      return response.token;
    } catch (err) {
      return handleError(err);
    }
  }

  async resetPassword(email: string): Promise<void | StatusResponse> {
    try {
      await this.client.resetPassword({ email }, getOptions());
    } catch (err) {
      return StatusResponseFactory.resetPasswordResponse(err, 'grpcClient');
    }
  }

  async listPermissions(userId: string, orgId: string): Promise<string[]> {
    try {
      await this.refreshToken();
      const response = await this.client.listPermissions(
        { userId, orgId, includeToken: true },
        getOptions(),
      );
      return response.permissions;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateResetPassword(
    token: string,
    password: string,
  ): Promise<void | StatusResponse> {
    const authHeader = {
      metadata: Metadata({
        authorization: `Bearer ${token}`,
      }),
    };
    try {
      await this.client.updatePassword({ password }, authHeader);
    } catch (err) {
      return StatusResponseFactory.updateResetPasswordResponse(
        err,
        'grpcClient',
      );
    }
  }

  async updatePassword(pwd: NewPassword): Promise<void | StatusResponse> {
    try {
      await this.refreshToken();
      await this.client.updateUIPassword(
        {
          oldPassword: pwd.old_pwd,
          newPassword: pwd.new_pwd,
          userId: getIdentity().id,
        },
        getOptions(),
      );
    } catch (err) {
      return StatusResponseFactory.updatePasswordResponse(err, 'grpcClient');
    }
  }

  async refreshToken(): Promise<void> {
    const currentDateTimestamp = Math.round(new Date().getTime() / 1000);
    if (
      !!localStorage.getItem('accessTokenExpiry') &&
      currentDateTimestamp > +localStorage.getItem('accessTokenExpiry')!
    ) {
      try {
        const refreshTokenResponse = await this.client.refresh({
          token: getIdentity().accessToken,
        });
        setTokenValue(refreshTokenResponse.token);
      } catch (err) {
        console.log('refreshTokenError', err);
      }
    }
  }
}

export const authClient = new AuthClient();
