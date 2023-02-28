import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  columnEmpty: css`
    margin: 56px 0;
    display: flex;
    align-items: center;
    gap: 8px 28px;
    flex-direction: column;

    @media ${breakpoints.fromTny} {
      flex-direction: row;
      justify-content: center;
    }

    & > figure {
      flex-basis: 160px;
      flex-shrink: 0;
      min-width: 160px;
    }
  `,
  columnAlign: (align: any) => css`
    @media ${breakpoints.fromTny} {
      flex-direction: row;
      justify-content: ${align === 'center' ? 'center' : 'flex-start'};
    }
  `,
  description: css`
    margin-top: 8px;
    color: var(--color-text-3);
    max-width: 300px;
  `,
};
