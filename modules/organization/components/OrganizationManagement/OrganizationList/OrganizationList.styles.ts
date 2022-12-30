import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 20px 30px 0 0;
    flex: 1 1 auto;
    border-right: 1px solid ${theme.colorBorder};
  `,
};
