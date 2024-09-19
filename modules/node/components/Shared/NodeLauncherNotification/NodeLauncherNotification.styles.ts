import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  modal: css`
    max-width: 440px;
  `,
  headline: css`
    margin-bottom: 15px;
  `,
  message: css`
    p {
      margin-bottom: 10px;
    }
  `,
  icon: (theme: ITheme) => css`
    top: 4px;
    display: inline-flex;
    margin-left: 5px;
    color: ${theme.colorPrimary};
  `,
};
