import {
  Keyfile,
  KeyFileServiceClient,
  KeyFileServiceDefinition,
} from '../library/blockjoy/v1/key_file';

import { authClient, getOptions, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';

class KeyFileClient {
  private client: KeyFileServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(KeyFileServiceDefinition, channel);
  }

  async create(nodeId: string, files: File[]): Promise<void> {
    await authClient.refreshToken();
    try {
      const keyFiles: Keyfile[] = await Promise.all(
        files.map(async (file) => {
          const fileContent = await file.text();
          const encoder = new TextEncoder();
          return {
            name: file.name,
            content: encoder.encode(fileContent),
          };
        }),
      );
      await this.client.create({ nodeId, keyFiles }, getOptions());
    } catch (err) {
      return handleError(err);
    }
  }
}

export const keyFileClient = new KeyFileClient();
