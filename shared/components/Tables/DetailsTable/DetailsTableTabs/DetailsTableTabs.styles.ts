import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;

    @media ${breakpoints.toSml} {
      margin-top: 8px;
    }
  `,
  tabHeader: css`
    display: flex;
    margin-bottom: 6px;

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
  tabContent: css`
    position: relative;
    overflow: hidden;
    will-change: height;
  `,
  tabContentItem: css`
    visibility: hidden;
    opacity: 0;
  `,
  tabContentItemVisible: css`
    visibility: visible;
    opacity: 1;
  `,
};
