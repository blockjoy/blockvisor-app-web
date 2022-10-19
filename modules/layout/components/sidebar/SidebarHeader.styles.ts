import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    border-bottom: 1px solid ${theme.colorBorder};
    box-sizing: border-box;
  `,
  logo: css`
    & path {
      fill: #4c4f4d;
    }
  `,
  logoWrapper: css`
    flex: 0 0 28px;
    margin-right: 20px;
  `,
};
