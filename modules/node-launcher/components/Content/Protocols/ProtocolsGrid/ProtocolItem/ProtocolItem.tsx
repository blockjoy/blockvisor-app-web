import { styles } from './ProtocolItem.styles';

type Props = {
  color?: string;
  isActive?: boolean;
  isFocused?: boolean;
  handleRef?: (el: HTMLDivElement) => void;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
} & React.PropsWithChildren;

export const ProtocolItem = ({
  children,
  color,
  isActive,
  isFocused,
  handleRef,
  handleClick,
}: Props) => (
  <div
    ref={handleRef}
    css={styles.wrapper(color)}
    onClick={handleClick}
    className={`card${isActive ? ' active' : ''}${isFocused ? ' focus' : ''}`}
  >
    <div css={styles.content}>{children}</div>
  </div>
);
