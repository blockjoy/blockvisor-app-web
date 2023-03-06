import { expect, vi, it, describe, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  act,
  renderHook,
} from '../renderer';
import {
  organizationAtoms,
  OrganizationView,
  useDeleteOrganization,
  useGetOrganization,
  useInvitations,
  useUpdateOrganization,
} from '@modules/organization';
import { useRouterSpy } from '__tests__/utils';
import { mockedNodesResponse, routerMockBuilder } from '__tests__/mocks';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';

import { apiClient } from '@modules/client';

describe('Single Organization Page', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;
    vi.mock('@modules/client');
    //vi.mock('@modules/organization/hooks/useInvitations');
    vi.mock('@modules/organization/hooks/useGetOrganization');
    vi.mock('@modules/organization/hooks/useDeleteOrganization');
    vi.mock('@modules/organization/hooks/useUpdateOrganization');
    vi.mock('@modules/organization/hooks/useLeaveOrganization');
  });

  afterEach(() => {
    cleanup();
  });
  it('should display loading skeleton when data is fetching', async () => {
    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );

    vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
      async (id: string) => [],
    );
    vi.mocked(apiClient.pendingInvitations).mockImplementationOnce(
      async (id: string) => ({ code: 1 } as any),
    );
    vi.mocked(apiClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );

    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      organization: null,
      isLoading: 'initializing',
      setIsLoading: vi.fn(),
    });

    vi.mocked(useDeleteOrganization).mockReturnValue({
      loading: false,
      deleteOrganization: vi.fn(),
      setLoadingState: vi.fn(),
    });

    vi.mocked(useUpdateOrganization).mockReturnValue({
      updateOrganization: vi.fn(),
    });

    vi.mocked(useLeaveOrganization).mockReturnValue({
      loading: false,
      leaveOrganization: vi.fn(),
    });

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-loading')).toBeTruthy();
    });
  });

  it('should display empty column when there is no organization', async () => {
    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );

    vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
      async (id: string) => [],
    );
    vi.mocked(apiClient.pendingInvitations).mockImplementationOnce(
      async (id: string) => ({ code: 1 } as any),
    );
    vi.mocked(apiClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );

    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      organization: null,
      isLoading: 'finished',
      setIsLoading: vi.fn(),
    });

    vi.mocked(useDeleteOrganization).mockReturnValue({
      loading: false,
      deleteOrganization: vi.fn(),
      setLoadingState: vi.fn(),
    });

    vi.mocked(useUpdateOrganization).mockReturnValue({
      updateOrganization: vi.fn(),
    });

    vi.mocked(useLeaveOrganization).mockReturnValue({
      loading: false,
      leaveOrganization: vi.fn(),
    });

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-not-found')).toBeTruthy();
    });
  });

  it('should not display danger zone when there is no organization', async () => {
    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );

    vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
      async (id: string) => [],
    );
    vi.mocked(apiClient.pendingInvitations).mockImplementationOnce(
      async (id: string) => ({ code: 1 } as any),
    );
    vi.mocked(apiClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );

    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      organization: null,
      isLoading: 'finished',
      setIsLoading: vi.fn(),
    });

    vi.mocked(useDeleteOrganization).mockReturnValue({
      loading: false,
      deleteOrganization: vi.fn(),
      setLoadingState: vi.fn(),
    });

    vi.mocked(useUpdateOrganization).mockReturnValue({
      updateOrganization: vi.fn(),
    });

    vi.mocked(useLeaveOrganization).mockReturnValue({
      loading: false,
      leaveOrganization: vi.fn(),
    });

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-delete-button')).toBeFalsy();
    });
  });
});
