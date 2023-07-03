import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { invitationAtoms, useDefaultOrganization } from '@modules/organization';
import { isStatusResponse } from '../utils/typeGuards';

export function useInvitations() {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    invitationAtoms.sentInvitations,
  );

  const [sentInvitationsLoadingState, setSentInvitationsLoadingState] =
    useRecoilState(invitationAtoms.sentInvitationsLoadingState);

  const [receivedInvitations, setReceivedInvitations] = useRecoilState(
    invitationAtoms.receivedInvitations,
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
    setSentInvitationsLoadingState('finished');
  };

  const acceptInvitation = async (
    invitationId: string,
    onSuccess?: VoidFunction,
  ) => {
    await invitationClient.acceptInvitation(invitationId);

    // TODO: set default organization

    if (onSuccess) onSuccess();
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
    invitationId,
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
    receivedInvitations,
    sentInvitations,
    getSentInvitations,
    acceptInvitation,
    declineInvitation,
    revokeInvitation,
    sentInvitationsLoadingState,
    setSentInvitationsLoadingState,
  };
}
