import { expect, vi, it, describe, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '../../renderer';
import { Members, OrganizationMembersUIProvider } from '@modules/organization';
import { useRouterSpy } from '__tests__/utils';

import { apiClient } from '@modules/client';
import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';
import { routerMockBuilder } from '__tests__/mocks/router';
import { mockeOrganizationsResponse } from '__tests__/mocks/organizations';
import { mockedInvitations } from '__tests__/mocks/invitations';

describe('Members component', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as any;

    useRouterSpy.mockImplementation(() =>
      routerMockBuilder({ route: '/organizations/1234', isReady: true }),
    );
    vi.mock('@modules/client');
    vi.mock('@modules/auth/hooks/useHasPermissions');

    vi.mocked(useHasPermissions).mockReturnValue(true);
  });

  afterEach(() => {
    cleanup();
  });

  it('Should display Alerady invited toast error', () => {
    const [org, nonPrivateOrg] = mockeOrganizationsResponse;

    vi.mocked(apiClient.receivedInvitations).mockImplementationOnce(
      async (id?: string) => mockedInvitations,
    );

    vi.mocked(apiClient.getOrganizations).mockImplementationOnce(
      async (id?: string) => [nonPrivateOrg],
    );

    vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
      async () => [
        {
          email: 'tom@gmail.com',
          firstName: 'first',
          id: '1234',
          lastName: 'Last',
        },
      ],
    );
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

  it('Should display Alerady a member toast error', () => {
    const [org, nonPrivateOrg] = mockeOrganizationsResponse;

    vi.mocked(apiClient.getOrganizations).mockImplementationOnce(
      async (id?: string) => [nonPrivateOrg],
    );

    vi.mocked(apiClient.getOrganizationMembers).mockImplementationOnce(
      async () => [
        {
          email: 'tom@gmail.com',
          firstName: 'first',
          id: '1234',
          lastName: 'Last',
        },
      ],
    );

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
