import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useInvitations() {
  const [, setSentInvitations] = useRecoilState(
    organizationAtoms.organizationSentInvitations,
  );

  const [, setReceivedInvitations] = useRecoilState(
    organizationAtoms.organizationReceivedInvitations,
  );

  const getReceivedInvitations = async (id: string) => {
    const response: any = await apiClient.receivedInvitations(id);
    setReceivedInvitations(response);
  };

  const getSentInvitations = async (id: string) => {
    const response: any = await apiClient.pendingInvitations(id);
    setSentInvitations(response);
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

  return {
    getReceivedInvitations,
    getSentInvitations,
    acceptInvitation,
    declineInvitation,
  };
}
