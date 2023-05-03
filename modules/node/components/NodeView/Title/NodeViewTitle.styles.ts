import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  breadcrumb: css`
    display: flex;

    @media ${breakpoints.toXlrg} {
      max-width: 240px;
    }

    button {
      min-width: 0;

      svg {
        min-width: 12px;
      }
    }

    p {
      line-height: 1.1;
    }
  `,
  nodesButton: (theme: ITheme) => css`
    display: flex;
    gap: 10px;
    padding: 0;
    background: transparent;
    border: 0;
    color: ${theme.colorDefault};
    font-size: 18px;
    cursor: pointer;

    span > svg {
      min-width: 16px;
    }

    svg path {
      fill: ${theme.colorLabel};
    }

    :hover {
      color: ${theme.colorText};

      svg path {
        fill: ${theme.colorDefault};
      }
    }
  `,
  separator: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    min-width: 0;
    color: ${theme.colorLabel};
    padding-right: 8px;
    padding-left: 8px;
    height: 22px;
  `,
};
