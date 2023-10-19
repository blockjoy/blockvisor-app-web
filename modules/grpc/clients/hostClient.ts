import {
  Host,
  HostServiceClient,
  HostServiceDefinition,
  HostServiceListResponse,
  HostType,
  Region,
} from '../library/blockjoy/v1/host';

import {
  callWithTokenRefresh,
  getPaginationOffset,
  handleError,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { NodeType } from '../library/blockjoy/v1/node';

export type HostFilterCriteria = {
  hostStatus?: string[];
};

export type HostPagination = {
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
    orgId?: string,
    filterCriteria?: HostFilterCriteria,
    pagination?: HostPagination,
  ): Promise<HostServiceListResponse> {
    const request = {
      orgId,
      offset: getPaginationOffset(pagination),
      // offset: 0,
      limit: pagination?.items_per_page || 1,
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

  async getRegions(
    orgId: string,
    blockchainId: string,
    nodeType: NodeType,
    version: string,
  ): Promise<Region[]> {
    const request = {
      blockchainId,
      nodeType,
      version,
      orgId,
      hostType: HostType.HOST_TYPE_CLOUD,
    };

    console.log('getRegionsRequest', request);

    try {
      const response = await callWithTokenRefresh(
        this.client.regions.bind(this.client),
        request,
      );
      console.log('getRegionsResponse', response);
      return response.regions!;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteHost(id: string): Promise<void> {
    await callWithTokenRefresh(this.client.delete.bind(this.client), { id });
  }
}

export const hostClient = new HostClient();
