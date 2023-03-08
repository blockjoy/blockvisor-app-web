import { expect, vi, it, describe, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '../renderer';
import { Members } from '@modules/organization';
import { useRouterSpy } from '__tests__/utils';
import {
  mockedGetOrganizationsResponse,
  mockedInvitations,
  mockedMembersResponse,
  routerMockBuilder,
} from '__tests__/mocks';

import { apiClient } from '@modules/client';
import { useHasPermissions } from '@modules/auth/hooks/useHasPermissions';

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

  it('Should display Alerady invited toast error', async () => {
    const [org, nonPrivateOrg] = mockedGetOrganizationsResponse;

    vi.mocked(apiClient.getOrganizations).mockImplementationOnce(
      async (id?: string) => [nonPrivateOrg],
    );

    render(
      <Members
        id="1234"
        members={mockedMembersResponse}
        invitations={mockedInvitations}
      />,
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

  it('Should display Alerady a member toast error', async () => {
    const [org, nonPrivateOrg] = mockedGetOrganizationsResponse;

    vi.mocked(apiClient.getOrganizations).mockImplementationOnce(
      async (id?: string) => [nonPrivateOrg],
    );

    render(
      <Members
        id="1234"
        members={[
          {
            email: 'tom@gmail.com',
            firstName: 'first',
            id: '1234',
            lastName: 'Last',
          },
        ]}
        invitations={[]}
      />,
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
