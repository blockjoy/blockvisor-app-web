import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRecoilState } from 'recoil';
import { checkForApiError } from 'utils/checkForApiError';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDefaultOrganization } from './useDefaultOrganization';
import { useGetOrganizations } from './useGetOrganizations';
import { useSwitchOrganization } from './useSwitchOrganization';

export function useGetOrganization() {
  const { getDefaultOrganization } = useDefaultOrganization();

  const { switchOrganization } = useSwitchOrganization();

  const { organizations } = useGetOrganizations();

  const [organization, setOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );

  const [isLoading, setIsLoading] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const getOrganization = async (id: string, shouldSetDefault?: boolean) => {
    let organization: Org | null | undefined = organizations?.find(
      (o) => o.id === id,
    )!;

    if (organization) {
      setOrganization(organization);
      if (shouldSetDefault)
        switchOrganization(organization.id, organization.name);
    } else {
      try {
        organization = await organizationClient.getOrganization(id);
        checkForTokenError(organization);
        checkForApiError('organization', organization);
        setOrganization(organization);
        if (shouldSetDefault)
          switchOrganization(organization.id, organization.name);
      } catch (err) {
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
