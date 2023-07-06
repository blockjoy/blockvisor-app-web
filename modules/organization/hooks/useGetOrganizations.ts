import { organizationClient } from '@modules/grpc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDefaultOrganization } from './useDefaultOrganization';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );

  const organizationsSorted = useRecoilValue(
    organizationAtoms.allOrganizationsSorted,
  );

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationsLoadingState,
  );

  const { getDefaultOrganization } = useDefaultOrganization();

  const getOrganizations = async (init?: boolean) => {
    setIsLoading('initializing');
    const organizations: any = await organizationClient.getOrganizations();

    checkForTokenError(organizations);
    setOrganizations(organizations);

    if (init) await getDefaultOrganization(organizations);

    setIsLoading('finished');
  };

  const removeFromOrganizations = (org_id: string) => {
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
    organizationsSorted,
    getOrganizations,
    removeFromOrganizations,
    addToOrganizations,
    isLoading,
    setIsLoading,
  };
}
