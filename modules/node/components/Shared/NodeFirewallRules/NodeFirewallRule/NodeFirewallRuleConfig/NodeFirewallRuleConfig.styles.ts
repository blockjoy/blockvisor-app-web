import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  configDropdowns: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 36px;

    > div:first-of-type {
      border-left: 1px solid ${theme.colorBorder};
    }
  `,
  dropdown: (theme: ITheme) => css`
    border-right: 1px solid ${theme.colorBorder};
    padding-left: 3px;
  `,
  deleteRuleButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    margin: 0 2px;
    height: 30px;
    width: 34px;
    display: grid;
    place-items: center;
    border-radius: 6px;
    cursor: pointer;

    :hover svg path {
      fill: ${theme.colorText};
    }

    svg path {
      fill: ${theme.colorDefault};
    }
  `,
};
