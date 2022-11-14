import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: flex;
    align-items: baseline;
    gap: 28px;
    margin-bottom: 12px;
  `,
  title: css`
    ${typo.large}
    padding-right: 36px;
    position: relative;
    word-break: break-all;
    cursor: pointer;

    @media ${breakpoints.fromMed} {
      padding-right: 0;
    }
  `,
  formInput: css`
    max-width: fit-content;
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
    display: inline-grid;
    grid-template-columns: repeat(2, 88px);
    gap: 10px;
    align-items: center;
  `,
  status: css`
    margin-left: 12px;
    ${typo.microlabel}
    ${colors.primary}
    ${typo.uppercase}
  `,
  copyText: css`
    max-width: 80px;
  `,
};
