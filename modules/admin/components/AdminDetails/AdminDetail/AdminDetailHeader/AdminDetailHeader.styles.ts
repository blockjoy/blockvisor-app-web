import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  `,
  name: css`
    white-space: nowrap;
    margin-right: 20px;
  `,
  separator: (theme: ITheme) => css`
    color: ${theme.colorBorderGrey};
  `,
  buttons: (theme: ITheme) => css`
    display: flex;
    gap: 16px;

    @media ${breakpoints.toSml} {
      border-top: 1px solid ${theme.colorBorder};
      width: 100%;
      padding-top: 10px;
    }
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

    :hover {
      opacity: 1;
      background: rgb(255 255 255 / 2.5%);
    }
  `,
};
