import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;

    @media only screen and (min-width: ${theme.screenSm}) {
      display: none;
    }
  `,
};
