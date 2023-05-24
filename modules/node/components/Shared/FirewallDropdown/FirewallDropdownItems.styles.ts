import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  table: (theme: ITheme) => css`
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 10px;
    color: ${theme.colorText};

    tr {
      height: 40px;
      border-bottom: 1px solid ${theme.colorBorderGrey};
      text-transform: none;
      transition: 0.3s;
    }

    tr:hover {
      background: rgb(255 255 255 / 5%);

      .remove-button {
        opacity: 1;
      }
    }

    tr td:first-child {
      width: 116px;
      padding-left: 8px;
    }
  `,
  scrollbar: css`
    max-height: 199px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 5%);
    }
  `,
  removeButton: css`
    background: transparent;
    border: 0;
    cursor: pointer;
    transform: scale(0.75);
    height: 40px;
    width: 40px;

    @media ${breakpoints.fromXLrg} {
      opacity: 0;
      transform: scale(1);
    }
  `,
};
