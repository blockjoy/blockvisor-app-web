import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  button: css`
    position: fixed;
    z-index: 11;
    display: grid;
    place-items: center;
    background: transparent;
    width: 64px;
    height: 72px;
    top: 0;
    border: 0;
    padding: 0;
    cursor: pointer;
    scale: 0.9;

    span,
    span::before,
    span::after {
      border-radius: 1px;

      @media ${breakpoints.toXlrg} {
        transition: 0.3s;
      }
    }

    span {
      position: relative;
      display: block;
      width: 20px;
      height: 1.5px;
      background: #f9f9f9;
    }

    span::before,
    span::after {
      content: '';
      display: inherit;
      position: absolute;
      left: 0;
      width: inherit;
      height: inherit;
      background: #f9f9f9;
    }

    span::before {
      top: -5px;
    }

    span::after {
      top: 5px;
    }
  `,
  buttonClosed: css`
    span::before {
      rotate: -45deg;
      translate: -3px 0px;
      width: 16px;
    }

    span::after {
      rotate: 45deg;
      translate: -3px 0px;
      width: 16px;
    }
  `,
};
