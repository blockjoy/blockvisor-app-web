import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 36px;
    padding: 0 20px;
    border-radius: 18px;
    background: #373a39;
    font-size: 13px;
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
