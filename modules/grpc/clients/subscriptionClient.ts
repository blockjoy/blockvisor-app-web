import { createChannel, createClient } from 'nice-grpc-web';
import { authClient, getOptions, handleError } from '@modules/grpc';
import {
  Subscription,
  SubscriptionServiceClient,
  SubscriptionServiceDefinition,
} from '@modules/grpc/library/blockjoy/v1/subscription';
import { StatusResponse } from '@modules/grpc/status_response';

class SubscriptionClient {
  private client: SubscriptionServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(SubscriptionServiceDefinition, channel);
  }

  async getSubscription(orgId: string): Promise<Subscription | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.get({ orgId }, getOptions());

      return response.subscription!;
    } catch (err) {
      return handleError(err);
    }
  }

  async getSubscriptions(
    userId: string,
  ): Promise<Subscription[] | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.list({ userId }, getOptions());

      return response.subscriptions;
    } catch (err) {
      return handleError(err);
    }
  }

  async createSubscription(
    orgId: string,
    userId: string,
    externalId: string,
  ): Promise<Subscription | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.create(
        { orgId, userId, externalId },
        getOptions(),
      );

      return response.subscription!;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteSubscription(id: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.delete({ id }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }
}

export const subscriptionClient = new SubscriptionClient();
