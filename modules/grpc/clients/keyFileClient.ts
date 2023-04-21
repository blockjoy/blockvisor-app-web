import {
  Keyfile,
  KeyFilesClient,
  KeyFilesDefinition,
} from '../library/key_file';

import { getOptions, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';

class KeyFileClient {
  private client: KeyFilesClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(KeyFilesDefinition, channel);
  }

  async create(nodeId: string, files: File[]): Promise<void> {
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
