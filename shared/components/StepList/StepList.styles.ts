import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: inline-flex;
    max-width: 100%;
    overflow-x: auto;
    gap: 16px;
    white-space: nowrap;

    > :global(li) {
      position: relative;
    }

    > :global(li + li::before) {
      content: '';
      position: absolute;
      background-color: theme(--color-text-5-o10);

      @media ${breakpoints.toLrg} {
        width: 80px;
        height: 1px;
        top: 25%;
        left: -16px;
        transform: translate3d(-50%, 0, 0);
      }

      @media ${breakpoints.fromLrg} {
        height: 20px;
        width: 1px;
        bottom: calc(100% + 16px);
        left: 20px;
        gap: 52px;
        flex-direction: column;
      }
    }

    @media ${breakpoints.toLrg} {
      gap: 32px;
    }

    @media ${breakpoints.fromLrg} {
      gap: 52px;
      flex-direction: column;
    }
  `,
};
