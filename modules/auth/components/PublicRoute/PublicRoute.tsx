import { isUserLoggedIn, Routes } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { getUser } from '@shared/utils/browserStorage';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PublicRoute({ children }: Props) {
  const router = useRouter();

  const authCheck = (user: User | null) => {
    if (isUserLoggedIn(user)) {
      router.push(Routes.dashboard);
      return;
    }
  };

  useEffect(() => {
    authCheck(getUser());
  }, []);

  if (!isUserLoggedIn(getUser())) {
    return <>{children}</>;
  }

  return <LoadingSpinner size="page" />;
}
