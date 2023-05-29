import { useHostView } from '@modules/host/hooks/useHostView';
import { EmptyColumn, TableSkeleton } from '@shared/components';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { wrapper } from 'styles/wrapper.styles';
import { styles } from './HostView.styles';
import { HostViewHeader } from './HostViewHeader/HostViewHeader';
import { HostViewTabs } from './HostViewTabs/HostViewTabs';
import { HostViewTitle } from './HostViewTitle/HostViewTitle';

type HostViewProps = {
  children: ReactNode;
};

export const HostView = ({ children }: HostViewProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { host, loadHost, unloadHost, isLoading } = useHostView();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (router.isReady) {
      loadHost(id);
    }

    return () => unloadHost();
  }, [id]);

  return (
    <>
      <HostViewTitle />
      {isLoading === 'finished' && !host?.id ? (
        <EmptyColumn
          title="Host Not Found"
          description="No host exists with this ID"
        />
      ) : (
        <>
          {host?.id && (
            <>
              <HostViewHeader />
              <HostViewTabs />
            </>
          )}
          <div css={[styles.wrapper, wrapper.main]}>
            {isLoading !== 'finished' && !host?.id ? (
              <div css={styles.loader}>
                <TableSkeleton />
              </div>
            ) : (
              <>
                <div css={styles.content}>{children}</div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
