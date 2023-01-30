import { useIdentity } from '@modules/auth';
import { EmptyColumn, LoadingSpinner } from '@shared/components';
import { ROUTES } from '@shared/index';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { spacing } from 'styles/utils.spacing.styles';

interface Props {
  children?: ReactNode;
}

export function PublicRoute({ children }: Props) {
  const router = useRouter();
  const { isLoading, isLoggedIn } = useIdentity();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(ROUTES.DEFAULT);
    }
  }, []);

  return (
    <>
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
