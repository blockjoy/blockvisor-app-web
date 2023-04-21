import {
  Blockchain,
  BlockchainsClient,
  BlockchainsDefinition,
} from '../library/blockchain';

import { getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class BlockchainClient {
  private client: BlockchainsClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(BlockchainsDefinition, channel);
  }

  async getBlockchains(): Promise<Blockchain[] | StatusResponse> {
    try {
      const response = await this.client.list({}, getOptions());
      return response.blockchains;
    } catch (err) {
      return StatusResponseFactory.getBlockchainsResponse(err, 'grpcClient');
    }
  }
}

export const blockchainClient = new BlockchainClient();
