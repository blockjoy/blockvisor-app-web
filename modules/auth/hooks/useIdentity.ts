import { authAtoms } from '@modules/auth/store/authAtoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useIdentity = () => {
  const user = useRecoilValue(authAtoms.user);
  const [loading, setLoading] = useState<string>('initializing');

  useEffect(() => {
    setLoading('finished');
  }, []);

  return {
    isLoggedIn: Boolean(user?.accessToken),
    isLoading: loading === 'initializing',
    isDone: loading === 'finished',
    user,
    state: loading,
  };
};
