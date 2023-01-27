import { useIdentity } from '@modules/auth';
import { ROUTES } from '@shared/index';
import { useEffect, useState } from 'react';

interface Props {
  router: any;
  children?: any;
}

export function PrivateRoute({ router, children }: Props) {
  const { isLoggedIn } = useIdentity();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      authCheck(router.asPath, isLoggedIn);

      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);

      router.events.on('routeChangeComplete', authCheck);

      return () => {
        router.events.off('routeChangeStart', hideContent);
        router.events.off('routeChangeComplete', authCheck);
      };
    } else {
      setAuthorized(true);
    }
  }, []);

  function authCheck(url: any, loggedIn: boolean): any {
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    if (!loggedIn && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: ROUTES.LOGIN,
        query: { redirect: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return <>{authorized && children}</>;
}
