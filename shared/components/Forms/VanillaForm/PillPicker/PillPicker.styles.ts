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
    position: absolute;
    scale: 0;

    :checked + label span {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }

    :is(:focus, :hover, :active) + label span {
      box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.125);
    }
  `,
  button: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    background: ${theme.colorLightGrey};
    padding: 12px 12px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: box-shadow 0.3s;
  `,
};
