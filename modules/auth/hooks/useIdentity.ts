import { authAtoms } from '@modules/auth/store/authAtoms';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useIdentityRepository } from './useIdentityRepository';

type Loading = 'loading' | 'done' | 'initializing';

export const useIdentity = () => {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const [status, setStatus] = useState<Loading>('initializing');
  const repository = useIdentityRepository();

  const signOut = () => {
    setStatus('loading');
    repository?.deleteIdentity();
    setStatus('done');
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
    isLoading: status === 'initializing' || status === 'loading',
    isDone: status === 'done',
    user,
    status,
    signOut,
  };
};
