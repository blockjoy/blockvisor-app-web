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
      translate: 26px 0;
      background: ${theme.colorPrimary};
    }

    :is(:focus, :hover, :active) + span {
      box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.125);
    }
  `,
  switch: (theme: ITheme) => css`
    display: block;
    width: 50px;
    height: 24px;
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
    width: 16px;
    height: 16px;
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
