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
  input: (theme: ITheme) => css`
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
    border: 1px solid ${theme.colorDefault};
    cursor: pointer;
    transition: 0.3s;
  `,
  handle: (theme: ITheme) => css`
    content: '';
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
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
  `,
  tooltip: css`
    position: absolute;
    top: -6px;
    left: 120%;
    width: 190px;
    background: #0c0c02;
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  `,
};
