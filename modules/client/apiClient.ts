import { GrpcClient } from './grpc_client';

export const apiClient = new GrpcClient(
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL || ''
    : 'http://localhost:9090',
);
