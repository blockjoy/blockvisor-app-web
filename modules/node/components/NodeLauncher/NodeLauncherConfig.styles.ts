import { css } from '@emotion/react';
import { ITheme } from 'types/theme';

export const styles = {
  wrapper: (theme: ITheme) => css`
    padding: 10px 0;
    flex: 1 1 auto;
    border-left: 1px solid ${theme.colorBorder};
  `,
  h2: (theme: ITheme) => css`
    display: flex;
    align-items: center;
    height: 58px;
    font-size: 16px;
    margin: 0;
    font-weight: 400;
    color: ${theme.colorLabel};
    padding: 0 30px;
  `,
  alert: (theme: ITheme) => css`
    position: relative;
    display: inline-block;
    line-height: 1.35;
    border-radius: 60px;
    padding: 10px 24px 10px 36px;
    background: ${theme.colorLightGrey};
    color: ${theme.colorText};
    font-size: 13px;
    margin: 0 30px 24px;

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
  nodeTypeProperties: css`
    padding: 0 30px;
  `,
  buttons: (theme: ITheme) => css`
    padding: 20px 30px;
    border-top: 1px solid ${theme.colorBorder};
  `,
  requiredAsterix: (theme: ITheme) => css`
    display: inline-block;
    color: ${theme.colorDanger};
    margin-left: 10px;
    translate: 0 5px;
    font-size: 20px;
  `,
};
