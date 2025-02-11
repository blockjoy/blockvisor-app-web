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

    label + div {
      margin-bottom: 0;
    }
  `,
  label: css`
    grid-column-end: span 5;

    @media ${breakpoints.toXHuge} {
      grid-column-end: span 6;
    }
    @media ${breakpoints.toXlrg} {
      grid-column-end: span 12;
    }
  `,
  resourceType: css`
    grid-row: 2;
    grid-column-end: span 3;

    @media ${breakpoints.toHuge} {
      grid-column-end: span 4;
    }
    @media ${breakpoints.toXlrg} {
      grid-column-end: span 6;
    }
    @media ${breakpoints.toSml} {
      grid-column-end: span 12;
    }
  `,
  permissions: css`
    grid-column: span 12;
  `,
};
