import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    padding-left: 56px;
    padding-right: 16px;
    border-bottom: 1px solid ${theme.colorBorder};
    box-sizing: border-box;
  `,
  burgerWrapper: css`
    display: grid;
    padding: 0 16px;
    place-items: center;
    width: 50px;
  `,
};
