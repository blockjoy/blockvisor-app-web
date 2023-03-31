import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup, fireEvent } from '../renderer';
import { useRouterSpy } from '../utils';
import {
  OrganizationManagement,
  useCreateOrganization,
  useGetOrganizations,
} from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';

describe('Organizations page', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;
    vi.mock('@modules/organization/hooks/useGetOrganizations');

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations' }),
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Loading skeleton should be visible when fetching organizations', async () => {
    vi.mocked(useGetOrganizations).mockReturnValue({
      isLoading: 'initializing',
      getOrganizations: vi.fn(),
      setIsLoading: vi.fn(),
      organizations: [],
      total: 0,
      removeFromOrganizations: vi.fn(),
      addToOrganizations: vi.fn(),
    });

    render(
      <OrganizationsUIProvider>
        <OrganizationManagement />
      </OrganizationsUIProvider>,
    );

    expect(screen.getByDataCy('organizationsListTable-skeleton')).toBeTruthy();
  });

  it('Organizations table should be visible when there are organizations', async () => {
    vi.mock('@modules/organization/hooks/useGetOrganizations');
    vi.mocked(useGetOrganizations).mockReturnValue({
      isLoading: 'finished',
      getOrganizations: vi.fn(),
      setIsLoading: vi.fn(),
      organizations: mockeOrganizationsResponse,
      total: 0,
      removeFromOrganizations: vi.fn(),
      addToOrganizations: vi.fn(),
    });

    render(
      <OrganizationsUIProvider>
        <OrganizationManagement />
      </OrganizationsUIProvider>,
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
