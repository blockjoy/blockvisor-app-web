// import { GrpcClient } from 'blockjoy-mock-grpc/dist/stub_client';
import { GrpcClient } from './stub_client';
import { atom } from 'recoil';
import { Dashboard } from '@modules/app/components/dashboard/Dashboard';
import { Host } from '@modules/app/components/host/Host';

const defaultDashboard: Dashboard = {
  nodeMetrics: [],
  recentHosts: [],
};

const defaultHost: Host = {
  name: '',
  status: '',
  ip: '',
  location: '',
  details: [],
  nodes: [],
};

export const appState = atom({
  key: 'appState',
  default: {
    dashboard: defaultDashboard,
    dashboardLoading: true,
    grpcClient: new GrpcClient('https://localhost:8080'),
    hosts: [],
    hostsLoading: true,
    hostsSorting: false,
    hostsSortExpression: 'added',
    hostsSortOrder: 'asc',
    host: defaultHost,
    hostLoading: true,
  },
});
