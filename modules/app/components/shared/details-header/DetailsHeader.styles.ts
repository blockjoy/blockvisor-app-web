import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 36px;

    @media ${breakpoints.fromMed} {
      gap: 40px;
      justify-content: space-between;
      align-items: baseline;
      flex-direction: row;
    }
  `,
  title: css`
    ${typo.xlarge}
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
