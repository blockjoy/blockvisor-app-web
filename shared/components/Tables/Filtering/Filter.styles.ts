import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  button: css`
    width: 190px;
    padding: 8px 15px;
    text-align: left;
    justify-content: space-between;
  `,
  buttonLabel: (theme: ITheme) => css`
    display: flex;
    margin-top: 5px;
    padding-left: 2px;
    font-size: 12px;
    color: ${theme.colorPlaceholder};
  `,
  arrowIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 6px;
    height: 6px;

    path {
      fill: ${theme.colorText};
    }
  `,
  activeFilter: css`
    cursor: default;

    :hover,
    :focus,
    :active {
      background: none;
    }
  `,
};
