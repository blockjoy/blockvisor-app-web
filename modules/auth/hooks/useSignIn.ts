import { authClient, setTokenValue, userClient } from '@modules/grpc';
import { useSetRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';
import { isStatusResponse } from '@modules/organization';
import { readToken } from '@shared/utils/readToken';

type SignInParams = {
  email: string;
  password: string;
};

export function useSignIn() {
  const setUser = useSetRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const handleSuccess = async (accessToken: string) => {
    setTokenValue(accessToken); // for grpc

    repository?.saveIdentity({
      accessToken,
    });

    const tokenObject: any = readToken(accessToken);
    const userId = tokenObject.resource_id;

    const userData: any = await userClient.getUser(userId);

    repository?.updateIdentity(userData);
    setUser((current) => ({
      ...current,
      ...userData,
      accessToken,
    }));
  };

  const signIn = async (params?: SignInParams, token?: string) => {
    if (token) {
      await handleSuccess(token);
      return;
    }

    if (params) {
      const response = await authClient.login(params.email, params.password);
      if (!isStatusResponse(response)) {
        await handleSuccess(response!);
      } else {
        throw new ApplicationError('LoginError', 'Login Error');
      }
    } else {
      throw new ApplicationError('LoginError', 'Error signing in');
    }
  };

  return signIn;
}
