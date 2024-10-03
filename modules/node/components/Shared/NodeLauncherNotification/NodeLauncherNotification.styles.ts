import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  modal: css`
    max-width: 640px;
    padding: 0 40px;

    @media ${breakpoints.toMed} {
      max-width: 60%;
    }

    @media ${breakpoints.toSml} {
      max-width: 100%;
    }
  `,
  emptyColumn: css`
    flex-direction: row-reverse !important;
    padding-right: 40px !important;
    gap: 50px;

    p {
      font-size: 16px !important;
      line-height: 1.4;
    }

    @media ${breakpoints.toMed} {
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
  link: (theme: ITheme) => css`
    color: ${theme.colorPrimary} !important;
    opacity: 0.8;
    :hover {
      opacity: 1;

      ::after {
        background: ${theme.colorPrimary} !important;
      }
    }
  `,
};
