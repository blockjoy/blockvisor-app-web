import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 10px 0;
    width: 500px;
    max-width: 500px;
    border-right: 1px solid ${theme.colorBorder};

    @media ${breakpoints.toXlrg} {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      border-right: none;
      border-bottom: 1px solid ${theme.colorBorder};
      padding-bottom: 20px;
    }

    div:hover .row:hover {
      opacity: 1;
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
    margin: 0 16px 16px;
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
  `,
  name: (theme: ITheme) => css`
    color: ${theme.colorText};
    opacity: 0.8;
    min-width: 170px;
    text-align: left;
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

    /* :nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
    } */

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 16px;
      padding: 10px 15px;
    }

    @media ${breakpoints.fromXLrg} {
      max-height: 56px;
      min-height: 56px;
    }
  `,
  rowHover: (theme: ITheme) => css`
    :is(:hover, .active) {
      background: ${theme.colorLightGrey};
      opacity: 1;

      @media ${breakpoints.toXlrg} {
        max-height: 1000px;
        height: 90px;
      }
    }

    :is(:hover, .active) div {
      opacity: 1;
      visibility: visible;
    }

    :is(:hover, .active) span {
      opacity: 1;
    }

    :is(:hover, .active) path {
      fill: ${theme.colorPrimary};
    }

    :is(:hover, .active) .node-type-buttons {
      scale: 1;
      position: relative;
    }
  `,
  rowDisabled: css`
    opacity: 0.2;
    cursor: not-allowed;
  `,
  createButton: (theme: ITheme) => css`
    border: 0;
    font-size: 11px;
    height: 28px;
    padding: 0 16px;
    background: #181a19;
    color: #f9f9f9;
    border-radius: 16px;
    cursor: pointer;

    :is(:hover, .active) {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,
  skeletonWrapper: css`
    padding: 20px 16px 0;
  `,
};
