import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  detailsHeader: css`
    display: flex;
    gap: 20px;
    margin-bottom: 8px;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
    }
  `,
  detailsFooter: css`
    display: flex;
    gap: 16px;
    white-space: nowrap;

    @media ${breakpoints.toLrg} {
      gap: 8px;
    }
  `,
  actions: css`
    display: flex;
    gap: 8px;
    margin-left: auto;

    > button {
      width: 86px;
    }

    @media ${breakpoints.toXlrg} {
      margin-left: 52px;
    }

    @media ${breakpoints.toLrg} {
      margin-left: 0;
    }
  `,
  nodeId: css`
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  blockchainIcon: (theme: ITheme) => css`
    display: grid;
    place-items: center;
    border-radius: 50%;

    > span {
      width: 40px;
      height: 40px;
    }
  `,
};
