import { ReactNode } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './DropdownButton.styles';
import IconArrow from '@public/assets/icons/common/ArrowRight.svg';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  text: string | ReactNode;
  onClick: VoidFunction;
  icon?: ReactNode;
  type?: 'input' | 'default';
  tabIndex?: number;
};

export const DropdownButton = ({
  disabled,
  icon,
  onClick,
  text,
  isOpen,
  type,
  tabIndex,
}: Props) => {
  return (
    <button
      disabled={disabled}
      type="button"
      css={[styles.button, type === 'input' && styles.buttonInput]}
      onClick={onClick}
      {...(tabIndex !== undefined && { tabIndex })}
    >
      {icon && <SvgIcon size="16px">{icon}</SvgIcon>}
      {text}
      <span css={[styles.icon, isOpen && styles.iconOpen]}>
        <IconArrow />
      </span>
    </button>
  );
};
