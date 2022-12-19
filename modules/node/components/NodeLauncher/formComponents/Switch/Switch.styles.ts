import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  input: (theme: ITheme) => css`
    position: absolute;
    scale: 0;

    :checked ~ .switch {
      border-color: ${theme.colorPrimary};
    }

    :checked ~ .switch .handle {
      translate: 40px 0;
      background: ${theme.colorPrimary};
    }
  `,
  switch: (theme: ITheme) => css`
    display: block;
    width: 70px;
    height: 30px;
    padding: 3px;
    border-radius: 15px;
    border: 1px solid ${theme.colorLightGrey};
    transition: 0.3s;

    :hover ~ .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  handle: (theme: ITheme) => css`
    content: '';
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: ${theme.colorLightGrey};
    transition: translate 0.3s;

    svg {
      width: 60%;
      height: 60%;
    }

    path {
      fill: ${theme.colorPrimaryText};
    }
  `,
  tooltip: css`
    position: absolute;
    top: -48px;
    left: 50%;
    width: 190px;
    translate: -50% 0;
    background: #0c0c02;
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  `,
};
