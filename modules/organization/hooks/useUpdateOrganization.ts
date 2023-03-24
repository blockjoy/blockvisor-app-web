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
    const response = await apiClient.updateOrganization(id, name);

    if (isResponeMetaObject(response)) {
      const newOrg = {
        ...selectedOrganization,
        name,
      };

      setOrganization(newOrg);
      setSelectedOrganization(newOrg);

      const updatedAllOrgs = allOrganizations.map((org: any) => ({
        ...org,
        name: org.id === id ? name : org.name,
      }));

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
