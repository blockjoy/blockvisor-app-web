import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  link: (theme: ITheme) => css`
    position: relative;
    color: ${theme.colorText};
    line-height: 1.66;

    @media ${breakpoints.toMed} {
      text-decoration: underline;
    }

    @media ${breakpoints.fromMed} {
      ::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: ${theme.colorText};
        opacity: 0.6;
        transition: 0.3s;
      }

      :hover::after {
        opacity: 1;
      }
    }
  `,
  copyButton: css`
    position: absolute;
    bottom: -8px;
    right: -40px;
  `,
};
