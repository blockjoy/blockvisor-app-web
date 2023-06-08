import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-wrap: wrap;
    padding: 16px 0 6px;

    :hover > div > div > div {
      background: ${theme.colorPrimary} !important;
    }
  `,

  slider: css`
    height: 20px;
    display: flex;
    width: calc(100% - 12px);
    margin: 0 auto;
  `,
  progress: css`
    width: 100%;
    height: 2px;
    align-self: center;
  `,
  progressBar: (theme: ITheme) => css`
    box-sizing: border-box;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    border: 3px solid ${theme.colorCard};
    background-color: ${theme.colorPrimary};
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer !important;
    transition: background 0.3s;
  `,
  label: (theme: ITheme) => css`
    font-size: 14px;
    margin-top: 10px;
    color: ${theme.colorText};
  `,
};
