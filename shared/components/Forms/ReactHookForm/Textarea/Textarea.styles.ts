import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  textarea: (theme: ITheme) => css`
    width: 100%;
    background: ${theme.colorInput};
    color: ${theme.colorText};
    outline: none;
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 4px;
    padding: 10px;
    resize: none;
    line-height: 1.6;
    transition: 0.3s;

    :focus {
      border-color: ${theme.colorLabel};
      color: var(--color-text-5);
    }
  `,
};
