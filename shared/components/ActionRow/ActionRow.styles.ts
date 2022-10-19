import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  actionRow: css`
    display: flex;
    margin: 40px 0;
    gap: 24px;
    flex-direction: column;

    @media ${breakpoints.fromSml} {
      gap: 100px;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
  `,
  description: css`
    margin-top: 20px;
    color: var(--color-text-3);
  `,
  action: css`
    min-width: 120px;
  `,
};

/* .action-row {
    display: flex;
    margin: 40px 0;
    gap: 24px;
    flex-direction: column;

    @media (--screen-medium-small) {
      gap: 100px;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }

    &__description {
      margin-top: 20px;
      color: theme(--color-text-3);
    }

    &__action {
      min-width: 120px;
    } */
