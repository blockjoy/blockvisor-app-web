import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  form: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorder};
    margin-bottom: 6px;
  `,
  formHeader: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    margin-bottom: 6px;
  `,
  formValue: (theme: ITheme) => css`
    color: ${theme.colorText};
    font-size: 40px;
    font-style: normal;
  `,
  blockheightWrapper: css`
    display: flex;
    align-items: center;
    padding: 0 0 20px;
  `,
  blockheightLoader: css`
    display: flex;
    gap: 8px;
    padding-top: 10px;
  `,
  blockheightLoaderText: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 16px;
  `,
};
