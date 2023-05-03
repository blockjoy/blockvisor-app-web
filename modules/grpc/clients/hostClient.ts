import {
  HostServiceClient,
  HostServiceDefinition,
} from '../library/blockjoy/v1/host';

import { getOptions } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import { StatusResponse, StatusResponseFactory } from '../status_response';

class HostClient {
  private client: HostServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(HostServiceDefinition, channel);
  }

  async provision(): Promise<void | StatusResponse> {
    try {
      await this.client.provision({}, getOptions());
    } catch (err) {
      return StatusResponseFactory.inviteOrgMember(err, 'grpcClient');
    }
  }
}

export const hostClient = new HostClient();
