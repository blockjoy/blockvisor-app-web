import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    gap: 40px;
    align-items: center;
    margin-bottom: 20px;
    display: none;
  `,
  label: (theme: ITheme) => css`
    letter-spacing: 1px;
    font-size: 12px;
    color: ${theme.colorDefault};
  `,
  value: css`
    font-size: 28px;
    margin-top: 10px;
    margin-bottom: 4px;
  `,
  total: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 12px;
  `,
  block: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `,
};
