import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border-radius: 8px;
    background: ${theme.colorActive};
  `,
  icon: (theme: ITheme) => css`
    position: absolute;
    font-size: 15px;
    color: ${theme.colorLabel};
    pointer-events: none;
  `,
  input: (theme: ITheme) => css`
    width: 0;
    padding: 0 7px;
    background: transparent;
    border: 0;
    outline: none;
    color: ${theme.colorText};
    transition: width 0.3s;

    @media only screen and (min-width: ${theme.screenSm}) {
      width: 100px;
      padding: 0 10px 0 30px;
    }

    &:focus {
      width: 160px;
      padding: 0 10px 0 24px;
    }
  `,
};
