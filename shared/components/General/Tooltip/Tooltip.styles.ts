import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';
import { ITheme } from 'types/theme';
import { rgba } from 'polished';

type TooltipStyleProps = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  noWrap?: boolean;
};

export const styles = {
  tooltip: (p: TooltipStyleProps) => (theme: ITheme) =>
    css`
      position: absolute;
      z-index: 10;
      top: ${p.top};
      right: ${p.right};
      bottom: ${p.bottom};
      left: ${p.left};
      translate: 0 -18px;
      background: ${rgba(theme.colorTooltip, 0.55)};
      backdrop-filter: blur(10px);
      padding: 2px 10px;
      font-size: 12px;
      border-radius: 4px;
      color: ${theme.colorText};
      opacity: 0;
      line-height: 1.625;
      word-break: break-word;
      visibility: hidden;
      ${p.noWrap && 'white-space: nowrap;'};
      transition-property: opacity;
      transition-duration: 0.01s;
    `,
  tooltipHidden: css`
    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
};
