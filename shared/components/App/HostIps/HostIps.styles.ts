import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;

    @media ${breakpoints.toSml} {
      margin-top: 8px;
    }
  `,
  listPicker: css`
    display: flex;
    margin-bottom: 16px;

    input {
      position: absolute;
      transform: scale(0);
    }

    label {
      display: grid;
      place-items: center;
      height: 32px;
      opacity: 0.4;
      padding-right: 10px;
      font-size: 14px;
      cursor: pointer;
      text-transform: capitalize;
      transition: 0.3s;
    }

    label: hover {
      opacity: 0.66;
    }

    input:checked ~ label {
      opacity: 1;
    }
  `,
  ipListWrapper: css`
    position: relative;
    overflow: hidden;
    margin-bottom: 16px;
    will-change: height;
  `,
  ipList: css`
    z-index: 1;
    top: 0;
    left: 0;
    columns: 2 140px;
    display: inline-block;

    @media ${breakpoints.fromSml} {
      columns: 2 140px;
    }

    @media ${breakpoints.fromMed} {
      columns: 3 140px;
    }

    @media ${breakpoints.fromLrg} {
      columns: 3 140px;
    }

    @media ${breakpoints.fromXHuge} {
      columns: 3 140px;
    }
  `,
  ipListLink: (theme: ITheme) => css`
    position: relative;
    color: ${theme.colorText};
  `,
  ip: css`
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.66;
  `,
  ipAssigned: css`
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0.66;
    text-decoration: line-through;
  `,
};
