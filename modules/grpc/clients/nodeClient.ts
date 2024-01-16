import {
  Node,
  NodeProperty,
  NodeServiceCreateRequest,
  NodeServiceClient,
  NodeServiceDefinition,
  NodeServiceUpdateConfigRequest,
  NodeServiceListResponse,
  NodeServiceListRequest,
  NodeSearch,
  NodeSort,
  NodeSortField,
  NodeReport,
} from '../library/blockjoy/v1/node';
import { NodeType } from '../library/blockjoy/common/v1/node';
import {
  SearchOperator,
  SortOrder,
} from '../library/blockjoy/common/v1/search';
import {
  authClient,
  callWithTokenRefresh,
  createSearch,
  getIdentity,
  getOptions,
  getPaginationOffset,
  handleError,
} from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

export type UINode = {
  orgId: string;
  blockchainId: string;
  version?: string;
  nodeType: NodeType;
  properties: NodeProperty[];
  network: string;
};

export type UIFilterCriteria = {
  blockchain?: string[];
  nodeType?: string[];
  nodeStatus?: string[];
  keyword?: string;
};

export type UIPagination = {
  current_page: number;
  items_per_page: number;
};

export type CustomNodeReport = NodeReport & { node: Node };

class NodeClient {
  private client: NodeServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(NodeServiceDefinition, channel);
  }

  async listNodes(
    orgId?: string,
    filter_criteria?: UIFilterCriteria,
    pagination?: UIPagination,
    sort?: NodeSort[],
  ): Promise<NodeServiceListResponse> {
    const request: NodeServiceListRequest = {
      orgId,
      offset: getPaginationOffset(pagination!),
      limit: pagination?.items_per_page!,
      statuses: filter_criteria?.nodeStatus?.map((f) => +f)!,
      nodeTypes: filter_criteria?.nodeType?.map((f) => +f)!,
      blockchainIds: filter_criteria?.blockchain!,
      sort: sort || [
        {
          field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
          order: SortOrder.SORT_ORDER_DESCENDING,
        },
      ],
    };

    if (filter_criteria?.keyword) {
      const { keyword } = filter_criteria;
      const search: NodeSearch = {
        id: createSearch(keyword),
        ip: createSearch(keyword),
        name: createSearch(keyword),
        operator: SearchOperator.SEARCH_OPERATOR_OR,
      };
      request.search = search;
    }

    console.log('listNodesRequest', request);

    try {
      const response = await callWithTokenRefresh(
        this.client.list.bind(this.client),
        request,
      );
      console.log('listNodesResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async listNodesByHost(
    orgId: string,
    hostId: string,
    pagination: UIPagination,
  ): Promise<NodeServiceListResponse> {
    const request = {
      orgId,
      hostId,
      offset: getPaginationOffset(pagination!),
      limit: pagination?.items_per_page!,
    };

    console.log('listNodesByHostRequest', request);

    try {
      const response = await callWithTokenRefresh(
        this.client.list.bind(this.client),
        request,
      );
      console.log('listNodesByHostResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }

  async getNode(id: string): Promise<Node> {
    const request = { id };
    console.log('getNodeRequest', request);
    await authClient.refreshToken();
    const response = await callWithTokenRefresh(
      this.client.get.bind(this.client),
      { id },
    );
    console.log('getNodeResponse', response.node);
    return response.node!;
  }

  async createNode(node: NodeServiceCreateRequest): Promise<Node> {
    console.log('createNodeRequest', node);
    try {
      await authClient.refreshToken();
      const response = await this.client.create(node, getOptions());
      console.log('createNodeResponse', response.node);
      return response.node!;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateNode(node: NodeServiceUpdateConfigRequest): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.updateConfig(node, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteNode(nodeId: string): Promise<void | StatusResponse> {
    try {
      await authClient.refreshToken();
      await this.client.delete({ id: nodeId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.deleteNodeResponse(err, 'grpcClient');
    }
  }

  async stopNode(nodeId: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.stop({ id: nodeId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async startNode(nodeId: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.start({ id: nodeId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async reportProblem(nodeId: string, message: string): Promise<void> {
    try {
      const { id: userId } = getIdentity();

      const request = {
        userId,
        nodeId,
        message,
      };

      console.log('reportProblemRequest', request);

      await authClient.refreshToken();

      const response = await this.client.report(
        { userId, nodeId, message },
        getOptions(),
      );

      console.log('reportProblemResponse', response);
    } catch (err) {
      return handleError(err);
    }
  }

  async listNodeProblems(): Promise<CustomNodeReport[]> {
    try {
      await authClient.refreshToken();

      const nodesReponse = await this.client.list(
        {
          limit: 1000,
        },
        getOptions(),
      );

      const { nodes } = nodesReponse;

      const reports = nodes.flatMap((node) =>
        node.reports.map((report) => ({
          ...report,
          node,
        })),
      );

      return reports;
    } catch (err) {
      return handleError(err);
    }
  }
}

export const nodeClient = new NodeClient();
