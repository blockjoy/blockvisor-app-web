import {
  AuthServiceClient,
  AuthServiceDefinition,
  AuthServiceRefreshResponse,
} from '../library/blockjoy/v1/auth';
import { getOptions, handleError, setTokenValue } from '@modules/grpc';
import { createChannel, createClient, FetchTransport, Metadata } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

export type NewPassword = {
  old_pwd: string;
  new_pwd: string;
  new_pwd_confirmation: string;
};

class AuthClient {
  private client: AuthServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!, FetchTransport({ credentials: 'same-origin' }));
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

  async registration_confirmation(
    token: string,
  ): Promise<string | StatusResponse> {
    const authHeader = {
      metadata: Metadata({
        authorization: `Bearer ${token}`,
      }),
    };
    try {
      const response = await this.client.confirm({}, authHeader);
      return response.token;
    } catch (err) {
      return StatusResponseFactory.registrationConfirmation(err, 'grpcClient');
    }
  }

  async resetPassword(email: string): Promise<void | StatusResponse> {
    try {
      await this.client.resetPassword({ email }, getOptions());
    } catch (err) {
      return StatusResponseFactory.resetPasswordResponse(err, 'grpcClient');
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
      await this.client.updateUIPassword(
        {
          oldPassword: pwd.old_pwd,
          newPassword: pwd.new_pwd,
        },
        getOptions(),
      );
    } catch (err) {
      return StatusResponseFactory.updatePasswordResponse(err, 'grpcClient');
    }
  }

  async refreshToken(token: string): Promise<AuthServiceRefreshResponse> {
    try {
      return await this.client.refresh({ token });
    } catch (err) {
      return handleError(err);
    }
  }
}

export const authClient = new AuthClient();
