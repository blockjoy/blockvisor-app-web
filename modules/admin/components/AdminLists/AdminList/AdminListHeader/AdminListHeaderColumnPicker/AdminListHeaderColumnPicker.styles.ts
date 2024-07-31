import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    position: relative;
  `,
  title: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    padding: 16px 10px 10px;
    font-size: 13px;
  `,
  item: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    font-size: 13px;

    :hover {
      background: rgb(255 255 255 / 5%);
    }
  `,
  dropdownMenu: css`
    left: auto;
    right: 0;
    top: 54px;
    min-width: max-content;
    overflow: visible;

    @media ${breakpoints.toMed} {
      position: fixed;
      right: 0;
      top: 72px;
      min-width: 100%;
      max-width: 100%;
    }
  `,
  dropdownInner: css`
    max-height: 260px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 10%);
    }
  `,
};
