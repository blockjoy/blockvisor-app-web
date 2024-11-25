import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    display: inline-block;
    margin-bottom: 20px;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  wrapperNoBottomMargin: css`
    margin-bottom: 0;
  `,
  input: (size?: SwitchSize) => (theme: ITheme) => {
    const translate = size === 'large' ? '26px 0' : '10px 0';

    return css`
      position: absolute;
      scale: 0;

      :disabled ~ .switch {
        opacity: 0.4;
        cursor: not-allowed;
      }

      :checked ~ .switch {
        border-color: ${theme.colorPrimary};
      }

      :checked ~ .switch .handle {
        translate: ${translate};
        background: ${theme.colorPrimary};
      }

      :is(:focus, :hover, :active) + span {
        box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.125);
      }
    `;
  },
  switch: (size?: SwitchSize) => (theme: ITheme) => {
    const isLarge = size === 'large';
    const width = isLarge ? 50 : 24;
    const height = isLarge ? 24 : 14;
    const padding = isLarge ? 3 : 1;

    return css`
      display: block;
      width: ${width}px;
      height: ${height}px;
      padding: ${padding}px;
      border-radius: 15px;
      border: 1px solid ${theme.colorDefault};
      cursor: pointer;
      transition: 0.3s;
    `;
  },
  handle: (size?: SwitchSize) => (theme: ITheme) => {
    const dimension = size === 'large' ? 16 : 10;

    return css`
      content: '';
      display: grid;
      place-items: center;
      width: ${dimension}px;
      height: ${dimension}px;
      border-radius: 50%;
      background: ${theme.colorDefault};
      transition: translate 0.3s;

      svg {
        width: 60%;
        height: 60%;
      }

      path {
        fill: ${theme.colorPrimaryText};
      }
    `;
  },
  tooltip: css`
    top: -6px;
    left: 120%;
    bottom: auto;
    right: auto;
    width: 190px;
    translate: none;
  `,
};
