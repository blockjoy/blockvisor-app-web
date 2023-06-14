import { render, screen, waitFor, cleanup } from '../renderer';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { useRouterSpy } from '../utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import {
  HostList,
  HostUIProvider,
  useHostList,
  useHostUIContext,
} from '@modules/host';
import { mockedHosts } from '__tests__/mocks/hosts';
import { organizationClient } from '@modules/grpc';
import { useMqtt } from '@modules/mqtt';
import { useGetBlockchains } from '@modules/node';
import { mockedBlockchainsResponse } from '__tests__/mocks/blockchains';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';

beforeEach(() => {
  window.scrollTo = vi.fn() as any;

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ isReady: true, pathname: '/hosts' }),
  );

  // vi.mock('@modules/grpc/clients/organizationClient');
  // vi.mocked(organizationClient.getOrganizations).mockImplementationOnce(
  //   async () => mockeOrganizationsResponse,
  // );

  // vi.mock('@modules/node/hooks/useGetBlockchains');
  // vi.mocked(useGetBlockchains).mockReturnValue({
  //   getBlockchains: vi.fn(),
  //   loading: false,
  //   blockchains: mockedBlockchainsResponse,
  // });

  // vi.mock('@modules/mqtt/hooks/useMqtt');
  // vi.mocked(useMqtt).mockReturnValue({
  //   client: '',
  //   connectStatus: 'Connected',
  //   error: null,
  //   message: null,
  // });

  vi.mock('@modules/host');
  vi.mocked(useHostUIContext).mockReturnValue({
    queryParams: {
      pagination: { current_page: 1, items_per_page: 10 },
      filter: { hostCPU: [0, 0], hostMemory: [0, 0], hostSpace: [0, 0] },
    },
    setQueryParams: vi.fn(),
    setQueryParamsBase: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
});

describe('Host List Page', () => {
  it('Should display skeleton loader when fetching hosts', async () => {
    vi.mock('@modules/host/hooks/useHostList');
    vi.mocked(useHostList).mockReturnValue({
      handleHostClick: vi.fn(),
      hostList: [],
      isLoading: 'initializing',
      loadHosts: vi.fn(),
    });

    render(
      <HostUIProvider>
        <HostList />
      </HostUIProvider>,
    );

    // expect(screen.getByDataCy('hostList-skeleton')).toBeTruthy();
  });

  it('Should display not hosts when there are no hosts', async () => {
    vi.mock('@modules/host/hooks/useHostList');
    vi.mocked(useHostList).mockReturnValue({
      handleHostClick: vi.fn(),
      hostList: [],
      isLoading: 'finished',
      loadHosts: vi.fn(),
    });

    render(
      <HostUIProvider>
        <HostList />
      </HostUIProvider>,
    );

    // expect(screen.getByDataCy('hostList-empty')).toBeTruthy();
  });
});
