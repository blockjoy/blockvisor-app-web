import { authAtoms } from '@modules/auth/store/authAtoms';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useIdentityRepository } from './useIdentityRepository';

export const useIdentity = () => {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const [loading, setLoading] = useRecoilState(authAtoms.loading);
  const repository = useIdentityRepository();

  const checkUser = () => {
    setLoading('loading');
    const user = repository?.getIdentity();

    if (user) {
      setUser(user);
    }
    setLoading('finished');
  };

  useEffect(() => {
    checkUser();
  }, []);

  return {
    isLoggedIn: Boolean(repository?.getIdentity()?.accessToken),
    isVerified: Boolean(repository?.getIdentity()?.verified),
    isLoading: loading === 'initializing' || loading === 'loading',
    isDone: loading === 'finished',
    user,
    state: loading,
  };
};
