import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  info: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorderGrey};
    padding-bottom: 10px;
    margin-bottom: 20px;

    p {
      margin-bottom: 7px;
    }
  `,
};
