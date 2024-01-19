import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
    padding: 0 0 20px;
  `,
  nodes: css`
    @media ${breakpoints.fromSml} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXLrg} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${breakpoints.fromHuge} {
      grid-template-columns: repeat(4, 1fr);
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(5, 1fr);
    }
  `,
  hosts: css`
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
