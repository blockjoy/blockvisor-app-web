import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  active: css`
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
  placeholder: (theme: ITheme) => css`
    color: ${theme.colorPlaceholder} !important;
  `,
  noResults: css`
    padding: 12px;
  `,
};
