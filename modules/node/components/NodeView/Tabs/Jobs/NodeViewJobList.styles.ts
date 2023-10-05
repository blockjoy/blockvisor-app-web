import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css``,
  status: (theme: ITheme) => css`
    display: inline-block;
    padding: 2px 10px;
    font-size: 12px;
    color: ${theme.colorDefault};
    border-radius: 3px;
    border: 1px solid ${theme.colorDefault};
    text-transform: capitalize;
  `,
  statusSuccess: (theme: ITheme) => css`
    border-color: ${theme.colorPrimary};
    color: ${theme.colorPrimary};
  `,
};
