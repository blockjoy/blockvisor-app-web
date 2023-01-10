import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    min-width: 0;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
  `,
  button: (theme: ITheme) => css`
    background: transparent;
    color: ${theme.colorText};
    height: 64px;
    padding-left: 8px;
    padding-right: 24px;
    border: 0;
    width: 100%;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;

    :hover,
    :active,
    :focus {
      box-shadow: none;
    }
  `,
  dropdown: css`
    top: 54px;
    right: 5px;
    left: 0;
  `,
  icon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 10px;
    translate: 0 -50%;
    rotate: 90deg;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
};
