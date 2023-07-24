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
  menuItemText: css`
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
};
