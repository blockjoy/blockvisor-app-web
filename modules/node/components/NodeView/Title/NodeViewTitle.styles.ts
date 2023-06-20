import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  breadcrumb: css`
    display: flex;

    @media ${breakpoints.toXlrg} {
      max-width: 240px;
    }
  `,
  nodesButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    p {
      color: ${theme.colorDefault};
    }

    svg > path {
      fill: ${theme.colorLabel};
    }

    :is(p, path) {
      transition: 0.3s;
    }

    :hover {
      p {
        color: ${theme.colorText};
      }

      svg path {
        fill: ${theme.colorDefault};
      }
    }
  `,
  separator: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    padding-right: 8px;
    padding-left: 8px;
    height: 22px;
  `,
};
