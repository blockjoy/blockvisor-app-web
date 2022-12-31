import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useGetInvitations() {
  const getInvitations = async (id: string) => {
    const response: any = await apiClient.receivedInvitations(id);
    console.log('getInvitations', response);
  };

  return {
    getInvitations,
  };
}
