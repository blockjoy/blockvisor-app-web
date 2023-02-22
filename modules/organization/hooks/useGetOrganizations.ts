import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDefaultOrganization } from './useDefaultOrganization';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );

  const total = useRecoilValue(organizationAtoms.organisationCount);

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationsLoadingState,
  );

  const { getDefaultOrganization } = useDefaultOrganization();

  const getOrganizations = async (init?: boolean) => {
    setIsLoading('initializing');
    const organizations: any = await apiClient.getOrganizations();

    checkForTokenError(organizations);

    setOrganizations(organizations);

    if (init) getDefaultOrganization(organizations);

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
    total,
    getOrganizations,
    updateOrganizations,
    addToOrganizations,
    isLoading,
    setIsLoading,
  };
}
