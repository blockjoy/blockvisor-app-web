import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  buttons: css`
    display: flex;
    gap: 10px;
    width: 300px;
  `,
  textarea: (theme: ITheme) => css`
    padding: 16px;
    color: ${theme.colorText};
    background: transparent;
    border-radius: 4px;
    border: 1px solid ${theme.colorBorder};
    margin-bottom: 16px;
    resize: none;
    outline: none;
    min-width: 500px;

    ::placeholder {
      color: ${theme.colorLabel};
    }
  `,
};
