import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  heading: (theme: ITheme) => css`
    font-size: 18px;
    text-transform: uppercase;
    color: ${theme.colorPlaceholder};
    margin-bottom: 20px;
  `,
};
