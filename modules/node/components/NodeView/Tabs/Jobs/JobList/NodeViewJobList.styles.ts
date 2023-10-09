import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css``,
  status: (theme: ITheme) => css`
    display: inline-block;
    padding: 2px 6px;
    font-size: 9px;
    color: ${theme.colorDefault};
    border-radius: 3px;
    border: 1px solid ${theme.colorDefault};
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
  statusSuccess: (theme: ITheme) => css`
    border-color: ${theme.colorPrimary};
    color: ${theme.colorPrimary};
  `,
  progress: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 12px;
  `,
};
