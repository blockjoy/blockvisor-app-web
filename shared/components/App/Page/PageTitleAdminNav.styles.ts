import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
    height: 44px;
  `,
  button: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    height: 44px;
    background: transparent;
    border: 0;
    padding: 0;
    color: ${theme.colorText};
    text-transform: capitalize;
    cursor: pointer;
    opacity: 0.8;
    transition: 0.3s;

    > span > svg > path,
    > span > span > svg > path {
      fill: ${theme.colorText};
    }

    :hover {
      opacity: 1;
    }
  `,
  menu: css`
    left: -20px;
    top: 50px;
    right: auto;
    min-width: 170px;

    ul {
      display: grid;
    }
  `,
  scrollbar: css`
    max-height: inherit;
  `,
  link: css`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 44px;
    padding: 0 16px;
    font-size: 14px;
  `,
  icon: (theme: ITheme) => css`
    pointer-events: none;
    transition: 0.3s;

    path {
      fill: ${theme.colorText};
    }

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  iconActive: css`
    transform: rotate(-180deg);
  `,
  nameIcon: css`
    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
};
