import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    gap: 8px;
    margin-bottom: 10px;

    input {
      background: transparent;
      border: 1px solid ${theme.colorBorderGrey};
      border-radius: 4px;
      height: 38px;
      min-width: 120px;
      max-width: 120px;
      padding: 0 8px;
      font-size: 16px;
      outline: none;
      color: ${theme.colorText};
      transition: 0.3s;
    }

    input:focus {
      border-color: ${theme.colorDefault};
    }

    input:last-child {
      flex: 1 1 auto;
      max-width: 600px;
    }
  `,
  validation: (theme: ITheme) => css`
    color: ${theme.colorDanger};
    margin-left: 8px;
  `,
};
