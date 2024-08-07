import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 20px;
    border: 1px solid ${theme.colorOverlay};
    border-radius: 7px;
  `,
  content: css`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 15px;
  `,
  actions: css`
    display: flex;
    flex-flow: row nowrap;
  `,
  expiry: (theme: ITheme) => css`
    color: ${theme.colorLabel};
  `,
};
