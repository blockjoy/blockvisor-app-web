import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';

export const styles = {
  header: css`
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;

    @media ${breakpoints.toLrg} {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 16px;
    }
  `,
  detailsHeader: css`
    display: flex;
    gap: 10px;
    margin-bottom: 4px;

    @media ${breakpoints.toXlrg} {
      flex-direction: column;
      margin-bottom: 16px;
    }

    h2 {
      word-break: break-word;
    }
  `,
  detailsFooter: css`
    display: flex;
    gap: 16px;
    white-space: nowrap;

    @media ${breakpoints.toLrg} {
      gap: 8px;
      flex-wrap: wrap;
      max-width: 300px;
    }
  `,
  actions: css`
    display: flex;
    gap: 8px;
    margin-left: auto;

    > button {
      width: 86px;
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
