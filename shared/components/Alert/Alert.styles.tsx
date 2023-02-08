import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  alert: (theme: ITheme) => css`
    position: relative;
    display: inline-block;
    line-height: 1.35;
    border-radius: 6px;
    padding: 10px 24px 10px 36px;
    background: ${theme.colorLightGrey};
    color: ${theme.colorText};
    font-size: 13px;
    margin: 0 0 24px;
    width: 100%;

    ::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 16px;
      translate: 0 -50%;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: ${theme.colorDanger};
    }
  `,
  alertSuccess: (theme: ITheme) => css`
    ::after {
      background: ${theme.colorPrimary};
    }
  `,
  alertDanger: (theme: ITheme) => css`
    ::after {
      background: ${theme.colorDanger};
    }
  `,
};
