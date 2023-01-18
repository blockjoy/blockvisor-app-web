import { apiClient } from '@modules/client';
import { useGetBlockchains } from '@modules/node';
import { useRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';

export function useSignIn() {
  const [, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();
  const { getBlockchains } = useGetBlockchains();

  const signIn = async (email: string, password: string) => {
    const response = await apiClient.login(email, password);

    console.log('loginResponse', response);

    if (isSuccess(response)) {
      apiClient.setTokenValue(response.value);
      repository?.saveIdentity({
        accessToken: response.value,
        // for demo purposes only, this will be set later
        verified: true,
      });

      // fetch blockchains async
      console.log('getting blockchains');
      getBlockchains();

      const userData: any = await apiClient.getUser();
      repository?.updateIdentity(userData);
      setUser((current) => ({ ...current, ...userData }));
    } else {
      throw new ApplicationError('LoginError', response?.message ?? '');
    }
  };

  return signIn;
}
