import { organizationClient } from '@modules/grpc';
import { useRecoilState } from 'recoil';
import { checkForApiError } from 'utils/checkForApiError';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDefaultOrganization } from './useDefaultOrganization';
import { useGetOrganizations } from './useGetOrganizations';

export function useGetOrganization() {
  const { getDefaultOrganization, setDefaultOrganization } =
    useDefaultOrganization();

  const { organizations } = useGetOrganizations();

  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const getOrganization = async (id: string) => {
    let organization: any = organizations.find((o: any) => o.id === id);

    if (organization) {
      setOrganization(organization);
    } else {
      try {
        organization = await organizationClient.getOrganization(id);
        checkForTokenError(organization);
        checkForApiError('organization', organization);
        setOrganization(organization);
        setDefaultOrganization({
          id: organization.id,
          name: organization.name,
        });
      } catch (err) {
        organization = null;
        await getDefaultOrganization(organizations);
        setIsLoading('finished');
        return;
      }
    }

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
