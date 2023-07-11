import { useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { PUBLIC_ROUTES, ROUTES } from '@shared/constants/routes';
import { useEffect, useState } from 'react';

interface Props {
  router: any;
  children?: any;
}

export function PrivateRoute({ router, children }: Props) {
  const { isLoggedIn, isLoading } = useIdentity();
  const [authorized, setAuthorized] = useState(false);

  const isPrivateRoute = !PUBLIC_ROUTES.some((r) => router.asPath.includes(r));

  useEffect(() => {
    if (!router.state) {
      return;
    }

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

  function authCheck(loggedIn: boolean): any {
    if (!loggedIn && isPrivateRoute) {
      setAuthorized(false);
      const redirect = router._inFlightRoute || router.asPath;
      router.push({
        pathname: ROUTES.LOGIN,
        query: { redirect },
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
