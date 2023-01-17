import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

export function useInvitations() {
  const [sentInvitations, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const setReceivedInvitations = useSetRecoilState(
    organizationAtoms.organizationReceivedInvitations,
  );

  const getReceivedInvitations = async (id: string) => {
    const response: any = await apiClient.receivedInvitations(id);
    setReceivedInvitations(response);
  };

  const getSentInvitations = async (id: string) => {
    const response: any = await apiClient.pendingInvitations(id);
    if (isStatusResponse(response)) {
      setSentInvitations([]);
    } else {
      setSentInvitations(response);
    }
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
    const response = await apiClient.acceptInvitation({
      token,
      invitationId,
    });
    toast.success('Invite Accepted');
    onSuccess();
    console.log('acceptInvitation response', response);
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
    const response = await apiClient.declineInvitation({
      token,
      invitationId,
    });
    toast.success('Invite Declined');
    onSuccess();
    console.log('declineInvitation response', response);
  };

  const revokeInvitation = async (
    {
      token,
      invitationId,
      email,
    }: {
      token?: string;
      invitationId?: string;
      email?: string;
    },
    onSuccess?: VoidFunction,
  ) => {
    const response = await apiClient.revokeInvitation({
      token,
      invitationId,
      email,
    });
    toast.success('Invitation Revoked');
    if (onSuccess) onSuccess();
    console.log('revokeInvitation response', response);
  };

  return {
    getReceivedInvitations,
    sentInvitations,
    getSentInvitations,
    acceptInvitation,
    declineInvitation,
    revokeInvitation,
  };
}
