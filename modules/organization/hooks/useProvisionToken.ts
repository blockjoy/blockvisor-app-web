import { useIdentityRepository } from '@modules/auth';
import { organizationClient } from '@modules/grpc';
import { useRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';

export const useProvisionToken = () => {
  const repository = useIdentityRepository();
  const [provisionToken, setProvisionToken] = useRecoilState(
    organizationAtoms.provisionToken,
  );
  const [provisionTokenLoadingState, setProvisionTokenLoadingState] =
    useRecoilState(organizationAtoms.provisionTokenLoadingState);

  const getProvisionToken = async (orgId: string) => {
    const userId = repository?.getIdentity()?.id;

    try {
      const response: any = await organizationClient.getProvisionToken(
        userId!,
        orgId!,
      );

      checkForTokenError(response);
      setProvisionToken(response.token);
    } catch (err) {
      console.log('getProvisionTokenError', err);
    }
  };

  const resetProvisionToken = async (orgId: string) => {
    const userId = repository?.getIdentity()?.id;

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
