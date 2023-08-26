import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
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

  const getOrganizations = async (
    init?: boolean,
    showLoader: boolean = true,
  ) => {
    if (showLoader) setIsLoading('initializing');

    const organizations: any = await organizationClient.getOrganizations();

    checkForTokenError(organizations);
    setOrganizations(organizations);

    if (init) await getDefaultOrganization(organizations);

    setIsLoading('finished');
  };

  const removeFromOrganizations = (orgId: string) => {
    const newOrganizations = organizations.filter(
      (organization) => organization.id !== orgId,
    );
    setOrganizations(newOrganizations);
  };

  const addToOrganizations = (org: Org) => {
    const foundOrg = organizations.findIndex((o) => o.id === org.id) > -1;
    if (foundOrg) return;

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
