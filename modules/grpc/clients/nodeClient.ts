import {
  Node,
  NodeServiceCreateRequest,
  NodeServiceClient,
  NodeServiceDefinition,
  NodeServiceUpdateConfigRequest,
  NodeServiceListResponse,
  NodeServiceListRequest,
  NodeSearch,
  NodeSort,
  NodeSortField,
  NodeServiceGetRequest,
  NodeServiceDeleteRequest,
} from '../library/blockjoy/v1/node';
import { NodeReport } from '../library/blockjoy/common/v1/node';
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

export type UINode = {
  orgId: string;
  protocolId: string;
  version?: string;
  // nodeType: NodeType;
  // properties: NodeProperty[];
  network: string;
};

export type UINodeFilterCriteria = {
  protocol?: string[];
  nodeType?: string[];
  nodeStatus?: string[];
  keyword?: string;
  orgIds?: string[];
  hostIds?: string[];
  userIds?: string[];
  regions?: string[];
  ips?: string[];
  semanticVersions?: string[];
  networks?: string[];
};

export type UIPagination = {
  currentPage: number;
  itemsPerPage: number;
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
    filter?: UINodeFilterCriteria,
    pagination?: UIPagination,
    sort?: NodeSort[],
  ): Promise<NodeServiceListResponse> {
    const request: NodeServiceListRequest = {
      orgIds: orgId ? [orgId!] : filter?.orgIds!,
      hostIds: filter?.hostIds!,
      ipAddresses: filter?.ips!,
      // TODO: Filter nodes by region and variant
      userIds: filter?.userIds!,
      semanticVersions: filter?.semanticVersions!,
      offset: getPaginationOffset(pagination!),
      limit: pagination?.itemsPerPage!,
      nodeStates: filter?.nodeStatus?.map((f) => +f)!,
      protocolIds: filter?.protocol!,
      nextStates: [],
      versionKeys: [],
      sort: sort || [
        {
          field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
          order: SortOrder.SORT_ORDER_DESCENDING,
        },
      ],
    };

    if (filter?.keyword) {
      const { keyword } = filter;
      const search: NodeSearch = {
        nodeId: createSearch(keyword),
        ip: createSearch(keyword),
        nodeName: createSearch(keyword),
        displayName: createSearch(keyword),
        dnsName: createSearch(keyword),
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
    hostId: string,
    pagination: UIPagination,
    orgId?: string,
  ): Promise<NodeServiceListResponse> {
    const request: NodeServiceListRequest = {
      offset: getPaginationOffset(pagination!),
      limit: pagination?.itemsPerPage!,
      orgIds: orgId ? [orgId!] : [],
      hostIds: [hostId],
      nodeStates: [],
      protocolIds: [],
      userIds: [],
      ipAddresses: [],
      semanticVersions: [],
      nextStates: [],
      versionKeys: [],
      sort: [
        {
          field: NodeSortField.NODE_SORT_FIELD_CREATED_AT,
          order: SortOrder.SORT_ORDER_DESCENDING,
        },
      ],
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

  async getNode(nodeId: string): Promise<Node> {
    const request: NodeServiceGetRequest = { nodeId };
    console.log('getNodeRequest', request);
    await authClient.refreshToken();

    try {
      const response = await callWithTokenRefresh(
        this.client.get.bind(this.client),
        { nodeId },
      );

      console.log('getNodeResponse', response.node);
      return response.node!;
    } catch (err) {
      return handleError(err);
    }
  }

  async createNode(node: NodeServiceCreateRequest): Promise<Node> {
    console.log('createNodeRequest', node);
    try {
      await authClient.refreshToken();
      const response = await this.client.create(node, getOptions());
      console.log('createNodeResponse', response.nodes);
      return response.nodes[0];
    } catch (err) {
      return handleError(err);
    }
  }

  async updateNode(node: NodeServiceUpdateConfigRequest): Promise<void> {
    console.log('updateNodeRequest', node);
    try {
      await authClient.refreshToken();
      await this.client.updateConfig(node, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteNode(nodeId: string): Promise<void> {
    const request: NodeServiceDeleteRequest = { nodeId };
    console.log('deleteNodeRequest', request);
    try {
      await authClient.refreshToken();
      await this.client.delete(request, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async stopNode(nodeId: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.stop({ nodeId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async startNode(nodeId: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.start({ nodeId }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async upgradeNode(nodeIds: string[], imageId: string): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.upgradeImage({ nodeIds, imageId }, getOptions());
    } catch (err) {
      console.log('upgradeNodeError', err);
      return handleError(err);
    }
  }

  async reportProblem(nodeId: string, message: string): Promise<void> {
    try {
      const { nodeId: userId } = getIdentity();

      const request = { userId, nodeId, message };

      console.log('reportProblemRequest', request);

      await authClient.refreshToken();

      const response = await this.client.reportError(
        { nodeId, message },
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

      const response = await this.client.list({ limit: 1000 }, getOptions());

      const { nodes } = response;

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
