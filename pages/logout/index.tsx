import type { NextPage } from 'next';
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    // TOOD: improve sign out so it doesn't reset the app
    window.location.href = '/';
  }, []);

  return null;
};

export default Logout;
