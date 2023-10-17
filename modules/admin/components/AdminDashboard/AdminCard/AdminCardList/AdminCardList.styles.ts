import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  cardTable: (theme: ITheme) => css`
    text-align: left;
    width: 100%;
    font-size: 13px;

    th {
      color: ${theme.colorLabel};
      font-weight: 400;
      padding: 0 0 20px;
    }

    tbody tr td {
      opacity: 0.8;
      padding: 16px 0;
      border-bottom: 1px solid ${theme.colorBorder};
      transition: 0.3s;
    }

    tbody tr:hover td {
      opacity: 1;
      border-color: ${theme.colorBorderGrey};
    }
  `,
};
