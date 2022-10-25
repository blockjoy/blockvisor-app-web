import { authAtoms } from '@modules/auth/store/authAtoms';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BrowserStorage } from '../utils/BrowserStorage';
import { IdentityRepository } from '../utils/IdentityRepository';

export const useAuth = () => {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const isBrowser = () => typeof window !== 'undefined';
  const repository = useMemo(() => {
    if (isBrowser()) {
      const storage = new BrowserStorage<User>(localStorage, JSON);
      return new IdentityRepository(storage);
    }
  }, []);
  const [status, setStauts] =
    useState<'checking' | 'finished' | 'initializing'>('initializing');

  const signOut = () => {
    setStauts('checking');
    repository?.delete();
    setStauts('finished');
  };

  const checkUser = () => {
    setStauts('checking');
    const user = repository?.get();

    if (user) {
      setUser(user);
    }
    setStauts('finished');
  };

  useEffect(() => {
    checkUser();
  }, []);

  return {
    isLoggedIn: Boolean(user?.accessToken),
    isVerified: Boolean(user?.verified),
    status: status,
    signOut,
  };
};
