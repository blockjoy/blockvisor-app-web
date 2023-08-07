import { invitationClient } from '@modules/grpc';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { invitationAtoms } from '@modules/organization';
import { isStatusResponse } from '../utils/typeGuards';
import { Invitation } from '@modules/grpc/library/blockjoy/v1/invitation';

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
    try {
      const response = await invitationClient.receivedInvitations(inviteeEmail);
      setReceivedInvitations(response);
    } catch (err) {
      console.log('receivedInvitationsError', err);
    }
  };

  const getSentInvitations = async (orgId: string | string[]) => {
    try {
      const response = await invitationClient.pendingInvitations(
        orgId as string,
      );
      if (isStatusResponse(response)) {
        setSentInvitations([]);
      } else {
        setSentInvitations(response);
      }
    } catch (err) {
      console.log('pendingInvitationsError', err);
    }
    setSentInvitationsLoadingState('finished');
  };

  const acceptInvitation = async (
    invitationId: string,
    onSuccess?: VoidFunction,
  ) => {
    try {
      await invitationClient.acceptInvitation(invitationId);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log('acceptInvitationError', err);
      toast.error('Error Accepting');
    }
  };

  const declineInvitation = async (
    invitationId: string,
    onSuccess: VoidFunction,
  ) => {
    try {
      await invitationClient.declineInvitation(invitationId);
      toast.success('Invitation Declined');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.log('declineInvitationError', err);
      toast.error('Error Declining');
    }
  };

  const revokeInvitation = async ({
    invitationId,
  }: {
    token?: string;
    invitationId?: string;
    email?: string;
  }) => {
    try {
      await invitationClient.revokeInvitation(invitationId);
      deleteFromSentInvitations(invitationId!);
      toast.success('Invitation Canceled');
    } catch (err) {
      console.log('revokeInvitationError', err);
      toast.error('Error Revoking');
    }
  };

  const deleteFromSentInvitations = (invitationId: string) => {
    const newSentInvitations = sentInvitations.filter(
      (invitation) => invitation.id !== invitationId,
    );
    setSentInvitations(newSentInvitations);
  };

  const modifySentInvitations = (invitation: Invitation) => {
    const sentInvitationsCopy = [...sentInvitations];

    const invitationIndex = sentInvitationsCopy?.findIndex(
      (i) => i.inviteeEmail === invitation.inviteeEmail,
    );

    sentInvitationsCopy[invitationIndex] = invitation;

    setSentInvitations(sentInvitationsCopy);
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
    modifySentInvitations,
  };
}
