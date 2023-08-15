import {
  Node,
  NodeType,
  NodeProperty,
  NodeServiceCreateRequest,
  NodeServiceClient,
  NodeServiceDefinition,
  NodeServiceUpdateConfigRequest,
  NodeServiceListResponse,
} from '../library/blockjoy/v1/node';

import {
  authClient,
  callWithTokenRefresh,
  getOptions,
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
};

export type UIPagination = {
  current_page: number;
  items_per_page: number;
};

class NodeClient {
  private client: NodeServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(NodeServiceDefinition, channel);
  }

  async listNodes(
    orgId: string,
    filter_criteria?: UIFilterCriteria,
    pagination?: UIPagination,
  ): Promise<NodeServiceListResponse> {
    const request = {
      orgId,
      offset: 0,
      limit: 10,
      statuses: filter_criteria?.nodeStatus?.map((f) => +f),
      nodeTypes: filter_criteria?.nodeType?.map((f) => +f),
      blockchainIds: filter_criteria?.blockchain,
    };

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

  async listNodesByHost(orgId: string, hostId: string): Promise<Node[]> {
    const request = {
      orgId,
      hostId,
      offset: 0,
      limit: 10,
    };

    try {
      const response = await callWithTokenRefresh(
        this.client.list.bind(this.client),
        request,
      );
      return response.nodes;
    } catch (err) {
      return handleError(err);
    }
  }

  async getNode(id: string): Promise<Node | StatusResponse> {
    await authClient.refreshToken();
    const response = await callWithTokenRefresh(
      this.client.get.bind(this.client),
      { id },
    );
    return response.node!;
  }

  async createNode(node: NodeServiceCreateRequest): Promise<Node> {
    try {
      await authClient.refreshToken();
      const response = await this.client.create(node, getOptions());
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
}

export const nodeClient = new NodeClient();
