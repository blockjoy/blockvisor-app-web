import { Routes, useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const { isLoggedIn, isVerified, isDone, isLoading, state } = useIdentity();

  useEffect(() => {
    if (isDone && !isLoggedIn) {
      router.push(Routes.login);
      return;
    }

    if (isDone && !isVerified) {
      router.push(Routes.verify);
      return;
    }
  }, [router.pathname, state]);

  if (isLoading) {
    return <LoadingSpinner size="page" />;
  }

  if (isVerified && isLoggedIn) {
    return <>{children}</>;
  }

  return null;
}
