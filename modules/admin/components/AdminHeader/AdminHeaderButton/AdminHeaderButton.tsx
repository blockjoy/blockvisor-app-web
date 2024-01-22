import { SvgIcon } from '@shared/components';
import { styles } from './AdminHeaderButton.styles';

type Props = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  isDisabled?: boolean;
  onClick?: VoidFunction;
};

export const AdminHeaderButton = ({
  children,
  icon,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <button disabled={isDisabled} css={styles.button} onClick={onClick}>
      <SvgIcon size="15px">{icon}</SvgIcon>
      {Boolean(children) && (
        <span className="tooltip" css={styles.tooltip}>
          {children}
        </span>
      )}
    </button>
  );
};
