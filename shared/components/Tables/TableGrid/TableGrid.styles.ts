import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    padding: 0 0 20px;
  `,
  nodes: (isSidebarOpen: boolean, isFiltersOpen: boolean) => css`
    @media ${breakpoints.fromMed} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(
        ${isSidebarOpen || isFiltersOpen ? 2 : 3},
        1fr
      );
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(
        ${isSidebarOpen && isFiltersOpen
          ? 2
          : isSidebarOpen || isFiltersOpen
          ? 3
          : 4},
        1fr
      );
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(
        ${isSidebarOpen && isFiltersOpen
          ? 3
          : isSidebarOpen || isFiltersOpen
          ? 4
          : 5},
        1fr
      );
    }
  `,
  hosts: () => css`
    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(4, 1fr);
    }
  `,
};
