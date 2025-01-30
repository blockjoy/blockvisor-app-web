import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  buttons: (theme: ITheme) => css`
    padding: 20px 30px;
    border-top: 1px solid ${theme.colorBorder};
  `,
  firewall: css`
    margin-bottom: 12px;
  `,
  advancedConfig: (theme: ITheme) => css`
    border-top: 1px solid transparent;
    padding-top: 16px;
  `,
  advancedConfigOpen: (theme: ITheme) => css`
    border-top-color: ${theme.colorBorder};
  `,
};
