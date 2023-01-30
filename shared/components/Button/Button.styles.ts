import { css } from '@emotion/react';
import { typo } from 'styles/utils.typography.styles';
import { ITheme } from 'types/theme';

const buttonStyle = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-foreground-secondary);
    box-shadow: 0px 0px 0px 3px var(--color-primary-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    :hover,
    :active,
    :focus {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }
  `,
  secondary: css`
    background-color: var(--color-secondary);
    color: var(--color-foreground-secondary);
    box-shadow: 0px 0px 0px 3px var(--color-secondary-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    :hover,
    :active,
    :focus {
      box-shadow: 0px 0px 0px 3px var(--color-secondary-o30);
    }
  `,
  outline: css`
    color: var(--color-text-5);
    border: 1px solid var(--color-border-2);
    background-color: transparent;
    transition: background-color 0.18s var(--transition-easing-cubic);

    :hover,
    :active,
    :focus {
      background-color: var(--color-text-5-o10);
    }
  `,
  ghost: css`
    color: var(--color-text-5);
    transition: background-color 0.18s var(--transition-easing-cubic);

    :hover,
    :active,
    :focus {
      background-color: var(--color-text-5-o3);
    }
  `,
  warning: css`
    background-color: var(--color-utility-warning);
    color: var(--color-foreground-primary);
    box-shadow: 0px 0px 0px 3px var(--color-utility-warning-o0);
    transition: box-shadow 0.18s var(--transition-easing-cubic);

    :hover,
    :active,
    :focus {
      box-shadow: 0px 0px 0px 3px var(--color-utility-warning-o30);
    }
  `,
  basic: css`
    color: var(--color-text-5);
    padding: 0;
  `,
  icon: (theme: ITheme) => css`
    display: inline-grid;
    place-items: center;
    width: 34px;
    height: 34px;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: 4px;
    transition: none;

    rect,
    path,
    circle {
      fill: ${theme.colorDefault};
    }

    :hover {
      background: ${theme.colorLightGrey};

      rect,
      path,
      circle {
        fill: ${theme.colorText};
      }
    }
  `,
};

const button = css`
  position: relative;
  font-weight: var(--font-weight-bold);
  position: relative;
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
  }

  :hover .tooltip {
    opacity: 1;
    visibility: visible;
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
    height: 32px;
    ${typo.buttonSmall}
  `,
  medium: css`
    height: 40px;
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
