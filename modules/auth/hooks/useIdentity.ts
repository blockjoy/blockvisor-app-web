import { authAtoms } from '@modules/auth/store/authAtoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export type UseIdentity = {
  isLoggedIn: boolean;
  isVerified: boolean;
  isLoading: boolean;
  isDone: boolean;
  user: User | null;
  state: string;
};
export const useIdentity = (): UseIdentity => {
  const user = useRecoilValue(authAtoms.user);
  const [loading, setLoading] = useState<string>('initializing');

  useEffect(() => {
    setLoading('finished');
  }, []);

  return {
    isLoggedIn: Boolean(user?.accessToken),
    isVerified: Boolean(user?.verified),
    isLoading: loading === 'initializing',
    isDone: loading === 'finished',
    user,
    state: loading,
  };
};
