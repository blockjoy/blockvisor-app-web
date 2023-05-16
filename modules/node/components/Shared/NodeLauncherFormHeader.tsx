import { css } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  h2: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 58px;
    font-size: 16px;
    margin: 0;
    font-weight: 400;
    color: ${theme.colorDefault};
  `,
};

export const NodeLauncherFormHeader = ({ children }: PropsWithChildren) => (
  <h2 css={styles.h2}>{children}</h2>
);
