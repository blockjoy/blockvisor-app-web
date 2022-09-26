import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  handle: (theme: ITheme) => css`
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 15px;
    background: ${theme.colorPrimary};
    transition: transform 0.3s;
  `,
  switch: (theme: ITheme) => css`
    display: block;
    width: 60px;
    border-radius: 19px;
    padding: 4px;
    background: ${theme.colorActive};
    cursor: pointer;
  `,
  input: css`
    position: absolute;
    transform: scale(0);

    &:checked ~ label span {
      transform: translateX(32px);
    }
  `,
};
