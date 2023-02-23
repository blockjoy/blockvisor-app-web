import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

export function useInvitations() {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const [sentInvitationsLoadingState, setSentInvitationsLoadingState] =
    useRecoilState(organizationAtoms.organizationSentInvitationsLoadingState);

  const setReceivedInvitations = useSetRecoilState(
    organizationAtoms.organizationReceivedInvitations,
  );

  const getReceivedInvitations = async (id: string) => {
    const response: any = await apiClient.receivedInvitations(id);
    checkForTokenError(response);
    setReceivedInvitations(response);
  };

  const getSentInvitations = async (id: string | string[]) => {
    const orgId = Array.isArray(id) ? id[0] : id;
    const response: any = await apiClient.pendingInvitations(orgId);
    if (isStatusResponse(response)) {
      setSentInvitations([]);
    } else {
      setSentInvitations(response);
    }

    setSentInvitationsLoadingState('finished');
  };

  const acceptInvitation = async (
    {
      token,
      invitationId,
    }: {
      token?: string;
      invitationId?: string;
    },
    onSuccess: VoidFunction,
  ) => {
    await apiClient.acceptInvitation({
      token,
      invitationId,
    });
    toast.success('Invitation Accepted');
    onSuccess();
  };

  const declineInvitation = async (
    {
      token,
      invitationId,
    }: {
      token?: string;
      invitationId?: string;
    },
    onSuccess: VoidFunction,
  ) => {
    await apiClient.declineInvitation({
      token,
      invitationId,
    });
    toast.success('Invitation Declined');
    onSuccess();
  };

  const revokeInvitation = async ({
    token,
    invitationId,
    email,
  }: {
    token?: string;
    invitationId?: string;
    email?: string;
  }) => {
    await apiClient.revokeInvitation({
      token,
      invitationId,
      email,
    });

    updateInvitations(invitationId!);

    toast.success('Invitation Canceled');
  };

  const updateInvitations = (invitation_id: string) => {
    const newSentInvitations = sentInvitations.filter(
      (invitation) => invitation.id !== invitation_id,
    );
    setSentInvitations(newSentInvitations);
  };

  return {
    getReceivedInvitations,
    sentInvitations,
    getSentInvitations,
    sentInvitationsLoadingState,
    acceptInvitation,
    declineInvitation,
    revokeInvitation,
  };
}
