import { css } from '@emotion/react';

// sveltekit multiselect component was styled by overriding svelecte component classes, we cant use those
export const styles = {
  label: css`
    color: var(--color-text-3);
    margin-bottom: 4px;
  `,
  base: css`
    background-color: var(--color-input-background);
  `,
};
