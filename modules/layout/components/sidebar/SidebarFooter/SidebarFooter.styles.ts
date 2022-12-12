import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    color: var(--color-text-5);
    padding: 16px 26px;
  `,
  wrapperCollapsed: css`
    padding: 0px 21px 0px 21px;
  `,
  copy: (isSidebar: boolean) => css`
    ${isSidebar &&
    `
  &:hover {
    cursor: pointer;
    @media ${breakpoints.fromXLrg} {
      :hover .sidebar-copy {
        opacity: 1;
        visibility: visible;
        white-space: nowrap;
        margin: 0;
      }
    }
  }
  `}
  `,
  support: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  separator: (isSidebar: boolean) => (theme: ITheme) =>
    css`
      margin: 0 -26px 0 -26px;

      ${isSidebar &&
      `
      margin: 0 -21px;
    `}
      border-top: 1px solid ${theme.colorBorder};
    `,
  logo: css`
    & path {
      fill: #4c4f4d;
    }
  `,
  button: (isSidebar: boolean) => css`
    padding: 16px 16px 16px 0;

    ${isSidebar &&
    `
      padding: 16px 0;
      width: 100%;
      display: flex;
      justify-content: center;
    `}

    &:hover {
      & > svg {
        path {
          fill: var(--color-text-5);
        }
      }

      ${isSidebar &&
      `
       @media ${breakpoints.fromXLrg} {
        :hover .signout-text {
          opacity: 1;
          visibility: visible;
          white-space: nowrap;
          margin: 0;
        }
      }
    `}
    }
  `,
  buttonText: css`
    margin-left: 10px;
  `,
  tooltip: css`
    @media ${breakpoints.fromXLrg} {
      position: absolute;
      left: 110%;
      background: #0c0c02;
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 4px;
      opacity: 0;
      visibility: hidden;
    }
  `,
  icon: css`
    path {
      transition: fill 0.18s var(--transition-easing-cubic);
      fill: var(--color-text-2);

      &:hover {
        fill: var(--color-text-5);
      }
    }
    cursor: pointer;
  `,
};
