import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styles } from './HostView.styles';
import { wrapper } from 'styles/wrapper.styles';
import { EmptyColumn, SkeletonView } from '@shared/components';
import {
  useHostView,
  HostViewHeader,
  HostViewTabs,
  HostViewTitle,
} from '@modules/host';
import { useNodeList } from '@modules/node';

type HostViewProps = {
  children: ReactNode;
};

export const HostView = ({ children }: HostViewProps) => {
  const router = useRouter();
  const { id } = router.query;

  const { host, loadHost, unloadHost, isLoading } = useHostView();
  const { listNodesByHost } = useNodeList();

  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      if (router.isReady) {
        listNodesByHost(id as string);
        loadHost(id);
      }
    })();
    return () => {
      if (router.isReady) unloadHost();
    };
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
                <SkeletonView />
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
