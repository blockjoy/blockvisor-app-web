import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';

interface Props {
  children?: any;
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const { isSuperUser } = useIdentity();

  useEffect(() => {
    if (!isSuperUser) {
      router.push(ROUTES.NOT_FOUND, undefined, {
        shallow: true,
      });
    }
  }, [router.isReady, isSuperUser]);

  return !isSuperUser ? <LoadingSpinner size="page" /> : children;
}
