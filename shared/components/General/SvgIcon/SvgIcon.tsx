import { css, SerializedStyles } from '@emotion/react';
import { styles } from './SvgIcon.styles';
import { Tooltip } from '../Tooltip/Tooltip';
import { ITheme } from 'types/theme';

type Props = {
  children?: React.ReactNode;
  additionalStyles?: ((theme: ITheme) => SerializedStyles)[] | undefined;
  size?: string;
  tooltip?: string;
  isDefaultColor?: boolean;
};

export const SvgIcon: React.FC<Props> = ({
  children,
  size = '16px',
  tooltip,
  additionalStyles,
  isDefaultColor,
}) => {
  const SvgIconComponent = () => (
    <span
      css={[
        styles.icon,
        isDefaultColor && styles.iconDefault,
        additionalStyles ?? '',
      ]}
      style={{ width: size, minWidth: size, height: size, minHeight: size }}
    >
      {children}
    </span>
  );

  return tooltip ? (
    <span css={styles.iconTooltip}>
      <SvgIconComponent />
      {tooltip && (
        <Tooltip
          customCss={[
            css`
              min-width: 180px;
              max-width: 180px;
            `,
          ]}
          bottom={`calc(${size} + 10px)`}
          tooltip={tooltip}
        />
      )}
    </span>
  ) : (
    <SvgIconComponent />
  );
};
