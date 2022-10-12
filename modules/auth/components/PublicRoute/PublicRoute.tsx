import { Routes, useAuth } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PublicRoute({ children }: Props) {
  const router = useRouter();
  const { isLoggedIn, status } = useAuth();

  useEffect(() => {
    if (status === 'finished' && isLoggedIn) {
      router.push(Routes.dashboard);
    }
  }, [status]);

  if (status === 'checking') {
    return <LoadingSpinner size="page" />;
  }

  return <>{children}</>;
}
