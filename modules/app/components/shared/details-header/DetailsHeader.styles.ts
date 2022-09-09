import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;

    @media ${breakpoints.fromMed} {
      margin-bottom: 80px;
      gap: 40px;
      justify-content: space-between;
      align-items: baseline;
      flex-direction: row;
    }
  `,
  title: css`
    padding-right: 36px;
    position: relative;
    word-break: break-all;

    @media ${breakpoints.fromMed} {
      padding-right: 0;
    }
  `,
  summary: css`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    align-items: center;
  `,
  actions: css`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  `,
};
