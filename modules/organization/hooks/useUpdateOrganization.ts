import { Organization } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { isResponeMetaObject } from '@modules/auth';
import { ApplicationError } from '@modules/auth/utils/Errors';
import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { organisationAtoms } from '../store/organizationAtoms';

export function useUpdateOrganization() {
  const [loadingState, setLoadingState] = useRecoilState(
    organisationAtoms.organizationLoadingState,
  );

  const updateOrganization = async (id: string, name: string) => {
    setLoadingState('loading');
    const organisation = new Organization();
    organisation.setName(name);
    organisation.setId(id);
    const response = await apiClient.updateOrganization(organisation);

    if (isResponeMetaObject(response)) {
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
