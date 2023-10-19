import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 16px;
  `,
  separator: (theme: ITheme) => css`
    margin-left: 20px;
    color: ${theme.colorBorderGrey};

    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
  button: (theme: ITheme) => css`
    border: 1px solid ${theme.colorBorderGrey};
    border-radius: 4px;
    background: transparent;
    color: ${theme.colorText};
    font-size: 14px;
    padding: 0 12px;
    height: 44px;
    margin-left: 10px;
    opacity: 0.8;
    cursor: pointer;
    transition: 0.3s;

    :hover {
      opacity: 1;
      background: rgb(255 255 255 / 2.5%);
    }
  `,
};
