import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    padding: 40px 28px 0 28px;
  `,

  buttonWrapper: css`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (min-width: 420px) {
      flex-direction: row;
    }
  `,
  textSpacingBottom: css`
    margin-bottom: 32px;
  `,
  copyButton: css`
    @media ${breakpoints.toSml} {
      margin-top: 20px;
    }

    @media ${breakpoints.fromSml} {
      margin-top: 0;
      margin-left: 20px;
    }
  `,
};
