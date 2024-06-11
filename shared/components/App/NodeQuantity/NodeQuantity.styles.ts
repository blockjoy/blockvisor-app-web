import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    margin-bottom: 16px;
  `,
  wrapper: css`
    position: relative;
    display: flex;
    gap: 16px;
  `,
  textbox: (theme: ITheme) => css`
    background: transparent;
    border: 1px solid ${theme.colorBorder};
    border-radius: 6px;
    padding: 12px 10px;
    width: 100%;
    color: ${theme.colorText};
    outline: none;

    :focus {
      border-color: ${theme.colorLabel};
    }
  `,
  textboxError: (theme: ITheme) => css`
    border-color: ${theme.colorDanger};
  `,
  slider: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 16px;
    width: calc(100% - 60px);
    transform: translateY(-50%);
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    height: 44px;
    background: transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.2s;

    ::after {
      content: '';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background: rgb(255 255 255 / 10%);
      transition: 0.2s;
    }

    /* Mouse-over effects */
    :hover::after {
      background: rgb(255 255 255 / 20%);
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    ::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: 16px; /* Set a specific slider handle width */
      height: 16px; /* Slider handle height */
      border-radius: 10px;
      background: ${theme.colorPrimary}; /* Green background */
      cursor: pointer; /* Cursor on hover */
      transition: 0.1s;
    }

    ::-webkit-slider-thumb:hover {
      scale: 1.2;
    }
  `,
};
