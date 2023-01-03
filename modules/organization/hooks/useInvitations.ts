import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useInvitations() {
  const [, setInvitations] = useRecoilState(
    organizationAtoms.organizationInvitations,
  );

  const getInvitations = async (id: string) => {
    const response: any = await apiClient.receivedInvitations(id);

    setInvitations(response);

    console.log('getInvitations', response);
  };

  // const respondInvitation = (accepted: boolean) => {
  //   const response: any = await apiClient.acceptInvitation()
  // }

  return {
    getInvitations,
  };
}
