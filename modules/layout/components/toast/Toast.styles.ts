import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: fixed;
    right: 120px;
    bottom: 20px;
  `,
  toast: (theme: ITheme) => css`
    background: ${theme.colorCard};
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    padding: 20px;
    border-radius: 6px;
    font-weight: 600;
  `,
  toastSuccess: (theme: ITheme) => css`
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
  `,
  toastError: (theme: ITheme) => css`
    background: ${theme.colorDanger};
    color: ${theme.colorText};
  `,
};
