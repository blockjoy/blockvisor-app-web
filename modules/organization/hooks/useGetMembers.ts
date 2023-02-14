import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';

export function useGetOrganizationMembers() {
  const [organizationMembers, setOrganizationMembers] = useRecoilState(
    organizationAtoms.organizationMembers,
  );
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationMembersLoadingState,
  );

  const [pageIndex, setPageIndex] = useRecoilState(
    organizationAtoms.organizationMembersPageIndex,
  );

  const getOrganizationMembers = async (id: string) => {
    setIsLoading('initializing');
    const members: any = await apiClient.getOrganizationMembers(id);
    checkForTokenError(members);
    setOrganizationMembers(members);
    setIsLoading('finished');
  };

  return {
    organizationMembers,
    getOrganizationMembers,
    isLoading,
    pageIndex,
    setPageIndex,
  };
}
