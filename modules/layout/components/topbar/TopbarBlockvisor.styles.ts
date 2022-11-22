import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  iconWrapper: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    display: grid;
    place-items: center;
    pointer-events: none;
  `,
  iconWrapperSidebarOpen: css`
    padding-left: 260px;
  `,
  icon: (theme: ITheme) => css`
    @media ${breakpoints.toMed} {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
};
