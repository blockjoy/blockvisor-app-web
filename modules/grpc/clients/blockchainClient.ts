import {
  Blockchain,
  BlockchainProperty,
  BlockchainServiceAddVersionRequest,
  BlockchainServiceAddVersionResponse,
  BlockchainServiceClient,
  BlockchainServiceDefinition,
  BlockchainServiceGetRequest,
  BlockchainServiceGetResponse,
  BlockchainServiceListImageVersionsRequest,
  BlockchainServiceListImageVersionsResponse,
  BlockchainServiceListRequest,
  BlockchainServiceListResponse,
  BlockchainSortField,
  BlockchainVersion,
} from '../library/blockjoy/v1/blockchain';
import { callWithTokenRefresh, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { NodeType } from '../library/blockjoy/common/v1/node';
import { ImageIdentifier } from '../library/blockjoy/common/v1/image';
import {
  SearchOperator,
  SortOrder,
} from '../library/blockjoy/common/v1/search';

class BlockchainClient {
  private client: BlockchainServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(BlockchainServiceDefinition, channel);
  }

  async listBlockchains(
    orgId?: string,
  ): Promise<BlockchainServiceListResponse> {
    const request: BlockchainServiceListRequest = {
      orgIds: orgId ? [orgId!] : [],
      limit: 1000,
      offset: 0,
      sort: [
        {
          field: BlockchainSortField.BLOCKCHAIN_SORT_FIELD_NAME,
          order: SortOrder.SORT_ORDER_ASCENDING,
        },
      ],
      search: {
        operator: SearchOperator.SEARCH_OPERATOR_OR,
        id: '%%',
        name: '%%',
      },
    };
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
    blockchainId: string,
    nodeType: NodeType,
    properties: BlockchainProperty[],
    version: string,
    description?: string,
  ): Promise<BlockchainVersion> {
    const request: BlockchainServiceAddVersionRequest = {
      blockchainId,
      nodeType,
      properties,
      version,
      description,
    };
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
}

export const blockchainClient = new BlockchainClient();
