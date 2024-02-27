import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  or: (theme: ITheme) => css`
    position: relative;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 40px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      height: 0.5px;
      width: 100%;
      background-color: ${theme.colorBorderGrey};
    }

    span {
      background-color: ${theme.colorBackground};
      position: relative;
      display: block;
      width: 40px;
      margin: 0 auto;
    }
  `,
};
