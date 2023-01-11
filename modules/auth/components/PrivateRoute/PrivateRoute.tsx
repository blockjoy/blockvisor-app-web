'use client';

import { useIdentity } from '@modules/auth';
import { LoadingSpinner } from '@shared/components';
import { ROUTES } from '@shared/index';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isDone, state } = useIdentity();

  useEffect(() => {
    if (isDone && !isLoggedIn) {
      router.push(ROUTES.LOGIN);
      return;
    }

    // disabled for now
    /*  if (isDone && !isVerified) {
      router.push(Routes.verify);
      return;
    } */
  }, [pathname, state]);

  if (isDone && isLoggedIn) {
    return <>{children}</>;
  }

  return <LoadingSpinner size="page" />;
}
