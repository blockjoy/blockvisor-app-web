import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
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
      translate: 32px 0;
      background: ${theme.colorPrimary};
    }
  `,
  switch: (theme: ITheme) => css`
    display: block;
    width: 60px;
    height: 28px;
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
    width: 20px;
    height: 20px;
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
    top: -6px;
    left: 120%;
    bottom: auto;
    right: auto;
    width: 190px;
    translate: none;
  `,
};
