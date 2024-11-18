import { organizationClient } from '@modules/grpc';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useRecoilState } from 'recoil';
import { checkForApiError } from 'utils/checkForApiError';
import { checkForTokenError } from 'utils/checkForTokenError';
import {
  organizationAtoms,
  useDefaultOrganization,
  useGetOrganizations,
  useSwitchOrganization,
} from '@modules/organization';

export function useGetOrganization() {
  const { defaultOrganization, getDefaultOrganization } =
    useDefaultOrganization();

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

    const shouldUpdateDefault =
      shouldSetDefault &&
      (!organization ||
        (organization?.id && organization?.id !== defaultOrganization?.id));

    console.log('shouldUpdateDefault', {
      shouldUpdateDefault,
      organization,
      defaultOrganization,
      id,
    });

    if (organization) {
      setOrganization(organization);
      if (shouldUpdateDefault)
        switchOrganization(organization.id, organization.name);
    } else {
      try {
        organization = await organizationClient.getOrganization(id);
        checkForTokenError(organization);
        checkForApiError('organization', organization);
        setOrganization(organization);
        if (shouldUpdateDefault)
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
