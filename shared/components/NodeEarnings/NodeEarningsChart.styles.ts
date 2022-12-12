import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    min-height: 400px;
    max-height: 400px;
    height: 400px;
  `,
  header: (theme: ITheme) => css`
    position: absolute;
    top: 0;
    left: 0;
    color: ${theme.colorLabel};
    letter-spacing: 1px;
    font-size: 14px;
  `,
};
