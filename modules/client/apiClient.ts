// import { GrpcClient } from '@blockjoy/blockjoy-grpc/dist/stub_client';
import { GrpcClient } from './grpc_client';

export const apiClient = new GrpcClient(
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL || ''
    : 'https://localhost:8080',
);

if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
  apiClient.initStorage();
}
