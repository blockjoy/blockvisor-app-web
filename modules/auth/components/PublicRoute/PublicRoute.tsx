import { Routes, useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PublicRoute({ children }: Props) {
  const router = useRouter();
  const { isLoggedIn, status, isDone, isLoading } = useIdentity();

  useEffect(() => {
    if (isDone && isLoggedIn) {
      router.push(Routes.dashboard);
    }
  }, [status]);

  if (isLoading) {
    return <LoadingSpinner size="page" />;
  }

  return <>{children}</>;
}
