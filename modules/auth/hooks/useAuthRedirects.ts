import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authSelectors } from '../store/selectors';

/**
 * Use Authentication Redirects Hook
 * @name useAuthRedirects
 * @description Hook that is used to redirect to the auth page if the user is not authenticated.
 */

export const useAuthRedirects = () => {
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(authSelectors.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.userUid === null) {
      router.replace('/login');
      setLoading(false);
    }

    if (user?.userUid) {
      router.replace('/');
      setLoading(false);
    }
  }, [user?.userUid]);

  return { loading };
};
