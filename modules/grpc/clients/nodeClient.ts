import {
  Node,
  NodeType,
  NodeProperty,
  NodeServiceCreateRequest,
  NodeServiceClient,
  NodeServiceDefinition,
  NodeStatus,
  NodeServiceUpdateRequest,
} from '../library/blockjoy/v1/node';

import { authClient, getOptions, handleError } from '@modules/grpc';
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
  node_type?: NodeType[];
  node_status?: NodeStatus[];
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
  ): Promise<Node[] | StatusResponse> {
    let request = {
      orgId,
      offset: 0,
      limit: 10,
      statuses: filter_criteria?.node_status!,
      nodeTypes: filter_criteria?.node_type!,
      blockchainIds: filter_criteria?.blockchain!,
    };

    console.log('listNodes request', request);

    try {
      await authClient.refreshToken();
      const response = await this.client.list(request, getOptions());
      return response.nodes;
    } catch (err) {
      return StatusResponseFactory.listNodesResponse(err, 'grpcClient');
    }
  }

  async getNode(id: string): Promise<Node | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.get({ id }, getOptions());
      return response.node!;
    } catch (err) {
      return StatusResponseFactory.getNodeResponse(err, 'grpcClient');
    }
  }

  async createNode(node: NodeServiceCreateRequest): Promise<Node> {
    try {
      const response = await this.client.create(node, getOptions());
      return response.node!;
    } catch (err) {
      return handleError(err);
    }
  }

  async updateNode(node: NodeServiceUpdateRequest): Promise<void> {
    try {
      await authClient.refreshToken();
      await this.client.update(node, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }

  async deleteNode(nodeId: string): Promise<void | StatusResponse> {
    try {
      await this.client.delete({ id: nodeId }, getOptions());
    } catch (err) {
      return StatusResponseFactory.deleteNodeResponse(err, 'grpcClient');
    }
  }
}

export const nodeClient = new NodeClient();
