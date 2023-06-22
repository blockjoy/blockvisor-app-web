import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
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
  blockchainWrapper: css`
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 170px;
  `,
  name: (theme: ITheme) => css`
    position: relative;
    color: ${theme.colorText};
    opacity: 0.8;
    text-align: left;
  `,
  betaBadge: (theme: ITheme) => css`
    position: absolute;
    top: -6px;
    right: -28px;
    display: grid;
    place-items: center;
    height: 12px;
    border-radius: 7px;
    padding: 0 5px;
    font-size: 6px;
    font-weight: 700;
    background: ${theme.colorText};
    color: ${theme.colorBackground};
    opacity: 0;
  `,
  comingSoonBadge: (theme: ITheme) => css`
    position: relative;
    display: grid;
    place-items: center;
    height: 20px;
    border-radius: 3px;
    padding: 0 7px 0 19px;
    font-size: 10px;
    background: ${theme.colorLightGrey};
    color: ${theme.colorText};
    opacity: 0;

    ::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 7px;
      translate: 0 -50%;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${theme.colorPrimary};
    }
  `,
  row: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 10px;
    width: 100%;
    height: 56px;
    min-height: 56px;
    padding: 0 15px;
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
      &:hover {
        background: ${rgba(theme.colorLightGrey || '#ffffff', 0.25)};
      }

      :is(:hover, :focus, .active) div {
        opacity: 1;
        visibility: visible;
      }

      :is(:hover, :focus, .active) span {
        opacity: 1;
      }

      :is(:hover, :focus, .active) path {
        fill: ${theme.colorPrimary};
      }

      :is(:hover, :focus, .active) .node-type-buttons {
        scale: 1;
        position: relative;
      }
    }

    @media ${breakpoints.fromMed} {
      &:hover:not(.active) {
        opacity: 0.9;
        background: ${rgba(theme.colorLightGrey || '#ffffff', 0.25)};
      }

      &.active {
        opacity: 1;
      }

      :is(:hover, .active) > :is(.node-type-buttons, span) {
        visibility: visible;
        scale: 1;
        position: relative;
      }

      &:hover .node-type-buttons {
        opacity: 0.9;
      }

      :hover span {
        opacity: 0.9;
      }

      &.active span {
        opacity: 1;
      }

      &.active .node-type-buttons {
        opacity: 1;
      }

      :is(:hover, .active) path {
        fill: ${theme.colorPrimary};
      }
    }
  `,
  rowDisabled: css`
    opacity: 0.2;
    cursor: not-allowed;

    :hover {
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

    @media ${breakpoints.toXlrg} {
      &.active {
        background: ${theme.colorPrimary};
        color: ${theme.colorPrimaryText};
      }
    }

    @media ${breakpoints.fromXLrg} {
      :is(:hover, :focus, .active) {
        background: ${theme.colorPrimary};
        color: ${theme.colorPrimaryText};
      }
    }
  `,
};
