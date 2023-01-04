import { apiClient } from '@modules/client';
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

    console.log('getReceivedInvitations', response);
  };

  const getSentInvitations = async (id: string) => {
    const response: any = await apiClient.pendingInvitations(id);

    setSentInvitations(response);

    console.log('getSentInvitations', response);
  };

  // const respondInvitation = (accepted: boolean) => {
  //   const response: any = await apiClient.acceptInvitation()
  // }

  return {
    getReceivedInvitations,
    getSentInvitations,
  };
}
