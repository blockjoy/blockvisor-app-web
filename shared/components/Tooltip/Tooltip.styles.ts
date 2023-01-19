import { css } from '@emotion/react';
import { breakpoints } from 'styles/variables.styles';

type TooltipStyleProps = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export const styles = {
  tooltip: (p: TooltipStyleProps) => css`
    position: absolute;
    top: ${p.top};
    right: ${p.right};
    bottom: ${p.bottom};
    left: ${p.left};
    translate: 0 -18px;
    background: #0c0c02;
    padding: 2px 10px;
    font-size: 12px;
    border-radius: 4px;
    color: #f9f9f9;
    opacity: 0;
    white-space: nowrap;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: 0.01s;
    transition-delay: 0.8s;
  `,
  tooltipHidden: css`
    @media ${breakpoints.toXlrg} {
      display: none;
    }
  `,
};
