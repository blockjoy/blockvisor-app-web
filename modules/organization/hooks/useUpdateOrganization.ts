import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export function useUpdateOrganization() {
  const [selectedOrganization, setSelectedOrganization] =  useRecoilState(organizationAtoms.selectedOrganization);
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
      const newOrg = {
        ...selectedOrganization,
        name,
      };
      setSelectedOrganization(newOrg);

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
