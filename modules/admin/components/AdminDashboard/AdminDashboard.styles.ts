import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 60px;
    padding-top: 40px;

    @media ${breakpoints.fromLrg} {
      padding-bottom: 0;
    }
  `,
  sectionHeader: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 12px;

    a {
      font-size: 16px;
      opacity: 0.7;
      translate: 0 2px;
    }
  `,
  sectionHeaderLinks: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    gap: 10px;

    > a::after {
      padding-right: 10px;
    }
  `,
  grid: css`
    display: grid;
    width: 100%;
    gap: 20px;
    padding-top: 20px;
    margin-bottom: 30px;

    @media ${breakpoints.fromLrg} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${breakpoints.fromXHuge} {
      grid-template-columns: repeat(5, 1fr);
    }
  `,
};
