import {
  Protocol,
  ProtocolSearch,
  ProtocolServiceAddVersionRequest,
  ProtocolServiceAddVersionResponse,
  ProtocolServiceClient,
  ProtocolServiceDefinition,
  ProtocolServiceGetProtocolRequest,
  ProtocolServiceGetProtocolResponse,
  ProtocolServiceListProtocolsRequest,
  ProtocolServiceListProtocolsResponse,
  ProtocolServiceGetPricingRequest,
  ProtocolServiceGetPricingResponse,
  ProtocolSort,
  ProtocolSortField,
  ProtocolVersion,
  ProtocolServiceListVariantsRequest,
  ProtocolServiceListVariantsResponse,
} from '../library/blockjoy/v1/protocol';
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
import { Amount } from '../library/blockjoy/common/v1/currency';

export type ProtocolPagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type ProtocolFilter = {
  orgIds?: string[];
  keyword?: string;
};

class ProtocolClient {
  private client: ProtocolServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(ProtocolServiceDefinition, channel);
  }

  async listProtocols(
    orgId?: string,
    filter?: ProtocolFilter,
    pagination?: ProtocolPagination,
    sort?: ProtocolSort[],
  ): Promise<ProtocolServiceListProtocolsResponse> {
    this.client.listVersions;
    const request: ProtocolServiceListProtocolsRequest = {
      orgIds: orgId ? [orgId!] : [],
      offset: getPaginationOffset(pagination!),
      limit: pagination?.itemsPerPage! || 1000,
      sort: sort || [
        {
          field: ProtocolSortField.PROTOCOL_SORT_FIELD_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
    };

    if (filter?.keyword) {
      const { keyword } = filter;
      const search: ProtocolSearch = {
        protocolId: createSearch(keyword),
        name: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
      request.search = search;
    }

    console.log('listProtocolsRequest', request);
    try {
      const response: ProtocolServiceListProtocolsResponse =
        await callWithTokenRefresh(
          this.client.listProtocols.bind(this.client),
          request,
        );
      console.log('listProtocolsResponse', response);
      return response;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async getProtocol(protocolId: string, orgId?: string): Promise<Protocol> {
    const request: ProtocolServiceGetProtocolRequest = {
      protocolId,
      orgId,
    };
    console.log('getProtocolRequest', request);
    try {
      const response: ProtocolServiceGetProtocolResponse =
        await callWithTokenRefresh(
          this.client.getProtocol.bind(this.client),
          request,
        );
      console.log('getProtocolResponse', response);
      return response.protocol!;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async addVersion(
    request: ProtocolServiceAddVersionRequest,
  ): Promise<ProtocolVersion> {
    console.log('addVersionRequest', request);
    try {
      const response: ProtocolServiceAddVersionResponse =
        await callWithTokenRefresh(
          this.client.addVersion.bind(this.client),
          request,
        );
      console.log('addVersionResponse', response);
      return response.version!;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async listVariants(
    request: ProtocolServiceListVariantsRequest,
  ): Promise<string[]> {
    console.log('listVariantsRequest', request);
    try {
      const response: ProtocolServiceListVariantsResponse =
        await callWithTokenRefresh(
          this.client.listVariants.bind(this.client),
          request,
        );
      console.log('listVariantsResponse', response);
      return response.variantKeys;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async getPricing(
    request: ProtocolServiceGetPricingRequest,
  ): Promise<Amount | null> {
    console.log('getPricingRequest', request);
    try {
      const response: ProtocolServiceGetPricingResponse =
        await callWithTokenRefresh(
          this.client.getPricing.bind(this.client),
          request,
        );
      console.log('getPricingResponse', response);
      return response.billingAmount?.amount ?? null;
    } catch (err: any) {
      return handleError(err);
    }
  }
}

export const protocolClient = new ProtocolClient();
