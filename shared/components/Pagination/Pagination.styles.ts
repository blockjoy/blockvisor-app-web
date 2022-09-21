import { css } from '@emotion/react';
import { reset } from 'styles/utils.reset.styles';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  base: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    margin-top: 20px;
  `,
  item: css`
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${typo.small};
    background: #313131;
    color: var(--color-text-4);
    transition: all 0.1s ease-out;

    &:hover,
    &:focus {
      background: #616161;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.4;
    }
  `,
  active: css`
    color: #212423;
    background: var(--color-primary);

    &:hover,
    &:focus {
      background: var(--color-primary);
    }
  `,
};
