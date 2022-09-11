// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
import { GrpcClient } from './stub_client';
import { atom } from 'recoil';
import { Host } from '@modules/app/components/host/Host';
import {
  Dashboard,
  NodeMetric,
} from '@modules/app/components/dashboard/Dashboard';

const defaultHost: Host = {
  name: '',
  status: '',
  ip: '',
  location: '',
  nodesList: [],
  created_at_datetime: '',
  diskSize: '',
  memSize: '',
  version: '',
};

const defaultDashboard: Dashboard = {
  nodeMetrics: [],
};

export const appState = atom({
  key: 'appState',
  default: {
    dashboard: defaultDashboard,
    dashboardLoading: true,
    grpcClient: new GrpcClient('https://localhost:8080'),
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
    activeHost: defaultHost,
  },
});
