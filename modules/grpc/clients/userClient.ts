import {
  User,
  UserServiceClient,
  UserServiceDefinition,
  UserServiceListRequest,
  UserServiceListResponse,
  UserServiceUpdateRequest,
  UserSort,
  UserSortField,
} from '../library/blockjoy/v1/user';
import {
  createSearch,
  getOptions,
  getPaginationOffset,
  handleError,
  UIPagination,
} from '@modules/grpc';
import { createChannel, createClient, Metadata } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';
import { authClient } from '@modules/grpc';
import {
  SearchOperator,
  SortOrder,
} from '../library/blockjoy/common/v1/search';

export type UIUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

class UserClient {
  private client: UserServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(UserServiceDefinition, channel);
  }

  async getUser(userId: string): Promise<User> {
    try {
      console.log('getUserRequest', { userId });
      await authClient.refreshToken();
      const response = await this.client.get({ userId }, getOptions());
      console.log('getUserResponse', response);
      return response.user!;
    } catch (err) {
      return handleError(err);
    }
  }

  async listUsers(
    keyword?: string,
    pagination?: UIPagination,
    sort?: UserSort[],
  ): Promise<UserServiceListResponse> {
    const request: UserServiceListRequest = {
      userIds: [],
      orgIds: [],
      offset: getPaginationOffset(pagination),
      limit: pagination?.itemsPerPage! ?? 100000,
      sort: sort || [
        {
          field: UserSortField.USER_SORT_FIELD_FIRST_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
    };

    if (keyword) {
      request.search = {
        name: createSearch(keyword),
        email: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
    }

    console.log('listUsersRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.list(request, getOptions());
      console.log('listUsersResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.client.delete({ userId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async createUser(
    user: UIUser,
    token?: string,
  ): Promise<User | StatusResponse> {
    try {
      const authHeader: any = {};

      if (token) {
        authHeader.metadata = Metadata({
          authorization: `Bearer ${token}`,
        });
      }

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

  async updateUser(request: UserServiceUpdateRequest): Promise<User> {
    try {
      await authClient.refreshToken();
      const response = await this.client.update(request, getOptions());

      return response.user!;
    } catch (err) {
      return handleError(err);
    }
  }

  async getSettings(userId: string): Promise<Record<string, string>> {
    try {
      await authClient.refreshToken();
      const response = await this.client.getSettings({ userId }, getOptions());

      const decoder = new TextDecoder();
      let settings = Object.fromEntries(
        Object.entries(response.settings).map(([key, value]) => [
          key,
          decoder.decode(value),
        ]),
      );

      return settings;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateSettings(
    userId: string,
    key: string,
    value: string,
  ): Promise<Record<string, string>> {
    try {
      await authClient.refreshToken();

      const encoder = new TextEncoder();
      const encodedValue = encoder.encode(value);

      const response = await this.client.updateSettings(
        { userId, key, value: encodedValue },
        getOptions(),
      );

      const decoder = new TextDecoder();
      const decodedValue = decoder.decode(response.value);

      return { [key]: decodedValue };
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteSettings(userId: string, key: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.deleteSettings({ userId, key }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  // async getBilling(userId: string): Promise<string | StatusResponse> {
  //   try {
  //     await authClient.refreshToken();
  //     const response = await this.client.getBilling({ userId }, getOptions());

  //     return response.billingId!;
  //   } catch (err) {
  //     return handleError(err);
  //   }
  // }

  // async updateBilling(
  //   userId: string,
  //   billingId: string,
  // ): Promise<string | StatusResponse> {
  //   try {
  //     await authClient.refreshToken();
  //     const response = await this.client.updateBilling(
  //       { userId, billingId },
  //       getOptions(),
  //     );
  //     return response.billingId!;
  //   } catch (err) {
  //     return handleError(err);
  //   }
  // }

  // async deleteBilling(userId: string): Promise<void> {
  //   try {
  //     await authClient.refreshToken();
  //     await this.client.deleteBilling({ userId }, getOptions());
  //   } catch (err) {
  //     return handleError(err);
  //   }
  // }
}

export const userClient = new UserClient();
