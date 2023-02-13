import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: (maxWidth: number) => () =>
    css`
      position: relative;
      @media ${breakpoints.toSml} {
        max-width: ${maxWidth}px;
      }
    `,
};
