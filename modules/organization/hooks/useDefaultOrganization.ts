import { useRecoilValue } from 'recoil';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { useSettings } from '@modules/settings';
import { sort } from '@shared/components';
import { organizationSelectors } from '@modules/organization';

export function useDefaultOrganization() {
  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );

  const { updateSettings } = useSettings();

  const getDefaultOrganization = async (organizations: Org[]) => {
    const doesLocalStorageDefaultOrgExistInList = organizations.find(
      (org) => org.id === defaultOrganization?.id,
    );

    if (
      organizations?.length &&
      (!defaultOrganization || !doesLocalStorageDefaultOrgExistInList)
    ) {
      const firstOrgInList = sort(organizations, {
        field: 'name',
        order: 'asc',
      })[0];

      const newDefaultOrg = {
        name: firstOrgInList.name,
        id: firstOrgInList.id,
      };

      setDefaultOrganization(newDefaultOrg);

      return newDefaultOrg;
    }
  };

  const setDefaultOrganization = async (organization: DefaultOrganization) => {
    await updateSettings('organization', {
      default: organization,
    });
  };

  return {
    defaultOrganization,
    getDefaultOrganization,
    setDefaultOrganization,
  };
}
