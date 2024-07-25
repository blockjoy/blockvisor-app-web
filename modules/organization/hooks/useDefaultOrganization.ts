import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usePathname } from 'next/navigation';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { SortOrder } from '@modules/grpc/library/blockjoy/common/v1/search';
import { settingsAtoms, useSettings } from '@modules/settings';
import { sort } from '@shared/components';
import { organizationSelectors } from '@modules/organization';

export function useDefaultOrganization() {
  const pathname = usePathname();

  const defaultOrganization = useRecoilValue(
    organizationSelectors.defaultOrganization,
  );
  const setAppLoadingState = useSetRecoilState(settingsAtoms.appLoadingState);

  const { updateSettings } = useSettings();

  const getDefaultOrganization = async (
    organizations: Org[],
    userId?: string,
  ) => {
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

      setDefaultOrganization(newDefaultOrg, userId);

      return newDefaultOrg;
    }
  };

  const setDefaultOrganization = async (
    organization: DefaultOrganization,
    userId?: string,
  ) => {
    if (['/nodes', '/hosts'].some((path) => pathname?.includes(path)))
      setAppLoadingState('loading');

    await updateSettings(
      'organization',
      { default: organization },
      undefined,
      userId,
    );
  };

  return {
    defaultOrganization,
    getDefaultOrganization,
    setDefaultOrganization,
  };
}
