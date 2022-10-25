import { User as ApiUser } from '@blockjoy/blockjoy-grpc/dist/out/common_pb';
import { authAtoms } from '@modules/auth/store/authAtoms';
import { apiClient } from '@modules/client';
import { isStatusResponse } from '@modules/organizations';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isSuccess } from '../utils/authTypeGuards';
import { BrowserStorage } from '../utils/BrowserStorage';
import { EditUserError, LoginError } from '../utils/Errors';
import { IdentityRepository } from '../utils/IdentityRepository';

type Loading = 'loading' | 'done' | 'initializing';

export const useIdentity = () => {
  const [, setUser] = useRecoilState(authAtoms.user);
  const isBrowser = () => typeof window !== 'undefined';
  const [status, setStatus] = useState<Loading>('initializing');

  const repository = useMemo(() => {
    if (isBrowser()) {
      const storage = new BrowserStorage<User>(localStorage, JSON);
      return new IdentityRepository(storage);
    }
  }, []);

  const signOut = () => {
    setStatus('loading');
    repository?.deleteIdentity();
    setStatus('done');
  };

  const editUser = async (firstName: string, lastName: string, id: string) => {
    const user = new ApiUser();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setId(id ?? '');

    const response: any = await apiClient.updateUser(user);

    if (isStatusResponse(response)) {
      throw new EditUserError('EditUserError', response.message);
    } else {
      setUser((current) => ({ ...current, ...response }));
      repository?.updateIdentity({ ...response });
    }
  };

  const signIn = async (email: string, password: string) => {
    setStatus;
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
      throw new LoginError('LoginError', response?.message ?? '');
    }
  };

  const checkUser = () => {
    setStatus('loading');
    const user = repository?.getIdentity();

    if (user) {
      setUser(user);
    }
    setStatus('done');
  };

  useEffect(() => {
    checkUser();
  }, []);

  return {
    isLoggedIn: Boolean(repository?.getIdentity()?.accessToken),
    isVerified: Boolean(repository?.getIdentity()?.verified),
    status: status,
    isLoading: status === 'initializing' || status === 'loading',
    isDone: status === 'done',
    editUser,
    signOut,
    signIn,
  };
};
