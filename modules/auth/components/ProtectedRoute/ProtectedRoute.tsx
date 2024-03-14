import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAtoms, authSelectors } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { useRecoilValue } from 'recoil';

interface Props {
  children?: ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const isSuperUser = useRecoilValue(authSelectors.isSuperUser);
  const permissionsLoadingState = useRecoilValue(
    authAtoms.permissionsLoadingState,
  );

  useEffect(() => {
    if (!isSuperUser && permissionsLoadingState === 'finished') {
      router.push(ROUTES.NOT_FOUND);
    }
  }, [isSuperUser, permissionsLoadingState]);

  return !isSuperUser ? <LoadingSpinner size="page" /> : <>{children}</>;
}
