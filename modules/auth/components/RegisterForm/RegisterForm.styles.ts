import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  marketing: (theme: ITheme) => css`
    display: block;
    margin: 10px 1px 0;
    font-size: 12px;
    color: var(--color-text-3);
    line-height: 1.2;

    a {
      color: ${theme.colorPrimary};

      :hover {
        text-decoration: underline;
      }
    }
  `,
};
