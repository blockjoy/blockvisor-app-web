import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  empty: css`
    min-height: 80%;
    max-width: 512px;
    margin: 40px auto;

    @media ${breakpoints.fromLrg} {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `,
  content: css`
    & > li {
      opacity: 0;
    }

    & > li + li {
      border-top: 1px solid theme(--color-text-5-o10);
    }
  `,

  title: css`
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
    flex-direction: column;
    align-items: center;
    text-align: center;
    opacity: 0;

    @media ${breakpoints.fromSml} {
      text-align: left;
      gap: 56px;
      justify-content: space-between;
      flex-direction: row;
    }

    @media ${breakpoints.fromHuge} {
      grid-column: 4/9;

      figure {
        flex: 0 0 160px;
      }
    }
  `,
};
