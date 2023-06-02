import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    min-width: 0;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;

    :hover .title {
      opacity: 1;
      visibility: visible;
    }
  `,
  wrapperNameHidden: css`
    width: 52px;
    max-width: 52px;

    @media ${breakpoints.fromXLrg} {
      margin-right: 6px;
    }
  `,
  active: css`
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    white-space: nowrap;
  `,
  header: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid ${theme.colorBorderGrey};

    h2 {
      font-size: 12px;
      color: ${theme.colorDefault};
    }
  `,
  select: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    background: transparent;
    color: ${theme.colorText};
    height: 64px;
    padding-left: 0;
    padding-right: 24px;
    border: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    cursor: pointer;

    :hover,
    :active,
    :focus {
      box-shadow: none;
    }
  `,
  selectText: css`
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 8px;
    line-height: 1.8;
  `,
  activeOrganization: css`
    cursor: default;

    :hover,
    :focus,
    :active {
      background: none;
    }
  `,
  dropdown: css`
    top: 54px;
    right: 5px;
    left: 0;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
  `,
  dropdownInner: css`
    max-height: 199px;

    ::-webkit-scrollbar-track {
      background: rgb(255 255 255 / 5%);
    }
  `,
  icon: (theme: ITheme) => css`
    position: absolute;
    top: 50%;
    right: 10px;
    translate: 0 -50%;
    rotate: 90deg;
    pointer-events: none;

    path {
      fill: ${theme.colorLabel};
    }
  `,
  iconActive: css`
    rotate: -90deg;
  `,
  createButton: (theme: ITheme) => css`
    background: transparent;
    border: 0;
    border-top: 1px solid ${theme.colorBorderGrey};
    border-bottom: 1px solid transparent;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px;
    gap: 12px;
    color: ${theme.colorDefault};
    font-size: 12px;
    cursor: pointer;

    path {
      fill: ${theme.colorDefault};
    }

    svg {
      width: 8px;
      height: 8px;
    }

    :hover {
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
      border-color: ${theme.colorPrimary};

      & svg path {
        fill: ${theme.colorPrimaryText};
      }
    }
  `,
  bubble: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    flex: 0 0 22px;
    border-radius: 50%;
    background: ${theme.colorAccent};
    color: ${theme.colorPrimaryText};
    font-weight: 600;
    font-size: 11px;
    text-align: center;
  `,
  autoSelect: (theme: ITheme) => css`
    border-bottom: 1px solid ${theme.colorBorderGrey};
  `,
};
