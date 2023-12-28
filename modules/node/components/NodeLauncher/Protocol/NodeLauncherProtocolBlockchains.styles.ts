import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  blockchainWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 50%;
  `,
  nodeTypeButtons: css`
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    gap: 8px;
    opacity: 0;
    visibility: hidden;
    scale: 0;
    position: absolute;
  `,
  button: (theme: ITheme) => css`
    position: relative;
    color: ${theme.colorText};
    opacity: 0.8;
    text-align: left;
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 6px;
    gap: 10px;
    width: 100%;
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
    opacity: 0.7;
    outline: none;

    @media ${breakpoints.fromXLrg} {
      max-height: 56px;
      min-height: 56px;
    }
  `,
  rowHover: (theme: ITheme) => css`
    &.active {
      background: ${rgba(theme.colorLightGrey || '#ffffff', 0.5)};
      opacity: 1;

      .beta-badge {
        opacity: 1;
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
      :is(.focus):not(.active) {
        opacity: 0.9;
        background: ${rgba(theme.colorLightGrey || '#ffffff', 0.25)};
      }

      &.active {
        opacity: 1;
      }

      :is(.active, .focus) > :is(.node-type-buttons, span) {
        visibility: visible;
        scale: 1;
        position: relative;
      }

      :is(.focus) .node-type-buttons {
        opacity: 0.9;
      }

      :is(.focus) span {
        opacity: 0.9;
      }

      &.active {
        opacity: 1;
      }

      &.active,
      .node-type-buttons {
        opacity: 1;
      }

      :is(.active, .focus) path {
        fill: ${theme.colorPrimary};
      }
    }
  `,
  rowDisabled: css`
    opacity: 0.2;
    cursor: not-allowed;

    .focus {
      opacity: 1;

      .coming-soon-badge {
        opacity: 1;
      }
    }
  `,
  createButton: (theme: ITheme) => css`
    border: 0;
    font-size: 11px;
    height: 32px;
    min-width: 60px;
    padding: 0 10px;
    background: ${theme.colorLightGrey};
    color: ${theme.colorText};
    border-radius: 4px;
    cursor: pointer;
    text-transform: capitalize;

    :is(:focus) {
      box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.125);
    }

    &.active {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,
};
