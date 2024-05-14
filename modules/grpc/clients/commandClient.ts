import { createChannel, createClient } from 'nice-grpc-web';
import {
  Command,
  CommandExitCode,
  CommandServiceClient,
  CommandServiceDefinition,
  CommandServiceListRequest,
} from '../library/blockjoy/v1/command';
import { callWithTokenRefresh, handleError } from '../utils/utils';

class CommandClient {
  private client: CommandServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(CommandServiceDefinition, channel);
  }

  async listCommands(
    nodeId?: string,
    hostId?: string,
    exitCode?: CommandExitCode,
  ): Promise<Command[]> {
    try {
      const request: CommandServiceListRequest = {
        nodeId,
        hostId,
        exitCode,
      };

      console.log('listCommandRequest', request);

      const response = await callWithTokenRefresh(
        this.client.list.bind(this.client),
        request,
      );

      console.log('listCommandResponse', response);

      return response.commands;
    } catch (err) {
      return handleError(err);
    }
  }
}

export const commandClient = new CommandClient();
