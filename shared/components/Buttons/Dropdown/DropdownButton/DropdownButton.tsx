import { ReactNode } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './DropdownButton.styles';
import IconArrow from '@public/assets/icons/common/ArrowRight.svg';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  text: string | ReactNode;
  icon?: ReactNode;
  onClick: VoidFunction;
  isLoading?: boolean;
};

export const DropdownButton = ({
  disabled,
  icon,
  onClick,
  text,
  isOpen,
  isLoading,
}: Props) => {
  return (
    <button
      disabled={disabled || isLoading}
      type="button"
      css={[styles.button, isLoading && styles.loading]}
      onClick={onClick}
    >
      {icon && <SvgIcon size="16px">{icon}</SvgIcon>}
      {text}
      <span css={[styles.icon, isOpen && styles.iconOpen]}>
        <IconArrow />
      </span>
    </button>
  );
};
