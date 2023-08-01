import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    flex: 1 1 auto;
    min-width: 0;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    font-size: 16px;

    :hover,
    &.not-empty,
    &.is-open {
      > button:not(:disabled) {
        svg path {
          fill: ${theme.colorText};
        }

        p {
          color: ${theme.colorText};
        }
        border-color: ${theme.colorDefault};
      }
    }

    &.not-empty {
      span {
        color: ${theme.colorDefault};
      }
      p {
        color: ${theme.colorText};
      }
    }
  `,
  wrapperNoBottomMargin: css`
    margin-bottom: 0;
  `,
};
