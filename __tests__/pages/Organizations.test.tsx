import { IIdentityRepository } from '@modules/auth/utils/IdentityRepository';
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '../renderer';
import {
  mockeOrganizationsResponse,
  mockUseIdentityValue,
  routerMockBuilder,
} from '../mocks';
import { getOrganizationsSpy, useRouterSpy } from '../utils';
import { OrganizationManagement } from '@modules/organization';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';

describe('Organizations page', () => {
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

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations' }),
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Loading skeleton should be visible when fetching organizations', async () => {
    getOrganizationsSpy.mockImplementation(async () => []);

    render(
      <OrganizationsUIProvider>
        <OrganizationManagement />
      </OrganizationsUIProvider>,
    );

    expect(screen.getByDataCy('organizationsListTable-skeleton')).toBeTruthy();
  });

  it('Organizations table should be visible when there are organizations', async () => {
    getOrganizationsSpy.mockImplementation(
      async () => mockeOrganizationsResponse,
    );

    render(
      <OrganizationsUIProvider>
        <OrganizationManagement />
      </OrganizationsUIProvider>,
    );

    await waitFor(() => {
      expect(screen.getByDataCy('organizationsList-table')).toBeTruthy();
    });
  });
});
