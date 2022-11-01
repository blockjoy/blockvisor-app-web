import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  status: (theme: ITheme) => css`
    display: inline-flex;
    gap: 10px;
    color: ${theme.colorPrimary};
    font-size: 11px;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 1px;

    & path {
      fill: ${theme.colorPrimary};
    }
  `,
  statusText: css``,
  statusBorder: (theme: ITheme) => css`
    border: 1px solid ${theme.colorPrimary};
    padding: 8px;
    font-size: 9px;
    border-radius: 3px;
  `,
};
