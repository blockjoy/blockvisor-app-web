import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  base: (theme: ITheme) => css`
    th {
      width: 200px;
      vertical-align: top;
      padding-top: 35px;
    }

    @media ${breakpoints.toSml} {
      th {
        padding-top: 20px;
      }
    }

    td {
      text-overflow: ellipsis;
      line-height: 1.6;
    }

    td a {
      position: relative;
      color: ${theme.colorText};
    }

    td svg path {
      fill: ${theme.colorText};
    }

    td a::after {
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

    td a:hover::after {
      opacity: 1;
    }
  `,
};
