import { FC, PropsWithChildren } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { css } from '@emotion/react';

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    max-height: calc(100vh - 72px);
    overflow: auto;
  `,
};

export const NodeLauncherConfigWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div css={styles.wrapper}>
      {isMobile ? (
        <>{children}</>
      ) : (
        <PerfectScrollbar css={styles.wrapper}>{children}</PerfectScrollbar>
      )}
    </div>
  );
};
