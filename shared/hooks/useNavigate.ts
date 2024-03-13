import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useNavigate = () => {
  const router = useRouter();
  const [navigationCallback, setNavigationCallback] =
    useState<VoidFunction | null>(null);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (navigationCallback) {
        navigationCallback();
        setNavigationCallback(null);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [navigationCallback, router.events]);

  const navigate = useCallback(
    async (path: string, callback: VoidFunction) => {
      setNavigationCallback(() => callback);

      const result = await router.push(path);

      if (!result) {
        callback();
        setNavigationCallback(null);
      }
    },
    [router],
  );

  return { navigate };
};
