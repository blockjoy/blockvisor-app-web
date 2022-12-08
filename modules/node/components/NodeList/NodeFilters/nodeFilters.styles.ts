import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  outerWrapper: css`
    display: flex;
    flex-direction: column;

    @media ${breakpoints.fromXLrg} {
      top: 72px;
      position: sticky;
      flex: 0 0 200px;
      min-width: 200px;
      max-width: 200px;
      height: calc(100vh - 72px);
    }
  `,
  outerWrapperCollapsed: css`
    @media ${breakpoints.fromXLrg} {
      max-width: 0;
      min-width: 0;
      padding: 0;
      overflow: hidden;
    }
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    transition-property: height;
    transition-duration: 0.3s;

    @media ${breakpoints.toXlrg} {
      height: 0;
      overflow: hidden;
    }
  `,
  filters: (theme: ITheme) => css`
    overflow: auto;
    flex: 1 1 auto;
    min-height: 0;
    margin: 16px 0 0;
    display: grid;
    grid-auto-rows: max-content;
    gap: 16px;

    .ps .ps__rail-x:hover,
    .ps .ps__rail-y:hover,
    .ps .ps__rail-x:focus,
    .ps .ps__rail-y:focus,
    .ps .ps__rail-x.ps--clicking,
    .ps .ps__rail-y.ps--clicking {
      background: rgba(255, 255, 255, 0.1);
    }

    /* .ps__rail-y:hover > .ps__thumb-y,
    .ps__rail-y:focus > .ps__thumb-y,
    .ps__rail-y.ps--clicking .ps__thumb-y {
      background: ${theme.colorPrimary};
    } */
  `,
  wrapperOpen: css`
    margin-bottom: 40px;

    @media ${breakpoints.toXlrg} {
      height: auto;
    }
  `,
  resetButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colorDefault};
    font-size: 14px;
    height: 56px;
    cursor: pointer;

    path {
      fill: ${theme.colorDefault};
    }

    :hover {
      color: ${theme.colorText};

      & path {
        fill: ${theme.colorText};
      }
    }
  `,
  updateButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    height: 40px;
    padding: 0 16px;
    border: 0;
    border-radius: 6px;
    background: ${theme.colorPrimary};
    color: ${theme.colorPrimaryText};
    margin-right: 16px;
    cursor: pointer;
  `,
};
