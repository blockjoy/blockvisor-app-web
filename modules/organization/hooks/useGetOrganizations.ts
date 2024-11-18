import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  organizationAtoms,
  organizationSelectors,
  useDefaultOrganization,
} from '@modules/organization';

export function useGetOrganizations() {
  const [organizations, setOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );

  const organizationsSorted = useRecoilValue(
    organizationSelectors.allOrganizationsSorted,
  );

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationsLoadingState,
  );

  const { getDefaultOrganization } = useDefaultOrganization();

  const getOrganizations = async (
    init?: boolean,
    showLoader: boolean = true,
    userId?: string,
  ) => {
    if (showLoader) setIsLoading('initializing');

    const response = await organizationClient.listOrganizations({
      currentPage: 0,
      itemsPerPage: 1000,
    });

    const { orgs } = response;

    setOrganizations(orgs);

    if (init) await getDefaultOrganization(response.orgs, userId);

    setIsLoading('finished');
  };

  const removeFromOrganizations = (orgId: string) => {
    const newOrganizations = organizations.filter(
      (organization) => organization.orgId !== orgId,
    );

    setOrganizations(newOrganizations);

    return newOrganizations;
  };

  const addToOrganizations = (org: Org) => {
    const foundOrg = organizations.findIndex((o) => o.orgId === org.orgId) > -1;
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
