import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useUpdateOrganization() {
  const [selectedOrganization, setSelectedOrganization] = useRecoilState(
    organizationAtoms.selectedOrganization,
  );
  const [allOrganizations, setAllOrganizations] = useRecoilState(
    organizationAtoms.allOrganizations,
  );
  const { setDefaultOrganization } = useSetDefaultOrganization();

  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const defaultOrganization = useRecoilValue(
    organizationAtoms.defaultOrganization,
  );

  const updateOrganization = async (id: string, name: string) => {
    setLoadingState('loading');

    const organization = new Organization();
    organization.setName(name);
    organization.setId(id);
    const response = await apiClient.updateOrganization(organization);

    if (isResponeMetaObject(response)) {
      const newOrg = {
        ...selectedOrganization,
        name,
      };

      setSelectedOrganization(newOrg);

      const updatedAllOrgs = allOrganizations.map((org) => {
        if (org.id === selectedOrganization?.id)
          return {
            ...org,
            name,
          };

        return org;
      });

      setAllOrganizations(updatedAllOrgs);

      if (defaultOrganization?.id === selectedOrganization?.id) {
        setDefaultOrganization(selectedOrganization?.id ?? '', name);
      }

      setLoadingState('finished');
      return;
    } else {
      setLoadingState('finished');
      throw new ApplicationError('UpdateOrganization', 'Update failed');
    }
  };

  return {
    updateOrganization,
    loading: loadingState === 'initializing' || loadingState === 'loading',
  };
}
