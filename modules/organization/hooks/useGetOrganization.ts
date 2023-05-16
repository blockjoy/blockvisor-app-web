import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { useSwitchOrganization } from './useSwitchOrganization';

export function useGetOrganization() {
  const { switchOrganization } = useSwitchOrganization();

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

    let organization: Org | undefined;

    organization = allOrganizations.find((o: any) => o.id === id);

    if (organization) {
      setOrganization(organization);
    } else {
      const response: any = await organizationClient.getOrganization(id);
      organization = response;
      checkForTokenError(organization);
      setOrganization(response);
    }

    switchOrganization(organization!.id, organization!.name);

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
