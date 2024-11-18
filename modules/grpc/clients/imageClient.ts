import { callWithTokenRefresh, handleError } from '@modules/grpc';
import { createChannel, createClient } from 'nice-grpc-web';
import {
  ImageServiceClient,
  ImageServiceDefinition,
  ImageServiceGetImageRequest,
  ImageServiceGetImageResponse,
} from '../library/blockjoy/v1/image';

class ImageClient {
  private client: ImageServiceClient;

  constructor() {
    const channel = createChannel(process.env.NEXT_PUBLIC_API_URL!);
    this.client = createClient(ImageServiceDefinition, channel);
  }

  async getImage(
    request: ImageServiceGetImageRequest,
  ): Promise<ImageServiceGetImageResponse> {
    console.log('getImageRequest', request);

    try {
      const response = await callWithTokenRefresh(
        this.client.getImage.bind(this.client),
        request,
      );
      console.log('getImageResponse', response);
      return response;
    } catch (err) {
      return handleError(err);
    }
  }
}

export const imageClient = new ImageClient();
