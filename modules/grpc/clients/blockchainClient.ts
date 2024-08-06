import {
  Blockchain,
  BlockchainSearch,
  BlockchainServiceAddVersionRequest,
  BlockchainServiceAddVersionResponse,
  BlockchainServiceClient,
  BlockchainServiceDefinition,
  BlockchainServiceGetRequest,
  BlockchainServiceGetResponse,
  BlockchainServiceListRequest,
  BlockchainServiceListResponse,
  BlockchainServicePricingRequest,
  BlockchainServicePricingResponse,
  BlockchainSort,
  BlockchainSortField,
  BlockchainVersion,
} from '../library/blockjoy/v1/blockchain';
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

export type BlockchainPagination = {
  currentPage: number;
  itemsPerPage: number;
};

export type BlockchainFilter = {
  orgIds?: string[];
  keyword?: string;
};

class BlockchainClient {
  private client: BlockchainServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(BlockchainServiceDefinition, channel);
  }

  async listBlockchains(
    orgId?: string,
    filter?: BlockchainFilter,
    pagination?: BlockchainPagination,
    sort?: BlockchainSort[],
  ): Promise<BlockchainServiceListResponse> {
    const request: BlockchainServiceListRequest = {
      orgIds: orgId ? [orgId!] : [],
      offset: getPaginationOffset(pagination!),
      limit: pagination?.itemsPerPage! || 1000,
      sort: sort || [
        {
          field: BlockchainSortField.BLOCKCHAIN_SORT_FIELD_DISPLAY_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
    };

    if (filter?.keyword) {
      const { keyword } = filter;
      const search: BlockchainSearch = {
        id: createSearch(keyword),
        name: createSearch(keyword),
        displayName: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
      request.search = search;
    }

    console.log('listBlockchainsRequest', request);
    try {
      const response: BlockchainServiceListResponse =
        await callWithTokenRefresh(this.client.list.bind(this.client), request);
      console.log('listBlockchainsResponse', response);
      return response;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async getBlockchain(id: string, orgId?: string): Promise<Blockchain> {
    const request: BlockchainServiceGetRequest = {
      id,
      orgId,
    };
    console.log('getBlockchainRequest', request);
    try {
      const response: BlockchainServiceGetResponse = await callWithTokenRefresh(
        this.client.get.bind(this.client),
        request,
      );
      console.log('getBlockchainResponse', response);
      return response.blockchain!;
    } catch (err: any) {
      return handleError(err);
    }
  }

  async addVersion(
    request: BlockchainServiceAddVersionRequest,
  ): Promise<BlockchainVersion> {
    console.log('addVersionRequest', request);
    try {
      const response: BlockchainServiceAddVersionResponse =
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

  async getPricing(
    params: BlockchainServicePricingRequest,
  ): Promise<Amount | null> {
    const request: BlockchainServicePricingRequest = params;
    console.log('getPricingRequest', params);
    try {
      const response: BlockchainServicePricingResponse =
        await callWithTokenRefresh(
          this.client.pricing.bind(this.client),
          request,
        );
      console.log('getPricingResponse', response);
      return response.billingAmount?.amount ?? null;
    } catch (err: any) {
      return handleError(err);
    }
  }
}

export const blockchainClient = new BlockchainClient();
