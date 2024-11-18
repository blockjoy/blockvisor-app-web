import {
  Host,
  HostSearch,
  HostServiceClient,
  HostServiceDefinition,
  HostServiceDeleteRequest,
  HostServiceGetRequest,
  HostServiceListRequest,
  HostServiceListResponse,
  HostServiceRegionsRequest,
  HostServiceUpdateRequest,
  HostSort,
  HostSortField,
  // HostType,
  Region,
} from '../library/blockjoy/v1/host';
import {
  callWithTokenRefresh,
  createSearch,
  getPaginationOffset,
  handleError,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import {
  SearchOperator,
  SortOrder,
} from '../library/blockjoy/common/v1/search';

export type UIHostFilterCriteria = {
  hostStatus?: string[];
  hostMemory?: [number, number];
  hostCPU?: [number, number];
  hostSpace?: [number, number];
  keyword?: string;
};

export type HostPagination = {
  currentPage: number;
  itemsPerPage: number;
};

class HostClient {
  private client: HostServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(HostServiceDefinition, channel);
  }

  async listHosts(
    orgId?: string,
    filter?: UIHostFilterCriteria,
    pagination?: HostPagination,
    sort?: HostSort[],
  ): Promise<HostServiceListResponse> {
    const request: HostServiceListRequest = {
      orgIds: orgId ? [orgId!] : [],
      bvVersions: [],
      offset: getPaginationOffset(pagination!),
      limit: pagination?.itemsPerPage!,
      sort: sort || [
        {
          field: HostSortField.HOST_SORT_FIELD_DISPLAY_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
    };

    if (filter?.keyword) {
      const { keyword } = filter;
      const search: HostSearch = {
        hostId: createSearch(keyword),
        ip: createSearch(keyword),
        displayName: createSearch(keyword),
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

  async getHost(hostId: string): Promise<Host> {
    const request: HostServiceGetRequest = { hostId };
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

  async updateHost(request: HostServiceUpdateRequest): Promise<Host> {
    console.log('updateHostRequest', request);
    try {
      const response = await callWithTokenRefresh(
        this.client.update.bind(this.client),
        request,
      );
      console.log('updateHostResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async listRegions(
    orgId: string,
    imageId: string,
    // blockchainId: string,
    // nodeType: NodeType,
    // version: string,
  ): Promise<Region[]> {
    const request: HostServiceRegionsRequest = {
      // blockchainId,
      // nodeType,
      // version,
      orgId,
      imageId,
      // hostType: HostType.HOST_TYPE_CLOUD,
    };

    console.log('listRegionsRequest', request);

    try {
      const response = await callWithTokenRefresh(
        this.client.regions.bind(this.client),
        request,
      );
      console.log('listRegionsResponse', response);
      return response.regions!;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteHost(hostId: string): Promise<void> {
    const request: HostServiceDeleteRequest = { hostId };
    await callWithTokenRefresh(this.client.delete.bind(this.client), request);
  }
}

export const hostClient = new HostClient();
