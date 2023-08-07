import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: sticky;
    overflow: hidden;
    top: 72px;
    z-index: 2;
    display: flex;
    gap: 16px;
    align-items: center;
    height: 0;
    background: ${theme.colorBackground};
    border-bottom: 1px solid ${theme.colorBorder};
    box-shadow: 0 6px 30px ${theme.colorBackground};
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.3s;

    @media ${breakpoints.fromXLrg} {
      margin-right: 20px;
    }
  `,
  wrapperVisible: css`
    opacity: 1;
    visibility: visible;
    height: 70px;
  `,
  header: css`
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  deleteButton: css`
    margin-left: auto;
  `,
  status: css`
    @media ${breakpoints.toSml} {
      display: none;
    }
  `,
};
