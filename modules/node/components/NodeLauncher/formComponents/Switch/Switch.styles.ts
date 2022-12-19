import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  input: (theme: ITheme) => css`
    background: ${theme.colorLightGrey};
  `,
};
