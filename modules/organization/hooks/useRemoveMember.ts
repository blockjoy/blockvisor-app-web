import { apiClient } from '@modules/client';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { isStatusResponse } from '../utils/typeGuards';

export function useRemoveMember() {
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationMemberLoadingState,
  );

  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );

  const [, setPageIndex] = useRecoilState(
    organizationAtoms.organizationMembersPageIndex,
  );

  const removeMemberFromList = (user_id: string) => {
    const newOrganizationMembers = organizationMembers.filter(
      (member) => member.id !== user_id,
    );
    setOrganizationMembers(newOrganizationMembers);
  };

  const removeMemberFromOrganization = async (
    user_id: string,
    org_id: string,
  ) => {
    setIsLoading('loading');

    const response = await apiClient.removeOrganizationMember(user_id, org_id);

    if (!isStatusResponse(response)) {
      removeMemberFromList(user_id);
      setPageIndex(0);
      toast.success('Removed successfully');
    } else {
      toast.error('Error while removing');
    }

    setIsLoading('finished');
  };

  return {
    isLoading,
    removeMemberFromOrganization,
  };
}
