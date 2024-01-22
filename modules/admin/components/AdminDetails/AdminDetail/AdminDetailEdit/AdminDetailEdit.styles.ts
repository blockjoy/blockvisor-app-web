import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css``,
  row: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.colorBorder};
    padding: 16px 0;
  `,
  label: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    flex: 0 0 190px;
    font-size: 14px;
  `,
  control: css`
    flex: 0 0 400px;
  `,
};
