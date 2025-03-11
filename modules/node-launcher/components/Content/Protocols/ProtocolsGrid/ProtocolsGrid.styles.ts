import { css } from '@emotion/react';
import { rgba } from 'polished';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (isSidebarOpen: boolean) => (theme: ITheme) =>
    css`
      display: grid;
      gap: 10px;
      padding: 2px 12px 2px 2px;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

      @media ${breakpoints.toTny} {
        grid-template-columns: repeat(2, 1fr);
      }

      &:hover > li > div {
        background: radial-gradient(
          800px circle at var(--xPos) var(--yPos),
          ${rgba(theme.colorPrimary || '#bff589', 0.4)},
          transparent 15%
        );
      }
    `,
};
