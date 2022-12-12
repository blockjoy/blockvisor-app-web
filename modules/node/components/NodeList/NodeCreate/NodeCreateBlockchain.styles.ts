import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: absolute;
    z-index: 2;
    top: 44px;
    left: 50%;
    translate: -50% 0;
    width: 580px;
    max-width: 580px;
    min-width: 580px;
    background: #212423;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    overflow: hidden;

    @media ${breakpoints.toMed} {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
    }
  `,
  grid: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 140px;
    gap: 8px;
    padding: 16px;

    @media ${breakpoints.toMed} {
      grid-template-columns: 1fr;
      grid-auto-rows: max-content;
      gap: 0;
      padding: 10px 0 8px;
    }
  `,
  miniIconWrapper: css`
    > span {
      display: grid;
      place-items: center;
      width: 20px;
      height: 20px;
    }
  `,
  iconWrapper: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    border: 2px solid ${theme.colorLabel};
    padding: 10px;
    border-radius: 50%;
    margin-bottom: 4px;

    path {
      fill: ${theme.colorText};
    }
  `,
  name: css``,
  row: (theme: ITheme) => css`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 12px 16px;
    color: ${theme.colorText};
    font-size: 16px;
    /* border: 1px solid ${theme.colorLabel}; */
    background: #1c1f1e;
    border-radius: 6px;

    /* :nth-child(odd) {
      background: rgba(0, 0, 0, 0.2);
    } */

    /* &:hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};

      path {
        fill: ${theme.colorPrimaryText};
      }
    } */
  `,
  header: css`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    font-size: 16px;
    align-items: center;

    :hover ~ .buttons {
      opacity: 1;
      visibility: visible;
      translate: 0;
    }
  `,
  miniHeader: (theme: ITheme) => css`
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 14px;

    path {
      fill: ${theme.colorText};
    }
  `,
  buttons: css`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    /* transition: 0.3s; */
    /* background: #191b1a; */
    background: rgba(28, 31, 30, 0.9);
    backdrop-filter: blur(7px);

    :hover {
      opacity: 1;
      visibility: visible;
      translate: 0;
    }
  `,
  buttonsGrid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  `,
  createButton: (theme: ITheme) => css`
    background: red;
    border: 0;
    font-size: 11px;
    height: 32px;
    width: 72px;
    background: #3b403e;
    color: #f9f9f9;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
    }
  `,
};
