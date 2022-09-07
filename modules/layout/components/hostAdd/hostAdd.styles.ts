import { css } from '@emotion/react';
import { colors } from 'styles/utils.colors.styles';
import { typo } from 'styles/utils.typography.styles';

export const styles = {
  base: css``,
  action: css`
    width: 100%;
  `,
  steps: css`
    border-top: 1px solid var(--color-overlay-background-1);
  `,
  step: css`
    padding-bottom: 28px;
  `,
  title: css`
    ${typo.small};
    ${colors.primary};
    padding-bottom: 8px;
  `,
  stepDescription: css`
    ${typo.small};
    ${colors.text3};
    padding-bottom: 12px;
  `,
};
