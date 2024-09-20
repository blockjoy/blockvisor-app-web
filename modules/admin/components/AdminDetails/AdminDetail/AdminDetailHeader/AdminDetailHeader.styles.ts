import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;

    @media ${breakpoints.toSml} {
      gap: 10px;
      flex-wrap: wrap;
    }
  `,
  name: css`
    font-size: 16px;

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  nameShortened: css`
    white-space: nowrap;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
  `,
  separator: (theme: ITheme) => css`
    color: ${theme.colorBorderGrey};

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  buttons: (theme: ITheme) => css`
    position: relative;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    flex: 1 1 auto;
    margin-left: auto;

    @media ${breakpoints.fromSml} {
      padding-left: 26px;
      justify-content: flex-start;

      ::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
        height: 16px;
        transform: translateY(-50%);
        background: ${theme.colorBorderGrey};
      }
    }

    @media ${breakpoints.fromSml} {
      margin-left: 0;
    }
  `,
};
