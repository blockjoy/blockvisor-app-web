import { css, keyframes } from '@emotion/react';
import { ITheme } from 'types/theme';

const spin = keyframes`
  100% { transform: rotate(1turn); }
`;

export const styles = {
  wrapper: (theme: ITheme) => css`
    min-height: 156px;

    .hs-form {
      display: flex;
      flex-flow: column wrap;
      gap: 16px;
      max-width: 404px;
      min-height: 156px;
    }

    .hs-form .hs-email input {
      background: transparent;
      border: 1px solid ${theme.colorBorderGrey};
      border-radius: 4px;
      height: 38px;
      min-width: 0;
      padding: 0 8px;
      font-size: 16px;
      outline: none;
      color: ${theme.colorText};
      -webkit-transition: 0.3s;
      transition: 0.3s;
      width: 100%;
      height: 44px;
    }

    .hs-form .hs-email input.error {
      border-color: ${theme.colorDanger};
    }

    .hs-form .hs-email > label {
      display: inline-block;
      color: var(--color-text-3);
      margin-bottom: 8px;
      font-size: var(--font-size-tiny);
      line-height: var(--line-height-tiny);
      letter-spacing: var(--letter-spacing-default);
      font-size: var(--font-size-base);
      line-height: var(--line-height-base);
      letter-spacing: var(--letter-spacing-default);
    }

    .hs-form .hs-submit input {
      min-width: 125px;
      font-weight: var(--font-weight-bold);
      height: 44px;
      padding: 8px 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: ${theme.colorPrimary};
      color: ${theme.colorPrimaryText};
      border: 0;
      cursor: pointer;
      transition: box-shadow 0.18s var(--transition-easing-cubic);
    }

    .hs-form .hs-submit input:hover,
    .hs-form .hs-submit input:active {
      box-shadow: 0px 0px 0px 3px var(--color-primary-o30);
    }

    .hs-form .hs-error-msgs {
      margin-left: 2px;
      margin-top: 5px;
      font-size: 14px;
      color: ${theme.colorDanger};
    }

    .hs-form .hs_error_rollup {
      display: none;
    }

    .hs-form .submitted-message {
      margin-top: 30px;
      font-weight: 600;
    }
  `,
  loading: (theme: ITheme) => css`
    .hs-form .hs-submit {
      width: 125px;
    }

    .hs-form .hs-submit input {
      display: none;
    }

    .hs-form .hs-submit .actions {
      height: 44px;
      position: relative;
    }

    .hs-form .hs-submit .actions::before {
      height: 44px;
      padding: 8px 28px;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: ${theme.colorPrimary};
      cursor: no-drop;
      content: '';
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .hs-form .hs-submit .actions::after {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid rgb(255 255 255 / 20%);
      border-top-color: rgb(255 255 255 / 80%);
      animation: ${spin} 0.7s infinite linear;
      position: absolute;
      top: 12px;
      left: calc(50% - 12px);
    }
  `,
  submitted: css`
    min-height: auto;
  `,
};
