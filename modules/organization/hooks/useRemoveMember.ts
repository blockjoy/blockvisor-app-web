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

    try {
      await apiClient.removeOrganizationMember(user_id, org_id);

      removeMemberFromList(user_id);

      toast.success('Removed successfully');
    } catch (err) {
      toast.error('Error while removing');
    }
    
    setIsLoading('finished');
  };

  return {
    isLoading,
    removeMemberFromOrganization,
  };
}
