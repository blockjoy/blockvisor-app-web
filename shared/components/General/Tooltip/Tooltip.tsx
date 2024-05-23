import { SerializedStyles } from '@emotion/react';
import { styles } from './Tooltip.styles';

type Props = {
  tooltip: string | React.ReactNode;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  hideOnMobile?: boolean;
  noWrap?: boolean;
  customCss?: SerializedStyles[];
};

export const Tooltip = ({
  tooltip,
  top,
  right,
  bottom,
  left,
  hideOnMobile = false,
  noWrap = false,
  customCss,
}: Props) => {
  const tooltipStyles = [
    styles.tooltip({ top, right, bottom, left, noWrap }),
    hideOnMobile && styles.tooltipHidden,
  ];

  if (customCss) {
    tooltipStyles.push(...customCss);
  }

  return (
    <span className="tooltip" css={tooltipStyles}>
      {tooltip}
    </span>
  );
};
