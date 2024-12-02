import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: (flexWrap: boolean) => (theme: ITheme) =>
    css`
      position: sticky;
      z-index: 2;
      top: 72px;
      display: flex;
      align-items: center;
      ${flexWrap && `flex-wrap: wrap;`};
      gap: 10px;
      width: 100%;
      padding-top: 22px;
      padding-bottom: 20px;
      min-height: 88px;
      border-bottom: 1px solid ${theme.colorBorder};
      background: ${rgba(theme.colorBackground || '#000', 0.8)};
      backdrop-filter: blur(10px);
      line-height: 1.6;
    `,
  title: css`
    display: flex;
    align-items: center;

    @media ${breakpoints.toLrg} {
      min-height: 48px;
    }
  `,
  titleText: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    text-transform: capitalize;
    cursor: pointer;
    color: ${theme.colorDefault};
    transition: 0.3s;

    :hover {
      color: ${theme.colorText};
    }
  `,
};
