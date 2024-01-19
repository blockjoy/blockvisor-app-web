import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  menuItemText: css`
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
  `,
  dropdown: css`
    top: 54px;
    right: 5px;
    left: 0;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  `,
  dropdownInner: css`
    max-height: 199px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 5%);
    }
  `,
  active: (theme: ITheme) => css`
    background-color: ${rgba(theme.colorText || '#ffffff', 0.025)};

    .alert {
      opacity: 1;
    }
  `,
  focus: (theme: ITheme) => css`
    background-color: ${rgba(theme.colorText || '#ffffff', 0.1)};
    outline: none;

    .alert {
      opacity: 1;
    }
  `,
};
