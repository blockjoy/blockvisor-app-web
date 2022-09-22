import { css } from '@emotion/react';
import { rgba } from 'polished';
import { ITheme } from 'types/theme';

export const styles = {
  base: css``,
  action: css`
    width: 100%;
  `,
  slider: (theme: ITheme) => css`
    display: flex;
    gap: 20px;
    align-items: center;
    .rc-slider-rail {
      height: 8px;
      background: ${theme.colorLightGrey};
    }
    .rc-slider-track {
      height: 8px;
      background: ${theme.colorPrimary};
    }
    .rc-slider-handle {
      width: 18px;
      height: 18px;
      background: ${theme.colorPrimary};
      opacity: 1;
      border: 2px solid ${theme.colorBackground};
    }
    .rc-slider-handle-dragging {
      background: ${theme.colorPrimary};
      box-shadow: none !important;
      border: 2px solid ${theme.colorBackground} !important;
    }
  `,
  sliderValue: css`
    flex: 0 0 30px;
    min-width: 30px;
    max-width: 30px;
  `,
};
