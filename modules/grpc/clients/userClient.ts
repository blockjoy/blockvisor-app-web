import {
  User,
  UserServiceClient,
  UserServiceDefinition,
} from '../library/blockjoy/v1/user';
import { getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

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

  async getUser(): Promise<User | StatusResponse> {
    try {
      const response = await this.client.get({}, getOptions());
      return response.user!;
    } catch (err) {
      return StatusResponseFactory.getUserResponse(err, 'grpcClient');
    }
  }

  async createUser(user: UIUser): Promise<User | StatusResponse> {
    const { email, firstName, lastName, password, passwordConfirmation } = user;
    try {
      const response = await this.client.create({
        email,
        firstName,
        lastName,
        password,
      });
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
      const response = await this.client.update(
        { id, firstName, lastName },
        getOptions(),
      );

      return response.user!;
    } catch (err) {
      return StatusResponseFactory.updateUserResponse(err, 'grpcClient');
    }
  }
}

export const userClient = new UserClient();
