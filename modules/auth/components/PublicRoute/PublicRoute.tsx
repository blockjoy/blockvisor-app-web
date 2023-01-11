'use client';
import { useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PublicRoute({ children }: Props) {
  const router = useRouter();
  const { isLoggedIn, state, isDone } = useIdentity();

  useEffect(() => {
    if (isDone && isLoggedIn) {
      router.push('/nodes');
    }
  }, [state, isDone]);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return <LoadingSpinner size="page" />;
}
