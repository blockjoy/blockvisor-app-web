import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    @media ${breakpoints.fromXLrg} {
      padding-right: 20px;
    }
  `,
  breadcrumb: (theme: ITheme) => css`
    display: flex;
    padding-bottom: 16px;
    border-bottom: 1px solid ${theme.colorBorder};
    margin-bottom: 16px;
    background: ${theme.colorBackground};
  `,
  backButton: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    opacity: 0.8;
    transition: 0.3s;

    :hover {
      color: ${theme.colorText};
    }
  `,
  title: (theme: ITheme) => css`
    color: ${theme.colorText};
    font-size: 16px;
  `,
  separator: (theme: ITheme) => css`
    color: ${theme.colorLabel};
    font-size: 16px;
    opacity: 0.5;
    padding: 0 6px;
  `,
};
