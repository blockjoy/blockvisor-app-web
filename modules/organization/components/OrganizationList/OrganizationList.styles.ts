import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    padding: 10px 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 0;

    @media ${breakpoints.toXlrg} {
      padding: 6px 0 30px;
    }
  `,
  addIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 14px;
    height: 14px;
    path {
      fill: ${theme.colorText};
    }
  `,
  row: (theme: ITheme) =>
    css`
      display: flex;
      align-items: center;
      height: 64px;
      width: 100%;
      border: 0;
      padding: 0;
      border-bottom: 1px solid ${theme.colorBorder};
      background: transparent;
      color: ${theme.colorDefault};
      cursor: pointer;
      opacity: 0.6;
      transition: 0.3s;

      :is(:hover, .active) {
        opacity: 1;
        color: ${theme.colorText};
        border-bottom-color: ${theme.colorBorderGrey};
      }

      > p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
        line-height: 1.6;
      }
    `,
  scrollbar: css`
    min-height: 0;
    flex: 1 1 auto;

    @media ${breakpoints.fromMed} {
      padding-right: 20px;
    }
  `,
};
