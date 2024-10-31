import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    flex: 1 1 auto;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    font-size: 16px;

    :hover,
    &.not-empty,
    &.is-open {
      > button:not(:disabled) {
        p,
        span {
          color: ${theme.colorText};
        }

        opacity: 1;
        border-color: ${theme.colorLabel};
      }
    }

    &.not-empty {
      span {
        color: ${theme.colorDefault};
      }
      p,
      span {
        color: ${theme.colorText};
      }
    }
  `,
  wrapperNoBottomMargin: css`
    margin-bottom: 0;
  `,
};
