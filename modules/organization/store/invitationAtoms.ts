import { atom, selectorFamily } from 'recoil';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
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

      const sorted = sort(invitations, {
        field: 'inviteeEmail',
        order: SortOrder.SORT_ORDER_ASCENDING,
      });

      const paginated = paginate(sorted, queryParams.pagination);
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
