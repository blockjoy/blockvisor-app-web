import { organizationClient } from '@modules/grpc';
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

    let organization: any = allOrganizations.find((o: any) => o.id === id);

    if (organization) {
      setOrganization(organization);
    } else {
      organization = await organizationClient.getOrganization(id);
      checkForTokenError(organization);
      setOrganization(organization);
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
