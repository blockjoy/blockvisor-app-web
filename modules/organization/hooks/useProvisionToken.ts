import { useIdentityRepository } from '@modules/auth';
import { organizationClient } from '@modules/grpc';
import { useRecoilState } from 'recoil';
import { checkForTokenError } from 'utils/checkForTokenError';
import { organizationAtoms } from '../store/organizationAtoms';
import { useDefaultOrganization } from './useDefaultOrganization';

export const useProvisionToken = () => {
  const repository = useIdentityRepository();
  const [provisionToken, setProvisionToken] = useRecoilState(
    organizationAtoms.provisionToken,
  );
  const [provisionTokenLoadingState, setProvisionTokenLoadingState] =
    useRecoilState(organizationAtoms.provisionTokenLoadingState);

  const { defaultOrganization } = useDefaultOrganization();

  const orgId = defaultOrganization?.id;

  const getProvisionToken = async () => {
    const userId = repository?.getIdentity()?.id;

    const response: any = await organizationClient.getProvisionToken(
      userId!,
      orgId!,
    );

    checkForTokenError(response);

    setProvisionToken(response.token);
  };

  const resetProvisionToken = async () => {
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
