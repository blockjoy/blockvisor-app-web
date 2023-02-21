import { UseIdentity } from '@modules/auth';
import { NextRouter } from 'next/router';
import { vi } from 'vitest';

const mockedMetricsResponse = [
  { name: 3, value: '3' },
  { name: 4, value: '0' },
];

const mockedNodesResponse = [
  {
    address: '-',
    blockHeight: 0,
    blockchainId: 'b766f36a-4bdb-42a1-8cc1-edcfb343eb45',
    blockchainName: 'Ethereum',
    createdAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    groupsList: [''],
    created_at_datetime: new Date(),
    hostId: '796aeb8f-1d92-447d-a27e-b9da33cd65a2',
    hostName: '192-69-220-2.slc.cloud.blockjoy.com',
    id: '5303423e-557b-4088-b24f-5835bd1b4889',
    ip: '192.69.220.6',
    ipGateway: '192.69.220.1',
    name: 'enormously_organic_magpie',
    network: 'goerli',
    nodeData: '',
    orgId: 'ed0fa3a5-bac8-4d71-aca4-63d0afd1189c',
    selfUpdate: false,
    stakingStatus: 0,
    status: 0,
    syncStatus: 0,
    type: '',
    updated_at_datetime: new Date(),
    updatedAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    version: '3.4.0-build.1',
    walletAddress: '-',
  },
];
const mockedGetOrganizationsResponse = [
  {
    createdAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    currentUser: {
      orgId: 'ed0fa3a5-bac8-4d71-aca4-63d0afd1189c',
      role: 2,
      userId: 'f05f3a1e-22ff-47e6-92c6-de537bac0a0f',
    },

    id: 'ed0fa3a5-bac8-4d71-aca4-63d0afd1189c',
    memberCount: 4,
    name: 'danixa5510@unicsite.com',
    personal: true,
    updatedAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
  },
];

const mockedRouter: NextRouter = {
  route: '/',
  pathname: '',
  query: { redirect: '' },
  asPath: '',
  push: vi.fn(),
  basePath: '',
  isLocaleDomain: false,
  replace: vi.fn(() => Promise.resolve(true)),
  back: vi.fn(),
  reload: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isReady: false,
  isPreview: false,
  beforePopState: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(() => Promise.resolve()),
};

const routerMockBuilder = (overrides?: Partial<NextRouter>) => {
  return { ...mockedRouter, ...overrides };
};

const mockedBlockchainsResponse = [
  {
    createdAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    supportedNodesTypes: '',
    created_at_datetime: new Date(),
    description: '',
    id: 'd1af76a2-57d9-43d7-a1fa-fa0af079bd4c',
    name: 'Algorand',
    networksList: [
      {
        name: 'testnet',
        netType: 0,
        url: '',
      },
    ],
    projectUrl: '',
    repoUrl: '',
    status: 3,
    supported_node_types: [
      {
        id: 10,
        properties: [
          {
            default: 'false',
            disabled: true,
            name: 'self-hosted',
            required: true,
            ui_type: 'switch',
          },
        ],
        version: '3.14.2',
      },
    ],
    updatedAt: {
      nanos: 240922000,
      seconds: 1673558135,
    },
    updated_at_datetime: new Date(),
    supportsBroadcast: true,
    supportsEtl: true,
    supportsNode: true,
    supportsStaking: true,
    version: '',
  },
];

const mockJWT =
  'ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SnBaQ0k2SW1Zd05XWXpZVEZsTFRJeVptWXRORGRsTmkwNU1tTTJMV1JsTlRNM1ltRmpNR0V3WmlJc0ltVjRjQ0k2TVRZM05qVTFOVGMwTWl3aWRHOXJaVzVmZEhsd1pTSTZJblZ6WlhKZllYVjBhQ0lzSW5KdmJHVWlPaUoxYzJWeUlpd2laR0YwWVNJNmV5SmxiV0ZwYkNJNkluUm9iMjFoYzBCaWJHOWphMnB2ZVM1amIyMGlMQ0p2Y21kZmFXUWlPaUpsWkRCbVlUTmhOUzFpWVdNNExUUmtOekV0WVdOaE5DMDJNMlF3WVdaa01URTRPV01pTENKdmNtZGZjbTlzWlNJNkltOTNibVZ5SW4xOS50ck9JZ2JEblRqNWlmLVIyNGsxeVJaUEJtWlJHWDVEdzZBSXZTcEtyQ00tTTdPUmhhRmdPY0gyMzctVUxoSTdCVmVSTHVTTjJKc0EtZ3NNR1I2YWlIQQ';

const mockUseIdentityValue = (overrides?: Partial<UseIdentity>) => {
  const base: UseIdentity = {
    isLoggedIn: false,
    isVerified: false,
    isLoading: false,
    isDone: false,
    state: '',
    user: {
      id: '12345',
      firstName: 'Michael',
      lastName: 'Jackson',
      email: 'michael@gmail.com',
      defaultOrganization: {
        name: 'Some Org',
        id: '1234566778',
      },
    },
  };
  return { ...base, ...overrides };
};

export {
  mockedBlockchainsResponse,
  mockedGetOrganizationsResponse,
  mockJWT,
  mockedRouter,
  mockedMetricsResponse,
  mockedNodesResponse,
  routerMockBuilder,
  mockUseIdentityValue,
};
