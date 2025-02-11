import {
  Host,
  HostSearch,
  HostServiceClient,
  HostServiceDefinition,
  HostServiceDeleteHostRequest,
  HostServiceGetHostRequest,
  HostServiceListHostsRequest,
  HostServiceListHostsResponse,
  HostServiceListRegionsRequest,
  HostServiceListRegionsResponse,
  HostServiceUpdateHostRequest,
  HostSort,
  HostSortField,
  Region,
  RegionInfo,
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
  orgIds?: string[];
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
  ): Promise<HostServiceListHostsResponse> {
    const request: HostServiceListHostsRequest = {
      orgIds: orgId ? [orgId!] : filter?.orgIds ?? [],
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
        this.client.listHosts.bind(this.client),
        request,
      );
      console.log('listHostsResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async getHost(hostId: string): Promise<Host> {
    const request: HostServiceGetHostRequest = { hostId };
    console.log('getHostRequest', request);
    try {
      const response = await callWithTokenRefresh(
        this.client.getHost.bind(this.client),
        request,
      );
      console.log('getHostResponse', response);
      return response.host!;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateHost(request: HostServiceUpdateHostRequest): Promise<Host> {
    console.log('updateHostRequest', request);
    try {
      const response = await callWithTokenRefresh(
        this.client.updateHost.bind(this.client),
        request,
      );
      console.log('updateHostResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async listRegions(orgId: string, imageId: string): Promise<RegionInfo[]> {
    const request: HostServiceListRegionsRequest = {
      orgId,
      imageId,
    };

    console.log('listRegionsRequest', request);

    try {
      const response: HostServiceListRegionsResponse =
        await callWithTokenRefresh(
          this.client.listRegions.bind(this.client),
          request,
        );
      console.log('listRegionsResponse', response);
      return response.regions;
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteHost(hostId: string): Promise<void> {
    const request: HostServiceDeleteHostRequest = { hostId };
    await callWithTokenRefresh(
      this.client.deleteHost.bind(this.client),
      request,
    );
  }
}

export const hostClient = new HostClient();
