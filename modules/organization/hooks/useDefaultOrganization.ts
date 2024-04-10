import { useRecoilState } from 'recoil';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { sort } from '@shared/components';
import { organizationAtoms } from '@modules/organization';

export function useDefaultOrganization() {
  const [defaultOrganization, setDefaultOrganization] = useRecoilState(
    organizationAtoms.defaultOrganization,
  );

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
        order: SortOrder.SORT_ORDER_ASCENDING,
      })[0];

      const newDefaultOrg = {
        name: firstOrgInList.name,
        id: firstOrgInList.id,
      };

      setDefaultOrganization(newDefaultOrg);

      return newDefaultOrg;
    }
  };

  return {
    defaultOrganization,
    getDefaultOrganization,
    setDefaultOrganization,
  };
}
