import { css, SerializedStyles } from '@emotion/react';
import { styles } from './SvgIcon.styles';
import { Tooltip } from '../Tooltip/Tooltip';
import { ITheme } from 'types/theme';

type Props = {
  children?: React.ReactNode;
  additionalStyles?: ((theme: ITheme) => SerializedStyles)[] | undefined;
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
            min-width: 180px;
            max-width: 180px;
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
