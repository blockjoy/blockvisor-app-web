import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    padding: 0 20px;
    border-radius: 16px;
    background: #373a39;
    font-size: 12px;
  `,
  badge: css`
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  `,
  badgeGood: (theme: ITheme) => css`
    background: ${theme.colorPrimary};
  `,
  badgeBad: (theme: ITheme) => css`
    background: ${theme.colorDanger};
  `,
};
