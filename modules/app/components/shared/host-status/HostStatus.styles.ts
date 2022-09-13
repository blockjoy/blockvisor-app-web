import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  status: (theme: ITheme) => css`
    font-size: 12px;
    line-height: 1;
    color: ${theme.colorPrimary};
  `,
};
