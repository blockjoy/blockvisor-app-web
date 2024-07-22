import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import { settingsAtoms } from '@modules/settings';
import { nodeAtoms } from '@modules/node';
import { hostAtoms } from '@modules/host';
import { styles } from './ProgressBar.styles';

export const ProgressBar = () => {
  const pathname = usePathname();

  const [progress, setProgress] = useState(0);

  const [appLoadingState, setAppLoadingState] = useRecoilState(
    settingsAtoms.appLoadingState,
  );

  const nodeListPagination = useRecoilValue(nodeAtoms.nodeListPagination);
  const nodeListLoadingState = useRecoilValue(nodeAtoms.nodeListLoadingState);

  const hostListPagination = useRecoilValue(hostAtoms.hostListPagination);
  const hostListLoadingState = useRecoilValue(hostAtoms.hostListLoadingState);

  const isLoading =
    (pathname?.includes('/nodes') &&
      nodeListLoadingState === 'loading' &&
      nodeListPagination.currentPage === 0) ||
    (pathname?.includes('/hosts') &&
      hostListLoadingState === 'loading' &&
      hostListPagination.currentPage === 0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (appLoadingState === 'loading') {
      if (timer) clearInterval(timer);

      if (!isLoading) {
        timer = setInterval(() => {
          setProgress((prev) => (prev < 20 ? prev + 1 : prev));
        }, 20);
      } else {
        timer = setInterval(() => {
          setProgress((prev) => (prev < 70 ? prev + 1 : prev));
        }, 300);
      }
    } else {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 20 : 100));
      }, 20);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setAppLoadingState('finished');
          if (timer) clearInterval(timer);
        }, 100);
      }, 300);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoading, appLoadingState]);

  useEffect(() => {
    if (isLoading === false) setAppLoadingState('finished');
  }, [isLoading]);

  if (progress === 0 && appLoadingState !== 'loading') return null;

  return <div css={styles.wrapper} style={{ width: `${progress}%` }}></div>;
};
