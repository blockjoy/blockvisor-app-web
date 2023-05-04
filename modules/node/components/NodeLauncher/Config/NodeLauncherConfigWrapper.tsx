import { FC, PropsWithChildren } from 'react';
import { Scrollbar } from '@shared/components';
import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

const styles = {
  wrapper: css`
    flex: 1 1 auto;
    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
      max-height: calc(100vh - 72px);
      min-height: calc(100vh - 72px);
    }
  `,
};

export const NodeLauncherConfigWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  const isMobile = window.innerWidth < 1200;

  return (
    <div css={styles.wrapper}>
      {isMobile ? (
        <>{children}</>
      ) : (
        <Scrollbar additionalStyles={[styles.wrapper]}>{children}</Scrollbar>
      )}
    </div>
  );
};
