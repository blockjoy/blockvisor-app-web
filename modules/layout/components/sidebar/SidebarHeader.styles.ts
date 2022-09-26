import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid ${theme.colorBorder};
  `,
  logo: css`
    & path {
      fill: #4c4f4d;
    }
  `,
};
