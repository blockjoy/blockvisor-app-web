import { IIdentityRepository } from '@modules/auth/utils/IdentityRepository';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '../renderer';

import {
  mockedBlockchainsResponse,
  mockUseIdentityValue,
  routerMockBuilder,
} from '../mocks';
import { useRouterSpy } from '../utils';
import { NodeLauncher, useGetBlockchains } from '@modules/node';
import { apiClient } from '@modules/client';

beforeEach(() => {
  window.scrollTo = vi.fn() as any;
  vi.mock('@modules/auth/hooks/useIdentity', () => ({
    useIdentity() {
      return {
        ...mockUseIdentityValue({ isLoggedIn: true }),
      };
    },
  }));

  vi.mock('@modules/auth/hooks/useIdentityRepository', () => ({
    useIdentityRepository(): Partial<IIdentityRepository> {
      return {
        getIdentity: () => ({ defaultOrganization: { id: '12345' } }),
      };
    },
  }));

  vi.mock('@modules/node/hooks/useNodeAdd', () => ({
    useNodeAdd() {
      return {
        createNode: vi.fn(),
      };
    },
  }));

  vi.mock('@modules/client');

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ route: '/launch-node' }),
  );
});

afterEach(() => {
  cleanup();
});

describe('Node Launcher Page', () => {
  it('Node launch error should be visible when there are no blockchains', async () => {
    vi.mocked(apiClient.getBlockchains).mockImplementation(
      async () => undefined,
    );
    vi.mock('@modules/node/hooks/useGetBlockchains');
    vi.mocked(useGetBlockchains).mockReturnValue({
      getBlockchains: vi.fn(),
      loading: false,
      blockchains: [],
    });
    render(<NodeLauncher />);

    await waitFor(() => {
      expect(screen.getByDataCy('nodeLauncher-error')).toBeTruthy();
    });
  });

  it('Should display skeleton when loading', async () => {
    vi.mocked(apiClient.getBlockchains).mockImplementation(async () => []);
    vi.mock('@modules/node/hooks/useGetBlockchains');
    vi.mocked(useGetBlockchains).mockReturnValue({
      getBlockchains: vi.fn(),
      loading: true,
      blockchains: [],
    });
    render(<NodeLauncher />);

    await waitFor(() => {
      expect(screen.getByDataCy('nodeLauncher-loading-skeleton')).toBeTruthy();
    });
  });

  it('Should display Algorand protocol when the response contains a single Algorand', async () => {
    vi.mocked(apiClient.getBlockchains).mockImplementation(
      async () => mockedBlockchainsResponse,
    );

    vi.mock('@modules/node/hooks/useGetBlockchains');
    vi.mocked(useGetBlockchains).mockReturnValue({
      getBlockchains: vi.fn(),
      loading: false,
      blockchains: mockedBlockchainsResponse,
    });

    render(<NodeLauncher />);

    await waitFor(() => {
      expect(screen.getByDataCy('nodeLauncher-protocol-Algorand')).toBeTruthy();
    });
  });
});
