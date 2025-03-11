import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  nav: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-bottom: 20px;
  `,
  items: css`
    display: grid;
    align-items: stretch;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  `,
  icon: (theme: ITheme) => css`
    > svg {
      display: block;
      border-radius: 6px;
    }
  `,
  badge: (online?: boolean) => (theme: ITheme) =>
    css`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: ${online ? theme.colorPrimary : theme.colorDefault};
    `,
  badgeDisabled: css`
    opacity: 0.5;
  `,
};
