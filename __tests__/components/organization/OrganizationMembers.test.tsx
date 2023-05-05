import { expect, vi, it, describe, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '../../renderer';
import { Members, OrganizationMembersUIProvider } from '@modules/organization';
import { useRouterSpy } from '__tests__/utils';

import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { mockedInvitations } from '__tests__/mocks/invitations';
import { invitationClient, organizationClient } from '@modules/grpc';

describe('Members component', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );
    vi.mock('@modules/grpc');
    vi.mock('@modules/auth/hooks/useHasPermissions');

    vi.mocked(useHasPermissions).mockReturnValue(true);
  });

  afterEach(() => {
    cleanup();
  });

  //Skiped this until the members functionality is fixed

  it.skip('Should display Alerady invited toast error', () => {
    const [org, nonPrivateOrg] = mockeOrganizationsResponse;

    vi.mocked(invitationClient.receivedInvitations).mockImplementationOnce(
      async (id?: string) => mockedInvitations,
    );

    vi.mocked(organizationClient.getOrganizations).mockImplementationOnce(
      async (id?: string) => [nonPrivateOrg],
    );

    // vi.mocked(organizationClient.getOrganizationMembers).mockImplementationOnce(
    //   async () => [
    //     {
    //       email: 'tom@gmail.com',
    //       firstName: 'first',
    //       id: '1234',
    //       lastName: 'Last',
    //     },
    //   ],
    // );

    render(
      <OrganizationMembersUIProvider>
        <Members />,
      </OrganizationMembersUIProvider>,
    );

    fireEvent.click(screen.getByDataCy('organization-member-add-button'));

    fireEvent.change(screen.getByDataCy('organization-member-invite-input'), {
      target: { value: 'tom@gmail.com' },
    });

    fireEvent.click(screen.getByDataCy('organization-member-invite-button'));

    waitFor(() => {
      expect(screen.getByText('Already invited')).toBeTruthy();
    });
  });

  it.skip('Should display Alerady a member toast error', () => {
    const [org, nonPrivateOrg] = mockeOrganizationsResponse;

    vi.mocked(organizationClient.getOrganizations).mockImplementationOnce(
      async (id?: string) => [nonPrivateOrg],
    );

    // vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
    //   async () => [
    //     {
    //       email: 'tom@gmail.com',
    //       firstName: 'first',
    //       id: '1234',
    //       lastName: 'Last',
    //     },
    //   ],
    // );

    render(
      <OrganizationMembersUIProvider>
        <Members />
      </OrganizationMembersUIProvider>,
    );

    fireEvent.click(screen.getByDataCy('organization-member-add-button'));

    fireEvent.change(screen.getByDataCy('organization-member-invite-input'), {
      target: { value: 'tom@gmail.com' },
    });

    fireEvent.click(screen.getByDataCy('organization-member-invite-button'));

    waitFor(() => {
      expect(screen.getByText('Already invited')).toBeTruthy();
    });
  });
});
