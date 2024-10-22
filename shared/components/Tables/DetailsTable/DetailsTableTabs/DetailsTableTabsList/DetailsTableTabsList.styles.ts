import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  list: css`
    z-index: 1;
    top: 0;
    left: 0;
    columns: 3 140px;
    display: inline-block;

    li {
      line-height: 1.66;
    }

    @media ${breakpoints.fromSml} {
      columns: 2 140px;
    }

    @media ${breakpoints.fromMed} {
      columns: 3 140px;
    }

    @media ${breakpoints.fromLrg} {
      columns: 3 140px;
    }

    @media ${breakpoints.fromXHuge} {
      columns: 3 140px;
    }
  `,
};
