import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDefaultOrganization } from './useDefaultOrganization';
import { useSetDefaultOrganization } from './useSetDefaultOrganization';

export function useUpdateOrganization() {
  const selectedOrganization =  useRecoilValue(organizationAtoms.selectedOrganization);
  const [allOrganizations, setAllOrganizations] = useRecoilState(organizationAtoms.allOrganizations);
  const { defaultOrganization } = useDefaultOrganization();
  const { setDefaultOrganization } = useSetDefaultOrganization();

  const [loadingState, setLoadingState] = useRecoilState(
    organizationAtoms.organizationLoadingState,
  );

  const updateOrganization = async (name: string) => {
    setLoadingState('loading');

    const organization = new Organization();
    organization.setName(name);
    organization.setId(selectedOrganization?.id ?? '');
    const response = await apiClient.updateOrganization(organization);

    if (isResponeMetaObject(response)) {
      const updatedAllOrgs = allOrganizations.map(org => {
        if (org.id === selectedOrganization?.id) 
          return {
            ...org,
            name,
          };

        return org;
      });

      setAllOrganizations(updatedAllOrgs);

      if (defaultOrganization?.id === selectedOrganization?.id) {
        setDefaultOrganization(
          selectedOrganization?.id ?? '',
          name
        );
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
