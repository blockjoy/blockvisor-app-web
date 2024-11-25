import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  cell: css`
    padding: 20px 20px 20px 0;

    &:last-of-type {
      padding-right: 10px;
    }

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.6;
    }

    @media ${breakpoints.toXlrg} {
      padding: 20px 16px 20px 0;
    }
  `,
  hiddenOnMobile: (theme: ITheme) => css`
    @media only screen and (max-width: ${theme.screenSm}) {
      display: none;
    }
  `,
  textAlign: (textAlign: string) => css`
    text-align: ${textAlign};
  `,
  top: css`
    vertical-align: top;
  `,
  middle: css`
    vertical-align: middle;
  `,
};
