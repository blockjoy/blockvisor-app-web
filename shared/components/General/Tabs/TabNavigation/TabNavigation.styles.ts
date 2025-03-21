import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 56px;
    margin-bottom: 20px;
    overflow-y: hidden;
    overflow-x: auto;

    ::-webkit-scrollbar {
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colorLabel};
    }
  `,
  tabs:
    (gap: string = '16px') =>
    (theme: ITheme) =>
      css`
        display: flex;
        gap: ${gap};
        align-self: stretch;
        width: 100%;
        border-bottom: 1px solid ${theme.colorBorder};

        @media ${breakpoints.fromXHuge} {
          .metrics {
            display: none;
          }
        }
      `,
  tabButton: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    color: ${theme.colorLabel};
    padding-top: 2px;
    border-bottom: 2px solid transparent;
  `,
  tabButtonActive: (theme: ITheme) => css`
    color: ${theme.colorText};
    border-bottom-color: ${theme.colorDefault};
  `,
  sidePanelHeader: (theme: ITheme) => css`
    color: ${theme.colorText};
    margin-left: auto;
    width: 440px;
    display: flex;
    align-items: center;

    @media ${breakpoints.toXHuge} {
      display: none;
    }
  `,
};
