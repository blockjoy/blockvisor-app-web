import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(12, 1fr);
  `,

  formField: css`
    margin-bottom: 0;
    grid-column-end: span 3;

    @media ${breakpoints.toXHuge} {
      grid-column-end: span 4;
    }
    @media ${breakpoints.toXlrg} {
      grid-column-end: span 6;
    }
    @media ${breakpoints.toMed} {
      grid-column-end: span 12;
    }

    label + div {
      margin-bottom: 0;
    }
  `,
  permissions: css`
    grid-column: span 12;
  `,
  resourceType: css`
    grid-row: 2;
    grid-column-start: 1;
  `,
  resourceId: css`
    @media ${breakpoints.fromMed} {
      grid-row: 2;
    }
  `,
};
