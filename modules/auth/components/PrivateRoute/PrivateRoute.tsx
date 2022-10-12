import { isUserLoggedIn, isUserVerified, Routes } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { getUser } from '@shared/utils/browserStorage';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();

  const authCheck = (user: User | null) => {
    if (!isUserLoggedIn(user)) {
      router.push(Routes.login);
      return;
    }
    if (!isUserVerified(user)) {
      router.replace(Routes.verify, undefined, { shallow: true });
      return;
    }
  };

  useEffect(() => {
    authCheck(getUser());
  }, [router.pathname]);

  if (isUserVerified(getUser())) {
    return <>{children}</>;
  }

  return <LoadingSpinner size="page" />;
}
