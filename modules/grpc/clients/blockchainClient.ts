import {
  Blockchain,
  BlockchainServiceClient,
  BlockchainServiceDefinition,
} from '../library/blockjoy/v1/blockchain';

import { authClient, getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class BlockchainClient {
  private client: BlockchainServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(BlockchainServiceDefinition, channel);
  }

  async getBlockchains(): Promise<Blockchain[] | StatusResponse> {
    try {
      await authClient.refreshToken();
      const response = await this.client.list({}, getOptions());
      return response.blockchains;
    } catch (err) {
      return StatusResponseFactory.getBlockchainsResponse(err, 'grpcClient');
    }
  }
}

export const blockchainClient = new BlockchainClient();
