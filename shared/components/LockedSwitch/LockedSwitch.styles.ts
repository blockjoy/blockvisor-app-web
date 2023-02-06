import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    cursor: not-allowed;
    display: inline-block;

    :hover .tooltip {
      opacity: 1;
      visibility: visible;
    }
  `,
  isChecked: (theme: ITheme) => css`
    > div {
      border-color: ${theme.colorPrimary};
    }

    > div > div {
      translate: 26px 0;
      background: ${theme.colorPrimary};
    }
  `,
  switch: (theme: ITheme) => css`
    position: relative;
    display: flex;
    width: 50px;
    height: 24px;
    padding: 2px;
    border-radius: 15px;
    border: 1px solid ${theme.colorDefault};
    opacity: 0.6;
  `,
  handle: (theme: ITheme) => css`
    width: 18px;
    height: 18px;
    border-radius: inherit;
    background: ${theme.colorDefault};
    display: grid;
    place-items: center;

    svg {
      width: 60%;
      height: 60%;
    }

    path {
      fill: ${theme.colorPrimaryText};
    }
  `,
  badge: (theme: ITheme) => css`
    position: absolute;
    top: -12px;
    left: -12px;
    display: grid;
    place-items: center;
    padding: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${theme.colorLabel};
    border: 3px solid ${theme.colorBackground};
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

    @media ${breakpoints.toXlrg} {
      top: 50%;
      left: 60px;
      translate: 0 -50%;
    }
  `,
};
