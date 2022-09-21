// import { GrpcClient } from '@blockjoy/blockjoy-grpc/dist/stub_client';
import { GrpcClient as StubClient } from './stub_client';
import { GrpcClient as RealClient } from './grpc_client';

export const apiClient =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? new RealClient(process.env.NEXT_PUBLIC_API_URL || '')
    : new StubClient('http://localhost:8080');

// if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
//   apiClient.initStorage();
// }
