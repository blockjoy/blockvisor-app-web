import { css } from '@emotion/react';
import { FC, PropsWithChildren } from 'react';
import { ITheme } from 'types/theme';

const styles = {
  h4: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  `,
};

export const NodeFormLabel: FC<PropsWithChildren> = ({ children }) => {
  return <h4 css={styles.h4}>{children}</h4>;
};
