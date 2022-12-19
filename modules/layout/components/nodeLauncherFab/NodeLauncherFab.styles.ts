import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    position: fixed;
    z-index: 10;
    right: 20px;
    bottom: 20px;
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    border: 0;
    cursor: pointer;

    :hover svg {
      scale: 1.1;
    }

    svg {
      transition: 0.3s;
      height: 44%;
    }
  `,
};
