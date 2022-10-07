import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';
import { breakpoints } from 'styles/variables.styles';

export const styles = {
  base: css`
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 12px;

    @media ${breakpoints.fromMed} {
      align-items: baseline;
      flex-direction: row;
    }
  `,
  title: css`
    ${typo.large}
    padding-right: 36px;
    position: relative;
    word-break: break-all;

    @media ${breakpoints.fromMed} {
      padding-right: 0;
    }
  `,
  editable: css`
    width: 40px;
  `,
  contentEditableFocused: css`
    outline: white;
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
