import { useIdentity } from '@modules/auth';
import { LoadingSpinner, PUBLIC_ROUTES, ROUTES } from '@shared/index';
import { useEffect, useState } from 'react';

interface Props {
  router: any;
  children?: any;
}

export function PrivateRoute({ router, children }: Props) {
  const { isLoggedIn, isLoading } = useIdentity();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck(router.asPath, isLoggedIn);

    const hideContent = () => {
      setAuthorized(false);
    };

    if (!isLoggedIn && !PUBLIC_ROUTES.includes(router.asPath)) {
      router.events.on('routeChangeStart', hideContent);

      router.events.on('routeChangeComplete', authCheck);

      return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
      };
    }
  }, [isLoggedIn]);

  function authCheck(url: any, loggedIn: boolean): any {
    const path = url.split('?')[0];
    if (!loggedIn && !PUBLIC_ROUTES.includes(path)) {
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
    <>{isLoading || !authorized ? <LoadingSpinner size="page" /> : children}</>
  );
}
