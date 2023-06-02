import {
  Host,
  HostServiceClient,
  HostServiceDefinition,
} from '../library/blockjoy/v1/host';

import { authClient, callWithTokenRefresh, getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

export type UIFilterCriteria = {
  hostStatus?: string[];
};

export type UIPagination = {
  current_page: number;
  items_per_page: number;
};

class HostClient {
  private client: HostServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(HostServiceDefinition, channel);
  }

  async listHosts(
    orgId: string,
    filterCriteria?: UIFilterCriteria,
    pagination?: UIPagination,
  ): Promise<Host[] | StatusResponse> {
    const request = {
      orgId,
      // offset: (pagination?.current_page - 1) * pagination?.items_per_page,
      offset: 0,
      limit: 10,
      // statuses: filterCriteria?.hostStatus?.map((f) => +f),
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
}

export const hostClient = new HostClient();
