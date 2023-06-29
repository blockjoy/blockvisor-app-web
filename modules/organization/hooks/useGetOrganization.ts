import { organizationClient } from '@modules/grpc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkForApiError } from 'utils/checkForApiError';
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

  const getOrganization = async (id: string) => {
    let organization: any = allOrganizations.find((o: any) => o.id === id);

    if (organization) {
      setOrganization(organization);
    } else {
      organization = await organizationClient.getOrganization(id);
      checkForTokenError(organization);
      checkForApiError('organization', organization);
      console.log('organization', organization);
      setOrganization(organization);
    }

    switchOrganization(organization!.id, organization!.name);

    setIsLoading('finished');
  };

  return {
    organization,
    isLoading,
    getOrganization,
    setOrganization,
    setIsLoading,
  };
}
