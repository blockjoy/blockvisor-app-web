// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
import { GrpcClient } from './stub_client';
import { atom } from 'recoil';
import { Host } from '@modules/app/components/host/Host';

const defaultHost: Host = {
  name: '',
  status: '',
  ip: '',
  location: '',
  nodesList: [],
  createdAt: '',
  diskSize: '',
  memSize: '',
  version: '',
};

export const appState = atom({
  key: 'appState',
  default: {
    nodes: [],
    nodesLoading: true,
    nodesSorting: false,
    nodesSortExpression: 'added',
    nodesSortOrder: 'asc',
    hosts: [],
    hostsLoading: true,
    hostsSorting: false,
    hostsSortExpression: 'added',
    hostsSortOrder: 'asc',
    dynamicBreadcrumb: '',
    activeHost: defaultHost,
    grpcClient: new GrpcClient('test'),
  },
});
