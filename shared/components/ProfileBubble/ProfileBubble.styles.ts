import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  bubble: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 20px;
    min-width: 20px;
    max-width: 20px;
    height: 20px;
    padding: 0;
    font-size: 7px;
    border: 1px solid ${theme.colorLabel};
    border-radius: 50%;
    color: #f9f9f9;
    cursor: pointer;
  `,
};
