import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useRemoveMember() {
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationMemberLoadingState,
  );

  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );

  const removeMemberFromList = (user_id: string) => {
    const newOrganizationMembers = organizationMembers.filter(member => member.id !== user_id);
    setOrganizationMembers(newOrganizationMembers);
  }

  const removeMemberFromOrganization = async (user_id: string, org_id: string) => {
    setIsLoading('loading');
    await apiClient.removeOrganizationMember(user_id, org_id);
    
    removeMemberFromList(user_id);

    setIsLoading('finished');
    toast.success('Removed successfully');
  };

  return {
    isLoading,
    removeMemberFromOrganization,
  };
}
