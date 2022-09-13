// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
import { GrpcClient } from './stub_client';

export const apiClient = new GrpcClient('https://localhost:8080');
