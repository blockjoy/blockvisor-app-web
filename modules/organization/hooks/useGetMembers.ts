import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useGetOrganizationMembers() {
  const [organizationMembers, setOrganizationMembers] = useRecoilState(organisationAtoms.organizationMembers);
  const [isLoading, setIsLoading] = useRecoilState(organisationAtoms.organizationMembersLoadingState);

  const getOrganizationMembers = async (id: string) => {
    setIsLoading('initializing');

    const members: any = await apiClient.getOrganizationMembers(id);
    setOrganizationMembers(members);
    
    setIsLoading('finished');
  };

  return {
    organizationMembers,
    getOrganizationMembers,
    isLoading
  };
}
