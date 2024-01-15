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
    white-space: nowrap;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
    font-size: 16px;

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  separator: (theme: ITheme) => css`
    color: ${theme.colorBorderGrey};

    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
  buttons: (theme: ITheme) => css`
    display: flex;
    gap: 16px;
  `,
  button: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 4px;
    background: transparent;
    white-space: nowrap;
    color: ${theme.colorText};
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    padding: 0 16px;
    height: 40px;
    opacity: 0.8;
    cursor: pointer;
    transition: 0.3s;

    path {
      fill: ${theme.colorText};
    }

    :hover {
      opacity: 1;
      background: rgb(255 255 255 / 2.5%);
    }
  `,
};
