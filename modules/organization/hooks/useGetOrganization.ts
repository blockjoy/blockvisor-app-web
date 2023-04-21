import { organizationClient } from '@modules/grpc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';

export function useGetOrganization() {
  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const allOrganizations = useRecoilValue(organizationAtoms.allOrganizations);

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const [membersPageIndex, setMembersPageIndex] = useRecoilState(
    organizationAtoms.organizationMembersPageIndex,
  );

  const getOrganization = async (id: string) => {
    setIsLoading('initializing');

    const foundOrganization = allOrganizations.find((o: any) => o.id === id);

    if (foundOrganization) {
      setOrganization(foundOrganization);
    } else {
      const organization: any = await organizationClient.getOrganization(id);

      checkForTokenError(organization);

      setOrganization(organization);
    }

    setIsLoading('finished');
  };

  return {
    organization,
    isLoading,
    membersPageIndex,
    getOrganization,
    setOrganization,
    setIsLoading,
    setMembersPageIndex,
  };
}
