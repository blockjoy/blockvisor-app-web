import { useIdentityRepository } from '@modules/auth';
import { organizationClient } from '@modules/grpc';
import { useRecoilState } from 'recoil';
import { organizationAtoms } from '../store/organizationAtoms';

export const useProvisionToken = () => {
  const repository = useIdentityRepository();
  const [provisionToken, setProvisionToken] = useRecoilState(
    organizationAtoms.provisionToken,
  );
  const [provisionTokenLoadingState, setProvisionTokenLoadingState] =
    useRecoilState(organizationAtoms.provisionTokenLoadingState);

  const getProvisionToken = async () => {
    const userId = repository?.getIdentity()?.id;
    const orgId = repository?.getIdentity()?.defaultOrganization?.id;

    try {
      const response: any = await organizationClient.getProvisionToken(
        userId!,
        orgId!,
      );

      setProvisionToken(response.token);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const resetProvisionToken = async () => {
    const userId = repository?.getIdentity()?.id;
    const orgId = repository?.getIdentity()?.defaultOrganization?.id;

    setProvisionTokenLoadingState('loading');

    try {
      const response: any = await organizationClient.resetProvisionToken(
        userId!,
        orgId!,
      );

      setProvisionToken(response.token);
    } catch (error: any) {
      console.log('error', error);
    } finally {
      setProvisionTokenLoadingState('finished');
    }
  };

  return {
    provisionToken,
    provisionTokenLoadingState,
    getProvisionToken,
    resetProvisionToken,
  };
};
