import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    display: grid;
    place-items: center;

    & svg {
      width: 100% !important;
      height: 100% !important;
    }

    & path {
      color: ${theme.colorLabel};
    }
  `,
};
