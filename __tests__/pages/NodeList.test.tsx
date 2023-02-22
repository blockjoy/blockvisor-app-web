import { expect, describe, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../renderer';
import {
  mockedBlockchainsResponse,
  mockedMetricsResponse,
  mockedNodesResponse,
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

  useRouterSpy.mockImplementation(() => routerMockBuilder());

  getBlockchainSpy.mockImplementationOnce(
    async () => mockedBlockchainsResponse,
  );
  dashboardMetricsSpy.mockImplementationOnce(async () => mockedMetricsResponse);
});

describe('Node List', () => {
  it('Should display Skeleton loading component', () => {
    nodeListSpy.mockImplementationOnce(async () => []);

    render(
      <NodeUIProvider>
        <NodeList />
      </NodeUIProvider>,
    );
    expect(screen.getByDataCy('nodeList-skeleton')).toBeTruthy();
  });

  it('Should display Empty Column component when there are no nodes', async () => {
    nodeListSpy.mockImplementationOnce(async () => []);

    render(
      <NodeUIProvider>
        <NodeList />
      </NodeUIProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-emptyColumn')).toBeTruthy();
    });
  });

  it('Should display one Ethereum node', async () => {
    nodeListSpy.mockImplementationOnce(async () => mockedNodesResponse);

    render(
      <NodeUIProvider>
        <NodeList />
      </NodeUIProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-Ethereum-Node')).toBeTruthy();
    });
  });
});
