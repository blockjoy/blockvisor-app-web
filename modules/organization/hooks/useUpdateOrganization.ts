import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganization } from './useGetOrganization';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useUpdateOrganization(): IUpdateOrganizationHook {
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );
  const [allOrganizations, setAllOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );
  const { setDefaultOrganization } = useSetDefaultOrganization();

  const { setOrganization } = useGetOrganization();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const updateOrganization = async (id: string, name: string) => {
    const response: any = await apiClient.updateOrganization(id, name);

    if (isResponeMetaObject(response)) {
      const newOrg: ClientOrganization = {
        ...selectedOrganization,
        name,
      };

      modifyOrganization(newOrg);

      return;
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  const modifyOrganization = (updatedOrganization: ClientOrganization) => {
    const updatedOrganizationModified =
      typeof updatedOrganization.currentUser === 'undefined'
        ? Object.fromEntries(
            Object.entries(updatedOrganization).filter(
              ([key]) => key !== 'currentUser',
            ),
          )
        : updatedOrganization;

    if (selectedOrganization) {
      const newOrg: ClientOrganization = {
        ...selectedOrganization,
        ...updatedOrganizationModified,
      };

      setOrganization(newOrg);
      setSelectedOrganization(newOrg);
    }

    const updatedAllOrgs: ClientOrganization[] = allOrganizations.map(
      (organization: ClientOrganization) => {
        if (organization.id === updatedOrganizationModified.id) {
          const updatedNewOrganization: ClientOrganization = {
            ...organization,
            ...updatedOrganizationModified,
          };

          return updatedNewOrganization;
        }
        return organization;
      },
    );

    setAllOrganizations(updatedAllOrgs);

    if (
      defaultOrganization?.id === updatedOrganization?.id &&
      updatedOrganization?.name
    ) {
      setDefaultOrganization(
        defaultOrganization?.id ?? '',
        updatedOrganization.name,
      );
    }
  };

  return {
    updateOrganization,
    modifyOrganization,
  };
}
