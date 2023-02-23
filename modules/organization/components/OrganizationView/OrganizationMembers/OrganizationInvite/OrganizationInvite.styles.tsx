import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 0;
    margin: 0;

    @media ${breakpoints.fromXLrg} {
      max-width: 500px;
    }
  `,
  buttons: css`
    margin-top: 12px;
    display: grid;
    grid-template-columns: 90px 90px;
    gap: 8px;
  `,
};
