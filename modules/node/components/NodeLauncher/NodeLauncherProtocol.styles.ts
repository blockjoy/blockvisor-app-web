import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 10px 16px 10px 0;
    margin-left: -16px;
    width: 500px;
    max-width: 500px;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toXlrg} {
      width: calc(100% + 24px);
      max-width: calc(100% + 24px);
      min-width: calc(100% + 24px);
      margin-right: -16px;
      border-right: none;
      border-bottom: 1px solid ${theme.colorBorder};
      padding: 10px 0 20px;
    }

    div:hover .row:hover {
      opacity: 1;
    }
  `,
  disabledBlockchains: css`
    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
  iconWrapper: (theme: ITheme) => css`
    display: grid;
    place-items: center;

    > span {
      width: 20px;
      height: 20px;
    }

    path {
      fill: ${theme.colorText};
    }
  `,
  searchIcon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    left: 1px;
    width: 16px;
    height: 16px;
    translate: 0 -50%;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  searchWrapper: css`
    position: relative;
    margin: 0 0 16px 16px;
  `,
  searchBox: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${theme.colorBorder};
    height: 54px;
    padding-left: 29px;
    width: 100%;
    outline: none;
    color: ${theme.colorText};

    :focus ~ span path {
      fill: ${theme.colorText};
    }

    ::placeholder {
      color: ${theme.colorLabel};
    }
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
    border: 0;
    cursor: pointer;
    opacity: 0.7;
    outline: none;

    /* :nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    } */

    @media ${breakpoints.toXlrg} {
      /* flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 16px;
      padding: 10px 15px; */
    }

    @media ${breakpoints.fromXLrg} {
      max-height: 56px;
      min-height: 56px;
    }
  `,
  rowHover: (theme: ITheme) => css`
    :is(:hover, :focus, .active) {
      background: ${theme.colorLightGrey};
      opacity: 1;

      /* @media ${breakpoints.toXlrg} {
        max-height: 1000px;
        height: 90px;
      } */

      .beta-badge {
        opacity: 1;
      }
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
    padding: 0 10px;
    background: #181a19;
    color: #f9f9f9;
    border-radius: 4px;
    cursor: pointer;

    :is(:hover, :focus, .active) {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,
  skeletonWrapper: css`
    padding: 20px 16px 0;
  `,
};
