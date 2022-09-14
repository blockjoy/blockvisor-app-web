// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
// import { GrpcClient } from './stub_client';
import { GrpcClient } from './grpc_client';

export const apiClient = new GrpcClient('http://157.245.21.140:80');
