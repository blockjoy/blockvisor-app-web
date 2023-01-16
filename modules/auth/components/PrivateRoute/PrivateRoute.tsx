import { Routes, useIdentity } from '@modules/auth';
import { EmptyColumn, LoadingSpinner } from '@shared/components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { spacing } from 'styles/utils.spacing.styles';

interface Props {
  children?: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const router = useRouter();

  const gotoPath = router.pathname;

  const { isLoggedIn, isVerified, isDone, isLoading, state } = useIdentity();

  useEffect(() => {
    if (isDone && !isLoggedIn) {
      router.push(`${Routes.login}?redirect=${gotoPath}`);
      return;
    }
  }, [router.pathname, state]);

  if (isLoading) {
    return <LoadingSpinner size="page" />;
  }

  if (isLoggedIn) {
    return (
      <>
        {' '}
        {window.navigator.onLine ? (
          children
        ) : (
          <div css={[spacing.left.large, spacing.top.xxxLarge]}>
            <EmptyColumn
              title="No Internet Connection"
              description="Once connected please refresh the app."
            />
          </div>
        )}
      </>
    );
  }

  return null;
}
