import { SvgIcon } from '@shared/components';
import { styles } from './AdminHeaderButton.styles';

type Props = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  isDisabled?: boolean;
  isDanger?: boolean;
  onClick?: VoidFunction;
};

export const AdminHeaderButton = ({
  children,
  icon,
  isDisabled,
  isDanger,
  onClick,
}: Props) => {
  return (
    <button
      disabled={isDisabled}
      css={[styles.button, isDanger && styles.buttonDanger]}
      onClick={onClick}
    >
      <SvgIcon size="15px">{icon}</SvgIcon>
      {Boolean(children) && (
        <span className="tooltip" css={styles.tooltip}>
          {children}
        </span>
      )}
    </button>
  );
};
