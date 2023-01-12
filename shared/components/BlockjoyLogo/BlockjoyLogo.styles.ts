import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: relative;
    display: block;
    width: 28px;
    height: 28px;
    cursor: pointer;
  `,

  icon: css`
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
  `,
};
