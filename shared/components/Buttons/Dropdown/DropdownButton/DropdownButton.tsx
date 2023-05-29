import { SvgIcon } from '@shared/components';
import { ReactNode } from 'react';
import { styles } from './DropdownButton.styles';
import IconArrow from '@public/assets/icons/common/ArrowRight.svg';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  text: string | ReactNode;
  icon?: ReactNode;
  onClick: VoidFunction;
};

export const DropdownButton = ({
  disabled,
  icon,
  onClick,
  text,
  isOpen,
}: Props) => {
  return (
    <button
      disabled={disabled}
      type="button"
      css={styles.button}
      onClick={onClick}
      data-cy="node-rules-dropdown"
    >
      {icon && <SvgIcon size="16px">{icon}</SvgIcon>}
      {text}
      <span css={[styles.icon, isOpen && styles.iconOpen]}>
        <IconArrow />
      </span>
    </button>
  );
};
