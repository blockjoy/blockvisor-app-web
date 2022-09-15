import { css, SerializedStyles } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

const inputLabel = css`
  display: inline-block;
  color: var(--color-text-3);
  margin-bottom: 4px;
`;

const inputLabelDisabled = css`
  opacity: 0.4;
  cursor: not-allowed;
  user-select: none;
`;

const inputLabelSize: Record<InputSize, SerializedStyles> = {
  small: css`
    ${typo.tiny}
  `,
  medium: css`
    ${typo.small}
  `,
  large: css`
    ${typo.base}
  `,
};

export { inputLabel, inputLabelDisabled, inputLabelSize };
