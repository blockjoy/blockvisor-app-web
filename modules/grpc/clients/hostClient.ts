import {
  Host,
  HostSearch,
  HostServiceClient,
  HostServiceDefinition,
  HostServiceListRequest,
  HostServiceListResponse,
  HostSortField,
  HostType,
  Region,
} from '../library/blockjoy/v1/host';
import {
  callWithTokenRefresh,
  createSearch,
  getPaginationOffset,
  handleError,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { NodeType } from '../library/blockjoy/common/v1/node';
import {
  SearchOperator,
  SortOrder,
} from '../library/blockjoy/common/v1/search';

export type HostFilterCriteria = {
  hostStatus?: string[];
  hostMemory?: number[];
  hostCPU?: number[];
  hostSpace?: number[];
  keyword?: string;
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
    const request: HostServiceListRequest = {
      orgId,
      offset: getPaginationOffset(pagination!),
      limit: pagination?.items_per_page!,
      sort: [
        {
          field: HostSortField.HOST_SORT_FIELD_HOST_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
    };

    if (filterCriteria?.keyword) {
      const { keyword } = filterCriteria;
      const search: HostSearch = {
        id: createSearch(keyword),
        ip: createSearch(keyword),
        name: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
      request.search = search;
    }

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
    const request = { id };
    console.log('getHostRequest', request);
    try {
      const response = await callWithTokenRefresh(
        this.client.get.bind(this.client),
        request,
      );
      console.log('getHostResponse', response);
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

    try {
      const response = await callWithTokenRefresh(
        this.client.regions.bind(this.client),
        request,
      );
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
