import { createChannel, createClient } from 'nice-grpc-web';
import {
  ApiKeyServiceClient,
  ApiKeyServiceCreateRequest,
  ApiKeyServiceDefinition,
  ApiKeyServiceDeleteRequest,
} from '../library/blockjoy/v1/api_key';
import { getOptions, handleError } from '../utils/utils';
import { authClient } from './authClient';

class ApiKeyClient {
  private client: ApiKeyServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(ApiKeyServiceDefinition, channel);
  }

  async createApiKey(params: ApiKeyServiceCreateRequest) {
    try {
      await authClient.refreshToken();
      return await this.client.create(params, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async listApiKeys() {
    try {
      await authClient.refreshToken();
      const response = await this.client.list({}, getOptions());
      return response.apiKeys;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteApiKey(params: ApiKeyServiceDeleteRequest) {
    try {
      await authClient.refreshToken();
      await this.client.delete(params, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }
}

export const apiKeyClient = new ApiKeyClient();
