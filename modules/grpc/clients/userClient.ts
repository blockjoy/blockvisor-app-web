import {
  User,
  UserServiceClient,
  UserServiceDefinition,
} from '../library/blockjoy/v1/user';
import { getOptions, handleError } from '@modules/grpc';
import { createChannel, createClient, Metadata } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

import { authClient } from '@modules/grpc';

export type UIUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

class UserClient {
  private client: UserServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(UserServiceDefinition, channel);
  }

  async getUser(id: string): Promise<User> {
    try {
      await authClient.refreshToken();
      const response = await this.client.get({ id }, getOptions());
      return response.user!;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.client.delete({ id }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async createUser(
    user: UIUser,
    token: string,
  ): Promise<User | StatusResponse> {
    try {
      const authHeader = {
        metadata: Metadata({
          authorization: `Bearer ${token}`,
        }),
      };

      const { email, firstName, lastName, password } = user;
      const response = await this.client.create(
        {
          email,
          firstName,
          lastName,
          password,
        },
        authHeader,
      );
      return response.user!;
    } catch (err) {
      return StatusResponseFactory.createUserResponse(err, 'grpcClient');
    }
  }

  async updateUser(
    id: string,
    firstName: string,
    lastName: string,
  ): Promise<User | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.update(
        { id, firstName, lastName },
        getOptions(),
      );
      return response.user!;
    } catch (err) {
      return StatusResponseFactory.updateUserResponse(err, 'grpcClient');
    }
  }

  async getBilling(userId: string): Promise<string | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.getBilling({ userId }, getOptions());

      return response.billingId!;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateBilling(
    userId: string,
    billingId: string,
  ): Promise<string | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.updateBilling(
        { userId, billingId },
        getOptions(),
      );
      return response.billingId!;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteBilling(userId: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.deleteBilling({ userId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }
}

export const userClient = new UserClient();
