import { atom, selectorFamily } from 'recoil';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { InitialQueryParams as InitialQueryParamsOrganizationInvitations } from '../ui/OrganizationInvitationsUIHelpers';
import { sort, paginate } from '@shared/components';

const sentInvitations = atom<Invitation[]>({
  key: 'sentInvitations',
  default: [],
});

const sentInvitationsActive = selectorFamily<
  Invitation[],
  InitialQueryParamsOrganizationInvitations
>({
  key: 'sentInvitations.active',
  get:
    (queryParams) =>
    ({ get }) => {
      const invitations = get(sentInvitations);

      const { pagination } = queryParams;

      const sorted = sort(invitations, {
        field: 'inviteeEmail',
        order: 'asc',
      });

      const paginated = paginate(sorted, pagination);
      return paginated;
    },
});

const sentInvitationsLoadingState = atom<LoadingState>({
  key: 'organizationSentInvitations.loadingState',
  default: 'loading',
});

const receivedInvitations = atom<Invitation[]>({
  key: 'organizationReceivedInvitations',
  default: [],
});

export const invitationAtoms = {
  sentInvitations,
  sentInvitationsActive,
  sentInvitationsLoadingState,
  receivedInvitations,
};
