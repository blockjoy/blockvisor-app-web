import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  positive: (theme: ITheme) => css`
    color: ${theme.colorPrimary};

    svg path {
      fill: ${theme.colorPrimary};
    }
  `,
  negative: (theme: ITheme) => css`
    color: ${theme.colorDanger};

    svg path {
      fill: ${theme.colorDanger};
    }
  `,
};
