import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
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
    background-color: ${rgba(theme.colorPrimaryText || '#000', 0.3)};
  `,
};
