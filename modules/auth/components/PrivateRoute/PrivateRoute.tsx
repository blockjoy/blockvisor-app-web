import { useIdentity } from '@modules/auth';
import { useRefreshToken } from '@modules/auth/hooks/useRefreshToken';
import { LoadingSpinner, PUBLIC_ROUTES, ROUTES } from '@shared/index';
import { useEffect, useState } from 'react';

interface Props {
  router: any;
  children?: any;
}

export function PrivateRoute({ router, children }: Props) {
  const { isLoggedIn, isLoading } = useIdentity();
  const [authorized, setAuthorized] = useState(false);
  const { refreshToken, removeRefreshTokenCall } = useRefreshToken();

  const isPrivateRoute = !PUBLIC_ROUTES.some((r) => router.asPath.includes(r));

  useEffect(() => {
    authCheck(isLoggedIn);

    const hideContent = () => {
      setAuthorized(false);
    };

    if (!isLoggedIn && isPrivateRoute) {
      router.events.on('routeChangeStart', hideContent);

      router.events.on('routeChangeComplete', authCheck);

      return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
      };
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) refreshToken();
    return () => {
      removeRefreshTokenCall();
    };
  });

  function authCheck(loggedIn: boolean): any {
    if (!loggedIn && isPrivateRoute) {
      setAuthorized(false);
      router.push({
        pathname: ROUTES.LOGIN,
        query: { redirect: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      {isLoading || (!authorized && isPrivateRoute) ? (
        <LoadingSpinner size="page" />
      ) : (
        children
      )}
    </>
  );
}
