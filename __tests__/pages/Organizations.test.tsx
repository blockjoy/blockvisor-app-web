import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup, fireEvent } from '../renderer';
import { useRouterSpy } from '../utils';
import {
  OrganizationManagement,
  useCreateOrganization,
} from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { apiClient } from '@modules/client';
import { AppLayout } from '@modules/layout';
import { mockedMetricsResponse } from '__tests__/mocks/metrics';
import { useGetBlockchains } from '@modules/node';
import { mockedBlockchainsResponse } from '__tests__/mocks/blockchains';

describe('Organizations page', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations' }),
    );

    vi.mock('@modules/node/hooks/useGetBlockchains');
    vi.mocked(useGetBlockchains).mockReturnValue({
      getBlockchains: vi.fn(),
      loading: false,
      blockchains: mockedBlockchainsResponse,
    });

    vi.mocked(apiClient.getDashboardMetrics).mockImplementationOnce(
      async () => mockedMetricsResponse,
    );

    vi.mocked(apiClient.listNodes).mockImplementationOnce(async () => []);
  });

  afterEach(() => {
    cleanup();
  });

  it('Loading skeleton should be visible when fetching organizations', async () => {
    render(
      <AppLayout pageTitle="Organizations">
        <OrganizationsUIProvider>
          <OrganizationManagement />
        </OrganizationsUIProvider>
        ,
      </AppLayout>,
    );

    expect(screen.getByDataCy('organizationsListTable-skeleton')).toBeTruthy();
  });

  it('Organizations table should be visible when there are organizations', async () => {
    vi.mocked(apiClient.getOrganizations).mockImplementation(
      async () => mockeOrganizationsResponse,
    );

    render(
      <AppLayout pageTitle="Organizations">
        <OrganizationsUIProvider>
          <OrganizationManagement />
        </OrganizationsUIProvider>
        ,
      </AppLayout>,
    );

    await waitFor(() => {
      expect(screen.getByDataCy('organizationsList-table')).toBeTruthy();
    });
  });

  it('Should show error toast when creating fails', async () => {
    vi.mock('@modules/organization/hooks/useCreateOrganization');
    vi.mocked(useCreateOrganization).mockImplementation(
      () => async (name: string, onSuccess: (org: any) => void) => {
        throw new ApplicationError('test', 'error');
      },
    );
    render(
      <OrganizationsUIProvider>
        <OrganizationManagement />
      </OrganizationsUIProvider>,
    );

    fireEvent.click(screen.getByDataCy('organizations-create-button'));

    fireEvent.change(screen.getByDataCy('organization-drawer-add-input'), {
      target: { value: 'some value' },
    });

    fireEvent.click(screen.getByDataCy('organization-drawer-submit-button'));

    await waitFor(() => {
      expect(screen.getByText('error')).toBeTruthy();
    });
  });
});
