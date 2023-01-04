import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  bubble: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 16px;
    min-width: 16px;
    max-width: 16px;
    height: 16px;
    padding: 0;
    font-size: 7px;
    font-weight: 600;
    background: ${theme.colorLabel};
    border-radius: 50%;
    color: #f9f9f9;
    cursor: pointer;
  `,
};
