import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    padding: 10px;
    background: ${theme.colorInput};
    border: 1px solid #F8FAF6;
    border: 1px solid rgb(248, 250, 246, .1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    path {
      color: ${theme.colorLabel};
    }

    :hover,
    :active {
      path {
        color: ${theme.colorText};
      }
    }
  }`,
  value: (theme: ITheme) => css`
    padding: 5px 10px;
    font-size: 14px;
    color: #fff;
    border: none;
    outline: none;
    background-color: ${theme.colorInput};
    margin-right: auto;
  }`,
};
