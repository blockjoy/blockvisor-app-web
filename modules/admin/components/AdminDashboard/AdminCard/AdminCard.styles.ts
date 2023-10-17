import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  card: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 6px;
    padding: 30px 30px;

    path {
      fill: ${theme.colorPrimary};
    }
  `,
};
