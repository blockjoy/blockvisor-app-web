import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    display: flex;
    flex-direction: row;
    gap: 20px;

    @media ${breakpoints.toMed} {
      flex-direction: column;
    }
  `,
  content: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    height: 100%;
    margin-top: 25px;
    margin-bottom: 25px;

    @media ${breakpoints.fromMed} {
      max-width: calc(100% - 220px);
    }
  `,
};
