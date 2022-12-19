import { css } from '@emotion/react';
import { ITheme } from 'types/theme';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
    flex: 1 1 auto;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
    }
  `,
};
