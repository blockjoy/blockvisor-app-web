// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
import { GrpcClient as StubClient } from './stub_client';
import { GrpcClient as RealClient } from './grpc_client';

export const apiClient =
  process.env.NEXT_PUBLIC_VERCEL_CLIENT_TYPE === 'stub'
    ? new StubClient('http://157.245.21.140:80')
    : new RealClient('http://157.245.21.140:80');
