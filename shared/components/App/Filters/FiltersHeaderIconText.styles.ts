import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  title: css`
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.3);
    font-size: 16px;

    @media ${breakpoints.toLrg} {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: transparent;
      border: 0;
      cursor: pointer;
      padding: 0 4px;
      height: 38px;
      width: 38px;
      border-radius: 6px;

      path {
        fill: ${theme.colorLabel};
      }

      &:hover,
      &:active,
      &:focus {
        background: ${theme.colorActive};
        & path {
          fill: ${theme.colorText};
        }
      }
    }
  `,
  filterIcon: css`
    position: relative;
  `,
  badge: (theme: ITheme) => css`
    position: absolute;
    top: -12px;
    right: -11px;
    border: 3px solid ${theme.colorBackground};
    display: grid;
    place-items: center;
    font-size: 7px;
    font-weight: 600;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: ${theme.colorPrimaryText};
    background: ${theme.colorPrimary};
  `,
  label: css`
    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
  dropdownIcon: css`
    display: grid;
    place-items: center;
    width: 8px;
    height: 8px;

    @media ${breakpoints.fromXLrg} {
      display: none;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
};
