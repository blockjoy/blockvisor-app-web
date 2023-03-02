import { css, keyframes } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

const appearIn = keyframes`
  to {
    transform: translate(0, -50%);
  }
`;

export const styles = {
  tooltipFloating: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      position: absolute;
      z-index: 4000;
      min-width: 300px;
      top: 50%;
      right: calc(100% + 22px);
      transform: translate(10px, -50%);
      animation: ${appearIn} 300ms ease-out forwards;

      ::before {
        content: '';
        top: 50%;
        right: -17px;
        transform: translate(-9px, -9px) rotate(45deg);
        width: 18px;
        height: 18px;
        background-color: ${theme.colorLightGrey};
        position: absolute;
        z-index: 11;
      }
    }
  `,
  tooltip: css``,
  tooltipCompact: css`
    position: static;
  `,
  tooltipTop: css`
    @media ${breakpoints.fromXLrg} {
      top: calc(50% + 15px);
    }
  `,
  tooltipContainer: (theme: ITheme) => css`
    padding: 7px 3px 0;
    font-size: 12px;
    line-height: 20px;
    color: ${theme.colorText};
    border-radius: 8px;
  `,
  tooltipContainerFloating: (theme: ITheme) => css`
    @media ${breakpoints.fromXLrg} {
      background-color: ${theme.colorLightGrey};
      box-shadow: 0 0 10px rgb(0 0 0 / 10%);
      padding: 20px;
      font-size: 14px;
    }
  `,
  summary: css`
    display: flex;
    flex-direction: column-reverse;

    @media ${breakpoints.fromXLrg} {
      flex-direction: column;
    }
  `,
  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  infoButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    padding: 4px 8px;
    cursor: pointer;

    path {
      transition: 0.3s;
    }

    :hover path {
      fill: ${theme.colorText};
    }
  `,
  infoButtonHidden: css`
    display: none;
  `,
  title: (theme: ITheme) => css`
    font-weight: 600;
    color: ${theme.colorDefault};
  `,
  hintsWrapper: (theme: ITheme) => css`
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s;
  `,
  hintsWrapperVisible: css`
    max-height: 250px;
  `,
  hintsContent: css`
    display: flex;
    flex-flow: row wrap;
    gap: 5px;
    padding-top: 10px;
    padding-bottom: 7px;
  `,
  hint: (theme: ITheme) => css`
    padding: 3px 10px;
    background: ${theme.colorLabel};
    border-radius: 13px;

    @media ${breakpoints.fromXLrg} {
      background: ${theme.colorLabel};
    }
  `,
  hintDisabled: (theme: ITheme) => css`
    opacity: 0.5;
    color: ${theme.colorTextGrey};
    text-decoration: line-through;
  `,
  meter: (passwordStrength: number) => (theme: ITheme) =>
    css`
      height: 3px;
      background-color: ${theme.colorBorderGrey};
      border-radius: 3px;
      margin: 7px auto;
      display: flex;
      width: 100%;

      ::before {
        content: '';
        background-color: ${[
          theme.colorDanger,
          theme.colorDanger,
          theme.colorNote,
          theme.colorPrimary,
          theme.colorPrimary,
        ][passwordStrength - 1] || ''};
        height: 100%;
        width: ${(passwordStrength / 5) * 100}%;
        display: block;
        border-radius: 3px;
        transition: width 0.3s;
      }
    `,
};
