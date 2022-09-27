import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  dialog: (theme: ITheme) => css`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    background: ${rgba(theme.colorBackground, 0.75)};
  `,
  message: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    text-align: center;
    width: 350px;
    height: 100px;
    padding: 30px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    color: ${theme.colorLabel};
    line-height: 1.35;
  `,
};
