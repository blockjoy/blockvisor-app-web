import { css, SerializedStyles } from '@emotion/react';
import { styles } from './SvgIcon.styles';
import { Tooltip } from '../Tooltip/Tooltip';

type Props = {
  children?: React.ReactNode;
  additionalStyles?: SerializedStyles[];
  size?: string;
  tooltip?: string;
};

export const SvgIcon: React.FC<Props> = ({
  children,
  size = '16px',
  tooltip,
  additionalStyles,
}) => (
  <span
    css={[styles.icon, additionalStyles ?? '']}
    style={{ width: size, height: size }}
  >
    {tooltip && (
      <Tooltip
        customCss={[
          css`
            min-width: 260px;
            max-width: 260px;
            transition-delay: 0.6s;
            background: rgb(0 0 0 / 42%);
          `,
        ]}
        bottom="6px"
        tooltip={tooltip}
      />
    )}
    {children}
  </span>
);
