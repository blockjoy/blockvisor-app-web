import { css } from '@emotion/css';

export const containers = {
  main: css`
    margin-left: auto;
    margin-right: auto;
  `,
  large: css`
    max-width: 1268px;
  `,
  mediumLarge: css`
    max-width: 944px;
  `,
  medium: css`
    max-width: 640px;
  `,
  small: css`
    max-width: 404px;
  `,
  pullBack: css`
    margin-left: -120px;
    margin-right: -120px;
    padding-left: 120px;
    padding-right: 120px;
  `,
  buttons: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  `,
};
