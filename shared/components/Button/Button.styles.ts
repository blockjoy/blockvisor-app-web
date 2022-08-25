import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';

const buttonStyle = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-foreground-secondary);
    box-shadow: 0px 0px 0px 3px var(--color-primary-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }
  `,
  secondary: css`
    background-color: var(--color-secondary);
    color: var(--color-foreground-secondary);
    box-shadow: 0px 0px 0px 3px var(--color-secondary-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 3px var(--color-secondary-o30);
    }
  `,
  outline: css`
    color: var(--color-text-5);
    border: 1px solid var(--color-border-2);
    background-color: transparent;
    transition: background-color 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      background-color: var(--color-text-5-o10);
    }
  `,
  ghost: css`
    color: var(--color-text-5);
    transition: background-color 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active,
    &:focus {
      background-color: var(--color-text-5-o3);
    }
  `,
  warning: css`
    background-color: theme(--color-utility-warning);
    color: theme(--color-foreground-primary);
    box-shadow: 0px 0px 0px 3px var(--color-utility-warning-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    &:hover,
    &:active {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }
  `,
  basic: css`
    color: var(--color-text-5);
    padding: 0;
  `,
};

const button = css`
  font-weight: var(--font-weight-bold);
  justify-content: center;
  align-items: center;
  gap: 10px;
  ${typo.button}
  text-decoration: none;
  transition: background-color 0.18s var(--transition-easing-cubic),
    box-shadow 0.18s var(--transition-easing-cubic),
    color 0.18s var(--transition-easing-cubic),
    border-color 0.18s var(--transition-easing-cubic);

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const buttonDisplay = {
  inline: css`
    display: inline-flex;
  `,
  block: css`
    display: flex;
    width: 100%;
  `,
};

const buttonBorder = {
  rounded: css`
    border-radius: 4px;
  `,
  round: css`
    border-radius: 50%;
  `,
};
const buttonSize = {
  small: css`
    padding: 6px 16px;
    ${typo.buttonSmall}
  `,
  medium: css`
    padding: 8px 28px;
  `,
  normal: css`
    padding: 16px 24px;
  `,
};

const buttonLight = css`
  border: 1px solid var(--color-foreground-secondary-o10);
  background-color: transparent;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-foreground-secondary-o10);
  }
`;

const buttonLightO10 = css`
  border: 1px solid var(--color-text-5-o10);
  background-color: transparent;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-text-5-o10);
  }
`;

const buttonRoundMedium = css`
  width: 40px;
  height: 40px;
`;

export {
  button,
  buttonSize,
  buttonDisplay,
  buttonBorder,
  buttonRoundMedium,
  buttonLight,
  buttonLightO10,
  buttonStyle,
};
