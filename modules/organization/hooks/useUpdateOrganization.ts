import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationClient } from '@modules/grpc';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganization } from './useGetOrganization';
import { useDefaultOrganization } from './useDefaultOrganization';

export function useUpdateOrganization(): IUpdateOrganizationHook {
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );
  const [allOrganizations, setAllOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );
  const { setDefaultOrganization } = useDefaultOrganization();

  const { setOrganization } = useGetOrganization();

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const updateOrganization = async (id: string, name: string) => {
    const response: any = await organizationClient.updateOrganization({
      id,
      name,
    });

    if (response) {
      const newOrg: Org = {
        ...selectedOrganization!,
        name,
      };

      modifyOrganization(newOrg);

      return;
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  const modifyOrganization = (updatedOrganization: Org) => {
    if (selectedOrganization) {
      const newOrg: Org = {
        ...selectedOrganization,
        ...updatedOrganization,
      };
      setOrganization(newOrg);
      setSelectedOrganization(newOrg);
    }
    const updatedAllOrgs: Org[] = allOrganizations.map((organization: Org) => {
      if (organization.id === updatedOrganization.id) {
        const updatedNewOrganization: Org = {
          ...organization,
          ...updatedOrganization,
        };
        return updatedNewOrganization;
      }
      return organization;
    });
    setAllOrganizations(updatedAllOrgs);
    if (
      defaultOrganization?.id === updatedOrganization?.id &&
      updatedOrganization?.name
    ) {
      setDefaultOrganization({
        id: defaultOrganization?.id ?? '',
        name: updatedOrganization.name,
      });
    }
  };

  return {
    updateOrganization,
    modifyOrganization,
  };
}
