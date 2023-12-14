import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    background: ${theme.colorInput};
    border: 0;
    width: 44px;
    height: 44px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;

    :disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }

    :hover:not(:disabled) path {
      fill: ${theme.colorText};
    }
  `,
};
