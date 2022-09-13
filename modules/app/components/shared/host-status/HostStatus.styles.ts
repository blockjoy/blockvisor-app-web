import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  status: (theme: ITheme) => css`
    display: inline-flex;
    gap: 10px;
    color: ${theme.colorPrimary};

    & path {
      fill: ${theme.colorPrimary};
    }
  `,
  statusText: css`
    font-size: 12px;
    line-height: 1;
  `,
};
