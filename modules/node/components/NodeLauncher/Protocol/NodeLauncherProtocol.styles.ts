import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    flex-direction: column;
    max-width: 33%;
    padding: 10px 16px 10px 0;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.fromXLrg} {
      flex: 1 1 400px;
      margin-left: -14px;
      min-height: calc(100vh - 72px);
      max-height: calc(100vh - 72px);
    }

    @media ${breakpoints.toXlrg} {
      display: block;
      max-height: inherit;
      max-width: 100%;
      border-right: none;
      border-bottom: 1px solid ${theme.colorBorder};
      padding: 10px 0 20px;
    }

    div:hover .row:hover,
    div .row.hovered {
      opacity: 1;
    }
  `,
  scrollbar: (theme: ITheme) => css`
    @media ${breakpoints.toXlrg} {
      max-height: 60svh;
      overflow-x: hidden;
      overflow-y: auto;
    }

    @media ${breakpoints.fromXLrg} {
      max-height: 100svh;
      overflow-x: hidden;
      overflow-y: auto;
    }

    ::-webkit-scrollbar {
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colorLabel};
    }
  `,
  row: css`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
    width: 100%;
    height: 56px;
    min-height: 56px;
    padding: 0 6px;
    font-size: 16px;
    align-items: center;
    background: transparent;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    outline: none;

    @media ${breakpoints.fromXLrg} {
      opacity: 0.7;
      max-height: 56px;
      min-height: 56px;
    }
  `,
  rowHover: (theme: ITheme) => css`
    @media ${breakpoints.toXlrg} {
      p {
        color: ${rgba(theme.colorText || '#ffffff', 0.7)};
      }
    }

    &.active {
      background: ${rgba(theme.colorLightGrey || '#ffffff', 0.5)};
      opacity: 1;

      .beta-badge {
        opacity: 1;
      }

      @media ${breakpoints.toXlrg} {
        p {
          color: ${theme.colorText};
        }
      }
    }

    @media ${breakpoints.toMed} {
      &:focus,
      &.focus {
        background: ${rgba(theme.colorLightGrey || '#ffffff', 0.25)};
      }

      :is(:focus, .active, .focus) div {
        opacity: 1;
        visibility: visible;
      }

      :is(:focus, .active, .focus) span {
        opacity: 1;
      }

      :is(:focus, .active, .focus) path {
        fill: ${theme.colorPrimary};
      }

      :is(:focus, .active, .focus) .node-type-buttons {
        scale: 1;
        position: relative;
      }
    }

    @media ${breakpoints.fromMed} {
      &.focus:not(.active) {
        opacity: 1;
        background: ${rgba(theme.colorLightGrey || '#ffffff', 0.25)};
      }

      :is(.active, .focus) > :is(.node-type-buttons, span) {
        visibility: visible;
        scale: 1;
        position: relative;
      }

      &.focus .node-type-buttons {
        opacity: 0.9;
      }

      &.focus .node-type-buttons button:hover {
        background: ${theme.colorPrimary};
        color: ${theme.colorPrimaryText};
      }

      &.focus:not(.active) span {
        opacity: 0.9;
      }

      &.active {
        opacity: 1;
      }

      &.active .node-type-buttons {
        opacity: 1;
      }

      :is(.active, .focus) path {
        fill: ${theme.colorPrimary};
      }
    }
  `,
};
