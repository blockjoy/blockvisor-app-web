import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: (theme: ITheme) => css`
    background-color: ${theme.colorTooltip};
    border-radius: 6px;
    padding: 20px;

    @media ${breakpoints.fromXHuge} {
      margin-right: 20px;
    }
  `,
};
