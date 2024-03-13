import {
  Blockchain,
  BlockchainServiceClient,
  BlockchainServiceDefinition,
} from '../library/blockjoy/v1/blockchain';

import { authClient, getOptions, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';

class BlockchainClient {
  private client: BlockchainServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(BlockchainServiceDefinition, channel);
  }

  async listBlockchains(orgId?: string): Promise<Blockchain[]> {
    const request = {
      orgId,
    };
    console.log('getBlockchainsRequest', request);
    try {
      await authClient.refreshToken();
      const response = await this.client.list(request, getOptions());
      console.log('getBlockchainsResponse', response);
      return response.blockchains;
    } catch (err: any) {
      return handleError(err);
    }
  }
}

export const blockchainClient = new BlockchainClient();
