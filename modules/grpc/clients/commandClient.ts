import {
  CommandServiceClient,
  CommandServiceDefinition,
} from '../library/blockjoy/v1/command';

import { authClient, getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class CommandClient {
  private client: CommandServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(CommandServiceDefinition, channel);
  }

  async create(
    type: 'startNode' | 'stopNode',
    nodeId: string,
  ): Promise<void | StatusResponse> {
    await authClient.refreshToken();
    const request = { [type]: { nodeId } };
    try {
      await this.client.create(request, getOptions());
    } catch (err) {
      return StatusResponseFactory.getBlockchainsResponse(err, 'grpcClient');
    }
  }
}

export const commandClient = new CommandClient();
