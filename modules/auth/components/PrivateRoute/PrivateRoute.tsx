import { Routes, useAuth } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const { isLoggedIn, isVerified, status } = useAuth();

  useEffect(() => {
    if (status === 'finished' && !isLoggedIn) {
      router.push(Routes.login);
      return;
    }

    if (status === 'finished' && !isVerified) {
      router.push(Routes.verify);
      return;
    }
  }, [router.pathname, status]);

  if (status !== 'finished') {
    return <LoadingSpinner size="page" />;
  }

  if (isVerified && isLoggedIn) {
    return <>{children}</>;
  }

  return null;
}
