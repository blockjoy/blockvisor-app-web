// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
import { GrpcClient } from './stub_client';
import { atom } from 'recoil';
import { Host } from '@modules/app/components/host/Host';

const defaultHost: Host = {
  name: '',
  status: '',
  ip: '',
  location: '',
};

export const appState = atom({
  key: 'appState',
  default: {
    nodesLoading: true,
    nodesSortExpression: 'added',
    nodesSortOrder: 'asc',
    hostsLoading: true,
    hostsSortExpression: 'added',
    hostsSortOrder: 'asc',
    dynamicBreadcrumb: '',
    activeHost: defaultHost,
    grpcClient: new GrpcClient('test'),
  },
});
