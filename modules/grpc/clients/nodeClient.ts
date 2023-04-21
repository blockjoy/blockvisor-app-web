import {
  Node,
  Node_NodeType,
  Node_NodeProperty,
  CreateNodeRequest,
  ListNodesRequest,
  NodesClient,
  NodesDefinition,
  Node_NodeStatus,
} from '../library/node';

import { getOptions, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

export type UINode = {
  orgId: string;
  blockchainId: string;
  version?: string;
  nodeType: Node_NodeType;
  properties: Node_NodeProperty[];
  network: string;
};

export type UIFilterCriteria = {
  blockchain?: string[];
  node_type?: Node_NodeType[];
  node_status?: Node_NodeStatus[];
};

export type UIPagination = {
  current_page: number;
  items_per_page: number;
};

class NodeClient {
  private client: NodesClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(NodesDefinition, channel);
  }

  async listNodes(
    orgId: string,
    filter_criteria?: UIFilterCriteria,
    pagination?: UIPagination,
  ): Promise<Node[] | StatusResponse> {
    let request: ListNodesRequest = {
      orgId,
      offset: 0,
      limit: 10,
      statuses: filter_criteria?.node_status!,
      nodeTypes: filter_criteria?.node_type!,
      blockchainIds: filter_criteria?.blockchain!,
    };

    try {
      const response = await this.client.list(request, getOptions());
      return response.nodes;
    } catch (err) {
      return StatusResponseFactory.listNodesResponse(err, 'grpcClient');
    }
  }

  async getNode(id: string): Promise<Node | StatusResponse> {
    try {
      const response = await this.client.get({ id }, getOptions());
      return response.node!;
    } catch (err) {
      return StatusResponseFactory.getNodeResponse(err, 'grpcClient');
    }
  }

  async createNode(node: CreateNodeRequest): Promise<Node> {
    try {
      const response = await this.client.create(node, getOptions());
      return response.node!;
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
