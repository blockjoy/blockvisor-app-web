import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  searchWrapper: css`
    position: relative;
    margin: 0 0 16px 0;
  `,
  searchIcon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    left: 16px;
    width: 16px;
    height: 16px;
    translate: 0 -50%;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  searchBox: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    height: 54px;
    padding-left: 48px;
    width: 100%;
    outline: none;
    color: ${theme.colorText};

    :is(:focus, :hover) ~ span path {
      fill: ${theme.colorText};
    }

    ::placeholder {
      color: ${theme.colorDefault};
    }
  `,
};
