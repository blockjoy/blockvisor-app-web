import { apiClient } from '@modules/client';
import { vi } from 'vitest';

const loginSpy = vi.spyOn(apiClient, 'login');
const getOrganizationsSpy = vi.spyOn(apiClient, 'getOrganizations');
const nodeListSpy = vi.spyOn(apiClient, 'listNodes');
const dashboardMetricsSpy = vi.spyOn(apiClient, 'getDashboardMetrics');
const getBlockchainSpy = vi.spyOn(apiClient, 'getBlockchains');
const useRouterSpy = vi.spyOn(require('next/router'), 'useRouter');

export {
  loginSpy,
  getBlockchainSpy,
  getOrganizationsSpy,
  useRouterSpy,
  nodeListSpy,
  dashboardMetricsSpy,
};
