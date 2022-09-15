import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  base: css`
    display: flex;
    gap: 8px;
    padding: 8px 12px;
    align-items: baseline;
  `,
  input: css`
    ${typo.tiny}
    background: transparent;
    padding: 0;
    color: var(--color-text-5);
    border-width: 0;
    outline: 0;
  `,
  icon: css`
    color: var(--color-secondary);
    flex-basis: 12px;
  `,
};
