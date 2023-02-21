import { expect, describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '../renderer';
import {
  mockedBlockchainsResponse,
  mockedMetricsResponse,
  mockUseIdentityValue,
  routerMockBuilder,
} from '../mocks';
import {
  dashboardMetricsSpy,
  getBlockchainSpy,
  nodeListSpy,
  useRouterSpy,
} from '../utils';
import { NodeList } from '@modules/node';
import { NodeUIProvider } from '@modules/node/ui/NodeUIContext';
import { IIdentityRepository } from '@modules/auth/utils/IdentityRepository';

describe('Node List', () => {
  it('Should display Skeleton loading component', () => {
    window.scrollTo = vi.fn() as any;
    nodeListSpy.mockImplementationOnce(async () => []);
    useRouterSpy.mockImplementation(() => routerMockBuilder());

    render(
      <NodeUIProvider>
        <NodeList />
      </NodeUIProvider>,
    );

    expect(screen.getByDataCy('nodeList-skeleton')).not.be.toBeNull();
  });

  it('Should display empty column when there are no nodes', async () => {
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

    nodeListSpy.mockImplementationOnce(async () => []);
    useRouterSpy.mockImplementationOnce(() => routerMockBuilder());
    getBlockchainSpy.mockImplementationOnce(
      async () => mockedBlockchainsResponse,
    );
    dashboardMetricsSpy.mockImplementationOnce(
      async () => mockedMetricsResponse,
    );

    render(
      <NodeUIProvider>
        <NodeList />
      </NodeUIProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-emptyColumn')).toBeTruthy();
    });
  });
});
