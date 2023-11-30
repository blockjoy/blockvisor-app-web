import { css, SerializedStyles } from '@emotion/react';
import { styles } from './SvgIcon.styles';
import { Tooltip } from '../Tooltip/Tooltip';
import { ITheme } from 'types/theme';

type Props = {
  children?: React.ReactNode;
  additionalStyles?:
    | ((theme: ITheme) => SerializedStyles)[]
    | SerializedStyles[]
    | undefined;
  size?: string;
  tooltip?: string;
  tooltipMinWidth?: string;
  tooltipTextAlign?: string;
  isDefaultColor?: boolean;
};

export const SvgIcon = ({
  children,
  size = '16px',
  tooltip,
  tooltipMinWidth = '180px',
  tooltipTextAlign = 'left',
  additionalStyles,
  isDefaultColor,
}: Props) => {
  const SvgIconComponent = () => (
    <span
      css={[
        styles.icon,
        isDefaultColor && styles.iconDefault,
        additionalStyles ?? '',
      ]}
      style={{
        width: size,
        minWidth: size,
        maxWidth: size,
        height: size,
        minHeight: size,
        maxHeight: size,
      }}
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
              max-width: 180px;
              min-width: ${tooltipMinWidth};
            `,
          ]}
          left="50%"
          bottom={`calc(${size} + 10px)`}
          tooltip={tooltip}
        />
      )}
    </span>
  ) : (
    <SvgIconComponent />
  );
};
