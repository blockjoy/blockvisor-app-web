import { useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Scrollbar,
  DropdownWrapper,
} from '@shared/components';
import { styles } from './Select.styles';
import { useAccessibleDropdown } from '@shared/index';
import { SerializedStyles } from '@emotion/react';
import { ITheme } from 'types/theme';

type Props<T = any> = {
  disabled?: boolean;
  items: T[];
  selectedItem: T;
  buttonText: string | React.ReactNode;
  noBottomMargin?: boolean;
  buttonStyles?: (theme?: ITheme) => SerializedStyles;
  onSelect: (value: string) => void;
};

export const Select = <T extends { id?: string; name?: string }>({
  disabled,
  items,
  selectedItem,
  buttonText,
  noBottomMargin = false,
  buttonStyles,
  onSelect,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleClick = () => setIsOpen(!isOpen);

  const handleSelect = (item: T) => {
    setIsOpen(false);
    onSelect(item.id!);
  };

  const {
    activeIndex,
    handleItemRef,
    handleFocus,
    handleBlur,
    handleSelectAccessible,
  } = useAccessibleDropdown({
    items,
    selectedItem,
    handleSelect,
    isOpen,
    handleOpen: handleClick,
    dropdownRef,
  });

  return (
    <DropdownWrapper
      isEmpty={true}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      noBottomMargin={noBottomMargin}
    >
      <DropdownButton
        disabled={disabled}
        text={buttonText}
        onClick={handleClick}
        isOpen={isOpen}
        buttonStyles={[buttonStyles!]}
        {...(handleFocus && { onFocus: handleFocus })}
        {...(handleBlur && { onBlur: handleBlur })}
      />
      <DropdownMenu isOpen={isOpen} additionalStyles={styles.dropdown}>
        <Scrollbar additionalStyles={[styles.dropdownInner]}>
          <ul ref={dropdownRef}>
            {items?.map((item, index) => (
              <li
                key={item.name}
                ref={(el: HTMLLIElement) => handleItemRef(el, index)}
                css={[
                  selectedItem?.id === item.id ? styles.active : null,
                  activeIndex === index ? styles.focus : null,
                ]}
              >
                <DropdownItem
                  size="medium"
                  type="button"
                  onButtonClick={() => handleSelectAccessible(item)}
                >
                  <p css={styles.menuItemText}>{item.name}</p>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Scrollbar>
      </DropdownMenu>
    </DropdownWrapper>
  );
};
