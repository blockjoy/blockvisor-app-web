import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    position: sticky;
    z-index: 2;
    top: 71px;
    flex: 1 1 auto;
    display: flex;
    gap: 28px;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${theme.colorBorder};
    background: ${theme.colorBackground};

    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
  wrapperInner: css``,
  listTypePicker: css`
    display: flex;
    justify-content: flex-end;

    @media ${breakpoints.toXlrg} {
      display: none;
      position: absolute;
    }
  `,
  filterToggle: css`
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    padding: 0;

    path,
    span {
      transition: 0.3s;
    }

    path {
      fill: rgba(255, 255, 255, 0.3);
    }

    :hover {
      > span {
        color: rgba(255, 255, 255, 0.7);
      }
      path {
        fill: rgba(255, 255, 255, 0.7);
      }
    }
  `,
  endBlock: css`
    flex: 0 0 auto;
  `,
  orgPicker: css`
    @media ${breakpoints.fromLrg} {
      display: none;
    }
  `,
  count: css`
    line-height: 1.2;
    white-space: nowrap;

    @media ${breakpoints.toHuge} {
      display: none;
    }
  `,
};
