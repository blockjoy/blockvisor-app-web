import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    z-index: 3;
    padding: 56px 0 16px;
    transition: margin 0.4s;

    @media only screen and (min-width: ${theme.screenSm}) {
      margin-left: 260px;
      z-index: 3;
    }
  `,
};
