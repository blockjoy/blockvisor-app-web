import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 6px;
  `,
  dropdownButton: (theme: ITheme) => css`
    position: relative;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    transition: 0.3s;

    :hover {
      background: rgb(255 255 255 / 2%);
    }

    :hover path {
      fill: ${theme.colorText};
      transition: 0.3s;
    }
  `,
  resetButtonWrapper: css`
    padding: 10px;
  `,
};
