import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup, fireEvent } from '../renderer';
import { useRouterSpy } from '../utils';
import { NodeList, useGetBlockchains } from '@modules/node';
import { NodeUIProvider } from '@modules/node/ui/NodeUIContext';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockedNodesResponse } from '__tests__/mocks/nodes';
import { mockedBlockchainsResponse } from '__tests__/mocks/blockchains';
import { AppLayout } from '@modules/layout';

import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { nodeClient, organizationClient } from '@modules/grpc';
import { useMqtt } from '@modules/mqtt';

beforeEach(() => {
  window.scrollTo = vi.fn() as any;

  useRouterSpy.mockImplementation(() =>
    routerMockBuilder({ isReady: true, pathname: '/nodes' }),
  );

  vi.mock('@modules/grpc/blockchainClient');

  vi.mocked(organizationClient.getOrganizations).mockImplementationOnce(
    async () => mockeOrganizationsResponse,
  );

  vi.mock('@modules/node/hooks/useGetBlockchains');
  vi.mocked(useGetBlockchains).mockReturnValue({
    getBlockchains: vi.fn(),
    loading: false,
    blockchains: mockedBlockchainsResponse,
  });

  vi.mock('@modules/mqtt/hooks/useMqtt');
  vi.mocked(useMqtt).mockReturnValue({
    client: '',
    connectStatus: 'Connected',
    error: null,
    message: null,
  });
});

afterEach(() => {
  cleanup();
});

describe('Node List Page', () => {
  it('Should display skeleton loader when fetching nodes', () => {
    render(
      <NodeUIProvider>
        <NodeList />
      </NodeUIProvider>,
    );
    expect(screen.getByDataCy('nodeList-skeleton')).toBeTruthy();
  });

  it('Should display empty column when there are no nodes', async () => {
    vi.mocked(nodeClient.listNodes).mockImplementationOnce(async () => []);
    render(
      <AppLayout pageTitle="Nodes">
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>
      </AppLayout>,
    );
    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-emptyColumn')).toBeTruthy();
    });
  });

  it('Should display one Ethereum node', async () => {
    vi.mocked(nodeClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );
    render(
      <AppLayout pageTitle="Nodes">
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>
      </AppLayout>,
    );
    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-Ethereum-Validator')).toBeTruthy();
    });
  });

  it('Should display grid view by default', async () => {
    vi.mocked(nodeClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );
    render(
      <AppLayout pageTitle="Nodes">
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>
      </AppLayout>,
    );
    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-gridView')).toBeTruthy();
    });
  });

  //Skipped for now because the total nodes count was removed
  it.skip('Should display total 3 nodes', async () => {
    vi.mocked(nodeClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );
    render(
      <AppLayout pageTitle="Nodes">
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>
      </AppLayout>,
    );

    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-header').textContent).toEqual('3');
    });
  });

  it('Should switch to table view when clicked on list view button', async () => {
    vi.mocked(nodeClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );
    render(
      <AppLayout pageTitle="Nodes">
        <NodeUIProvider>
          <NodeList />
        </NodeUIProvider>
      </AppLayout>,
    );
    fireEvent.click(screen.getByDataCy('nodeList-tableView-button'));
    await waitFor(() => {
      expect(screen.getByDataCy('nodeList-tableView')).toBeTruthy();
    });
  });
});
