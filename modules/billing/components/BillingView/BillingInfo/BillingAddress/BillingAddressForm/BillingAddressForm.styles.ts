import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    padding: 0;
    margin: 0;

    @media ${breakpoints.fromXLrg} {
      max-width: 500px;
    }
  `,
  formRow: css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
  `,
  formCol: css`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
  formItem: css`
    margin-bottom: 24px;
  `,
};
