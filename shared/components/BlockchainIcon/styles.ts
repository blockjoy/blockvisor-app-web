import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  icon: (theme: ITheme) => css`
    path {
      fill: ${theme.colorLabel};
    }
  `,
};
