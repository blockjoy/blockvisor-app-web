import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  breadcrumb: css`
    display: flex;
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
    color: ${theme.colorLabel};
    margin-right: 4px;
    margin-left: 6px;
  `,
};
