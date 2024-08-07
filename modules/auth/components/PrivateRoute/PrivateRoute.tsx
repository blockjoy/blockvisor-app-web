import { Router } from 'next/router';
import { UrlObject } from 'url';
import { ReactNode, useEffect, useState } from 'react';
import { useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { PUBLIC_ROUTES, ROUTES } from '@shared/constants/routes';

interface PrivateRouteProps {
  router: Router;
  children?: ReactNode;
}

export function PrivateRoute({ router, children }: PrivateRouteProps) {
  const { isLoggedIn, isLoading } = useIdentity();
  const [authorized, setAuthorized] = useState(false);

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

  function authCheck(loggedIn: boolean) {
    if (!loggedIn && isPrivateRoute) {
      setAuthorized(false);

      const url: UrlObject = { pathname: ROUTES.LOGIN };

      const redirect = router._inFlightRoute || router.asPath;
      if (redirect !== '/') url.query = { redirect };

      router.push(url);
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
