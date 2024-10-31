import { forwardRef, ReactNode, Ref } from 'react';
import { SerializedStyles } from '@emotion/react';
import { SvgIcon } from '@shared/components';
import { styles } from './DropdownButton.styles';
import { ITheme } from 'types/theme';
import IconArrow from '@public/assets/icons/common/ChevronDown.svg';

type DropdownButtonProps = {
  disabled?: boolean;
  isOpen: boolean;
  text: string | ReactNode;
  icon?: ReactNode;
  onClick: VoidFunction;
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
  isLoading?: boolean;
  tabIndex?: number;
  type?: 'input' | 'default';
  buttonStyles?: ((theme: ITheme) => SerializedStyles)[];
  hideDropdownIcon?: boolean;
};

export const DropdownButton = forwardRef(
  (
    {
      disabled,
      icon,
      onClick,
      onFocus,
      onBlur,
      text,
      isOpen,
      isLoading,
      tabIndex,
      type,
      buttonStyles,
      hideDropdownIcon,
    }: DropdownButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick();
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        type="button"
        css={
          buttonStyles
            ? buttonStyles
            : [
                styles.button,
                isLoading && styles.loading,
                type === 'input' && styles.buttonInput,
              ]
        }
        onClick={(e) => handleClick(e)}
        onFocus={onFocus}
        onBlur={onBlur}
        {...(tabIndex && { tabIndex })}
      >
        {icon && <SvgIcon size="16px">{icon}</SvgIcon>}
        {text}
        {!hideDropdownIcon && (
          <span
            className="dropdown-caret"
            css={[styles.icon, isOpen && styles.iconOpen]}
          >
            <SvgIcon size="12px">
              <IconArrow />
            </SvgIcon>
          </span>
        )}
      </button>
    );
  },
);
