import { apiClient } from '@modules/client';
import { useRecoilState } from 'recoil';
import { authAtoms } from '../store/authAtoms';
import { isSuccess } from '../utils/authTypeGuards';
import { ApplicationError } from '../utils/Errors';
import { useIdentityRepository } from './useIdentityRepository';

export function useSignIn() {
  const [, setUser] = useRecoilState(authAtoms.user);
  const repository = useIdentityRepository();

  const signIn = async (email: string, password: string) => {
    const response = await apiClient.login(email, password);
    if (isSuccess(response)) {
      apiClient.setTokenValue(response.value);
      repository?.saveIdentity({
        accessToken: response.value,
        // for demo purposes only, this will be set later
        verified: true,
      });

      const userData: any = await apiClient.getUser();
      repository?.updateIdentity(userData);
      setUser((current) => ({ ...current, ...userData }));
    } else {
      throw new ApplicationError('LoginError', response?.message ?? '');
    }
  };

  return signIn;
}
