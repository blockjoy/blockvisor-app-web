import { css } from '@emotion/css';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: flex;
    gap: 28px 0;
    flex-grow: 1;

    @media (--screen-xlarge) {
      gap: 108px 0;
    }

    @media (--screen-medium-max) {
      margin-top: 40px;
    }
  `,
  sidebar: css`
    z-index: 1;
    border-right: 1px solid var(--color-text-5-o10);
    background-color: var(--color-text-1);
    flex: 0 1 240px;
    min-height: 100%;
    min-width: 140px;

    & :global(.skip-to-content:focus) {
      position: absolute;
      ${typo.small}
      padding: 8px 12px;
    }

    @media (--screen-large) {
      position: sticky;
      top: 0;
    }

    @media (--screen-medium-max) {
      display: none;
    }
  `,
  content: css`
    flex-grow: 1;
    flex-shrink: 1;
    overflow-x: hidden;
    padding: 0 80px 80px 20px;

    @media ${breakpoints.fromMed} {
      padding-left: 28px;
    }

    @media ${breakpoints.fromXLrg} {
      padding-left: 108px;
    }
  `,
};
