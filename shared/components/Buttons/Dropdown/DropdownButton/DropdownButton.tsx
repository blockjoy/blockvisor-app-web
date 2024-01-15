import { ReactNode } from 'react';
import { SvgIcon } from '@shared/components';
import { styles } from './DropdownButton.styles';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';

type Props = {
  disabled?: boolean;
  isOpen: boolean;
  text: string | ReactNode;
  icon?: ReactNode;
  onClick: VoidFunction;
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
  isLoading?: boolean;
  tabIndex?: number;
};

export const DropdownButton = ({
  disabled,
  icon,
  onClick,
  onFocus,
  onBlur,
  text,
  isOpen,
  isLoading,
  tabIndex,
}: Props) => {
  return (
    <button
      disabled={disabled || isLoading}
      type="button"
      css={[styles.button, isLoading && styles.loading]}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      {...(tabIndex && { tabIndex })}
    >
      {icon && <SvgIcon size="16px">{icon}</SvgIcon>}
      {text}
      <span css={[styles.icon, isOpen && styles.iconOpen]}>
        <SvgIcon size="12px">
          <IconArrow />
        </SvgIcon>
      </span>
    </button>
  );
};
