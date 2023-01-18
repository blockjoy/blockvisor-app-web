import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    display: flex;
    gap: 8px;
    margin-bottom: 30px;
    width: 100%;
  `,
  label: css`
    min-width: 80px;
  `,
  input: (theme: ITheme) => css`
    display: none;

    :checked ~ span {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    background: ${theme.colorLightGrey};
    padding: 12px 12px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  `,
};
