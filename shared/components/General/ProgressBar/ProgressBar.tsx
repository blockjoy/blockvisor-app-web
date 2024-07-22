import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { settingsAtoms } from '@modules/settings';
import { styles } from './ProgressBar.styles';
import { nodeAtoms } from '@modules/node';

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [combinedLoading, setCombinedLoading] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  const [appLoadingState, setAppLoadingState] = useRecoilState(
    settingsAtoms.appLoadingState,
  );

  const nodeListPagination = useRecoilValue(nodeAtoms.nodeListPagination);
  const nodeListLoadingState = useRecoilValue(nodeAtoms.nodeListLoadingState);

  const isLoading =
    nodeListLoadingState === 'loading' && nodeListPagination.currentPage === 0;

  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;

    debounceTimeout = setTimeout(() => {
      const isCurrentlyLoading = isLoading || appLoadingState === 'loading';
      setCombinedLoading(isCurrentlyLoading);
      if (isCurrentlyLoading) setHasStartedLoading(true);
    }, 100);

    return () => clearTimeout(debounceTimeout);
  }, [isLoading, appLoadingState]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (combinedLoading) {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 20) return prev + 20;
          else return prev < 70 ? prev + 1 : prev;
        });
      }, 500);
    } else if (hasStartedLoading) {
      if (timer) clearInterval(timer);
      // if (newTimer) clearInterval(newTimer);
      timer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 20 : 100));
      }, 20);
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setHasStartedLoading(false);
          setAppLoadingState('finished');
          if (timer) clearInterval(timer);
        }, 100);
      }, 300);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [combinedLoading, hasStartedLoading]);

  useEffect(() => {
    if (isLoading === false) setAppLoadingState('finished');
  }, [isLoading]);

  if (progress === 0 && !hasStartedLoading) return null;

  return <div css={styles.wrapper} style={{ width: `${progress}%` }}></div>;
};
