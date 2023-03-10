import { expect, describe, it, vi, beforeEach, afterEach, test } from 'vitest';
import { fireEvent, render, screen, waitFor, cleanup } from '../renderer';
import {
  dashboardMetricsSpy,
  getBlockchainSpy,
  nodeListSpy,
  useRouterSpy,
} from '../utils';
import { NodeList } from '@modules/node';
import { NodeUIProvider } from '@modules/node/ui/NodeUIContext';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockedNodesResponse } from '__tests__/mocks/nodes';
import { mockedBlockchainsResponse } from '__tests__/mocks/blockchains';
import { mockedMetricsResponse } from '__tests__/mocks/metrics';

beforeEach(() => {
  window.scrollTo = vi.fn() as any;

  useRouterSpy.mockImplementation(() => routerMockBuilder());

  getBlockchainSpy.mockImplementationOnce(
    async () => mockedBlockchainsResponse,
  );
  dashboardMetricsSpy.mockImplementationOnce(async () => mockedMetricsResponse);
});

afterEach(() => {
  cleanup();
});

describe('Node List Page', () => {
  test('Skeleton loading', () => {
    it('Should be visible when fetching nodes', () => {
      nodeListSpy.mockImplementationOnce(async () => []);

      render(
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>,
      );
      expect(screen.getByDataCy('nodeList-skeleton')).toBeTruthy();
    });
  });

  test('Node List Empty colmn', () => {
    it('Should be visible when there are no nodes', async () => {
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
  });

  test('Node list', () => {
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

  test('Node List', () => {
    it('Should display grid view by default', async () => {
      nodeListSpy.mockImplementationOnce(async () => mockedNodesResponse);

      render(
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>,
      );

      await waitFor(() => {
        expect(screen.getByDataCy('nodeList-gridView')).toBeTruthy();
      });
    });
  });

  test('Node List', () => {
    it('Should switch to table view when clicked on list view button', async () => {
      nodeListSpy.mockImplementationOnce(async () => mockedNodesResponse);

      render(
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>,
      );

      fireEvent.click(screen.getByDataCy('nodeList-tableView-button'));

      await waitFor(() => {
        expect(screen.getByDataCy('nodeList-tableView')).toBeTruthy();
      });
    });
  });
});
