import {
  Host,
  HostServiceClient,
  HostServiceDefinition,
  HostServiceListResponse,
} from '../library/blockjoy/v1/host';

import { authClient, callWithTokenRefresh, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse } from '../status_response';

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
  ): Promise<HostServiceListResponse> {
    const request = {
      orgId,
      offset: (pagination?.current_page! - 1) * pagination?.items_per_page!,
      // offset: 0,
      limit: pagination?.items_per_page,
      // statuses: filterCriteria?.hostStatus?.map((f) => +f),
    };

    console.log('listHostsRequest', request);

    try {
      const response = await callWithTokenRefresh(
        this.client.list.bind(this.client),
        request,
      );
      console.log('listHostsResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async getHost(id: string): Promise<Host> {
    try {
      const response = await callWithTokenRefresh(
        this.client.get.bind(this.client),
        { id },
      );
      return response.host!;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteHost(id: string): Promise<void> {
    await callWithTokenRefresh(this.client.delete.bind(this.client), { id });
  }
}

export const hostClient = new HostClient();
