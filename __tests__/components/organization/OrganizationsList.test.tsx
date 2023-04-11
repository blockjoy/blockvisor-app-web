import { vi, it, describe, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, cleanup } from '../../renderer';
import {
  OrganizationMembersUIProvider,
  OrganizationsList,
  useGetOrganizations,
} from '@modules/organization';
import { useRouterSpy } from '__tests__/utils';
import { routerMockBuilder } from '__tests__/mocks/router';
import { OrganizationsUIProvider } from '@modules/organization/ui/OrganizationsUIContext';

describe('OrganizationsList', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations', isReady: true }),
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display skeleton loading when data is being fetched', () => {
    vi.mock('@modules/organization/hooks/useGetOrganizations');
    vi.mocked(useGetOrganizations).mockReturnValue({
      organizations: [],
      total: 0,
      getOrganizations: vi.fn(),
      removeFromOrganizations: vi.fn(),
      addToOrganizations: vi.fn(),
      isLoading: 'initializing',
      setIsLoading: vi.fn(),
    });

    render(
      <OrganizationsUIProvider>
        <OrganizationsList />
      </OrganizationsUIProvider>,
    );

    expect(screen.getByDataCy('organizationsListTable-skeleton')).toBeTruthy();
  });
});
