// import { GrpcClient } from '@blockjoy/blockjoy-grpc/dist/stub_client';
import { GrpcClient as StubClient } from './stub_client';
//import { GrpcClient as RealClient } from './grpc_client';

console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);

// export const apiClient =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
//     ? new RealClient('http://157.245.21.140:80')
//     : new StubClient('http://157.245.21.140:80');

export const apiClient = new StubClient('http://157.245.21.140:80');

apiClient.initStorage();
