import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    @media ${breakpoints.fromXHuge} {
      padding-right: 20px;
    }
  `,
  status: (theme: ITheme) => css`
    display: inline-block;
    padding: 2px 6px;
    font-size: 9px;
    color: ${theme.colorDefault};
    border-radius: 3px;
    border: 1px solid ${theme.colorDefault};
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
  statusSuccess: (theme: ITheme) => css`
    border-color: ${theme.colorPrimary};
    color: ${theme.colorPrimary};
  `,
  statusError: (theme: ITheme) => css`
    border-color: ${theme.colorDanger};
    color: ${theme.colorDanger};
  `,
  progress: (theme: ITheme) => css`
    color: ${theme.colorDefault};
    font-size: 12px;
  `,
};
