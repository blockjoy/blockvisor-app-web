import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
  `,
  content: css`
    flex: 1 1 auto;
  `,
  quickEdit: css`
    flex: 1 1 300px;
  `,
  formHeader: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    text-transform: uppercase;
  `,
};
