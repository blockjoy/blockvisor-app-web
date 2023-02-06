import { apiClient } from '@modules/client';
import { useSetRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';
import { isStatusResponse } from '@modules/organization';

type SignInParams = {
  email: string;
  password: string;
};

export function useSignIn() {
  const setUser = useSetRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const handleSuccess = async (accessToken: string) => {
    apiClient.setTokenValue(accessToken);
    repository?.saveIdentity({
      accessToken,
      // for demo purposes only, this will be set December 2045
      verified: true,
    });

    const userData: any = await apiClient.getUser();
    repository?.updateIdentity(userData);
    setUser((current) => ({
      ...current,
      ...userData,
      accessToken,
    }));
  };

  const signIn = async (params?: SignInParams, token?: string) => {
    if (token) {
      handleSuccess(token);
      return;
    }

    if (params) {
      const response: any = await apiClient.login(
        params.email,
        params.password,
      );
      if (!isStatusResponse(response)) {
        const accessToken = response.value;
        handleSuccess(accessToken);
      } else {
        throw new ApplicationError('LoginError', response?.message ?? '');
      }
    } else {
      throw new ApplicationError('LoginError', 'Error signing in');
    }
  };

  return signIn;
}
