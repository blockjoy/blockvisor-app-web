import { organizationClient } from '@modules/grpc';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Org, OrgSortField } from '@modules/grpc/library/blockjoy/v1/org';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  organizationAtoms,
  useDefaultOrganization,
} from '@modules/organization';

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

    const response = await organizationClient.getOrganizations({
      currentPage: 0,
      itemsPerPage: 1000,
    });

    const { orgs } = response;

    setOrganizations(orgs);

    if (init) await getDefaultOrganization(response.orgs);

    setIsLoading('finished');
  };

  const removeFromOrganizations = (orgId: string) => {
    const newOrganizations = organizations.filter(
      (organization) => organization.id !== orgId,
    );

    setOrganizations(newOrganizations);

    return newOrganizations;
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
