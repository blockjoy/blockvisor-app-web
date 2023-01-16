import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  listTypePicker: css`
    display: flex;
    gap: 4px;
    justify-content: flex-end;

    @media ${breakpoints.toMed} {
      display: none;
    }
  `,
  iconButton: (theme: ITheme) => css`
    display: block;
    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0 4px;
    height: 44px;
    width: 44px;
    border-radius: 6px;

    path {
      fill: ${theme.colorLabel};
    }

    :hover:not(.active),
    :active:not(.active) {
      background: ${theme.colorActive};
      opacity: 0.4;

      path {
        fill: ${theme.colorText};
      }
    }

    &.active {
      background: ${theme.colorActive};
      & path {
        fill: ${theme.colorText};
      }
    }
  `,
};
