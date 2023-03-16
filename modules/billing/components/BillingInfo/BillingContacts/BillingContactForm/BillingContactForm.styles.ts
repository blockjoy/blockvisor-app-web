import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    padding: 0;
    margin: 0;
    max-width: 500px;
  `,
  buttons: css`
    margin-top: 12px;
    display: grid;
    grid-template-columns: 90px 90px;
    gap: 8px;
  `,
  formRow: css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
  `,
  formItem: css`
    margin-bottom: 24px;
  `,
};
