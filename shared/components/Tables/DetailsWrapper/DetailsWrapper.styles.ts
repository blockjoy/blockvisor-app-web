import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    gap: 12px;
  `,
  headline: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  `,
  link: (theme: ITheme) => css`
    color: ${theme.colorText};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    text-decoration: underline;
  `,
};
