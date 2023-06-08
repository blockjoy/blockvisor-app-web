import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

export function useInvitations() {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationSentInvitationsLoadingState,
  );

  const setReceivedInvitations = useSetRecoilState(
    organizationAtoms.organizationReceivedInvitations,
  );

  const getReceivedInvitations = async (inviteeEmail: string) => {
    const response: any = await invitationClient.receivedInvitations(
      inviteeEmail,
    );
    checkForTokenError(response);
    setReceivedInvitations(response);
  };

  const getSentInvitations = async (id: string | string[]) => {
    const orgId = Array.isArray(id) ? id[0] : id;
    const response: any = await invitationClient.pendingInvitations(orgId);
    if (isStatusResponse(response)) {
      setSentInvitations([]);
    } else {
      setSentInvitations(response);
    }

    setIsLoading('finished');
  };

  const acceptInvitation = async (
    invitationId: string,
    onSuccess: VoidFunction,
  ) => {
    await invitationClient.acceptInvitation(invitationId);
    toast.success('Invitation Accepted');
    onSuccess();
  };

  const declineInvitation = async (
    invitationId: string,
    onSuccess: VoidFunction,
  ) => {
    await invitationClient.declineInvitation(invitationId);
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
    await invitationClient.revokeInvitation(invitationId);
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
    acceptInvitation,
    declineInvitation,
    revokeInvitation,
    isLoading,
    setIsLoading,
  };
}
