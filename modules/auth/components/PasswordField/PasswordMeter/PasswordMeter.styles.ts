import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 2px 1px;
    @media ${breakpoints.fromLrg} {
      display: none;
    }
  `,
  mobileTitle: css`
    font-weight: 600;
    font-size: 12px;
  `,
  tooltip: (theme: ITheme) => css`
    position: absolute;
    z-index: 4000;

    @media ${breakpoints.toLrg} {
      display: none;
      // top: calc(0px - 12px);
      // left: 0;
      // transform: translate(-10px, -100%);
      // width: calc(100% + 20px);
    }
    @media ${breakpoints.fromLrg} {
      top: 50%;
      right: calc(100% + 25px);
      min-width: 300px;
      transform: translateY(-50%);
    }

    ::before {
      content: '';
      width: 18px;
      height: 18px;
      background-color: ${theme.colorLightGrey};
      position: absolute;
      z-index: 11;

      @media ${breakpoints.toLrg} {
        bottom: 0;
        right: 50%;
        transform: translate(9px, 9px) rotate(45deg);
      }
      @media ${breakpoints.fromLrg} {
        top: 50%;
        right: 0;
        transform: translate(9px, -9px) rotate(45deg);
      }
    }
  `,
  tooltipContainer: (theme: ITheme) => css`
    position: absolute;
    z-index: 4000;
    background-color: ${theme.colorLightGrey};
    box-shadow: 0 0 11px 0 ${rgba(theme.colorDark, 0.3)};
    position: relative;
    z-index: 10;
    padding: 20px;
    font-size: 14px;
    line-height: 20px;
    color: ${theme.colorText};
    border-radius: 8px;
    word-wrap: break-word;
  `,
  tooltipContent: css``,
  summary: css`
    margin-bottom: 20px;
  `,
  title: css`
    font-weight: 600;
  `,
  hints: css`
    @media ${breakpoints.toLrg} {
      display: none;
    }
  `,
  hintsList: css`
    list-style: disc;
    margin-left: 20px;
    margin-top: 10px;
  `,
  hintDisabled: css`
    color: #b9b9bd;
    text-decoration: line-through;
  `,
  meter: (passwordStrength: number) => (theme: ITheme) =>
    css`
      height: 0.3rem;
      background-color: lightgrey;
      border-radius: 3px;
      margin: 0.5rem 0;

      ::before {
        content: '';
        background-color: ${[
          theme.colorDanger,
          theme.colorNote,
          theme.colorAccent,
          theme.colorAccent,
          theme.colorPrimary,
        ][passwordStrength - 1] || ''};
        height: 100%;
        width: ${(passwordStrength / 5) * 100}%;
        display: block;
        border-radius: 3px;
        transition: width 0.2s;
      }
    `,
  messages: css`
    font-size: 13px;
  `,
};
