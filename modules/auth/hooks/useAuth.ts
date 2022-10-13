import { authAtoms } from '@modules/auth/store/authAtoms';
import { deleteUser, getUser } from '@shared/utils/browserStorage';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useAuth = () => {
  const [user, setUser] = useRecoilState(authAtoms.user);
  const [status, setStauts] =
    useState<'checking' | 'finished' | 'initializing'>('initializing');

  const signOut = () => {
    setStauts('checking');
    deleteUser();
    //setUser(null);
    setStauts('finished');
  };

  const checkUser = () => {
    setStauts('checking');
    const user = getUser();

    if (user) {
      setUser(user);
    }
    setStauts('finished');
  };

  useEffect(() => {
    console.log('checking');
    checkUser();
  }, []);

  return {
    isLoggedIn: Boolean(user?.accessToken),
    isVerified: Boolean(user?.verified),
    status: status,
    signOut,
  };
};
