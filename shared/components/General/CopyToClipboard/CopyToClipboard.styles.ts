import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    padding: 14px 16px;
    background: ${theme.colorInput};
    border-radius: 6px;
    border: 1px solid ${theme.colorInput};
    display: flex;
    align-items: center;
    cursor: pointer;

    &,
    path {
      transition: 0.3s;
    }

    path {
      color: ${theme.colorLabel};
    }

    :hover,
    :active {
      border-color: ${theme.colorBorderGrey};

      path {
        color: ${theme.colorText};
      }
    }
  `,
  value: (theme: ITheme) => css`
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
    background-color: ${theme.colorInput};
    margin-right: auto;
  `,
};
