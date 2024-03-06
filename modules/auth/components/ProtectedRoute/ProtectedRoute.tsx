import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';

interface Props {
  children?: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const { isSuperUser, permissionsLoadingState } = usePermissions();

  useEffect(() => {
    if (!isSuperUser && permissionsLoadingState === 'finished') {
      router.push(ROUTES.NOT_FOUND);
    }
  }, [isSuperUser, permissionsLoadingState]);

  return !isSuperUser ? <LoadingSpinner size="page" /> : <>{children}</>;
}
