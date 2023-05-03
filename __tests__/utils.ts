import {
  authClient,
  blockchainClient,
  nodeClient,
  organizationClient,
} from '@modules/grpc';
import { vi } from 'vitest';

const loginSpy = vi.spyOn(authClient, 'login');
const getOrganizationsSpy = vi.spyOn(organizationClient, 'getOrganizations');
const nodeListSpy = vi.spyOn(nodeClient, 'listNodes');
const getBlockchainSpy = vi.spyOn(blockchainClient, 'getBlockchains');
const useRouterSpy = vi.spyOn(require('next/router'), 'useRouter');

export {
  loginSpy,
  getBlockchainSpy,
  getOrganizationsSpy,
  useRouterSpy,
  nodeListSpy,
};
