import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

const passwordToggle = (theme: ITheme) => css`
  svg path {
    fill: ${theme.colorLabel};
    transition: 0.3s;
  }

  :hover svg path {
    fill: ${theme.colorText};
  }
`;

export { passwordToggle };
