import { css, keyframes, SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';
import { SvgIcon } from '@shared/components';
import { NodeStatePresentationOptions } from '@modules/node';

type Props = {
  color?: keyof ITheme;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  options?: NodeStatePresentationOptions;
  view?: NodeStatusView;
  iconSize?: string;
  additionalTextStyles?:
    | SerializedStyles[]
    | ((theme: ITheme) => SerializedStyles)[];
} & React.PropsWithChildren;

export const NodeStatusTextWIcon = ({
  children,
  color,
  Icon,
  options,
  view = 'default',
  iconSize,
  additionalTextStyles,
}: Props) => (
  <span css={styles.wrapper(color, view)}>
    {Icon && (
      <SvgIcon
        size={iconSize ? iconSize : view === 'card' ? '24px' : '12px'}
        {...(options?.iconSpining && {
          additionalStyles: styles.icon,
        })}
      >
        <Icon />
      </SvgIcon>
    )}
    <span
      css={[styles.text(view), additionalTextStyles && additionalTextStyles]}
    >
      {children}
    </span>
  </span>
);

const spin = keyframes`
    100% {
        transform: rotate(1turn);
    }
`;

const styles = {
  wrapper: (color?: keyof ITheme, view?: NodeStatusView) => (theme: ITheme) =>
    css`
      position: relative;
      display: inline-flex;
      flex-direction: ${view === 'card' ? 'column' : 'row'};
      align-items: center;
      gap: ${view === 'card' ? '8px' : '6px'};

      ${view === 'badge' &&
      css`
        border: 1px solid ${theme[color ?? 'colorDefault']};
        padding: 8px 10px;
        border-radius: 3px;
      `}

      color: ${theme[color ?? 'colorDefault']};
      border-color: ${color};

      svg :is(path, circle, rect) {
        fill: ${theme[color ?? 'colorDefault']};
      }
    `,
  text: (view?: NodeStatusView) => css`
    font-size: ${view === 'default'
      ? '11px'
      : view === 'card'
      ? '14px'
      : '9px'};
    line-height: ${view === 'card' ? '1.6' : '1'};
    text-transform: ${view === 'card' ? 'capitalize' : 'uppercase'};
    letter-spacing: ${view === 'card' ? '0' : '1px'};
  `,
  icon: css`
    animation: ${spin} 1.2s infinite linear;
  `,
};
