import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    display: grid;
    place-items: center;

    & svg {
      width: 100%;
      height: 100%;
    }

    & path {
      color: ${theme.colorLabel};
    }
  `,
};
