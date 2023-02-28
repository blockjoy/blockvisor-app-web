import { IIdentityRepository } from '@modules/auth/utils/IdentityRepository';
import { expect, describe, it, vi, beforeEach, afterEach, test } from 'vitest';
import { render, screen, waitFor, cleanup } from '../renderer';

import {
  mockedBlockchainsResponse,
  mockUseIdentityValue,
  routerMockBuilder,
} from '../mocks';
import { useRouterSpy } from '../utils';
import { NodeLauncher } from '@modules/node';
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

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ route: '/launch-node' }),
  );
});

afterEach(() => {
  cleanup();
});

describe('Node Launcher Page', () => {
  test('Node Launcher error', () => {
    it('Should be visible no blockchains', async () => {
      vi.mock('@modules/node/hooks/useGetBlockchains', () => ({
        useGetBlockchains() {
          return {
            getBlockchains: vi.fn(),
            loading: false,
            blockchains: [],
          };
        },
      }));
      render(<NodeLauncher />);

      await waitFor(() => {
        expect(screen.getByDataCy('nodeLauncher-error')).toBeTruthy();
      });
    });
  });

  test('Node Launcher error', () => {
    it('Should not be visible when there are blockchains', async () => {
      vi.mock('@modules/node/hooks/useGetBlockchains', () => ({
        useGetBlockchains() {
          return {
            getBlockchains: vi.fn(),
            loading: false,
            blockchains: mockedBlockchainsResponse,
          };
        },
      }));
      render(<NodeLauncher />);

      await waitFor(() => {
        expect(screen.getByDataCy('nodeLauncher-error')).toBeFalsy();
      });
    });
  });

  test('Node Launcher skeleton loading', () => {
    it('Should display skeleton when loading', async () => {
      vi.mock('@modules/node/hooks/useGetBlockchains', () => ({
        useGetBlockchains() {
          return {
            getBlockchains: vi.fn(),
            loading: true,
            blockchains: [],
          };
        },
      }));
      render(<NodeLauncher />);

      await waitFor(() => {
        expect(
          screen.getByDataCy('nodeLauncher-loading-skeleton'),
        ).toBeTruthy();
      });
    });
  });

  test('NodeLauncher blockchain selector', () => {
    it('Should display Algorand protocol', async () => {
      vi.mock('@modules/client');
      vi.mocked(apiClient.getBlockchains).mockImplementation(
        async () => mockedBlockchainsResponse,
      );

      vi.mock('@modules/node/hooks/useGetBlockchains', () => ({
        useGetBlockchains() {
          return {
            getBlockchains: vi.fn(),
            loading: false,
            blockchains: mockedBlockchainsResponse,
          };
        },
      }));
      render(<NodeLauncher />);

      await waitFor(() => {
        expect(
          screen.getByDataCy('nodeLauncher-protocol-Algorand'),
        ).toBeTruthy();
      });
    });
  });
});
