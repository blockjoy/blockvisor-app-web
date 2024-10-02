import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  modal: css`
    max-width: 640px;
    padding: 0 40px;
  `,
  emptyColumn: css`
    flex-direction: row-reverse !important;
    padding-right: 40px !important;
    gap: 50px;

    p {
      font-size: 16px !important;
      line-height: 1.4;
    }

    @media ${breakpoints.toSml} {
      flex-direction: column !important;
      align-items: start;
      gap: 20px;
      padding-left: 0;
      padding-right: 0 !important;

      > figure {
        flex-basis: auto;
      }
    }
  `,
};
