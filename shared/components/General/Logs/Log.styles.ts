import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    padding: 6px 0;
    letter-spacing: -0.25px;
  `,
  time: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    margin-right: 16px;

    p {
      display: inline;
    }
  `,
};
