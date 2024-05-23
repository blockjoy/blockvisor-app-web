import { PropsWithChildren, useEffect } from 'react';
import { useIdentity } from '@modules/auth';
import { EmptyColumn } from '@shared/components';
import { ROUTES } from '@shared/constants/routes';
import { useRouter } from 'next/router';
import { spacing } from 'styles/utils.spacing.styles';

export function PublicRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { redirect } = router.query;
  const { isLoggedIn } = useIdentity();

  useEffect(() => {
    if (router.isReady && isLoggedIn) {
      router.push(redirect?.toString() || ROUTES.DEFAULT);
    }
  }, [router.isReady]);

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
