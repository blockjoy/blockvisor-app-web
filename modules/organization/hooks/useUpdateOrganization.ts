import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useGetOrganization } from './useGetOrganization';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useUpdateOrganization() {
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
    const organization = new Organization();
    organization.setName(name);
    organization.setId(id);
    const response = await apiClient.updateOrganization(organization);

    console.log('updateOrganization', response, isResponeMetaObject(response));

    if (isResponeMetaObject(response)) {
      const newOrg = {
        ...selectedOrganization,
        name,
      };

      setOrganization(newOrg);
      setSelectedOrganization(newOrg);

      console.log('test');

      const updatedAllOrgs = allOrganizations.map((org: any) => ({
        ...org,
        name: org.id === id ? name : org.name,
      }));

      console.log('updateAllOrgs', updatedAllOrgs);

      setAllOrganizations(updatedAllOrgs);

      if (defaultOrganization?.id === selectedOrganization?.id) {
        setDefaultOrganization(selectedOrganization?.id ?? '', name);
      }
      return;
    } else {
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  return {
    updateOrganization,
  };
}
