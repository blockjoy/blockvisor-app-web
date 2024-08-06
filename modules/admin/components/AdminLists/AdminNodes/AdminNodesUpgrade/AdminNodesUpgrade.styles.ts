import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  dropdownMenu: css`
    left: auto;
    right: 0;
    top: 54px;
    min-width: max-content;
    overflow: visible;

    @media ${breakpoints.toMed} {
      position: fixed;
      right: 0;
      top: 72px;
      min-width: 100%;
      max-width: 100%;
    }
  `,
  dropdownInner: css`
    max-height: 260px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 10%);
    }
  `,
  buttonWrapper: css`
    padding: 12px 10px;
  `,
};
