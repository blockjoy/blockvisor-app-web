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

import { routerMockBuilder } from '__tests__/mocks/router';
import { mockedNodesResponse } from '__tests__/mocks/nodes';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { mockedMembersResponse } from '__tests__/mocks/members';
import {
  invitationClient,
  nodeClient,
  organizationClient,
} from '@modules/grpc';

describe('Single Organization Page', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );
    vi.mock('@modules/organization/hooks/useGetOrganization');
    vi.mock('@modules/organization/hooks/useDeleteOrganization');
    vi.mock('@modules/organization/hooks/useUpdateOrganization');
    vi.mock('@modules/organization/hooks/useLeaveOrganization');

    vi.mocked(useDeleteOrganization).mockReturnValue({
      loading: false,
      deleteOrganization: vi.fn(),
      setLoadingState: vi.fn(),
      removeOrganization: vi.fn(),
    });

    vi.mocked(useUpdateOrganization).mockReturnValue({
      updateOrganization: vi.fn(),
      modifyOrganization: vi.fn(),
    });

    vi.mocked(useLeaveOrganization).mockReturnValue({
      loading: false,
      leaveOrganization: vi.fn(),
    });

    // vi.mocked(invitationClient.pendingInvitations).mockImplementationOnce(
    //   async (id: string) => ({ code: 1 } as any),
    // );

    vi.mocked(nodeClient.listNodes).mockImplementationOnce(
      async () => mockedNodesResponse,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should display loading skeleton when data is fetching', async () => {
    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      setMembersPageIndex: vi.fn(),
      setIsLoading: vi.fn(),
      organization: null,
      isLoading: 'initializing',
      membersPageIndex: 0,
    });

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-loading')).toBeTruthy();
    });
  });

  it('should display empty column when there is no organization', async () => {
    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      setIsLoading: vi.fn(),
      setMembersPageIndex: vi.fn(),
      organization: null,
      isLoading: 'finished',
      membersPageIndex: 0,
    });

    render(<OrganizationView />);

    await waitFor(() => {
      expect(screen.getByDataCy('organization-not-found')).toBeTruthy();
    });
  });

  it('should not display danger zone when there is no organization', async () => {
    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      setMembersPageIndex: vi.fn(),
      setIsLoading: vi.fn(),
      organization: null,
      isLoading: 'finished',
      membersPageIndex: 0,
    });

    render(<OrganizationView />);

    await waitFor(() => {
      const dangerZone = screen.queryByDataCy('organization-delete-button');
      expect(dangerZone).toBeFalsy();
    });
  });

  it('should not display danger zone when the organization is personal', async () => {
    const [org] = mockeOrganizationsResponse;

    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      setIsLoading: vi.fn(),
      setMembersPageIndex: vi.fn(),
      organization: org,
      isLoading: 'finished',
      membersPageIndex: 0,
    });

    render(<OrganizationView />);

    await waitFor(() => {
      const dangerZone = screen.queryByDataCy('organization-delete-button');
      expect(dangerZone).toBeFalsy();
    });
  });

  //TODO: check if this test is still needed
  it.skip('should display all members when organization has other non default memebers', async () => {
    const [org] = mockeOrganizationsResponse;

    vi.mocked(useGetOrganization).mockReturnValue({
      getOrganization: vi.fn(),
      setOrganization: vi.fn(),
      setIsLoading: vi.fn(),
      setMembersPageIndex: vi.fn(),
      organization: org,
      isLoading: 'finished',
      membersPageIndex: 0,
    });

    render(<OrganizationView />);

    await waitFor(() => {
      const members = screen.queryAllByDataCy('organizationMembers-list');
      expect(members).toHaveLength(2);
    });
  });
});
