import {
  Host,
  HostServiceClient,
  HostServiceDefinition,
} from '../library/blockjoy/v1/host';

import { authClient, callWithTokenRefresh, getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class HostClient {
  private client: HostServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(HostServiceDefinition, channel);
  }

  async listHosts(orgId: string): Promise<Host[] | StatusResponse> {
    const request = {
      orgId,
      offset: 0,
      limit: 10,
    };

    const response = await callWithTokenRefresh(
      this.client.list.bind(this.client),
      request,
    );

    return response.hosts;
  }

  async getHost(id: string): Promise<Host | StatusResponse> {
    await authClient.refreshToken();
    const response = await callWithTokenRefresh(
      this.client.get.bind(this.client),
      { id },
    );
    return response.host!;
  }

  async provision(): Promise<void | StatusResponse> {
    const response = await callWithTokenRefresh(
      this.client.provision.bind(this.client),
      {},
    );
    return response;
  }
}

export const hostClient = new HostClient();
