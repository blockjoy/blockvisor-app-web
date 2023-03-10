import { expect, vi, it, describe, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '../renderer';
import {
  OrganizationView,
  useDeleteOrganization,
  useGetOrganization,
  useUpdateOrganization,
} from '@modules/organization';
import { useRouterSpy } from '__tests__/utils';
import { useLeaveOrganization } from '@modules/organization/hooks/useLeaveOrganization';

import { apiClient } from '@modules/client';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockedNodesResponse } from '__tests__/mocks/nodes';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { mockedMembersResponse } from '__tests__/mocks/members';

describe('Single Organization Page', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );
    vi.mock('@modules/client');
    vi.mock('@modules/organization/hooks/useGetOrganization');
    vi.mock('@modules/organization/hooks/useDeleteOrganization');
    vi.mock('@modules/organization/hooks/useUpdateOrganization');
    vi.mock('@modules/organization/hooks/useLeaveOrganization');

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
  });

  afterEach(() => {
    cleanup();
  });

  it('should display loading skeleton when data is fetching', async () => {
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

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-loading')).toBeTruthy();
    });
  });

  it('should display empty column when there is no organization', async () => {
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

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-not-found')).toBeTruthy();
    });
  });

  it('should not display danger zone when there is no organization', async () => {
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

    render(<OrganizationView />);

    await waitFor(() => {
      const dangerZone = screen.queryByDataCy('organization-delete-button');
      expect(dangerZone).toBeFalsy();
    });
  });

  it('should not display danger zone when the organization is personal', async () => {
    const [org] = mockeOrganizationsResponse;

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
      organization: org,
      isLoading: 'finished',
      setIsLoading: vi.fn(),
    });

    render(<OrganizationView />);

    await waitFor(() => {
      const dangerZone = screen.queryByDataCy('organization-delete-button');
      expect(dangerZone).toBeFalsy();
    });
  });

  it('should display all members when organization has other non default memebers', async () => {
    const [org] = mockeOrganizationsResponse;

    vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
      async (id: string) => mockedMembersResponse,
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
      organization: org,
      isLoading: 'finished',
      setIsLoading: vi.fn(),
    });

    render(<OrganizationView />);

    await waitFor(() => {
      const members = screen.queryAllByDataCy('organizationMembers-list');
      expect(members).toHaveLength(2);
    });
  });
});
