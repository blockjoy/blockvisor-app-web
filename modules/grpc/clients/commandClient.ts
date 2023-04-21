import {
  CommandsClient,
  CommandsDefinition,
  CreateCommandRequest,
} from '../library/command';

import { getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class CommandClient {
  private client: CommandsClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(CommandsDefinition, channel);
  }

  async create(
    type: 'startNode' | 'stopNode',
    nodeId: string,
  ): Promise<void | StatusResponse> {
    const request = { [type]: { nodeId } };
    try {
      await this.client.create(request, getOptions());
    } catch (err) {
      return StatusResponseFactory.getBlockchainsResponse(err, 'grpcClient');
    }
  }
}

export const commandClient = new CommandClient();
