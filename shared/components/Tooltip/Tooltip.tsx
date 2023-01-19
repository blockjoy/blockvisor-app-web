import { FC } from 'react';
import { styles } from './Tooltip.styles';

type Props = {
  tooltip: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  hideOnMobile?: boolean;
};

export const Tooltip: FC<Props> = ({
  tooltip,
  top,
  right,
  bottom,
  left,
  hideOnMobile = false,
}) => {
  return (
    <span
      className="tooltip"
      css={[
        styles.tooltip({ top, right, bottom, left }),
        hideOnMobile && styles.tooltipHidden,
      ]}
    >
      {tooltip}
    </span>
  );
};
