import { ApplicationError } from '@modules/auth/utils/Errors';
import { Org } from '@modules/grpc/library/blockjoy/v1/org';
import { organizationClient } from '@modules/grpc';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  organizationAtoms,
  useGetOrganization,
  useDefaultOrganization,
  organizationSelectors,
} from '@modules/organization';

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
    organizationSelectors.defaultOrganization,
  );

  const updateOrganization = async (orgId: string, name: string) => {
    const response: any = await organizationClient.updateOrganization({
      orgId,
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
      if (organization.orgId === updatedOrganization.orgId) {
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
      defaultOrganization?.orgId === updatedOrganization?.orgId &&
      updatedOrganization?.name
    ) {
      setDefaultOrganization({
        orgId: defaultOrganization?.orgId ?? '',
        name: updatedOrganization.name,
      });
    }
  };

  return {
    updateOrganization,
    modifyOrganization,
  };
}
