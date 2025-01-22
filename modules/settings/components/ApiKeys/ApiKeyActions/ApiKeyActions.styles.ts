import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: css`
    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,

  buttonDelete: (theme: ITheme) => css`
    :hover svg path {
      fill: ${theme.colorDanger};
    }
  `,
};
