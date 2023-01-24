import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );
  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationsLoadingState,
  );

  const [pageIndex, setPageIndex] = useRecoilState(
    organizationAtoms.organizationsPageIndex,
  );

  const getOrganizations = async () => {
    setIsLoading('initializing');
    const organizations: any = await apiClient.getOrganizations();
    setOrganizations(organizations);
    setIsLoading('finished');
  };

  const updateOrganizations = (org_id: string) => {
    const newOrganizations = organizations.filter(
      (organization) => organization.id !== org_id,
    );
    setOrganizations(newOrganizations);
  };

  const addToOrganizations = (org: any) => {
    const organizationsCopy = [...organizations];
    organizationsCopy.push(org);
    setOrganizations(organizationsCopy);
  };

  return {
    organizations,
    getOrganizations,
    updateOrganizations,
    addToOrganizations,
    isLoading,
    pageIndex,
    setPageIndex,
  };
}
